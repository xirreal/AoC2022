#version 430
layout(local_size_x = 1, local_size_y = 32, local_size_z = 1) in;
const ivec3 workGroups = ivec3(1, 4, 1);

uniform usampler2D colortex3; // Input, 48x300
layout (r32ui) uniform uimage2D colorimg4; // Input, 1x300 => This just stores the length of each row, not the actual values.
layout (r32ui) uniform uimage2D colorimg5; // Output, 2x1

void main() {
    int height = int(gl_GlobalInvocationID.y);
    if (height >= 100) return;

    // Part 1
    for(int i = 0; i < 3; i++) { // We need to read 3 lines because we only have 100 invocations (to avoid needing to do part2 in a separate pass)
        int localHeight = height * 3  + i;
        int rucksackSize = int(imageLoad(colorimg4, ivec2(0, localHeight)).x);
        bool found = false;
        for(int k = 0; k < rucksackSize / 2; k++) {
            uint compartment1Item = texelFetch(colortex3, ivec2(k, localHeight), 0).r;
            for(int j = rucksackSize / 2; j < rucksackSize; j++) {
                uint compartment2Item = texelFetch(colortex3, ivec2(j, localHeight), 0).r;
                if(compartment1Item == compartment2Item) {
                    // Convert ASCII to "priority"
                    // Lowercase => charcode - 96; Uppercase => charcode - 96 + 32 + 26
                    uint priority = compartment1Item - 96;
                    if(compartment1Item <= 96) priority += 32 + 26;
                    imageAtomicAdd(colorimg5, ivec2(0, 0), priority);
                    found = true;
                    break;
                }
            }
            if(found) break;
        }
    }

    //Part 2
    int rucksackSize1 = int(imageLoad(colorimg4, ivec2(0, height * 3 + 0)).x);
    for(int k = 0; k < rucksackSize1; k++) {
        uint rucksack1Item = texelFetch(colortex3, ivec2(k, height * 3 + 0), 0).r;
        bool found = false;

        int rucksackSize2 = int(imageLoad(colorimg4, ivec2(0, height * 3 + 1)).x);
        for(int j = 0; j < rucksackSize2; j++) {
            uint rucksack2Item = texelFetch(colortex3, ivec2(j, height * 3 + 1), 0).r;
            if(rucksack1Item != rucksack2Item) continue;

            int rucksackSize3 = int(imageLoad(colorimg4, ivec2(0, height * 3 + 1)).x);
            for(int m = 0; m < rucksackSize3; m++) {
                uint rucksack3Item = texelFetch(colortex3, ivec2(m, height * 3 + 2), 0).r;
                if(rucksack2Item == rucksack3Item) { // If all 3 rucksacks have the same item
                    // Convert ascii to priority like before
                    uint priority = rucksack1Item - 96;
                    if(rucksack1Item <= 96) priority += 32 + 26;
                    imageAtomicAdd(colorimg5, ivec2(1, 0), priority);
                    return;
                }
            }
        }
    }
}