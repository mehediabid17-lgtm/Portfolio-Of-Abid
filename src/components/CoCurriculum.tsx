import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ExternalLink } from 'lucide-react';
import { CO_CURRICULAR } from '../constants';
import CertificateModal from './CertificateModal';

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

const CoCurriculum = () => {
  const [selectedCert, setSelectedCert] = useState<{ url: string; title: string } | null>(null);

  return (
    <PageWrapper>
      <section className="py-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">Co-Curricular</h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-sm">
              Activities and leadership roles beyond the curriculum.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {CO_CURRICULAR.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="warp-card overflow-hidden flex flex-col group"
              >
                <div 
                  className="aspect-[16/10] overflow-hidden group relative cursor-pointer"
                  onClick={() => setSelectedCert({ url: item.certificate, title: item.title })}
                >
                  <img 
                    src={item.certificate} 
                    alt={`${item.title} Certificate`} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 grayscale-[0.3] group-hover:grayscale-0"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                    <span className="px-6 py-3 bg-violet-600 text-white rounded-full font-bold text-xs flex items-center gap-2 warp-glow">
                      View Certificate <ExternalLink className="w-3 h-3" />
                    </span>
                  </div>
                </div>
                <div className="p-8 lg:p-10 flex-grow">
                  <span className="text-violet-400 font-bold tracking-widest uppercase text-[10px] mb-4 block">{item.year}</span>
                  <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                  <p className="text-lg text-slate-300 mb-4">{item.organization}</p>
                  <p className="text-slate-500 leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CertificateModal 
        isOpen={!!selectedCert} 
        onClose={() => setSelectedCert(null)} 
        imageUrl={selectedCert?.url || ''} 
        title={selectedCert?.title || ''} 
      />
    </PageWrapper>
  );
};

export default CoCurriculum;
