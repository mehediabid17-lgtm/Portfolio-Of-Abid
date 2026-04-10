import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Github } from 'lucide-react';
import { PROJECTS } from '../constants';
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

const Projects = () => {
  return (
    <PageWrapper>
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">Data Projects</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              A selection of my work in data analysis, machine learning, and statistical modeling.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROJECTS.map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative warp-card overflow-hidden"
              >
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 grayscale-[0.3] group-hover:grayscale-0"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map(t => (
                      <span key={t} className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-violet-500/10 text-violet-400 rounded-md">
                        {t}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-slate-500 text-sm mb-6 line-clamp-2">{project.description}</p>
                  <div className="flex items-center gap-4">
                    <a href={project.link} className="flex items-center gap-2 text-sm font-bold text-violet-400 hover:text-violet-300 transition-colors">
                      Live Demo <ExternalLink className="w-4 h-4" />
                    </a>
                    {project.github && (
                      <a href={project.github} className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-white transition-colors">
                        Source <Github className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <ExploreJourney />
    </PageWrapper>
  );
};

export default Projects;
