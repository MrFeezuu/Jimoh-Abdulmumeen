import { useState } from "react";
import { TILE_VALUES } from "../data/player";

const RACK_LETTERS = ["A", "R", "T", "E", "S", "N", "O"];

type TileState = {
  letter: string;
  id: number;
  placed: boolean;
};

export default function ScrabbleBoard() {
  const [tiles, setTiles] = useState<TileState[]>(
    RACK_LETTERS.map((l, i) => ({ letter: l, id: i, placed: false }))
  );
  const [boardSlots, setBoardSlots] = useState<(number | null)[]>(Array(7).fill(null));
  const [celebrated, setCelebrated] = useState(false);
  const [message, setMessage] = useState("");

  const placedTileIds = boardSlots.filter((s) => s !== null) as number[];
  const score = placedTileIds.reduce((sum, id) => sum + (TILE_VALUES[tiles[id].letter] ?? 0), 0);
  const allPlaced = boardSlots.every((s) => s !== null);

  function placeOnBoard(tileId: number) {
    if (tiles[tileId].placed) return;
    const emptySlot = boardSlots.findIndex((s) => s === null);
    if (emptySlot === -1) return;
    const newSlots = [...boardSlots];
    newSlots[emptySlot] = tileId;
    setBoardSlots(newSlots);
    setTiles((prev) => prev.map((t) => t.id === tileId ? { ...t, placed: true } : t));

    if (newSlots.every((s) => s !== null)) {
      const finalScore = newSlots.reduce(
        (sum, id) => sum + (id !== null ? TILE_VALUES[tiles[id].letter] ?? 0 : 0), 0
      ) + 50;
      setCelebrated(true);
      setMessage(`NICE MOVE! +50 Bingo bonus = ${finalScore} pts`);
    }
  }

  function removeFromSlot(slotIdx: number) {
    const tileId = boardSlots[slotIdx];
    if (tileId === null) return;
    const newSlots = [...boardSlots];
    newSlots[slotIdx] = null;
    setBoardSlots(newSlots);
    setTiles((prev) => prev.map((t) => t.id === tileId ? { ...t, placed: false } : t));
    setCelebrated(false);
    setMessage("");
  }

  function reset() {
    setTiles(RACK_LETTERS.map((l, i) => ({ letter: l, id: i, placed: false })));
    setBoardSlots(Array(7).fill(null));
    setCelebrated(false);
    setMessage("");
  }

  return (
    <section id="play" style={{ background: "var(--bg)" }} className="py-24">
      <div className="max-w-4xl mx-auto px-6">

        <div className="flex items-center gap-4 mb-4">
          <div className="h-px flex-1" style={{ background: "var(--border)" }} />
          <span className="text-xs tracking-[.3em] uppercase" style={{ color: "var(--gold)" }}>
            Interactive
          </span>
          <div className="h-px flex-1" style={{ background: "var(--border)" }} />
        </div>

        <h2
          className="text-center text-3xl sm:text-4xl font-black mb-3"
          style={{ fontFamily: "var(--font-display)", color: "var(--cream)" }}
        >
          MAKE YOUR MOVE
        </h2>
        <p className="text-center text-sm mb-12" style={{ color: "var(--muted)" }}>
          Tap tiles from the rack to place them on the board. Fill all 7 for a bingo!
        </p>

        {/* Board */}
        <div className="mb-6">
          <p className="text-xs tracking-widest uppercase mb-3 text-center" style={{ color: "var(--muted)" }}>
            Board
          </p>
          <div className="flex justify-center gap-2 flex-wrap">
            {boardSlots.map((tileId, slotIdx) => (
              <button
                key={slotIdx}
                onClick={() => tileId !== null && removeFromSlot(slotIdx)}
                aria-label={tileId !== null ? `Remove ${tiles[tileId].letter}` : `Empty slot ${slotIdx + 1}`}
                className="relative transition-all duration-300"
                style={{
                  width: 52, height: 52,
                  border: `2px solid ${tileId !== null ? "rgba(212,160,23,.6)" : "rgba(212,160,23,.2)"}`,
                  borderRadius: "var(--radius)",
                  background: tileId !== null ? "transparent" : "rgba(212,160,23,.04)",
                  cursor: tileId !== null ? "pointer" : "default",
                }}
              >
                {tileId !== null && (
                  <div
                    className={`scrabble-tile w-full h-full flex items-center justify-center text-xl font-black ${celebrated ? "celebrate" : ""}`}
                  >
                    {tiles[tileId].letter}
                    <span className="tile-value">{TILE_VALUES[tiles[tileId].letter]}</span>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Score */}
        <div className="text-center mb-8">
          <div
            className="text-4xl font-black transition-all duration-500"
            style={{ fontFamily: "var(--font-display)", color: allPlaced ? "var(--gold-lt)" : "var(--muted)" }}
          >
            {score}{allPlaced ? " + 50" : ""}
          </div>
          <div className="text-xs tracking-widest uppercase mt-1" style={{ color: "var(--muted)" }}>
            {allPlaced ? "Base + Bingo bonus" : "Score"}
          </div>
        </div>

        {/* Celebration message */}
        {message && (
          <div
            className="text-center py-4 mb-8 text-sm font-bold tracking-widest uppercase"
            style={{
              color: "var(--gold)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius)",
              background: "var(--gold-dim)",
              animation: "fadeUp .4s ease both",
            }}
          >
            {message}
          </div>
        )}

        {/* Rack */}
        <div>
          <p className="text-xs tracking-widest uppercase mb-3 text-center" style={{ color: "var(--muted)" }}>
            Tile Rack
          </p>
          <div className="flex justify-center gap-2 flex-wrap">
            {tiles.map((tile) => (
              <button
                key={tile.id}
                onClick={() => placeOnBoard(tile.id)}
                disabled={tile.placed}
                aria-label={`Place tile ${tile.letter}`}
                className="transition-all duration-200"
                style={{
                  opacity: tile.placed ? 0.25 : 1,
                  transform: tile.placed ? "scale(.9)" : "scale(1)",
                  cursor: tile.placed ? "not-allowed" : "pointer",
                }}
                onMouseEnter={(e) => {
                  if (!tile.placed) (e.currentTarget as HTMLElement).style.transform = "scale(1.1) translateY(-3px)";
                }}
                onMouseLeave={(e) => {
                  if (!tile.placed) (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                }}
              >
                <div className="scrabble-tile w-12 h-12 flex items-center justify-center text-xl font-black">
                  {tile.letter}
                  <span className="tile-value">{TILE_VALUES[tile.letter]}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Reset */}
        <div className="text-center mt-8">
          <button
            onClick={reset}
            className="text-xs tracking-widest uppercase px-5 py-2 transition-colors"
            style={{
              border: "1px solid var(--border)",
              color: "var(--muted)",
              borderRadius: "var(--radius)",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--cream)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--muted)"; }}
          >
            Reset
          </button>
        </div>
      </div>
    </section>
  );
}
