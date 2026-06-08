/**
 * PathSolver.ts
 * Generic BFS pipe-connection solver. Works for any grid configuration.
 */

import { TileData, PipeShape, SHAPE_OPENINGS, GRID_ROWS, GRID_COLS } from './PipeTypes';

/**
 * Returns [top, right, bottom, left] openings for a tile at its current rotation.
 * One CW rotation step: new[top]=old[left], new[right]=old[top],
 *                       new[bottom]=old[right], new[left]=old[bottom]
 */
export function getOpenings(tile: TileData): [boolean, boolean, boolean, boolean] {
  let arr = [...SHAPE_OPENINGS[tile.shape]] as [boolean, boolean, boolean, boolean];
  const rot = ((tile.rotation % 4) + 4) % 4;
  for (let i = 0; i < rot; i++) {
    arr = [arr[3], arr[0], arr[1], arr[2]];
  }
  return arr;
}

// [top, right, bottom, left]
const DIR_DELTA: [number, number][] = [[-1, 0], [0, 1], [1, 0], [0, -1]];
const OPPOSITE = [2, 3, 0, 1];

export interface SolveResult {
  connected: boolean;
  path: [number, number][];
}

export function solve(grid: TileData[][]): SolveResult {
  // Locate START
  let startR = -1, startC = -1;
  outer: for (let r = 0; r < GRID_ROWS; r++) {
    for (let c = 0; c < GRID_COLS; c++) {
      if (grid[r][c].shape === PipeShape.START) { startR = r; startC = c; break outer; }
    }
  }
  if (startR === -1) return { connected: false, path: [] };

  const visited = Array.from({ length: GRID_ROWS }, () => new Array(GRID_COLS).fill(false));
  const parent: ([number, number] | null)[][] =
    Array.from({ length: GRID_ROWS }, () => new Array(GRID_COLS).fill(null));

  const queue: [number, number][] = [[startR, startC]];
  visited[startR][startC] = true;

  while (queue.length > 0) {
    const [r, c] = queue.shift()!;
    const openings = getOpenings(grid[r][c]);

    for (let d = 0; d < 4; d++) {
      if (!openings[d]) continue;
      const nr = r + DIR_DELTA[d][0];
      const nc = c + DIR_DELTA[d][1];
      if (nr < 0 || nr >= GRID_ROWS || nc < 0 || nc >= GRID_COLS) continue;
      if (visited[nr][nc]) continue;
      // Neighbour must open back toward us
      if (!getOpenings(grid[nr][nc])[OPPOSITE[d]]) continue;

      visited[nr][nc] = true;
      parent[nr][nc] = [r, c];
      queue.push([nr, nc]);
    }
  }

  // Locate GOAL
  let goalR = -1, goalC = -1;
  outer: for (let r = 0; r < GRID_ROWS; r++) {
    for (let c = 0; c < GRID_COLS; c++) {
      if (grid[r][c].shape === PipeShape.GOAL) { goalR = r; goalC = c; break outer; }
    }
  }
  if (goalR === -1 || !visited[goalR][goalC]) return { connected: false, path: [] };

  // Reconstruct path from GOAL back to START
  const path: [number, number][] = [];
  let cur: [number, number] | null = [goalR, goalC];
  while (cur !== null) {
    path.unshift(cur);
    cur = parent[cur[0]][cur[1]];
  }

  return { connected: true, path };
}