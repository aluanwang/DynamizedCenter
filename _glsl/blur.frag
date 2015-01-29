uniform float     iGlobalTime;
uniform sampler2D iChannel0;  
uniform float     alpha;


void main(void)
{
   	vec3 color = texture2D(iChannel0, (gl_TextureMatrix[0] * gl_TexCoord[0]).st).rgb;
	float time=iGlobalTime;
	
	gl_FragColor = vec4( color,alpha);
	//gl_FragColor = vec4(1.0,0.0,0.0,alpha);
}