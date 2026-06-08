System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, PipeShape, SHAPE_OPENINGS, GRID_ROWS, GRID_COLS, _crd, DIR_DELTA, OPPOSITE;

  /**
   * Returns [top, right, bottom, left] openings for a tile at its current rotation.
   * One CW rotation step: new[top]=old[left], new[right]=old[top],
   *                       new[bottom]=old[right], new[left]=old[bottom]
   */
  function getOpenings(tile) {
    var arr = [...(_crd && SHAPE_OPENINGS === void 0 ? (_reportPossibleCrUseOfSHAPE_OPENINGS({
      error: Error()
    }), SHAPE_OPENINGS) : SHAPE_OPENINGS)[tile.shape]];
    var rot = (tile.rotation % 4 + 4) % 4;

    for (var i = 0; i < rot; i++) {
      arr = [arr[3], arr[0], arr[1], arr[2]];
    }

    return arr;
  } // [top, right, bottom, left]


  function solve(grid) {
    // Locate START
    var startR = -1,
        startC = -1;

    outer: for (var r = 0; r < (_crd && GRID_ROWS === void 0 ? (_reportPossibleCrUseOfGRID_ROWS({
      error: Error()
    }), GRID_ROWS) : GRID_ROWS); r++) {
      for (var c = 0; c < (_crd && GRID_COLS === void 0 ? (_reportPossibleCrUseOfGRID_COLS({
        error: Error()
      }), GRID_COLS) : GRID_COLS); c++) {
        if (grid[r][c].shape === (_crd && PipeShape === void 0 ? (_reportPossibleCrUseOfPipeShape({
          error: Error()
        }), PipeShape) : PipeShape).START) {
          startR = r;
          startC = c;
          break outer;
        }
      }
    }

    if (startR === -1) return {
      connected: false,
      path: []
    };
    var visited = Array.from({
      length: _crd && GRID_ROWS === void 0 ? (_reportPossibleCrUseOfGRID_ROWS({
        error: Error()
      }), GRID_ROWS) : GRID_ROWS
    }, () => new Array(_crd && GRID_COLS === void 0 ? (_reportPossibleCrUseOfGRID_COLS({
      error: Error()
    }), GRID_COLS) : GRID_COLS).fill(false));
    var parent = Array.from({
      length: _crd && GRID_ROWS === void 0 ? (_reportPossibleCrUseOfGRID_ROWS({
        error: Error()
      }), GRID_ROWS) : GRID_ROWS
    }, () => new Array(_crd && GRID_COLS === void 0 ? (_reportPossibleCrUseOfGRID_COLS({
      error: Error()
    }), GRID_COLS) : GRID_COLS).fill(null));
    var queue = [[startR, startC]];
    visited[startR][startC] = true;

    while (queue.length > 0) {
      var [_r, _c] = queue.shift();
      var openings = getOpenings(grid[_r][_c]);

      for (var d = 0; d < 4; d++) {
        if (!openings[d]) continue;
        var nr = _r + DIR_DELTA[d][0];
        var nc = _c + DIR_DELTA[d][1];
        if (nr < 0 || nr >= (_crd && GRID_ROWS === void 0 ? (_reportPossibleCrUseOfGRID_ROWS({
          error: Error()
        }), GRID_ROWS) : GRID_ROWS) || nc < 0 || nc >= (_crd && GRID_COLS === void 0 ? (_reportPossibleCrUseOfGRID_COLS({
          error: Error()
        }), GRID_COLS) : GRID_COLS)) continue;
        if (visited[nr][nc]) continue; // Neighbour must open back toward us

        if (!getOpenings(grid[nr][nc])[OPPOSITE[d]]) continue;
        visited[nr][nc] = true;
        parent[nr][nc] = [_r, _c];
        queue.push([nr, nc]);
      }
    } // Locate GOAL


    var goalR = -1,
        goalC = -1;

    outer: for (var _r2 = 0; _r2 < (_crd && GRID_ROWS === void 0 ? (_reportPossibleCrUseOfGRID_ROWS({
      error: Error()
    }), GRID_ROWS) : GRID_ROWS); _r2++) {
      for (var _c2 = 0; _c2 < (_crd && GRID_COLS === void 0 ? (_reportPossibleCrUseOfGRID_COLS({
        error: Error()
      }), GRID_COLS) : GRID_COLS); _c2++) {
        if (grid[_r2][_c2].shape === (_crd && PipeShape === void 0 ? (_reportPossibleCrUseOfPipeShape({
          error: Error()
        }), PipeShape) : PipeShape).GOAL) {
          goalR = _r2;
          goalC = _c2;
          break outer;
        }
      }
    }

    if (goalR === -1 || !visited[goalR][goalC]) return {
      connected: false,
      path: []
    }; // Reconstruct path from GOAL back to START

    var path = [];
    var cur = [goalR, goalC];

    while (cur !== null) {
      path.unshift(cur);
      cur = parent[cur[0]][cur[1]];
    }

    return {
      connected: true,
      path
    };
  }

  function _reportPossibleCrUseOfTileData(extras) {
    _reporterNs.report("TileData", "./PipeTypes", _context.meta, extras);
  }

  function _reportPossibleCrUseOfPipeShape(extras) {
    _reporterNs.report("PipeShape", "./PipeTypes", _context.meta, extras);
  }

  function _reportPossibleCrUseOfSHAPE_OPENINGS(extras) {
    _reporterNs.report("SHAPE_OPENINGS", "./PipeTypes", _context.meta, extras);
  }

  function _reportPossibleCrUseOfGRID_ROWS(extras) {
    _reporterNs.report("GRID_ROWS", "./PipeTypes", _context.meta, extras);
  }

  function _reportPossibleCrUseOfGRID_COLS(extras) {
    _reporterNs.report("GRID_COLS", "./PipeTypes", _context.meta, extras);
  }

  _export({
    getOpenings: getOpenings,
    solve: solve
  });

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
    }, function (_unresolved_2) {
      PipeShape = _unresolved_2.PipeShape;
      SHAPE_OPENINGS = _unresolved_2.SHAPE_OPENINGS;
      GRID_ROWS = _unresolved_2.GRID_ROWS;
      GRID_COLS = _unresolved_2.GRID_COLS;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "a4cb2kHDiBKyoWckWAwnli7", "PathSolver", undefined);
      /**
       * PathSolver.ts
       * Generic BFS pipe-connection solver. Works for any grid configuration.
       */


      DIR_DELTA = [[-1, 0], [0, 1], [1, 0], [0, -1]];
      OPPOSITE = [2, 3, 0, 1];

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=c317220dfd36e71748660dc551d8313c8e627eeb.js.map