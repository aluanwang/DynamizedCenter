uniform float     iGlobalTime;
uniform sampler2D iChannel0;  
uniform float     alpha;


vec3 deform( in vec2 p )
{
    vec2 uv;
    vec2 q = vec2( sin(2.0*iGlobalTime+p.x),cos(2.0*iGlobalTime+p.y) );

    float a = atan(q.y,q.x);
    float r = sqrt(dot(q,q));

    uv.x = sin(1.0)+p.x*sqrt(r*r+1.8);
    uv.y = sin(1.0)+p.y*sqrt(r*r+1.9);

    return texture2D( iChannel0, uv*.3).yxz;
}

void main(void)
{
    vec2 p = (vec2(gl_TexCoord[0].xy)*2.0)-vec2(0.5 ,0.5);
    vec2 s = p;

    vec3 total = vec3(0.0);
    vec2 d = (vec2(cos(iGlobalTime*6.28),sin(iGlobalTime*6.28))-p)/50.0;
    float w = 1.0;
    for( int i=0; i<30; i++ )
    {
        vec3 res = deform(s);
        res = smoothstep(0.0,1.0,res);
        total += w*res;
        w *= .96;
        s += d;
    }
    total /= 50.0;
    float r = 5.0;

	gl_FragColor = vec4( total*r,alpha);
}