#version 420
layout(local_size_x = 1, local_size_y = 1) in;
const ivec3 workGroups = ivec3(251, 1, 1);

layout (r32ui) uniform uimage2D colorimg5; // Input and output, 251+3x1

void main() {
    ivec2 pos = ivec2(gl_GlobalInvocationID.xy);
    uint value = imageLoad(input, pos).x;
    imageAtomicMax(colorimg5, ivec(254,0), imageAtomicMax(colorimg5, ivec(253,0), imageAtomicMax(colorimg5, ivec2(252, 0), value)));
}

