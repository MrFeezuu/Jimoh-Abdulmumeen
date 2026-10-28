const WESPA_SOURCE = "https://wespa.xerafin.net/latest.txt";
const PLAYER_CODE = "JABD";
const FALLBACK_RATING = 2063;

type ParsedPlayer = {
  rating: number;
  rank: number;
  games: number;
  lastPlayed: string;
};

function parsePlayer(source: string): ParsedPlayer | null {
  const rows = source.split(/\r?\n/).slice(1).filter(Boolean);
  const rowIndex = rows.findIndex((row) => row.startsWith(PLAYER_CODE));
  if (rowIndex < 0) return null;

  const row = rows[rowIndex];
  const match = row.match(
    /^(.{4})\s(.{3})\s(.+?)\s+(\d+)\s+(\d+)\s+(\d{8})\s+\d+\s+(?:GM|IM|M|--)\s+(?:\*+|--)\s*$/,
  );
  if (!match) return null;

  return {
    games: Number(match[4]),
    rating: Number(match[5]),
    lastPlayed: match[6],
    rank: rowIndex + 1,
  };
}

export async function GET() {
  try {
    const response = await fetch(WESPA_SOURCE, {
      cache: "no-store",
      headers: { "User-Agent": "Jimoh-Abdulmumin-Portfolio/1.0" },
    });
    if (!response.ok) throw new Error(`WESPA returned ${response.status}`);

    const player = parsePlayer(await response.text());
    if (!player) throw new Error("JABD was not found in the WESPA rankings");

    return Response.json(
      {
        ...player,
        fetchedAt: new Date().toISOString(),
        live: true,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        },
      },
    );
  } catch {
    return Response.json(
      {
        rating: FALLBACK_RATING,
        rank: null,
        games: null,
        lastPlayed: null,
        fetchedAt: new Date().toISOString(),
        live: false,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=30, stale-while-revalidate=120",
        },
      },
    );
  }
}
