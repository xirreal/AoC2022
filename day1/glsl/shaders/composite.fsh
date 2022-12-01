#version 420

#include "textRendering.glsl"

/*
const int colortex5Format = R32UI
*/

in vec2 texcoord;
/*RENDERTARGETS:0*/
out vec4 fragColor;

layout(r32ui) uniform uimage2D colortex5;

uniform float viewHeight;

void main() {
    vec4 outColor = vec4(0.0, 0.0, 0.0, 0.0);

    beginText(ivec2(gl_FragCoord.xy), ivec2(0, viewHeight));
    printString((_M, _a, _x, _colon));
    printUnsignedInt(imageLoad(colortex5, ivec2(252, 0)).x);
    printNewLine();
    printString((_S, _u, _m, _colon));
    printUnsignedInt(imageLoad(colortex5, ivec2(252, 0)).x + imageLoad(colortex5, ivec2(253, 0)).x + imageLoad(colortex5, ivec2(254, 0)).x);
    printNewLine();

    endText(outColor.rgb);
    fragColor = outColor;
}

