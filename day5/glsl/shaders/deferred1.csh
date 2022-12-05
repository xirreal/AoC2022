#version 430
layout(local_size_x = 1, local_size_y = 2, local_size_z = 1) in;
const ivec3 workGroups = ivec3(1, 1, 1);

uniform usampler2D colortex3; // Input, 3x502
layout (r32ui) uniform uimage2D colorimg4; // Input/Output, 50x9
layout (r32ui) uniform uimage2D colorimg5; // Input/Output, 50x9

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

void main() {
    int height = int(gl_GlobalInvocationID.y);
    if (height >= 1) return; // We need to process only 1 row :(

    for(int k = 0; k < 502; k++) {
        uint howMany = texelFetch(colortex3, ivec2(0, k), 0).x;
        uint from = texelFetch(colortex3, ivec2(1, k), 0).x - 1;
        uint to = texelFetch(colortex3, ivec2(2, k), 0).x - 1;

        int heightOfFrom1 = getHeightOfColumn1(from);
        int heightOfTo1 = getHeightOfColumn1(to);

        int heightOfFrom2 = getHeightOfColumn2(from);
        int heightOfTo2 = getHeightOfColumn2(to);

        uint pushStack1[] = uint[50](0); // 50 should be big enough...
        uint pushStack2[] = uint[50](0);

        for(int i = 0; i < howMany; i++) {
            pushStack1[i] = imageAtomicExchange(colorimg4, ivec2(heightOfFrom1 - i - 1, from), 0);
            pushStack2[i] = imageAtomicExchange(colorimg5, ivec2(heightOfFrom2 - i - 1, from), 0);
        }
        for(int i = 0; i < howMany; i++) {
            imageAtomicExchange(colorimg4, ivec2(heightOfTo1 + i, to), pushStack1[i]);
            imageAtomicExchange(colorimg5, ivec2(heightOfTo2 + i, to), pushStack2[howMany - i - 1]);
        }
    }
}