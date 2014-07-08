

uniform float time;
uniform float alpha;

#ifdef GL_ES
precision highp float;
#endif


float field(in vec3 p,float s) {
	float strength = 7. + .03 * log(1.e-6 + fract(sin(time) * 12000.11));
	float accum = s/2.;
	float prev = 0.;
	float tw = 0.;
	for (int i = 0; i < 24; ++i) {
		float mag = dot(p, p);
		p = abs(p) / mag + vec3(-.5, -.4, -1.5);
		float w = exp(-float(i) / 7.);
		accum += w * exp(-strength * pow(abs(mag - prev), 2.2));
		tw += w;
		prev = mag;
	}
	return max(0., 5. * accum / tw - .7);
}


float field2(in vec3 p, float s) {
	float strength = 7. + .03 * log(1.e-6 + fract(sin(time) * 4373.11));
	float accum = s/4.;
	float prev = 0.;
	float tw = 0.;
	for (int i = 0; i < 20; ++i) {
		float mag = dot(p, p);
		p = abs(p) / mag + vec3(-.5, -.4, -1.5);
		float w = exp(-float(i) / 7.);
		accum += w * exp(-strength * pow(abs(mag - prev), 2.2));
		tw += w;
		prev = mag;
	}
	return max(0., 5. * accum / tw - .7);
}

vec3 nrand3( vec2 co )
{
	vec3 a = fract( cos( co.x*8.3e-3 + co.y )*vec3(1.3e5, 4.7e5, 2.9e5) );
	vec3 b = fract( sin( co.x*0.3e-3 + co.y )*vec3(8.1e5, 1.0e5, 0.1e5) );
	vec3 c = mix(a, b, 0.1);
	return c;
}


void main() {
    vec2 uv =vec2(gl_TexCoord[0])*2.0-1.0;
	vec3 p = vec3(uv / 2.0, 0) + vec3(1.0, -1.3, 1.2);
	p += vec3(sin(time / 24.), cos(time / 20.),  cos(time / 48.));
	
	float freqs[4];
	freqs[0] = 0.05;
	freqs[1] = 0.15;
	freqs[2] = 0.4;
	freqs[3] = 0.7;
	
	float t = field(p,freqs[3]);
	float v = (1. - exp((abs(uv.x) - 1.) * 6.)) * (1. - exp((abs(uv.y) - 1.) * 1.));
	
	//Star
	vec2 seed = p.xy * (mod(time*3.0,1.0)+1.0);	
	seed = floor(seed * 400.0);
	vec3 rnd = nrand3( seed );
	vec4 starcolor = vec4(pow(rnd.y,70.0)*2.0);
	
	vec4 fill=mix(freqs[1]-0.1, 1., v) * vec4(freqs[2]*t*t*t,freqs[3] * t * t, 1.4 * freqs[3]*t, 1.0)+starcolor ;
	
	gl_FragColor = vec4(vec3(fill).rgb,alpha);
}