#define PI2 6.283184

#define CV 0.1
#define ST 0.05

uniform float     alpha;
uniform float     iGlobalTime;
uniform sampler2D iChannel0; 

vec4 colorat(vec2 uv) {
	return texture2D(iChannel0, uv);
}
vec4 blur(vec2 uv) {
	vec4 col = vec4(0.0);
	for(float r0 = 0.0; r0 < 1.0; r0 += ST) {
		float r = r0 * CV;
		for(float a0 = 0.0; a0 < 1.0; a0 += ST) {
			float a = a0 * PI2;
			col += colorat(uv + vec2(cos(a), sin(a)) * r);
		}
	}
	col *= ST * ST;
	return col;
}

void main(void) {
	vec2 uv = gl_TexCoord[0].xy;
	gl_FragColor = vec4(blur(uv).rgb,alpha);
}