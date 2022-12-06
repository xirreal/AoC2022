#version 430
layout(local_size_x = 32, local_size_y = 1, local_size_z = 1) in;
const ivec3 workGroups = ivec3(128, 1, 1);

uniform usampler2D colortex4; // Input, 4096x1
layout (r32ui) uniform uimage2D colorimg5; // Output, 2x1

void main() {
    uint readBufferP1[4];
    uint readBufferP2[14];

    bool hasDuplicate1 = false;
    for(int i = 0; i < 4; i++) {
        readBufferP1[i] = texelFetch(colortex4, ivec2(gl_GlobalInvocationID.x + i, 0), 0).x;
        for(int j = i - 1; j >= 0 ; j--) {
            if(readBufferP1[i] == readBufferP1[j]) {
                hasDuplicate1 = true;
                break;
            }
        }
        if(hasDuplicate1) {
            break;
        }
    }

    bool hasDuplicate2 = false;
    for(int i = 0; i < 14; i++) {
        readBufferP2[i] = texelFetch(colortex4, ivec2(gl_GlobalInvocationID.x + i, 0), 0).x;
        for(int j = i - 1; j >= 0; j--) {
            if(readBufferP2[i] == readBufferP2[j]) {
                hasDuplicate2 = true;
                break;
            }
        }
        if(hasDuplicate2) {
            break;
        }
    }

    if(!hasDuplicate1) {
        imageAtomicMin(colorimg5, ivec2(gl_GlobalInvocationID.x, 0), gl_GlobalInvocationID.x + 4);
    }

    if(!hasDuplicate2) {
        imageAtomicMin(colorimg5, ivec2(gl_GlobalInvocationID.x, 1), gl_GlobalInvocationID.x + 14);
    }
}