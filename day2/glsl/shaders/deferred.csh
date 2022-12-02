#version 430
layout(local_size_x = 1, local_size_y = 32, local_size_z = 1) in;
const ivec3 workGroups = ivec3(1, 79, 1);

uniform usampler2D colortex4; // Input, 2x2500
layout (r32ui) uniform uimage2D colorimg5; // Output, 2x1

#define WIN_POINTS  6
#define DRAW_POINTS 3

#define LOSS 1
#define DRAW 2
#define WIN  3

#define ROCK     1
#define PAPER    2
#define SCISSORS 3

// Holds the possible moves for each result, x the result, y the opponent move
const int moveMatcher[][] = int[3][3](
    int[3](SCISSORS, ROCK    , PAPER    ), // Matches input to losing move
    int[3](ROCK    , PAPER   , SCISSORS ), // Matches input to itself
    int[3](PAPER   , SCISSORS, ROCK     )  // Matches input to winning move
);

void main() {
    int height = int(gl_GlobalInvocationID.y);
    if(height >= 2500) return;

    uint move               = texelFetch(colortex4, ivec2(0, height), 0).x;
    uint resultOrSecondMove = texelFetch(colortex4, ivec2(1, height), 0).x;

    // 1 = rock, 2 = paper, 3 = scissors
    // 1 = loss, 2 = draw, 3 = win

    uint scoreToAddP1 = resultOrSecondMove;
    uint scoreToAddP2 = 0;

    // Part one: move is the opponent move, resultOrSecondMove is our move
    if(move == resultOrSecondMove) { // Draw
        scoreToAddP1 += DRAW_POINTS;
    } else if(move + 1 == resultOrSecondMove || move - 2 == resultOrSecondMove) { // Win
        scoreToAddP1 += WIN_POINTS;
    }

    // Part two: move is opponent move, resultOrSecondMove is the result of the game
    if(resultOrSecondMove == DRAW) {
        scoreToAddP2 = DRAW_POINTS;
    } else if(resultOrSecondMove == WIN) {
        scoreToAddP2 = WIN_POINTS;
    }
    // Figure out which move we need to match result
    scoreToAddP2 += moveMatcher[resultOrSecondMove-1][move-1];

    imageAtomicAdd(colorimg5, ivec2(0,0), scoreToAddP1);
    imageAtomicAdd(colorimg5, ivec2(1,0), scoreToAddP2);
}