#version 420

#include "textRendering.glsl"

/*
const int colortex4Format = R32UI;
const int colortex5Format = R32UI;
*/

in vec2 texcoord;
/*RENDERTARGETS:0*/
out vec4 fragColor;

layout(r32ui) uniform uimage2D colorimg4;
layout(r32ui) uniform uimage2D colorimg5;
uniform sampler2D colortex0;

uniform float viewHeight;

int getHeightOfColumn1(uint column) {
    for (int height = 0; height < 50; height++) {
        if (imageLoad(colorimg4, ivec2(height, column)).x == 0) {
            return height;
        }
    }
    return 50;
}

int getHeightOfColumn2(uint column) {
    for (int height = 0; height < 50; height++) {
        if (imageLoad(colorimg5, ivec2(height, column)).x == 0) {
            return height;
        }
    }
    return 50;
}

uint[] chars = uint[26](_A,_B,_C,_D,_E,_F,_G,_H,_I,_J,_K,_L,_M,_N,_O,_P,_Q,_R,_S,_T,_U,_V,_W,_X,_Y,_Z);

void printUintAscii(uint[9] characters) {
	for (int i = 0; i < 9; ++i) {
        printChar(chars[characters[i] - 65]);
    }
}

void main() {
    vec4 outColor = texture(colortex0, texcoord);

    beginText(ivec2(gl_FragCoord.xy * 0.1), ivec2(0, viewHeight * 0.1));

    uint part1[9];
    uint part2[9];

    for (int i = 0; i < 9; i++) {
        int height1 = getHeightOfColumn1(i);
        int height2 = getHeightOfColumn2(i);
        part1[i] = imageLoad(colorimg4, ivec2(height1 - 1, i)).x;
        part2[i] = imageLoad(colorimg5, ivec2(height2 - 1, i)).x;
    }

    printString((_P, _a, _r, _t, _space, _1, _colon));
    printUintAscii(part1);
    printLine();
    printString((_P, _a, _r, _t, _space, _2, _colon));
    printUintAscii(part2);
    printLine();

    endText(outColor.rgb);
    fragColor = outColor;
}

