# Pipe Rescue – Playable Ad

---

**Pipe Rescue** is a portrait-mode mobile playable ad where the player taps static pipe tiles to rotate them 90° per tap and connect the **Water Source (green)** to the **Goal (gold)** before running out of moves.

- **Grid:** 4 × 4 fixed puzzle
- **Move limit:** 12 moves
- **Win:** BFS path detection – auto-checks after every tap; pipes on the solved path glow green
- **Lose:** No moves remaining → Try Again
- **End card:** "You Fixed It!" / "Out of Moves!" with a **Play Now** CTA button

---

## AI / Tools Used

| Tool | Usage |
|------|-------|
| Claude (Anthropic) | Architecture planning, all TypeScript, BFS solver |
| Pillow (Python) | `generate_sprites.py` – procedurally generated all PNG sprite assets |
| Cocos Creator 3.8.7 | Scene setup, prefabs, build & export |

---

## Project Structure

```
pipe-rescue/
├── assets/
│   └── sprites/           ← all PNGs (run generate_sprites.py to recreate)
│       ├── background.png
│       ├── button_blue.png
│       ├── button_green.png
│       ├── pipe_empty.png
│       ├── pipe_straight.png 
│       ├── pipe_elbow.png    
│       ├── pipe_tee.png       
│       ├── pipe_cross.png     
│       ├── pipe_dead.png      
│       ├── pipe_start.png
│       └── pipe_goal.png
├── scripts/
│   ├── PipeTypes.ts       ← enums, puzzle data, SHAPE_OPENINGS table
│   ├── PathSolver.ts      ← generic BFS connection solver
│   ├── TileNode.ts        ← per-tile component (rotate on tap, sprite swap)
│   └── GameController.ts  ← main orchestrator (grid build, win/lose, UI)
|
├── generate_sprites.py    ← run once to regenerate PNGs
|
├── build/
|   └── pipe-rescue/
|       └── src/
|       ├── index.html     ← Run this file to play game
|
└── README.md
```

---

## How to Run (Cocos Creator)

1. Open the Project in Cocos Creator.
2. Open the Game Scene:
   - Once the editor is open, look at the Assets panel (bottom left area).
   - assets/
         game.scene    ← double-click this
3. Click the Play Button.
   - The Play button is in the top center toolbar of the editor.
   - Click ▶ Play.
4. It will **Run** the game in the browser.

---

## How to Run (VS Code)

1. Open project in vs code and run `npm install` in terminal.
2. Install the Live Server extension in VS Code.
3. Open the build/pipe-rescue folder in VS Code.
4. Right-click index.html → Open with Live Server.
5. Browser opens at http://127.0.0.1:5500/build/pipe-rescue/index.html .

---

## Known Issues / Limitations

- No audio (out of scope per PRD).
- No random level generation (single fixed puzzle as required).
- Sprite frames are procedurally generated PNGs – not hand-drawn pixel art.
- Play Now CTA logs to console only (no real store link as per PRD).

---

## What I'd Improve With More Time

- Animated water flow along the solved path (shader or frame animation).
- Multiple levels with increasing difficulty.
- Sound effects (water drip, success jingle).
- Polished hand-drawn sprite art.

---

## Cocos Creator Version

**Cocos Creator 3.8.7**
