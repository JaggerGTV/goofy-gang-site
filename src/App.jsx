
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Youtube, MessageCircle, ShoppingBag } from 'lucide-react';

export default function App() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const url = "https://www.youtube.com/feeds/videos.xml?channel_id=UCHDV6VtXNvCvqZcyaSsaDcws";

    fetch(url)
      .then(r => r.text())
      .then(str => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(str, "text/xml");
        const items = [...xml.querySelectorAll("entry")]
          .slice(0, 6)
          .map(e => ({
            title: e.querySelector("title")?.textContent,
            link: e.querySelector("link")?.getAttribute("href"),
          }));

        setVideos(items);
      })
      .catch(() => {});
  }, []);

  const timeline = [
    { date: 'March 2025', title: 'Early Members Joined' },
    { date: 'March 2025', title: 'Discord Founded' },
    { date: 'Oct 25, 2025', title: 'Goofy Gang Founded' },
    { date: 'Nov 15, 2025', title: 'First YouTube Upload' }
  ];

  return (
    <div className='bg-black text-white min-h-screen overflow-x-hidden'>
      <section className='h-screen sticky top-0 flex flex-col justify-center items-center text-center bg-gradient-to-b from-black via-red-950 to-black overflow-hidden'>
        <motion.img
          src='/super-joshy.png'
          className='w-72 rounded-3xl shadow-2xl mb-8 border border-red-600/40'
          initial={{ opacity: 0, scale: 0.7, y: 100 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          whileHover={{ scale: 1.05, rotate: 1 }}
        />

        <motion.h1
          className='text-7xl md:text-8xl font-black tracking-tight bg-gradient-to-r from-white via-red-500 to-white bg-clip-text text-transparent'
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          Goofy Gang
        </motion.h1>

        <motion.p
          className='text-2xl mt-4 text-gray-300 max-w-2xl'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
        >
          Late Nights. Dumb Ideas. Great Stories.
        </motion.p>
      </section>

      <section className='py-40 px-10 text-center relative'>
        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='text-5xl mb-12 font-bold'
        >
          Latest Videos
        </motion.h2>

        <div className='max-w-5xl mx-auto grid md:grid-cols-3 gap-6'>
          {videos.length > 0 ? videos.map((v, i) => (
            <a key={i} href={v.link} target='_blank' className='bg-zinc-900 border border-red-700 rounded-2xl p-6 hover:scale-105 transition text-left'>
              <p className='text-white font-semibold'>{v.title}</p>
              <p className='text-red-400 text-sm mt-2'>Watch on YouTube →</p>
            </a>
          )) : (
            <a href='https://www.youtube.com/@Goofygangtspmonotfunny/videos' target='_blank' className='inline-flex gap-3 items-center bg-red-600 px-8 py-4 rounded-2xl hover:scale-105 transition'>
              <Youtube /> View Channel
            </a>
          )}
        </div>
      </section>

      <section className='py-40 px-10 bg-zinc-950 relative overflow-hidden'>
        <h2 className='text-5xl text-center mb-16'>Timeline</h2>

        <div className='max-w-4xl mx-auto space-y-8 relative before:absolute before:left-6 before:top-0 before:w-px before:h-full before:bg-red-700/40'>
          {timeline.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03, y: -4 }}
              className='p-8 rounded-3xl bg-zinc-900/80 backdrop-blur-xl border border-red-700 shadow-2xl shadow-red-900/20 ml-10 relative before:absolute before:left-[-2.2rem] before:top-10 before:w-4 before:h-4 before:bg-red-500 before:rounded-full'
            >
              <p className='text-red-500'>{item.date}</p>
              <h3 className='text-2xl'>{item.title}</h3>
            </motion.div>
          ))}
        </div>
      </section>

      <section className='py-32 text-center'>
        <h2 className='text-5xl mb-8'>Join The Chaos</h2>

        <a
          href='https://discord.gg/g28rsUvBYk'
          target='_blank'
          className='inline-flex gap-3 bg-white text-black px-8 py-4 rounded-2xl hover:scale-105 transition'
        >
          <MessageCircle /> Discord
        </a>
      </section>

      <section className='py-32 text-center bg-gradient-to-t from-black to-red-950'>
        <ShoppingBag className='mx-auto mb-6' size={50} />
        <h2 className='text-5xl'>Merch Coming Soon</h2>
      </section>

      <footer className='py-10 text-center text-gray-500'>
        Goofy Gang © 2026
      </footer>
    </div>
  );
}
