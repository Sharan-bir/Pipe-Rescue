import {
  _decorator, Component, Node, Label, Prefab,
  instantiate, SpriteFrame, Texture2D, resources,
  Sprite, UITransform, Color, tween, v3, size,
} from 'cc';

import { TileData, GRID_ROWS, GRID_COLS, MAX_MOVES, clonePuzzle } from './PipeTypes';
import { TileNode } from './TileNode';
import { solve } from './PathSolver';

const { ccclass, property } = _decorator;

const TIMER_SECONDS = 25;

const SPRITE_NAMES = [
  'pipe_empty', 'pipe_straight', 'pipe_elbow', 'pipe_tee',
  'pipe_cross',  'pipe_dead',    'pipe_start',  'pipe_goal',
  'pipe_straight_active', 'pipe_elbow_active', 'pipe_tee_active',
  'pipe_cross_active',    'pipe_dead_active',
  'button_blue', 'button_green', 'background',
];

@ccclass('GameController')
export class GameController extends Component {

  declare node:         Node;
  declare scheduleOnce: (callback: () => void, delay?: number) => void;
  declare schedule:     (callback: () => void, interval?: number, repeat?: number, delay?: number) => void;
  declare unschedule:   (callback: () => void) => void;

  // ── Inspector slots ────────────────────────────────────────────────────────

  @property(Node)   gridRoot:         Node   = null!;
  @property(Label)  movesLabel:       Label  = null!;
  @property(Label)  timerLabel:       Label  = null!;   
  @property(Label)  statusLabel:      Label  = null!;
  @property(Node)   endCard:          Node   = null!;
  @property(Label)  resultLabel:      Label  = null!;
  @property(Label)  subLabel:         Label  = null!;
  @property(Prefab) tilePrefab:       Prefab = null!;
  @property(Sprite) backgroundSprite: Sprite = null!;

  // ── Private state ──────────────────────────────────────────────────────────

  private _grid:         TileData[][]          = [];
  private _tileNodes:    TileNode[][]          = [];
  private _movesLeft:    number                = MAX_MOVES;
  private _timeLeft:     number                = TIMER_SECONDS;
  private _spriteFrames: Map<string, SpriteFrame> = new Map();
  private _gameOver:     boolean               = false;

  // ── Lifecycle ──────────────────────────────────────────────────────────────

  onLoad() {
    this._loadSprites().then(() => this._startGame());
  }

  onDestroy() {
    this.unschedule(this._onTick);
  }

  // ── Sprite loading ─────────────────────────────────────────────────────────

  private _loadSprites(): Promise<void> {
    return new Promise(resolve => {
      let loaded = 0;
      SPRITE_NAMES.forEach(name => {
        resources.load(`sprites/${name}/texture`, Texture2D, (err: Error | null, texture: Texture2D | null) => {
          if (!err && texture) {
            const sf = new SpriteFrame();
            sf.texture = texture;
            this._spriteFrames.set(name, sf);
            if (name === 'background' && this.backgroundSprite) {
              this.backgroundSprite.spriteFrame = sf;
            }
          } else {
            console.warn(`[PipeRescue] Failed to load: ${name}`, err);
          }
          if (++loaded === SPRITE_NAMES.length) resolve();
        });
      });
    });
  }

  // ── Game flow ──────────────────────────────────────────────────────────────

  private _startGame() {
    this._grid      = clonePuzzle();
    this._movesLeft = MAX_MOVES;
    this._timeLeft  = TIMER_SECONDS;
    this._gameOver  = false;

    this.endCard.active = false;
    this._updateMovesLabel();
    this._updateTimerLabel();
    this._setStatus('Status : Not connected');
    this._buildGrid();

    this.unschedule(this._onTick);
    this.schedule(this._onTick, 1, TIMER_SECONDS - 1, 0);
  }

  private _buildGrid() {
    this.gridRoot.removeAllChildren();
    this._tileNodes = [];

    const TILE_SIZE = 120;
    const GAP       = 8;
    const totalW    = GRID_COLS * (TILE_SIZE + GAP) - GAP;
    const totalH    = GRID_ROWS * (TILE_SIZE + GAP) - GAP;

    for (let r = 0; r < GRID_ROWS; r++) {
      this._tileNodes[r] = [];
      for (let c = 0; c < GRID_COLS; c++) {
        const node = instantiate(this.tilePrefab);
        this.gridRoot.addChild(node);

        const x = c * (TILE_SIZE + GAP) - totalW / 2 + TILE_SIZE / 2;
        const y = -(r * (TILE_SIZE + GAP) - totalH / 2 + TILE_SIZE / 2);
        node.setPosition(v3(x, y, 0));

        const ut = node.getComponent(UITransform);
        if (ut) ut.setContentSize(size(TILE_SIZE, TILE_SIZE));

        const tc = node.getComponent(TileNode)!;
        tc.spriteFrames = this._spriteFrames;
        tc.init(this._grid[r][c]);

        node.on('tile-rotated', this._onTileRotated, this);
        this._tileNodes[r][c] = tc;
      }
    }
  }

  // ── Timer tick ─────────────────────────────────────────────────────────────

  private _onTick() {
    if (this._gameOver) return;

    this._timeLeft--;
    this._updateTimerLabel();

    if (this._timeLeft <= 0) {
      this.unschedule(this._onTick);
      this._lose('time');
    }
  }

  // ── Event handlers ─────────────────────────────────────────────────────────

  private _onTileRotated(tc: TileNode) {
    if (this._gameOver) return;

    for (let r = 0; r < GRID_ROWS; r++) {
      for (let c = 0; c < GRID_COLS; c++) {
        if (this._tileNodes[r][c] === tc) {
          this._grid[r][c] = tc.tileData;
        }
      }
    }

    this._movesLeft--;
    this._updateMovesLabel();
    this._checkPath();
  }

  public onCheckPath() { this._checkPath(); }
  public onPlayNow()   { alert('[PipeRescue] Open Game in Browser'); }
  public onTryAgain()  { this._startGame(); }

  // ── Core logic ─────────────────────────────────────────────────────────────

  private _checkPath() {
    const result = solve(this._grid);

    const pathSet = new Set(result.path.map(([r, c]) => `${r},${c}`));
    for (let r = 0; r < GRID_ROWS; r++) {
      for (let c = 0; c < GRID_COLS; c++) {
        this._tileNodes[r][c].setActive(pathSet.has(`${r},${c}`));
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

  private _win() {
    this._gameOver = true;
    this.unschedule(this._onTick);
    this._setStatus('Connected!');
    this.scheduleOnce(() => this._showEndCard(true), 0.8);
  }

  private _lose(reason: 'moves' | 'time') {
    this._gameOver = true;
    this.unschedule(this._onTick);
    this._setStatus(reason === 'time' ? 'Time is up!' : 'No moves left!');
    this.scheduleOnce(() => this._showEndCard(false, reason), 0.8);
  }

  private _showEndCard(won: boolean, reason?: 'moves' | 'time') {
    this.endCard.active = true;

    if (won) {
      this.resultLabel.string = 'You Fixed It!';
      this.subLabel.string    = 'Puzzle complete! Water is flowing.';
    } else {
      this.resultLabel.string = reason === 'time' ? 'Time is Up!' : 'Out of Moves!';
      this.subLabel.string    = 'The pipes are still broken. Try again?';
    }

    this.endCard.setScale(v3(0.8, 0.8, 1));
    tween(this.endCard)
      .to(0.3, { scale: v3(1, 1, 1) }, { easing: 'backOut' })
      .start();
  }

  // ── Helpers ────────────────────────────────────────────────────────────────

  private _updateMovesLabel() {
    if (!this.movesLabel) return;
    this.movesLabel.string = `Moves Left: ${this._movesLeft}`;
    this.movesLabel.color  = this._movesLeft <= 3
      ? new Color(255, 80, 80, 255)
      : new Color(255, 255, 255, 255);
  }

  private _updateTimerLabel() {
    if (!this.timerLabel) return;
    this.timerLabel.string = `Time: ${this._timeLeft}s`;
    this.timerLabel.color  = this._timeLeft <= 3
      ? new Color(255, 80, 80, 255)
      : new Color(255, 220, 50, 255);   
  }

  private _setStatus(msg: string) {
    if (this.statusLabel) this.statusLabel.string = msg;
  }
}