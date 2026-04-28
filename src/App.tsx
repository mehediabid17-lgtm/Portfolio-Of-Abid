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
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
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
    { name: 'Certificates', href: '/certificates' },
    { name: 'Projects', href: '/projects' },
    { name: 'Skills', href: '/skills' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out px-6 py-4",
      isScrolled || location.pathname !== '/' ? "bg-black/80 backdrop-blur-md border-b border-white/5 py-3" : "bg-transparent py-5"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-violet-500/20 group-hover:border-violet-500 transition-all bg-white/5">
                <img 
                  src="https://lh3.googleusercontent.com/d/1Ndola8V3NBqVVnb0o3vo7pQCcPuA8ol9" 
                  alt="Abid" 
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            <span className="text-xl sm:text-2xl font-bold tracking-tighter text-white whitespace-nowrap">
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
                    "relative text-sm font-medium transition-colors py-2 px-1",
                    isActive ? "text-violet-400" : "text-slate-400 hover:text-white"
                  )}
                >
                  {link.name}
                  {location.pathname === link.href && (
                    <motion.div
                      layoutId="navbar-underline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-violet-400 rounded-full"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </NavLink>
            </motion.div>
          ))}
          <motion.a
            href="https://drive.google.com/file/d/1av2uOGhOnMayS2xQPic2vAB0hcpmdG3h/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
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
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#0a0a0c]">
      {/* Dynamic Grid - More prominent like the video */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:50px_50px]"
        style={{
          maskImage: 'radial-gradient(circle at center, black, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(circle at center, black, transparent 80%)'
        }}
      />
      
      {/* Moving Beams / Light Streaks */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`beam-h-${i}`}
            initial={{ left: '-100%', top: `${25 * (i + 1)}%` }}
            animate={{ left: '110%' }}
            transition={{ 
              duration: 10 + i * 2, 
              repeat: Infinity, 
              ease: "linear",
              delay: i * 3
            }}
            className="absolute w-[400px] h-[1px] bg-gradient-to-r from-transparent via-violet-500 to-transparent blur-[2px]"
          />
        ))}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`beam-v-${i}`}
            initial={{ top: '-100%', left: `${25 * (i + 1)}%` }}
            animate={{ top: '110%' }}
            transition={{ 
              duration: 12 + i * 2, 
              repeat: Infinity, 
              ease: "linear",
              delay: i * 4
            }}
            className="absolute h-[400px] w-[1px] bg-gradient-to-b from-transparent via-blue-500 to-transparent blur-[2px]"
          />
        ))}
      </div>
      
      {/* Mouse Follow Glow - Refined */}
      <motion.div 
        animate={{ 
          x: mousePos.x - 300,
          y: mousePos.y - 300,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 100, mass: 0.8 }}
        className="absolute w-[600px] h-[600px] bg-violet-600/10 blur-[140px] rounded-full will-change-transform"
      />

      {/* Main Animated Blobs - Brighter and smoother */}
      <motion.div 
        animate={{ 
          rotate: [0, 360],
          scale: [1, 1.2, 1],
          x: [0, 100, 0],
          y: [0, 50, 0]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-violet-500/10 blur-[130px] rounded-full will-change-transform"
      />
      <motion.div 
        animate={{ 
          rotate: [360, 0],
          scale: [1.2, 1, 1.2],
          x: [0, -100, 0],
          y: [0, -50, 0]
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/10 blur-[130px] rounded-full will-change-transform"
      />

      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      {/* Vignette for depth */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.6)_100%)]" />
    </div>
  );
};

const AppContent = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[var(--color-bg-dark)] text-slate-300 selection:bg-violet-500/30 selection:text-violet-200 relative">
      <BackgroundEffect />
      
      {/* Floating Data Packets - Reduced for performance */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ x: Math.random() * 100 + "%", y: "-10%" }}
            animate={{ y: "110%" }}
            transition={{ 
              duration: 15 + Math.random() * 15, 
              repeat: Infinity, 
              ease: "linear",
              delay: Math.random() * 10
            }}
            className="absolute w-[1px] h-16 bg-gradient-to-b from-transparent via-violet-500/30 to-transparent will-change-transform"
          />
        ))}
        {/* Tech Terms - Reduced */}
        {['DATA', 'ML', 'AI'].map((term, i) => (
          <motion.div
            key={term}
            initial={{ x: Math.random() * 100 + "%", y: Math.random() * 100 + "%", opacity: 0 }}
            animate={{ opacity: [0, 0.1, 0] }}
            transition={{ 
              duration: 8 + Math.random() * 8, 
              repeat: Infinity, 
              delay: i * 4
            }}
            className="absolute text-[8px] font-mono font-bold text-violet-400/10 tracking-[0.5em] will-change-opacity"
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
              <Route path="/certificates" element={<CoCurriculum />} />
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
