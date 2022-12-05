#version 430
layout(local_size_x = 8, local_size_y = 9, local_size_z = 1) in;
const ivec3 workGroups = ivec3(1, 1, 1);

uniform usampler2D colortex2; // Input, 8x9
layout (r32ui) uniform uimage2D colorimg4; // Output, 50x9
layout (r32ui) uniform uimage2D colorimg5; // Output, 50x9

// This is just a blit program. Sets up the output images with the initial state.
void main() {
    uint value = texelFetch(colortex2, ivec2(gl_GlobalInvocationID.xy), 0).r;
    imageAtomicExchange(colorimg4, ivec2(gl_GlobalInvocationID.xy), value);
    imageAtomicExchange(colorimg5, ivec2(gl_GlobalInvocationID.xy), value);
}