// app/api/youtube/latest/route.ts

import { NextResponse } from "next/server";

const YT_API_KEY = process.env.YOUTUBE_API_KEY!;
const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID!;

// HTML entity decoder (fixes &#39; &quot; etc)
function decode(html: string) {
  return html
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#8203;/g, "") // invisible zero-width chars YouTube sometimes sends
    .trim();
}

export async function GET() {
  try {
    const url = `https://www.googleapis.com/youtube/v3/search?key=${YT_API_KEY}&channelId=${CHANNEL_ID}&part=snippet&order=date&maxResults=12`;

    const res = await fetch(url);
    const data = await res.json();

    if (!data.items) {
      return NextResponse.json({ videos: [] });
    }

    const videos = data.items
      .filter((item: any) => item.id.videoId) // ignore playlists or weird items
      .map((item: any) => ({
        id: item.id.videoId,
        title: decode(item.snippet.title),
        desc: decode(item.snippet.description),
        thumbnail: item.snippet.thumbnails?.medium?.url,
        url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
      }));

    return NextResponse.json({ videos });
  } catch (error) {
    console.error("YouTube API Error:", error);
    return NextResponse.json({ videos: [] });
  }
}
