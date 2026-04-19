import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Loader2 } from 'lucide-react';

const CertificateModal = ({ isOpen, onClose, imageUrl, title }: { isOpen: boolean; onClose: () => void; imageUrl: string; title: string }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
    }
  }, [isOpen, imageUrl]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative max-w-5xl w-full warp-card p-2 overflow-hidden shadow-2xl shadow-violet-500/10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-[10000] p-2 bg-black/50 text-white rounded-full hover:bg-violet-600 transition-all hover:scale-110 active:scale-95"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="p-4 sm:p-6 flex flex-col h-full max-h-[90vh]">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 pr-12 shrink-0">{title}</h3>
              <div className="relative flex-grow bg-white/5 rounded-xl overflow-hidden flex items-center justify-center min-h-[300px] sm:min-h-[400px]">
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <Loader2 className="w-10 h-10 text-violet-500 animate-spin" />
                  </div>
                )}
                <img
                  src={imageUrl}
                  alt={title}
                  onLoad={() => setIsLoading(false)}
                  onError={() => setIsLoading(false)}
                  className={`max-w-full max-h-[60vh] sm:max-h-[70vh] object-contain transition-opacity duration-500 shadow-2xl ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="mt-6 flex justify-end shrink-0">
                <button 
                  onClick={onClose}
                  className="px-6 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg transition-colors text-sm font-medium"
                >
                  Close Preview
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CertificateModal;
