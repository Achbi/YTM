'use client';

import React, { useState, useEffect } from 'react';
import { ChevronDown, Film, Palette, Image, ArrowRight, Sparkles, Zap, Globe } from 'lucide-react';

const CreatorHub = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const launchApp = (appType) => {
    const urls = {
      'clipper': 'https://shortsmaker-brown.vercel.app/',
      'board': 'https://collab-ivory.vercel.app/',
      'thumbnail': 'https://tnail.vercel.app/'
    };
    
    window.location.href = urls[appType];
  };

  const FloatingOrbs = () => (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full opacity-20 animate-pulse"
          style={{
            background: `linear-gradient(45deg, ${i % 2 ? '#ff6b6b' : '#4ecdc4'}, ${i % 2 ? '#ffd93d' : '#45b7d1'})`,
            width: `${Math.random() * 300 + 100}px`,
            height: `${Math.random() * 300 + 100}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            transform: `translate(-50%, -50%) translateY(${scrollY * (0.1 + i * 0.05)}px)`,
            animationDelay: `${i * 0.5}s`,
            animationDuration: `${3 + i}s`
          }}
        />
      ))}
    </div>
  );

  const ParticleField = () => (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full opacity-30 animate-ping"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 2}s`
          }}
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white overflow-hidden relative">
      {/* Background Effects */}
      <FloatingOrbs />
      <ParticleField />
      
      {/* Cursor Glow Effect */}
      <div
        className="fixed w-96 h-96 rounded-full opacity-20 pointer-events-none z-0 transition-all duration-300 ease-out"
        style={{
          background: 'radial-gradient(circle, rgba(255,107,107,0.3) 0%, rgba(255,107,107,0.1) 40%, transparent 70%)',
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-white/10 border-b border-white/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-3xl font-black bg-gradient-to-r from-pink-400 via-red-400 to-yellow-400 bg-clip-text text-transparent">
              CreatorHub
              <Sparkles className="inline-block w-6 h-6 ml-2 text-yellow-400 animate-spin" />
            </div>
            <div className="hidden md:flex space-x-8">
              {['Features', 'About', 'Contact'].map((item, i) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="relative group text-white/80 hover:text-white transition-all duration-300 font-medium"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-400 to-purple-400 group-hover:w-full transition-all duration-300"></span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6">
        <div className="text-center z-10 max-w-6xl mx-auto">
          <div className="mb-8 inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 border border-white/20">
            <Zap className="w-5 h-5 text-yellow-400" />
            <span className="text-sm font-semibold">Now with AI-Powered Tools</span>
            <Globe className="w-5 h-5 text-blue-400 animate-spin" />
          </div>
          
          <h1 className="text-7xl md:text-9xl font-black mb-8 leading-tight">
            <span className="bg-gradient-to-r from-pink-400 via-red-400 to-yellow-400 bg-clip-text text-transparent animate-pulse">
              Create.
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Collaborate.
            </span>
            <br />
            <span className="bg-gradient-to-r from-green-400 via-teal-400 to-blue-400 bg-clip-text text-transparent">
              Captivate.
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-4xl mx-auto leading-relaxed">
            The ultimate creative ecosystem for content creators. Transform your ideas into viral content with our AI-powered suite of tools designed for the modern creator economy.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="group relative px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full font-bold text-lg shadow-2xl hover:shadow-pink-500/25 transform hover:scale-105 transition-all duration-300 overflow-hidden">
              <span className="relative z-10 flex items-center">
                Start Creating Now
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            
            <button className="px-8 py-4 border-2 border-white/30 rounded-full font-semibold text-lg backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:border-white/50">
              Watch Demo
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-white/60" />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-32 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-20">
            <h2 className="text-6xl font-black mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Powerful Creator Tools
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              Everything you need to create engaging content, collaborate seamlessly, and build your brand - all powered by cutting-edge AI technology.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Film,
                title: "YouTube Shorts Clipper",
                description: "Transform long-form content into viral shorts with AI-powered moment detection. Smart editing, auto-captions, and trend analysis to maximize your reach.",
                gradient: "from-red-500 to-pink-500",
                app: "clipper",
                features: ["AI Moment Detection", "Auto Captions", "Trend Analysis"]
              },
              {
                icon: Palette,
                title: "Collaborative Design Board",
                description: "Professional design workspace with real-time collaboration. Infinite canvas, vector tools, and seamless team workflow for creative projects.",
                gradient: "from-purple-500 to-indigo-500",
                app: "board",
                features: ["Real-time Collaboration", "Vector Tools", "Infinite Canvas"]
              },
              {
                icon: Image,
                title: "Thumbnail Maker",
                description: "Create scroll-stopping thumbnails with AI suggestions. A/B testing, click prediction, and professional templates to boost your CTR.",
                gradient: "from-cyan-500 to-blue-500",
                app: "thumbnail",
                features: ["AI Suggestions", "A/B Testing", "Click Prediction"]
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="group relative"
                style={{
                  transform: `translateY(${scrollY * 0.1}px)`,
                  animationDelay: `${index * 0.2}s`
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br opacity-20 rounded-3xl blur-xl group-hover:opacity-30 transition-opacity duration-500"
                     style={{ background: `linear-gradient(135deg, ${feature.gradient.includes('red') ? '#ef4444' : feature.gradient.includes('purple') ? '#8b5cf6' : '#06b6d4'}, ${feature.gradient.includes('pink') ? '#ec4899' : feature.gradient.includes('indigo') ? '#6366f1' : '#3b82f6'})` }}>
                </div>
                
                <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 hover:bg-white/15 transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl">
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-300`}>
                    <feature.icon className="w-10 h-10 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text transition-all duration-300">
                    {feature.title}
                  </h3>
                  
                  <p className="text-white/70 mb-6 leading-relaxed">
                    {feature.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {feature.features.map((feat, i) => (
                      <span key={i} className="px-3 py-1 text-xs font-semibold bg-white/20 rounded-full text-white/80">
                        {feat}
                      </span>
                    ))}
                  </div>
                  
                  <button
                    onClick={() => launchApp(feature.app)}
                    className={`w-full py-3 px-6 bg-gradient-to-r ${feature.gradient} rounded-xl font-semibold text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center group-hover:animate-pulse`}
                  >
                    Launch {feature.title.split(' ')[0]}
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: "1M+", label: "Creators" },
              { number: "50M+", label: "Videos Created" },
              { number: "99.9%", label: "Uptime" },
              { number: "24/7", label: "Support" }
            ].map((stat, index) => (
              <div key={index} className="group">
                <div className="text-5xl font-black bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.number}
                </div>
                <div className="text-white/70 font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-16 px-6 bg-black/20 backdrop-blur-sm border-t border-white/10">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="mb-8">
            <div className="text-4xl font-black bg-gradient-to-r from-pink-400 via-red-400 to-yellow-400 bg-clip-text text-transparent mb-4">
              CreatorHub
            </div>
            <p className="text-white/60 max-w-2xl mx-auto">
              Empowering the next generation of creators with cutting-edge tools and AI-powered solutions.
            </p>
          </div>
          
          <div className="border-t border-white/10 pt-8">
            <p className="text-white/50 text-sm">
              © 2025 CreatorHub. Empowering creators worldwide. 
              <span className="ml-2 inline-block animate-bounce">🚀</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CreatorHub;