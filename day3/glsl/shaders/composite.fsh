#version 420

#include "textRendering.glsl"

/*
const int colortex4Format = R32UI
const int colortex5Format = R32UI
*/

in vec2 texcoord;
/*RENDERTARGETS:0*/
out vec4 fragColor;

layout(r32ui) uniform uimage2D colorimg5;
uniform sampler2D colortex0;

uniform float viewHeight;

void main() {
    vec4 outColor = texture(colortex0, texcoord);

    beginText(ivec2(gl_FragCoord.xy * 0.1), ivec2(0, viewHeight * 0.1));
    printString((_P, _a, _r, _t, _space, _1, _colon));
    printUnsignedInt(imageLoad(colorimg5, ivec2(0, 0)).x);
    printLine();
    printString((_P, _a, _r, _t, _space, _2, _colon));
    printUnsignedInt(imageLoad(colorimg5, ivec2(1, 0)).x);
    printLine();

    endText(outColor.rgb);
    fragColor = outColor;
}

