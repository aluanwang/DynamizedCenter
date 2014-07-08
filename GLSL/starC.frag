#ifdef GL_ES
precision mediump float;
#endif

uniform float time;
uniform float alpha;


float rand(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453) * 2.0 - 1.0;
}

void main( void ) {

	vec2 pos = ( vec2(gl_TexCoord[0]).xy * 2.0) - 1.0;
	float color = 0.0;
	
	for(float i = 1.0; i <= 8.0; i++)
	{
		for(float k = 0.0; k < 16.0; k++)
		{
			vec2 sPos = vec2(rand(vec2(i, k)) + sin(time * i * k * 0.02), rand(vec2(k, i)) + cos(time * k * i * 0.01));
			sPos *= 0.55;
			color += max(0.0, ((1.0 / i) - distance(pos*0.3, sPos)) * (i))*0.4;
			
		}
	}
	
	color *= 0.25;
	color = pow(color, 2.5);
	
	gl_FragColor = vec4( color*0.15,color*0.4,color*0.7, alpha);

}