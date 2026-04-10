import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  ChevronRight, 
  Cpu, 
  Terminal, 
  Code2, 
  Brain, 
  Activity,
  Briefcase,
  GraduationCap,
  Target,
  ArrowDown,
  BookOpen,
  Layers,
  Award,
  Mail
} from 'lucide-react';
import { Typewriter } from 'react-simple-typewriter';

import ExploreJourney from './ExploreJourney';

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="pt-24 min-h-[calc(100vh-80px)]"
    >
      {children}
    </motion.div>
  );
};

const Home = () => {
  return (
    <PageWrapper>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-violet-600/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-blue-600/15 blur-[120px] rounded-full pointer-events-none" />
        
        {/* Floating Icons */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div 
            animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute top-[15%] left-[10%] text-violet-500/20"
          >
            <Cpu className="w-24 h-24" />
          </motion.div>
          <motion.div 
            animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
            transition={{ duration: 7, repeat: Infinity }}
            className="absolute bottom-[20%] right-[15%] text-blue-500/20"
          >
            <Terminal className="w-32 h-32" />
          </motion.div>
          <motion.div 
            animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-[40%] right-[5%] text-indigo-500/10"
          >
            <Code2 className="w-40 h-40" />
          </motion.div>
          <motion.div 
            animate={{ x: [0, 30, 0], opacity: [0.05, 0.15, 0.05] }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute top-[60%] left-[5%] text-violet-400/10"
          >
            <Brain className="w-48 h-48" />
          </motion.div>
          <motion.div 
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-[10%] left-[20%] text-blue-400/5"
          >
            <Activity className="w-32 h-32" />
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-left"
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-violet-400 uppercase bg-violet-400/10 rounded-full border border-violet-400/20">
              Software Engineering & Data Science
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white mb-6">
              Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400 warp-text-glow">Mehedi Hasan Abid</span>
            </h1>
            <div className="text-xl md:text-2xl lg:text-3xl font-medium text-slate-400 mb-10 h-12">
              I am a{' '}
              <span className="text-white">
                <Typewriter
                  words={['Software Engineering Student', 'ML Enthusiast', 'Problem Solver', 'Data Science Enthusiast']}
                  loop={0}
                  cursor
                  cursorStyle='|'
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={1000}
                />
              </span>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/projects"
                  className="px-8 py-4 bg-violet-600 text-white font-bold rounded-full shadow-lg shadow-violet-600/20 hover:bg-violet-500 transition-all flex items-center gap-2"
                >
                  View Projects <ChevronRight className="w-4 h-4" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/contact"
                  className="px-8 py-4 bg-white/5 text-white border border-white/10 rounded-full font-bold hover:bg-white/10 transition-all"
                >
                  Contact Me
                </Link>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="hidden lg:block relative"
          >
            <div className="relative w-full aspect-square max-w-[500px] mx-auto">
              <div className="absolute inset-0 bg-violet-500/20 blur-[100px] rounded-full animate-pulse" />
              <div className="relative z-10 w-full h-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-violet-500/20">
                <img 
                  src="https://lh3.googleusercontent.com/d/13gola0am9SfPMxbJUjGR_V7IGSK9Ga-I" 
                  alt="Mehedi Hasan Abid" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-violet-600/20 blur-2xl rounded-full" />
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-blue-600/20 blur-2xl rounded-full" />
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-violet-500"
          >
            <ArrowDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </section>

      {/* About Section (Integrated) */}
      <section className="py-24 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square max-w-[400px] mx-auto rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-violet-500/10">
                <img 
                  src="https://lh3.googleusercontent.com/d/1bKCgrClSnZ740vDgDpjWALJKmc0wW8Hl" 
                  alt="Mehedi Hasan Abid" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-violet-600/20 blur-3xl rounded-full -z-10" />
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-blue-600/10 blur-3xl rounded-full -z-10" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex-1"
            >
              <h2 className="text-4xl font-bold text-white mb-6 tracking-tight">About Me</h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                I am a <span className="text-white font-semibold">Software Engineering student</span> at <span className="text-white font-semibold">Daffodil International University</span> with a track record of academic excellence, including a <span className="text-white font-semibold">perfect 5.00 GPA</span> in my SSC and HSC. Currently serving as the <span className="text-white font-semibold">Chief Executive Officer (CEO) of Agrapathik</span>, I blend executive leadership with a deep technical curiosity. My vision is to evolve into a <span className="text-white font-semibold">Data Science professional</span> specializing in <span className="text-white font-semibold">Machine Learning and AI</span>. I am dedicated to designing intelligent, data-driven solutions that solve real-world problems and enhance efficiency through innovative system architecture.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="flex gap-4 p-4 warp-card">
                  <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-400">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold uppercase tracking-wider text-sm">Focus</h4>
                    <p className="text-xs text-slate-500">Machine Learning & Analytics</p>
                  </div>
                </div>
                
                <div className="flex gap-4 p-4 warp-card">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold uppercase tracking-wider text-sm">Education</h4>
                    <p className="text-xs text-slate-500">Data Science & SWE Student</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* My Vision Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="warp-card p-8 md:p-16 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/10 blur-[100px] rounded-full -z-10" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full -z-10" />
            
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="w-20 h-20 rounded-2xl bg-violet-500/10 flex items-center justify-center text-violet-400 shrink-0">
                <Target className="w-10 h-10" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white mb-6 tracking-tight">My Vision</h2>
                <p className="text-gray-400 text-lg md:text-xl leading-relaxed italic">
                  "My vision is to become a highly skilled software engineer and data science professional with expertise in machine learning and artificial intelligence. I aim to combine my technical proficiency with analytical thinking to design intelligent, data-driven solutions that solve real-world problems. By leveraging the power of AI and modern software development, I strive to create innovative systems that enhance efficiency, improve decision-making, and contribute to technological advancement. I am committed to continuous learning and growth, with the goal of making a meaningful impact in the evolving world of data and intelligent technologies."
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Explore More Section */}
      <ExploreJourney />
    </PageWrapper>
  );
};

export default Home;
