
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Youtube, MessageCircle, ShoppingBag } from 'lucide-react';

export default function App() {
  const [videos, setVideos] = useState([]);

useEffect(() => {
  const API_KEY = "AIzaSyD8QL2961Li4D2ukKB2m2j82ApE61ZPMVc";
  const CHANNEL_ID = "UCHDV6VtXNvCvqZcyaSsaDcw";

  fetch(
    `https://www.googleapis.com/youtube/v3/search?key=${AIzaSyD8QL2961Li4D2ukKB2m2j82ApE61ZPMVc}&channelId=${UCHDV6VtXNvCvqZcyaSsaDcw}&part=snippet,id&order=date&maxResults=6`
  )
    .then((res) => res.json())
    .then((data) => {
      const vids = data.items
        .filter((item) => item.id.videoId)
        .map((item) => ({
          title: item.snippet.title,
          link: `https://youtube.com/watch?v=${item.id.videoId}`,
          thumbnail: item.snippet.thumbnails.high.url,
        }));

      setVideos(vids);
    })
    .catch(console.error);
}, []);

  return <div className="bg-black text-white min-h-screen">
    <section className="h-screen flex flex-col justify-center items-center text-center bg-gradient-to-b from-black via-red-950 to-black">
      <motion.img src="/super-joshy.png" className="w-72 rounded-3xl shadow-2xl mb-8 border border-red-600/40"
      initial={{ opacity: 0, scale: 0.7, y: 100 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1.2 }} />

      <motion.h1 className="text-7xl font-black bg-gradient-to-r from-white via-red-500 to-white bg-clip-text text-transparent"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}>
        Goofy Gang
      </motion.h1>

      <p className="text-2xl mt-4 text-gray-300">
        Late Nights. Dumb Ideas. Great Stories.
      </p>
    </section>

    <section className="py-40 px-10 text-center">
      <h2 className="text-5xl mb-12 font-bold">Latest Videos</h2>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        {videos.map((v, i) => (
          <a key={i} href={v.link} target="_blank"
          className="bg-zinc-900 border border-red-700 rounded-3xl overflow-hidden hover:scale-105 transition">
            <img src={v.thumbnail} alt={v.title}
            className="w-full h-52 object-cover" />

            <div className="p-6 text-left">
              <p className="text-white font-semibold line-clamp-2">{v.title}</p>
              <p className="text-red-400 text-sm mt-2">Watch on YouTube →</p>
            </div>
          </a>
        ))}
      </div>
    </section>

    <section className="py-32 text-center">
      <a href="https://discord.gg/g28rsUvBYk" target="_blank"
      className="inline-flex gap-3 bg-white text-black px-8 py-4 rounded-2xl">
        <MessageCircle /> Discord
      </a>
    </section>

    <section className="py-32 text-center bg-gradient-to-t from-black to-red-950">
      <ShoppingBag className="mx-auto mb-6" size={50} />
      <h2 className="text-5xl">Merch Coming Soon</h2>
    </section>

    <footer className="py-10 text-center text-gray-500">
      Goofy Gang © 2026
    </footer>
  </div>
}
