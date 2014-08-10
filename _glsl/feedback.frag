
uniform float     alpha;
uniform sampler2D iChannel0;  

void main(){

	vec2 uv =(gl_TexCoord[0]).xy;
	vec3 color = texture2D(iChannel0, uv).rgb;
  	gl_FragColor = vec4( color, alpha);

}