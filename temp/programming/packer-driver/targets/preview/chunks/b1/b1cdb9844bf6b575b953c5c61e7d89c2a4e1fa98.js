System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, Label, Prefab, instantiate, SpriteFrame, Texture2D, resources, Sprite, UITransform, Color, tween, v3, size, GRID_ROWS, GRID_COLS, MAX_MOVES, clonePuzzle, TileNode, solve, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _crd, ccclass, property, TIMER_SECONDS, SPRITE_NAMES, GameController;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfTileData(extras) {
    _reporterNs.report("TileData", "./PipeTypes", _context.meta, extras);
  }

  function _reportPossibleCrUseOfGRID_ROWS(extras) {
    _reporterNs.report("GRID_ROWS", "./PipeTypes", _context.meta, extras);
  }

  function _reportPossibleCrUseOfGRID_COLS(extras) {
    _reporterNs.report("GRID_COLS", "./PipeTypes", _context.meta, extras);
  }

  function _reportPossibleCrUseOfMAX_MOVES(extras) {
    _reporterNs.report("MAX_MOVES", "./PipeTypes", _context.meta, extras);
  }

  function _reportPossibleCrUseOfclonePuzzle(extras) {
    _reporterNs.report("clonePuzzle", "./PipeTypes", _context.meta, extras);
  }

  function _reportPossibleCrUseOfTileNode(extras) {
    _reporterNs.report("TileNode", "./TileNode", _context.meta, extras);
  }

  function _reportPossibleCrUseOfsolve(extras) {
    _reporterNs.report("solve", "./PathSolver", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Node = _cc.Node;
      Label = _cc.Label;
      Prefab = _cc.Prefab;
      instantiate = _cc.instantiate;
      SpriteFrame = _cc.SpriteFrame;
      Texture2D = _cc.Texture2D;
      resources = _cc.resources;
      Sprite = _cc.Sprite;
      UITransform = _cc.UITransform;
      Color = _cc.Color;
      tween = _cc.tween;
      v3 = _cc.v3;
      size = _cc.size;
    }, function (_unresolved_2) {
      GRID_ROWS = _unresolved_2.GRID_ROWS;
      GRID_COLS = _unresolved_2.GRID_COLS;
      MAX_MOVES = _unresolved_2.MAX_MOVES;
      clonePuzzle = _unresolved_2.clonePuzzle;
    }, function (_unresolved_3) {
      TileNode = _unresolved_3.TileNode;
    }, function (_unresolved_4) {
      solve = _unresolved_4.solve;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "9a9c6D93PZBzYNvwp8K0BcM", "GameController", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Label', 'Prefab', 'instantiate', 'SpriteFrame', 'Texture2D', 'resources', 'Sprite', 'UITransform', 'Color', 'tween', 'v3', 'size']);

      ({
        ccclass,
        property
      } = _decorator);
      TIMER_SECONDS = 25;
      SPRITE_NAMES = ['pipe_empty', 'pipe_straight', 'pipe_elbow', 'pipe_tee', 'pipe_cross', 'pipe_dead', 'pipe_start', 'pipe_goal', 'pipe_straight_active', 'pipe_elbow_active', 'pipe_tee_active', 'pipe_cross_active', 'pipe_dead_active', 'button_blue', 'button_green', 'background'];

      _export("GameController", GameController = (_dec = ccclass('GameController'), _dec2 = property(Node), _dec3 = property(Label), _dec4 = property(Label), _dec5 = property(Label), _dec6 = property(Node), _dec7 = property(Label), _dec8 = property(Label), _dec9 = property(Prefab), _dec10 = property(Sprite), _dec(_class = (_class2 = class GameController extends Component {
        constructor() {
          super(...arguments);

          // ── Inspector slots ────────────────────────────────────────────────────────
          _initializerDefineProperty(this, "gridRoot", _descriptor, this);

          _initializerDefineProperty(this, "movesLabel", _descriptor2, this);

          _initializerDefineProperty(this, "timerLabel", _descriptor3, this);

          _initializerDefineProperty(this, "statusLabel", _descriptor4, this);

          _initializerDefineProperty(this, "endCard", _descriptor5, this);

          _initializerDefineProperty(this, "resultLabel", _descriptor6, this);

          _initializerDefineProperty(this, "subLabel", _descriptor7, this);

          _initializerDefineProperty(this, "tilePrefab", _descriptor8, this);

          _initializerDefineProperty(this, "backgroundSprite", _descriptor9, this);

          // ── Private state ──────────────────────────────────────────────────────────
          this._grid = [];
          this._tileNodes = [];
          this._movesLeft = _crd && MAX_MOVES === void 0 ? (_reportPossibleCrUseOfMAX_MOVES({
            error: Error()
          }), MAX_MOVES) : MAX_MOVES;
          this._timeLeft = TIMER_SECONDS;
          this._spriteFrames = new Map();
          this._gameOver = false;
        }

        // ── Lifecycle ──────────────────────────────────────────────────────────────
        onLoad() {
          this._loadSprites().then(() => this._startGame());
        }

        onDestroy() {
          this.unschedule(this._onTick);
        } // ── Sprite loading ─────────────────────────────────────────────────────────


        _loadSprites() {
          return new Promise(resolve => {
            var loaded = 0;
            SPRITE_NAMES.forEach(name => {
              resources.load("sprites/" + name + "/texture", Texture2D, (err, texture) => {
                if (!err && texture) {
                  var sf = new SpriteFrame();
                  sf.texture = texture;

                  this._spriteFrames.set(name, sf);

                  if (name === 'background' && this.backgroundSprite) {
                    this.backgroundSprite.spriteFrame = sf;
                  }
                } else {
                  console.warn("[PipeRescue] Failed to load: " + name, err);
                }

                if (++loaded === SPRITE_NAMES.length) resolve();
              });
            });
          });
        } // ── Game flow ──────────────────────────────────────────────────────────────


        _startGame() {
          this._grid = (_crd && clonePuzzle === void 0 ? (_reportPossibleCrUseOfclonePuzzle({
            error: Error()
          }), clonePuzzle) : clonePuzzle)();
          this._movesLeft = _crd && MAX_MOVES === void 0 ? (_reportPossibleCrUseOfMAX_MOVES({
            error: Error()
          }), MAX_MOVES) : MAX_MOVES;
          this._timeLeft = TIMER_SECONDS;
          this._gameOver = false;
          this.endCard.active = false;

          this._updateMovesLabel();

          this._updateTimerLabel();

          this._setStatus('Status : Not connected');

          this._buildGrid();

          this.unschedule(this._onTick);
          this.schedule(this._onTick, 1, TIMER_SECONDS - 1, 0);
        }

        _buildGrid() {
          this.gridRoot.removeAllChildren();
          this._tileNodes = [];
          var TILE_SIZE = 120;
          var GAP = 8;
          var totalW = (_crd && GRID_COLS === void 0 ? (_reportPossibleCrUseOfGRID_COLS({
            error: Error()
          }), GRID_COLS) : GRID_COLS) * (TILE_SIZE + GAP) - GAP;
          var totalH = (_crd && GRID_ROWS === void 0 ? (_reportPossibleCrUseOfGRID_ROWS({
            error: Error()
          }), GRID_ROWS) : GRID_ROWS) * (TILE_SIZE + GAP) - GAP;

          for (var r = 0; r < (_crd && GRID_ROWS === void 0 ? (_reportPossibleCrUseOfGRID_ROWS({
            error: Error()
          }), GRID_ROWS) : GRID_ROWS); r++) {
            this._tileNodes[r] = [];

            for (var c = 0; c < (_crd && GRID_COLS === void 0 ? (_reportPossibleCrUseOfGRID_COLS({
              error: Error()
            }), GRID_COLS) : GRID_COLS); c++) {
              var node = instantiate(this.tilePrefab);
              this.gridRoot.addChild(node);
              var x = c * (TILE_SIZE + GAP) - totalW / 2 + TILE_SIZE / 2;
              var y = -(r * (TILE_SIZE + GAP) - totalH / 2 + TILE_SIZE / 2);
              node.setPosition(v3(x, y, 0));
              var ut = node.getComponent(UITransform);
              if (ut) ut.setContentSize(size(TILE_SIZE, TILE_SIZE));
              var tc = node.getComponent(_crd && TileNode === void 0 ? (_reportPossibleCrUseOfTileNode({
                error: Error()
              }), TileNode) : TileNode);
              tc.spriteFrames = this._spriteFrames;
              tc.init(this._grid[r][c]);
              node.on('tile-rotated', this._onTileRotated, this);
              this._tileNodes[r][c] = tc;
            }
          }
        } // ── Timer tick ─────────────────────────────────────────────────────────────


        _onTick() {
          if (this._gameOver) return;
          this._timeLeft--;

          this._updateTimerLabel();

          if (this._timeLeft <= 0) {
            this.unschedule(this._onTick);

            this._lose('time');
          }
        } // ── Event handlers ─────────────────────────────────────────────────────────


        _onTileRotated(tc) {
          if (this._gameOver) return;

          for (var r = 0; r < (_crd && GRID_ROWS === void 0 ? (_reportPossibleCrUseOfGRID_ROWS({
            error: Error()
          }), GRID_ROWS) : GRID_ROWS); r++) {
            for (var c = 0; c < (_crd && GRID_COLS === void 0 ? (_reportPossibleCrUseOfGRID_COLS({
              error: Error()
            }), GRID_COLS) : GRID_COLS); c++) {
              if (this._tileNodes[r][c] === tc) {
                this._grid[r][c] = tc.tileData;
              }
            }
          }

          this._movesLeft--;

          this._updateMovesLabel();

          this._checkPath();
        }

        onCheckPath() {
          this._checkPath();
        }

        onPlayNow() {
          alert('[PipeRescue] Open Game in Browser');
        }

        onTryAgain() {
          this._startGame();
        } // ── Core logic ─────────────────────────────────────────────────────────────


        _checkPath() {
          var result = (_crd && solve === void 0 ? (_reportPossibleCrUseOfsolve({
            error: Error()
          }), solve) : solve)(this._grid);
          var pathSet = new Set(result.path.map(_ref => {
            var [r, c] = _ref;
            return r + "," + c;
          }));

          for (var r = 0; r < (_crd && GRID_ROWS === void 0 ? (_reportPossibleCrUseOfGRID_ROWS({
            error: Error()
          }), GRID_ROWS) : GRID_ROWS); r++) {
            for (var c = 0; c < (_crd && GRID_COLS === void 0 ? (_reportPossibleCrUseOfGRID_COLS({
              error: Error()
            }), GRID_COLS) : GRID_COLS); c++) {
              this._tileNodes[r][c].setActive(pathSet.has(r + "," + c));
            }
          }

          if (result.connected) {
            this._win();

            return;
          }

          if (this._movesLeft <= 0) {
            this._lose('moves');

            return;
          }

          this._setStatus('Status : Not connected');
        }

        _win() {
          this._gameOver = true;
          this.unschedule(this._onTick);

          this._setStatus('Connected!');

          this.scheduleOnce(() => this._showEndCard(true), 0.8);
        }

        _lose(reason) {
          this._gameOver = true;
          this.unschedule(this._onTick);

          this._setStatus(reason === 'time' ? 'Time is up!' : 'No moves left!');

          this.scheduleOnce(() => this._showEndCard(false, reason), 0.8);
        }

        _showEndCard(won, reason) {
          this.endCard.active = true;

          if (won) {
            this.resultLabel.string = 'You Fixed It!';
            this.subLabel.string = 'Puzzle complete! Water is flowing.';
          } else {
            this.resultLabel.string = reason === 'time' ? 'Time is Up!' : 'Out of Moves!';
            this.subLabel.string = 'The pipes are still broken. Try again?';
          }

          this.endCard.setScale(v3(0.8, 0.8, 1));
          tween(this.endCard).to(0.3, {
            scale: v3(1, 1, 1)
          }, {
            easing: 'backOut'
          }).start();
        } // ── Helpers ────────────────────────────────────────────────────────────────


        _updateMovesLabel() {
          if (!this.movesLabel) return;
          this.movesLabel.string = "Moves Left: " + this._movesLeft;
          this.movesLabel.color = this._movesLeft <= 3 ? new Color(255, 80, 80, 255) : new Color(255, 255, 255, 255);
        }

        _updateTimerLabel() {
          if (!this.timerLabel) return;
          this.timerLabel.string = "Time: " + this._timeLeft + "s";
          this.timerLabel.color = this._timeLeft <= 3 ? new Color(255, 80, 80, 255) : new Color(255, 220, 50, 255);
        }

        _setStatus(msg) {
          if (this.statusLabel) this.statusLabel.string = msg;
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "gridRoot", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "movesLabel", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "timerLabel", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "statusLabel", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "endCard", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "resultLabel", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "subLabel", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "tilePrefab", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "backgroundSprite", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=b1cdb9844bf6b575b953c5c61e7d89c2a4e1fa98.js.map