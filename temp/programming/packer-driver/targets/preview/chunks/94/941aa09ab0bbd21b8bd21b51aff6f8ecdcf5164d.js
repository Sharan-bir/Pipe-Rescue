System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, Sprite, tween, PipeShape, _dec, _dec2, _class, _class2, _descriptor, _crd, ccclass, property, SPRITE_MAP, VISUAL_OFFSET, SPRITE_ACTIVE_MAP, TileNode;

  function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfPipeShape(extras) {
    _reporterNs.report("PipeShape", "./PipeTypes", _context.meta, extras);
  }

  function _reportPossibleCrUseOfTileData(extras) {
    _reporterNs.report("TileData", "./PipeTypes", _context.meta, extras);
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
      Sprite = _cc.Sprite;
      tween = _cc.tween;
    }, function (_unresolved_2) {
      PipeShape = _unresolved_2.PipeShape;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "e29a58CwDBItbNymJBXHVZp", "TileNode", undefined);
      /**
       * TileNode.ts
       * Component on each pipe tile — handles tap, rotation tween, and sprite swap.
       */


      __checkObsolete__(['_decorator', 'Component', 'Node', 'Sprite', 'SpriteFrame', 'EventTouch', 'tween']);

      ({
        ccclass,
        property
      } = _decorator);
      SPRITE_MAP = {
        [(_crd && PipeShape === void 0 ? (_reportPossibleCrUseOfPipeShape({
          error: Error()
        }), PipeShape) : PipeShape).EMPTY]: 'pipe_empty',
        [(_crd && PipeShape === void 0 ? (_reportPossibleCrUseOfPipeShape({
          error: Error()
        }), PipeShape) : PipeShape).STRAIGHT]: 'pipe_straight',
        [(_crd && PipeShape === void 0 ? (_reportPossibleCrUseOfPipeShape({
          error: Error()
        }), PipeShape) : PipeShape).ELBOW]: 'pipe_elbow',
        [(_crd && PipeShape === void 0 ? (_reportPossibleCrUseOfPipeShape({
          error: Error()
        }), PipeShape) : PipeShape).TEE]: 'pipe_tee',
        [(_crd && PipeShape === void 0 ? (_reportPossibleCrUseOfPipeShape({
          error: Error()
        }), PipeShape) : PipeShape).CROSS]: 'pipe_cross',
        [(_crd && PipeShape === void 0 ? (_reportPossibleCrUseOfPipeShape({
          error: Error()
        }), PipeShape) : PipeShape).DEAD]: 'pipe_dead',
        [(_crd && PipeShape === void 0 ? (_reportPossibleCrUseOfPipeShape({
          error: Error()
        }), PipeShape) : PipeShape).START]: 'pipe_start',
        [(_crd && PipeShape === void 0 ? (_reportPossibleCrUseOfPipeShape({
          error: Error()
        }), PipeShape) : PipeShape).GOAL]: 'pipe_goal'
      }; // Visual-only angle offset per shape (does NOT affect BFS logic)

      VISUAL_OFFSET = {
        [(_crd && PipeShape === void 0 ? (_reportPossibleCrUseOfPipeShape({
          error: Error()
        }), PipeShape) : PipeShape).START]: 2,
        [(_crd && PipeShape === void 0 ? (_reportPossibleCrUseOfPipeShape({
          error: Error()
        }), PipeShape) : PipeShape).GOAL]: 1
      };
      SPRITE_ACTIVE_MAP = {
        [(_crd && PipeShape === void 0 ? (_reportPossibleCrUseOfPipeShape({
          error: Error()
        }), PipeShape) : PipeShape).EMPTY]: 'pipe_empty',
        [(_crd && PipeShape === void 0 ? (_reportPossibleCrUseOfPipeShape({
          error: Error()
        }), PipeShape) : PipeShape).STRAIGHT]: 'pipe_straight_active',
        [(_crd && PipeShape === void 0 ? (_reportPossibleCrUseOfPipeShape({
          error: Error()
        }), PipeShape) : PipeShape).ELBOW]: 'pipe_elbow_active',
        [(_crd && PipeShape === void 0 ? (_reportPossibleCrUseOfPipeShape({
          error: Error()
        }), PipeShape) : PipeShape).TEE]: 'pipe_tee_active',
        [(_crd && PipeShape === void 0 ? (_reportPossibleCrUseOfPipeShape({
          error: Error()
        }), PipeShape) : PipeShape).CROSS]: 'pipe_cross_active',
        [(_crd && PipeShape === void 0 ? (_reportPossibleCrUseOfPipeShape({
          error: Error()
        }), PipeShape) : PipeShape).DEAD]: 'pipe_dead_active',
        [(_crd && PipeShape === void 0 ? (_reportPossibleCrUseOfPipeShape({
          error: Error()
        }), PipeShape) : PipeShape).START]: 'pipe_start',
        [(_crd && PipeShape === void 0 ? (_reportPossibleCrUseOfPipeShape({
          error: Error()
        }), PipeShape) : PipeShape).GOAL]: 'pipe_goal'
      };

      _export("TileNode", TileNode = (_dec = ccclass('TileNode'), _dec2 = property(Sprite), _dec(_class = (_class2 = class TileNode extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "sprite", _descriptor, this);

          // Injected by GameController after sprite loading
          this.spriteFrames = new Map();
          this._data = {
            shape: (_crd && PipeShape === void 0 ? (_reportPossibleCrUseOfPipeShape({
              error: Error()
            }), PipeShape) : PipeShape).EMPTY,
            rotation: 0,
            fixed: true
          };
          this._isAnimating = false;
          this._isActive = false;
        }

        onLoad() {
          this.node.on(Node.EventType.TOUCH_END, this._onTap, this);
        }

        onDestroy() {
          this.node.off(Node.EventType.TOUCH_END, this._onTap, this);
        }

        init(data) {
          var _VISUAL_OFFSET$this$_;

          this._data = _extends({}, data);
          this._isActive = false;
          var visualOffset = (_VISUAL_OFFSET$this$_ = VISUAL_OFFSET[this._data.shape]) != null ? _VISUAL_OFFSET$this$_ : 0;
          this.node.angle = -(this._data.rotation + visualOffset) * 90;

          this._applySprite();
        }

        get tileData() {
          return _extends({}, this._data);
        }

        setActive(active) {
          if (this._isActive === active) return;
          this._isActive = active;

          this._applySprite();
        }

        _onTap(_e) {
          if (this._data.fixed || this._isAnimating) return;
          if (this._data.shape === (_crd && PipeShape === void 0 ? (_reportPossibleCrUseOfPipeShape({
            error: Error()
          }), PipeShape) : PipeShape).EMPTY) return;
          this._isAnimating = true;
          var targetAngle = this.node.angle - 90;
          tween(this.node).to(0.18, {
            angle: targetAngle
          }, {
            easing: 'quadOut'
          }).call(() => {
            this._data.rotation = (this._data.rotation + 1) % 4;
            this._isAnimating = false;
            this.node.emit('tile-rotated', this);
          }).start();
        }

        _applySprite() {
          var map = this._isActive ? SPRITE_ACTIVE_MAP : SPRITE_MAP;
          var frame = this.spriteFrames.get(map[this._data.shape]);

          if (frame && this.sprite) {
            this.sprite.spriteFrame = frame;
          }
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "sprite", [_dec2], {
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
//# sourceMappingURL=941aa09ab0bbd21b8bd21b51aff6f8ecdcf5164d.js.map