import React from 'react';
import { motion } from 'motion/react';
import { 
  Mail, 
  MapPin, 
  Phone, 
  Github, 
  Linkedin, 
  Facebook, 
  MessageCircle,
  Send
} from 'lucide-react';
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

const Contact = () => {
  const [status, setStatus] = React.useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('https://formspree.io/f/mehedihasanabid17@gmail.com', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        setStatus('success');
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <PageWrapper>
      <section className="py-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-white mb-6 tracking-tight">Connect</h2>
              <p className="text-slate-500 text-lg mb-10 text-sm">
                I'm always open to new opportunities and collaborations. 
                Feel free to reach out via any of the channels below.
              </p>
              
              <div className="space-y-6 mb-10">
                <a 
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=mehedihasanabid17@gmail.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group p-4 warp-card transition-all hover:border-violet-500/50 block"
                >
                  <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-400 group-hover:bg-violet-600 group-hover:text-white transition-all">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Email</p>
                    <p className="text-white">mehedihasanabid17@gmail.com</p>
                  </div>
                </a>
                
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=Uttara+Sector+6+Dhaka-1230+Bangladesh" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group p-4 warp-card transition-all hover:border-blue-500/50 block"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Location</p>
                    <p className="text-white">Uttara Sector 6, Dhaka-1230, Bangladesh</p>
                  </div>
                </a>

                <a href="tel:01905032251" className="flex items-center gap-4 group p-4 warp-card transition-all hover:border-emerald-500/50 block">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Phone</p>
                    <p className="text-white">01905032251</p>
                  </div>
                </a>
              </div>

              <div className="flex gap-4">
                {[
                  { icon: <Github className="w-5 h-5" />, href: "https://github.com/mehediabid17-lgtm" },
                  { icon: <Linkedin className="w-5 h-5" />, href: "https://www.linkedin.com/in/mehediabid/" },
                  { icon: <Facebook className="w-5 h-5" />, href: "https://www.facebook.com/mehedihasan.abid" },
                  { icon: <MessageCircle className="w-5 h-5" />, href: "https://wa.me/8801905032251" }
                ].map((social, i) => (
                  <motion.a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -5 }}
                    className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 hover:bg-violet-600 hover:text-white transition-all border border-white/5"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 warp-card"
            >
              {status === 'success' ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                  <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                    <Send className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Message Sent!</h3>
                  <p className="text-slate-400">Thank you for reaching out. I'll get back to you soon.</p>
                  <button 
                    onClick={() => setStatus('idle')}
                    className="text-violet-400 font-bold hover:text-violet-300 transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Name</label>
                      <input 
                        type="text" 
                        name="name"
                        required
                        placeholder="Enter name..."
                        className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-violet-600 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Email</label>
                      <input 
                        type="email" 
                        name="email"
                        required
                        placeholder="Enter email..."
                        className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-violet-600 transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Message</label>
                    <textarea 
                      rows={5}
                      name="message"
                      required
                      placeholder="Type message here..."
                      className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-violet-600 transition-all resize-none"
                    />
                  </div>
                  
                  {status === 'error' && (
                    <p className="text-rose-500 text-sm text-center">Something went wrong. Please try again or email me directly.</p>
                  )}

                  <button 
                    type="submit" 
                    disabled={status === 'sending'}
                    className="w-full py-4 bg-violet-600 text-white font-bold rounded-xl hover:bg-violet-500 transition-all flex items-center justify-center gap-2 shadow-lg shadow-violet-600/20 warp-glow disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === 'sending' ? 'Sending...' : 'Send Message'} <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
      <ExploreJourney />
    </PageWrapper>
  );
};

export default Contact;
