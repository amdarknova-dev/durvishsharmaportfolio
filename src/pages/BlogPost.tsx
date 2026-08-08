import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { blogPosts, BlogPost as BlogPostType } from '@/data/blogPosts';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);

  useEffect(() => {
    const foundPost = blogPosts.find((p) => p.slug === slug);
    if (foundPost) setPost(foundPost);
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white">
        <p>Post not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <Navigation />
      
      <main className="pt-32 pb-24 px-6 md:px-12 max-w-4xl mx-auto">
        <Link to="/blog" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-12">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-xs uppercase tracking-widest font-mono">Back to Logs</span>
        </Link>

        <motion.article 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <header className="mb-12">
            <span className="inline-block px-3 py-1 bg-[#c2a4ff]/10 text-[#c2a4ff] text-xs font-bold uppercase tracking-widest rounded-full mb-6">
              {post.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">{post.title}</h1>
            
            <div className="flex items-center gap-6 text-xs text-white/40 font-mono uppercase tracking-widest pb-8 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {post.date}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </div>
            </div>
          </header>

          <div className="prose prose-invert prose-lg max-w-none prose-headings:font-bold prose-headings:text-[#c2a4ff] prose-a:text-[#3b82f6] prose-pre:bg-white/5 prose-pre:border prose-pre:border-white/10">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </div>
        </motion.article>
      </main>

      <Footer />
    </div>
  );
}
