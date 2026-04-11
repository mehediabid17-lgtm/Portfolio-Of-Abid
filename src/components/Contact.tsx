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
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    
    // This opens the Gmail compose window directly in a new tab
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=mehedihasanabid17@gmail.com&su=${subject}&body=${body}`;
    
    // Fallback for other mail clients
    const mailtoUrl = `mailto:mehedihasanabid17@gmail.com?subject=${subject}&body=${body}`;
    
    // Try to open Gmail first as it's the most "direct" experience for Gmail users
    const newWindow = window.open(gmailUrl, '_blank');
    
    // If pop-up is blocked or fails, use standard mailto
    if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
      window.location.href = mailtoUrl;
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

                <button 
                  type="submit" 
                  className="w-full py-4 bg-violet-600 text-white font-bold rounded-xl hover:bg-violet-500 transition-all flex items-center justify-center gap-2 shadow-lg shadow-violet-600/20 warp-glow"
                >
                  Send Message <Send className="w-4 h-4" />
                </button>
                
                <p className="text-[10px] text-slate-600 text-center mt-4 italic">
                  This will open your email app to send the message directly.
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
      <ExploreJourney />
    </PageWrapper>
  );
};

export default Contact;
