/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Github, 
  Linkedin, 
  Facebook, 
  Mail, 
  Code2, 
  Terminal, 
  User, 
  Briefcase, 
  GraduationCap, 
  Menu,
  X,
  Cpu,
  MapPin,
  Brain,
  Activity,
  Phone,
  MessageCircle
} from 'lucide-react';
import { cn } from './lib/utils';

// --- Lazy loaded components ---
const Home = lazy(() => import('./components/Home'));
const Education = lazy(() => import('./components/Education'));
const WorkExperience = lazy(() => import('./components/WorkExperience'));
const CoCurriculum = lazy(() => import('./components/CoCurriculum'));
const Projects = lazy(() => import('./components/Projects'));
const Skills = lazy(() => import('./components/Skills'));
const Contact = lazy(() => import('./components/Contact'));

// --- Loading Component ---
const PageLoader = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className="w-12 h-12 border-4 border-violet-500/20 border-t-violet-500 rounded-full"
    />
  </div>
);

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Education', href: '/education' },
    { name: 'Experience', href: '/experience' },
    { name: 'Co-Curriculum', href: '/co-curriculum' },
    { name: 'Projects', href: '/projects' },
    { name: 'Skills', href: '/skills' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
      isScrolled || location.pathname !== '/' ? "bg-black/80 backdrop-blur-md border-b border-white/5" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-violet-500/20 group-hover:border-violet-500 transition-all">
                <img 
                  src="https://lh3.googleusercontent.com/d/1Ndola8V3NBqVVnb0o3vo7pQCcPuA8ol9" 
                  alt="Abid" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            <span className="text-2xl font-bold tracking-tighter text-white">
              Portfolio Of <span className="text-violet-500">Abid</span>
            </span>
          </Link>
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link, i) => (
            <motion.div
              key={link.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <NavLink
                to={link.href}
                className={({ isActive }) => cn(
                  "text-sm font-medium transition-colors",
                  isActive ? "text-violet-400" : "text-slate-400 hover:text-white"
                )}
              >
                {link.name}
              </NavLink>
            </motion.div>
          ))}
          <motion.a
            href="https://drive.google.com/file/d/1av2uOGhOnMayS2xQPic2vAB0hcpmdG3h/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-violet-600 text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-violet-500 transition-all warp-glow"
          >
            CV
          </motion.a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/95 backdrop-blur-xl border-b border-white/5 overflow-hidden"
          >
            <div className="flex flex-col p-6 space-y-6">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.href}
                  className={({ isActive }) => cn(
                    "text-lg font-medium transition-colors",
                    isActive ? "text-violet-400" : "text-slate-400 hover:text-white"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </NavLink>
              ))}
              <a 
                href="https://drive.google.com/file/d/1av2uOGhOnMayS2xQPic2vAB0hcpmdG3h/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-violet-600 text-white px-6 py-3 rounded-full text-center font-bold text-sm shadow-lg shadow-violet-600/20"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                CV
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="text-center md:text-left">
          <Link to="/" className="text-2xl font-bold tracking-tighter text-white mb-4 block">
            Portfolio Of <span className="text-violet-500">Abid</span>
          </Link>
          <p className="text-slate-500 text-xs uppercase tracking-widest">
            © {new Date().getFullYear()} Mehedi Hasan Abid. All rights reserved.
          </p>
        </div>
        
        <div className="flex items-center gap-8">
          <Link to="/" className="text-xs font-bold text-slate-500 hover:text-violet-400 transition-colors uppercase tracking-widest">Home</Link>
          <Link to="/projects" className="text-xs font-bold text-slate-500 hover:text-violet-400 transition-colors uppercase tracking-widest">Projects</Link>
        </div>
      </div>
    </footer>
  );
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const BackgroundEffect = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      
      {/* Mouse Follow Glow */}
      <motion.div 
        animate={{ 
          x: mousePos.x - 250,
          y: mousePos.y - 250,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200, mass: 0.5 }}
        className="absolute w-[500px] h-[500px] bg-violet-500/10 blur-[100px] rounded-full"
      />

      {/* Animated Blobs */}
      <motion.div 
        animate={{ 
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-violet-600/20 blur-[120px] rounded-full"
      />
      <motion.div 
        animate={{ 
          x: [0, -100, 0],
          y: [0, 100, 0],
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/20 blur-[120px] rounded-full"
      />
      <motion.div 
        animate={{ 
          x: [0, 50, 0],
          y: [0, -50, 0],
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.3, 0.1]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-indigo-600/15 blur-[100px] rounded-full"
      />
      
      {/* New Aesthetic Lights */}
      <motion.div 
        animate={{ 
          x: [-50, 50, -50],
          y: [50, -50, 50],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[40%] left-[20%] w-[40%] h-[40%] bg-rose-500/10 blur-[150px] rounded-full"
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.5, 1],
          opacity: [0.05, 0.15, 0.05]
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[20%] left-[10%] w-[25%] h-[25%] bg-amber-500/10 blur-[100px] rounded-full"
      />

      {/* Aurora Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,transparent_0%,rgba(139,92,246,0.03)_30%,transparent_70%)]"
        />
      </div>
      
      {/* Stars */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              opacity: Math.random() * 0.5,
              scale: Math.random() * 0.5 + 0.5
            }}
            animate={{ 
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 3 + Math.random() * 3, 
              repeat: Infinity,
              delay: Math.random() * 5
            }}
            className="absolute w-[2px] h-[2px] bg-white rounded-full"
            style={{ 
              top: `${Math.random() * 100}%`, 
              left: `${Math.random() * 100}%` 
            }}
          />
        ))}
      </div>

      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      {/* Aesthetic Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(11,14,20,0.4)_100%)]" />
      
      {/* Cinematic Lighting Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-violet-500/5 via-transparent to-blue-500/5" />
    </div>
  );
};

const AppContent = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[var(--color-bg-dark)] text-slate-300 selection:bg-violet-500/30 selection:text-violet-200 relative">
      <BackgroundEffect />
      
      {/* Floating Data Packets */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ x: Math.random() * 100 + "%", y: "-10%" }}
            animate={{ y: "110%" }}
            transition={{ 
              duration: 10 + Math.random() * 20, 
              repeat: Infinity, 
              ease: "linear",
              delay: Math.random() * 20
            }}
            className="absolute w-[1px] h-20 bg-gradient-to-b from-transparent via-violet-500/50 to-transparent"
          />
        ))}
        {/* Tech Terms */}
        {['CPU', 'GPU', 'CUDA', 'NEURAL', 'DATA', 'CYBER', 'ML', 'AI'].map((term, i) => (
          <motion.div
            key={term}
            initial={{ x: Math.random() * 100 + "%", y: Math.random() * 100 + "%", opacity: 0 }}
            animate={{ opacity: [0, 0.1, 0] }}
            transition={{ 
              duration: 5 + Math.random() * 5, 
              repeat: Infinity, 
              delay: i * 2
            }}
            className="absolute text-[8px] font-mono font-bold text-violet-400/20 tracking-[0.5em]"
          >
            {term}
          </motion.div>
        ))}
      </div>
      
      {/* Scanning Line */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div 
          animate={{ top: ["-10%", "110%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-violet-500/30 to-transparent blur-[1px]"
        />
      </div>
      
      <Navbar />
      <div className="relative z-10">
        <Suspense fallback={<PageLoader />}>
          <AnimatePresence mode="wait">
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/education" element={<Education />} />
              <Route path="/experience" element={<WorkExperience />} />
              <Route path="/co-curriculum" element={<CoCurriculum />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </AnimatePresence>
        </Suspense>
        <Footer />
      </div>
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppContent />
    </BrowserRouter>
  );
}
