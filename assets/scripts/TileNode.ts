/**
 * TileNode.ts
 * Component on each pipe tile — handles tap, rotation tween, and sprite swap.
 */

import {
  _decorator, Component, Node, Sprite, SpriteFrame,
  EventTouch, tween,
} from 'cc';

import { PipeShape, TileData } from './PipeTypes';

const { ccclass, property } = _decorator;

const SPRITE_MAP: Record<PipeShape, string> = {
  [PipeShape.EMPTY]:    'pipe_empty',
  [PipeShape.STRAIGHT]: 'pipe_straight',
  [PipeShape.ELBOW]:    'pipe_elbow',
  [PipeShape.TEE]:      'pipe_tee',
  [PipeShape.CROSS]:    'pipe_cross',
  [PipeShape.DEAD]:     'pipe_dead',
  [PipeShape.START]:    'pipe_start',
  [PipeShape.GOAL]:     'pipe_goal',
};

// Visual-only angle offset per shape (does NOT affect BFS logic)
const VISUAL_OFFSET: Partial<Record<PipeShape, number>> = {
  [PipeShape.START]: 2,   
  [PipeShape.GOAL]:  1,  
};

const SPRITE_ACTIVE_MAP: Record<PipeShape, string> = {
  [PipeShape.EMPTY]:    'pipe_empty',
  [PipeShape.STRAIGHT]: 'pipe_straight_active',
  [PipeShape.ELBOW]:    'pipe_elbow_active',
  [PipeShape.TEE]:      'pipe_tee_active',
  [PipeShape.CROSS]:    'pipe_cross_active',
  [PipeShape.DEAD]:     'pipe_dead_active',
  [PipeShape.START]:    'pipe_start',
  [PipeShape.GOAL]:     'pipe_goal',
};

@ccclass('TileNode')
export class TileNode extends Component {

  declare node: Node;
  @property(Sprite)
  sprite: Sprite = null!;

  // Injected by GameController after sprite loading
  public spriteFrames: Map<string, SpriteFrame> = new Map();

  private _data: TileData = { shape: PipeShape.EMPTY, rotation: 0, fixed: true };
  private _isAnimating = false;
  private _isActive = false;

  onLoad() {
    this.node.on(Node.EventType.TOUCH_END, this._onTap, this);
  }

  onDestroy() {
    this.node.off(Node.EventType.TOUCH_END, this._onTap, this);
  }

  init(data: TileData) {
    this._data = { ...data };
    this._isActive = false;
    const visualOffset = VISUAL_OFFSET[this._data.shape] ?? 0;
    this.node.angle = -(this._data.rotation + visualOffset) * 90;
    this._applySprite();
  }

  get tileData(): TileData {
    return { ...this._data };
  }

  setActive(active: boolean) {
    if (this._isActive === active) return;
    this._isActive = active;
    this._applySprite();
  }

  private _onTap(_e: EventTouch) {
  if (this._data.fixed || this._isAnimating) return;
  if (this._data.shape === PipeShape.EMPTY) return;

  this._isAnimating = true;
  const targetAngle = this.node.angle - 90;  

  tween(this.node)
    .to(0.18, { angle: targetAngle }, { easing: 'quadOut' })
    .call(() => {
      this._data.rotation = (this._data.rotation + 1) % 4;
      this._isAnimating = false;
      this.node.emit('tile-rotated', this);
    })
    .start();
}

  private _applySprite() {
    const map = this._isActive ? SPRITE_ACTIVE_MAP : SPRITE_MAP;
    const frame = this.spriteFrames.get(map[this._data.shape]);
    if (frame && this.sprite) {
      this.sprite.spriteFrame = frame;
    }
  }
}