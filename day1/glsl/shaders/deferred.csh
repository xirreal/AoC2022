#version 420
layout(local_size_x = 1, local_size_y = 1) in;
const ivec3 workGroups = ivec3(15, 251, 1);

uniform usampler2D colortex4; // Input, 15x251
layout (r32ui) uniform uimage2D colorimg5; // Output, 251+3x1

void main() {
    ivec2 pos = ivec2(gl_GlobalInvocationID.xy);
    uint value = texelFetch(colortex4, pos).x;
    imageAtomicAdd(colorimg5, ivec2(pos.y, 0), value);
}