import React from 'react';
import { motion } from 'motion/react';
import { SKILL_CATEGORIES } from '../constants';
import ExploreJourney from './ExploreJourney';

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ type: "spring", damping: 25, stiffness: 120, mass: 0.5 }}
      className="pt-24 min-h-[calc(100vh-80px)] will-change-[opacity,transform]"
    >
      {children}
    </motion.div>
  );
};

const Skills = () => {
  return (
    <PageWrapper>
      <section className="py-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">Expertise</h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-sm">
              Technical stack and statistical tools in my environment.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {SKILL_CATEGORIES.map((cat, i) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.05 }}
                className="p-8 warp-card will-change-[opacity,transform]"
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center text-violet-400">
                    {cat.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white">{cat.title}</h3>
                </div>
                <div className="space-y-6">
                  {cat.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-slate-300">{skill.name}</span>
                        <span className="text-sm font-bold text-violet-400">{skill.level}%</span>
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: 0.2 }}
                          className="h-full bg-gradient-to-r from-violet-600 to-blue-600 will-change-[width]"
                        />
                      </div>
                    </div>
                  ))}
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

export default Skills;
