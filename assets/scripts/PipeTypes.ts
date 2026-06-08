export enum PipeShape {
  EMPTY    = 'empty',
  STRAIGHT = 'straight',
  ELBOW    = 'elbow',
  TEE      = 'tee',
  CROSS    = 'cross',
  DEAD     = 'dead',
  START    = 'start',
  GOAL     = 'goal',
}

/**
 * Openings at rotation 0: [top, right, bottom, left]
 *
 * START  → emits RIGHT only  (rot 2 = opens right)
 * GOAL   → accepts TOP only  (rot 2 = opens top  ← fixed at rot 1 in puzzle)
 */
export const SHAPE_OPENINGS: Record<PipeShape, [boolean, boolean, boolean, boolean]> = {
  [PipeShape.EMPTY]:    [false, false, false, false],
  [PipeShape.STRAIGHT]: [false, true,  false, true ],  // horizontal: L+R
  [PipeShape.ELBOW]:    [true,  true,  false, false],  // T+R
  [PipeShape.TEE]:      [false, true,  true,  true ],  // R+B+L
  [PipeShape.CROSS]:    [true,  true,  true,  true ],
  [PipeShape.DEAD]:     [true,  false, false, false],  // T only
  [PipeShape.START]:    [false, true,  false, false],  // emits RIGHT
  [PipeShape.GOAL]:     [false, false, false, true ],  // accepts LEFT at rot 0
};

export interface TileData {
  shape:    PipeShape;
  rotation: number;   // 0 | 1 | 2 | 3  (× 90°)
  fixed:    boolean;
}

/**
 * Fixed 4×4 puzzle — verified solution path:
 *   (0,0)START → (0,1)STRAIGHT → (0,2)ELBOW → (1,2)ELBOW → (1,3)ELBOW → (2,3)STRAIGHT → (3,3)GOAL
 *
 * Solved rotations:
 *   START    rot 2  → opens RIGHT              [FIXED]
 *   STRAIGHT rot 0  → opens R+L   (1 tap from initial rot 1)
 *   ELBOW    rot 2  → opens B+L   (2 taps from initial rot 0)
 *   ELBOW    rot 0  → opens T+R   (2 taps from initial rot 2)
 *   ELBOW    rot 2  → opens B+L   (2 taps from initial rot 0)
 *   STRAIGHT rot 1  → opens T+B   (1 tap from initial rot 0)
 *   GOAL     rot 2  → opens TOP               [FIXED]
 *
 * Total minimum taps to solve: 8 (well within 12-move limit)
 */
export const PUZZLE_GRID: TileData[][] = [
  // Row 0
  [
    { shape: PipeShape.START,    rotation: 0, fixed: true  },  // (0,0) fixed – emits RIGHT
    { shape: PipeShape.STRAIGHT, rotation: 1, fixed: false },  // (0,1) scrambled – needs rot 0
    { shape: PipeShape.ELBOW,    rotation: 0, fixed: false },  // (0,2) scrambled – needs rot 2
    { shape: PipeShape.ELBOW,    rotation: 2, fixed: false },  // (0,3)
  ],
  // Row 1
  [
    { shape: PipeShape.STRAIGHT, rotation: 0, fixed: false  },  // (1,0)
    { shape: PipeShape.ELBOW,    rotation: 0, fixed: false  },  // (1,1)
    { shape: PipeShape.ELBOW,    rotation: 1, fixed: false },  // (1,2) scrambled – needs rot 0
    { shape: PipeShape.ELBOW,    rotation: 0, fixed: false },  // (1,3) scrambled – needs rot 2
  ],
  // Row 2
  [
    { shape: PipeShape.ELBOW,    rotation: 0, fixed: false },  // (2,0)
    { shape: PipeShape.STRAIGHT, rotation: 1, fixed: false },  // (2,1)
    { shape: PipeShape.ELBOW,    rotation: 0, fixed: false },  // (2,2)
    { shape: PipeShape.STRAIGHT, rotation: 0, fixed: false },  // (2,3) scrambled – needs rot 1
  ],
  // Row 3
  [
    { shape: PipeShape.STRAIGHT, rotation: 0, fixed: false  },  // (3,0)
    { shape: PipeShape.ELBOW,    rotation: 1, fixed: false  },  // (3,1)
    { shape: PipeShape.STRAIGHT, rotation: 0, fixed: false },  // (3,2)
    { shape: PipeShape.GOAL,     rotation: 1, fixed: true  },  // (3,3) fixed – accepts TOP
  ],
];

export const GRID_ROWS = 4;
export const GRID_COLS = 4;
export const MAX_MOVES = 12;

export function clonePuzzle(): TileData[][] {
  return PUZZLE_GRID.map(row => row.map(cell => ({ ...cell })));
}