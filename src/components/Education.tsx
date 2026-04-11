import React from 'react';
import { motion } from 'motion/react';
import { EDUCATION } from '../constants';
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

const Education = () => {
  return (
    <PageWrapper>
      <section className="py-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">Education</h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-sm">
              Academic records from my journey.
            </p>
          </div>

          <div className="space-y-16">
            {EDUCATION.map((item, i) => (
              <motion.div
                key={item.degree}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="warp-card p-8 lg:p-12"
              >
                <div>
                  <span className="text-violet-400 font-bold tracking-widest uppercase text-[10px] mb-4 block">{item.year}</span>
                  <h3 className="text-3xl font-bold text-white mb-4">{item.degree}</h3>
                  <p className="text-xl text-slate-300 mb-6">{item.institution}</p>
                  <p className="text-slate-500 leading-relaxed text-lg">{item.description}</p>
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

export default Education;
