#version 430
layout (local_size_x = 251, local_size_y = 1) in;
const ivec3 workGroups = ivec3(1, 1, 1);

layout (r32ui) uniform uimage2D colorimg5; // Input and output, 251+3x1

void main() {
    ivec2 pos = ivec2(gl_GlobalInvocationID.xy);
    uint value = imageLoad(colorimg5, pos).x;
    uint readbackHighest = imageAtomicMax(colorimg5, ivec2(251, 0), value);
    if (readbackHighest < value) {
        uint readbackMiddle = imageAtomicMax(colorimg5, ivec2(252, 0), readbackHighest);
        if (readbackMiddle < readbackHighest) {
            imageAtomicExchange(colorimg5, ivec2(253, 0), readbackMiddle);
        }
    }
}

