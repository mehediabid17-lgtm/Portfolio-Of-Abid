import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ExternalLink } from 'lucide-react';
import { EXPERIENCE } from '../constants';
import CertificateModal from './CertificateModal';
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

const WorkExperience = () => {
  const [selectedCert, setSelectedCert] = useState<{ url: string; title: string } | null>(null);

  return (
    <>
      <PageWrapper>
        <section className="py-12 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">Experience</h2>
              <p className="text-slate-500 max-w-2xl mx-auto text-sm">
                Professional history and roles executed in the field.
              </p>
            </div>

            <div className="space-y-16">
              {EXPERIENCE.map((item, i) => (
                <motion.div
                  key={`${item.role}-${item.company}`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="grid lg:grid-cols-2 gap-12 items-center warp-card p-8 lg:p-12"
                >
                  <div>
                    <span className="text-blue-400 font-bold tracking-widest uppercase text-[10px] mb-4 block">{item.duration}</span>
                    <h3 className="text-3xl font-bold text-white mb-4">{item.role}</h3>
                    <p className="text-xl text-slate-300 mb-6">{item.company}</p>
                    <p className="text-slate-500 leading-relaxed text-lg">{item.description}</p>
                  </div>
                  {item.certificate && (
                    <div>
                      <div 
                        className="group relative aspect-[4/3] rounded-xl overflow-hidden border border-white/5 shadow-2xl shadow-blue-500/5 cursor-pointer bg-white/5"
                        onClick={() => setSelectedCert({ url: item.certificate!, title: item.role })}
                      >
                        <img 
                          src={item.certificate} 
                          alt={`${item.role} Certificate`} 
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                          referrerPolicy="no-referrer"
                          loading="lazy"
                          decoding="async"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                          <span className="px-6 py-3 bg-blue-600 text-white rounded-full font-bold text-xs flex items-center gap-2 shadow-lg shadow-blue-600/20">
                            View Certificate <ExternalLink className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        <ExploreJourney />
      </PageWrapper>

      <CertificateModal 
        isOpen={!!selectedCert} 
        onClose={() => setSelectedCert(null)} 
        imageUrl={selectedCert?.url || ''} 
        title={selectedCert?.title || ''} 
      />
    </>
  );
};

export default WorkExperience;
