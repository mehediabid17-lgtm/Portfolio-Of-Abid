import React from 'react';
import { motion } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ChevronRight, 
  Cpu, 
  Briefcase,
  GraduationCap,
  BookOpen,
  Layers,
  Award,
  Mail,
  Home as HomeIcon
} from 'lucide-react';

const ExploreJourney = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const allPages = [
    { title: "Home", desc: "Back to the beginning.", icon: <HomeIcon className="w-6 h-6" />, href: "/", color: "slate" },
    { title: "Education", desc: "Academic background and certifications.", icon: <BookOpen className="w-6 h-6" />, href: "/education", color: "violet" },
    { title: "Experience", desc: "Professional work and leadership roles.", icon: <Briefcase className="w-6 h-6" />, href: "/experience", color: "blue" },
    { title: "Co-Curriculum", desc: "Extracurricular activities and awards.", icon: <Award className="w-6 h-6" />, href: "/co-curriculum", color: "amber" },
    { title: "Projects", desc: "Showcase of my technical builds.", icon: <Layers className="w-6 h-6" />, href: "/projects", color: "emerald" },
    { title: "Skills", desc: "Technical expertise and toolsets.", icon: <Cpu className="w-6 h-6" />, href: "/skills", color: "rose" },
    { title: "Contact", desc: "Get in touch for collaborations.", icon: <Mail className="w-6 h-6" />, href: "/contact", color: "indigo" },
  ];

  // Logic: 
  // 1. Find the index of the current page.
  // 2. Filter out the current page.
  // 3. This always leaves 6 pages to display in the grid.
  
  const displayPages = allPages.filter(page => page.href !== currentPath);

  // If we are on Home, we want to show the original 6 (Education to Contact)
  // If we are on any other page, we show Home and the other 5.
  // The filter logic handles this perfectly.

  return (
    <section className="py-24 bg-white/[0.02] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4 tracking-tight">Explore My Journey</h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Dive deeper into my academic background, professional experiences, and the projects I've built.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayPages.map((item, i) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link 
                to={item.href}
                className="group block p-8 warp-card hover:border-violet-500/50 transition-all h-full"
              >
                <div className={`w-12 h-12 rounded-xl bg-${item.color}-500/10 flex items-center justify-center text-${item.color}-400 mb-6 group-hover:scale-110 transition-transform`}>
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                  {item.title} <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExploreJourney;
