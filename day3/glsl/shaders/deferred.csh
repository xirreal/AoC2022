#version 430
layout(local_size_x = 16, local_size_y = 2, local_size_z = 1) in;
const ivec3 workGroups = ivec3(3, 150, 1);

uniform usampler2D colortex3; // Input, 48x300
layout (r32ui) uniform uimage2D colorimg4; // Output, 1x300 => This just stores the length of each row, not the actual values.
layout (r32ui) uniform uimage2D colorimg5; // Output, 2x1

void main() {
    ivec2 pos = ivec2(gl_GlobalInvocationID.xy);
    uint value = texelFetch(colortex3, pos, 0).x;
    imageAtomicAdd(colorimg4, ivec2(0, pos.y), min(value, 1));
}