import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { blogPosts } from '@/data/blogPosts';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function BlogList() {
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <Navigation />
      
      <main className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Transmission Logs</h1>
          <p className="text-white/50 text-lg max-w-2xl">
            Technical write-ups on WebGL, Game Architecture, and Systems Engineering.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogPosts.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link to={`/blog/${post.slug}`} className="block group h-full">
                <article className="h-full bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-[#c2a4ff]/50 transition-all duration-500 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                    <ArrowRight className="w-6 h-6 text-[#c2a4ff]" />
                  </div>
                  
                  <span className="inline-block px-3 py-1 bg-[#c2a4ff]/10 text-[#c2a4ff] text-xs font-bold uppercase tracking-widest rounded-full mb-6">
                    {post.category}
                  </span>
                  
                  <h2 className="text-2xl font-bold mb-4 group-hover:text-[#c2a4ff] transition-colors">{post.title}</h2>
                  <p className="text-white/60 mb-8 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center gap-6 text-xs text-white/40 font-mono uppercase tracking-widest mt-auto">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {post.date}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {post.readTime}
                    </div>
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
