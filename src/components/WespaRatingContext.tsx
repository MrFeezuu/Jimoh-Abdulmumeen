"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { PLAYER } from "../data/player";

export type WespaRatingData = {
  rating: number;
  rank: number | null;
  games: number | null;
  lastPlayed: string | null;
  fetchedAt: string | null;
  live: boolean;
};

const FALLBACK: WespaRatingData = {
  rating: PLAYER.rating,
  rank: 16,
  games: PLAYER.gamesPlayed,
  lastPlayed: null,
  fetchedAt: null,
  live: false,
};

const WespaRatingContext = createContext<WespaRatingData>(FALLBACK);

export function WespaRatingProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<WespaRatingData>(FALLBACK);

  useEffect(() => {
    let active = true;

    async function refresh() {
      try {
        const response = await fetch("/api/wespa-rating", { cache: "no-store" });
        if (!response.ok) throw new Error(`WESPA request failed: ${response.status}`);
        const next = (await response.json()) as WespaRatingData;
        if (active) setData(next);
      } catch {
        if (active) setData((current) => ({ ...current, live: false }));
      }
    }

    void refresh();
    const id = window.setInterval(refresh, 60_000);
    return () => {
      active = false;
      window.clearInterval(id);
    };
  }, []);

  return <WespaRatingContext.Provider value={data}>{children}</WespaRatingContext.Provider>;
}

export function useWespaRating() {
  return useContext(WespaRatingContext);
}
