System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _crd, PipeShape, SHAPE_OPENINGS, PUZZLE_GRID, GRID_ROWS, GRID_COLS, MAX_MOVES;

  function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

  function clonePuzzle() {
    return PUZZLE_GRID.map(row => row.map(cell => _extends({}, cell)));
  }

  _export("clonePuzzle", clonePuzzle);

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "12e96pBaOhJxYhG+t4tgMs5", "PipeTypes", undefined);

      _export("PipeShape", PipeShape = /*#__PURE__*/function (PipeShape) {
        PipeShape["EMPTY"] = "empty";
        PipeShape["STRAIGHT"] = "straight";
        PipeShape["ELBOW"] = "elbow";
        PipeShape["TEE"] = "tee";
        PipeShape["CROSS"] = "cross";
        PipeShape["DEAD"] = "dead";
        PipeShape["START"] = "start";
        PipeShape["GOAL"] = "goal";
        return PipeShape;
      }({}));
      /**
       * Openings at rotation 0: [top, right, bottom, left]
       *
       * START  → emits RIGHT only  (rot 2 = opens right)
       * GOAL   → accepts TOP only  (rot 2 = opens top  ← fixed at rot 1 in puzzle)
       */


      _export("SHAPE_OPENINGS", SHAPE_OPENINGS = {
        [PipeShape.EMPTY]: [false, false, false, false],
        [PipeShape.STRAIGHT]: [false, true, false, true],
        // horizontal: L+R
        [PipeShape.ELBOW]: [true, true, false, false],
        // T+R
        [PipeShape.TEE]: [false, true, true, true],
        // R+B+L
        [PipeShape.CROSS]: [true, true, true, true],
        [PipeShape.DEAD]: [true, false, false, false],
        // T only
        [PipeShape.START]: [false, true, false, false],
        // emits RIGHT
        [PipeShape.GOAL]: [false, false, false, true] // accepts LEFT at rot 0

      });

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
      _export("PUZZLE_GRID", PUZZLE_GRID = [// Row 0
      [{
        shape: PipeShape.START,
        rotation: 0,
        fixed: true
      }, // (0,0) fixed – emits RIGHT
      {
        shape: PipeShape.STRAIGHT,
        rotation: 1,
        fixed: false
      }, // (0,1) scrambled – needs rot 0
      {
        shape: PipeShape.ELBOW,
        rotation: 0,
        fixed: false
      }, // (0,2) scrambled – needs rot 2
      {
        shape: PipeShape.ELBOW,
        rotation: 2,
        fixed: false
      } // (0,3)
      ], // Row 1
      [{
        shape: PipeShape.STRAIGHT,
        rotation: 0,
        fixed: false
      }, // (1,0)
      {
        shape: PipeShape.ELBOW,
        rotation: 0,
        fixed: false
      }, // (1,1)
      {
        shape: PipeShape.ELBOW,
        rotation: 1,
        fixed: false
      }, // (1,2) scrambled – needs rot 0
      {
        shape: PipeShape.ELBOW,
        rotation: 0,
        fixed: false
      } // (1,3) scrambled – needs rot 2
      ], // Row 2
      [{
        shape: PipeShape.ELBOW,
        rotation: 0,
        fixed: false
      }, // (2,0)
      {
        shape: PipeShape.STRAIGHT,
        rotation: 1,
        fixed: false
      }, // (2,1)
      {
        shape: PipeShape.ELBOW,
        rotation: 0,
        fixed: false
      }, // (2,2)
      {
        shape: PipeShape.STRAIGHT,
        rotation: 0,
        fixed: false
      } // (2,3) scrambled – needs rot 1
      ], // Row 3
      [{
        shape: PipeShape.STRAIGHT,
        rotation: 0,
        fixed: false
      }, // (3,0)
      {
        shape: PipeShape.ELBOW,
        rotation: 1,
        fixed: false
      }, // (3,1)
      {
        shape: PipeShape.STRAIGHT,
        rotation: 0,
        fixed: false
      }, // (3,2)
      {
        shape: PipeShape.GOAL,
        rotation: 1,
        fixed: true
      } // (3,3) fixed – accepts TOP
      ]]);

      _export("GRID_ROWS", GRID_ROWS = 4);

      _export("GRID_COLS", GRID_COLS = 4);

      _export("MAX_MOVES", MAX_MOVES = 12);

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=c6803c1d694fd907065b019bc662797acf6095b6.js.map