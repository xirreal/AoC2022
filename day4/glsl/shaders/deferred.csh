#version 430
layout(local_size_x = 1, local_size_y = 32, local_size_z = 1) in;
const ivec3 workGroups = ivec3(1, 32, 1);

uniform usampler2D colortex4; // Input, 2x1000
layout (r32ui) uniform uimage2D colorimg5; // Output, 2x1

void main() {
    int height = int(gl_GlobalInvocationID.y);
    if (height >= 1000) return;

    uint min1 = texelFetch(colortex4, ivec2(0, height), 0).x;
    uint max1 = texelFetch(colortex4, ivec2(1, height), 0).x;
    uint min2 = texelFetch(colortex4, ivec2(2, height), 0).x;
    uint max2 = texelFetch(colortex4, ivec2(3, height), 0).x;

  if ((min1 >= min2 && max1 <= max2) || (min2 >= min1 && max2 <= max1)) {
    imageAtomicAdd(colorimg5, ivec2(0, 0), 1);
  }

  if (min1 <= max2 && min2 <= max1) {
    imageAtomicAdd(colorimg5, ivec2(1, 0), 1);
  }
}