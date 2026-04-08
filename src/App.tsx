/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Github, 
  Linkedin, 
  Facebook, 
  Mail, 
  ExternalLink, 
  Code2, 
  Terminal, 
  User, 
  Briefcase, 
  GraduationCap, 
  Send,
  Download,
  Menu,
  X,
  ChevronRight,
  Cpu,
  Wrench,
  Users,
  MapPin,
  Award,
  Target,
  Brain,
  Activity,
  Phone,
  MessageCircle
} from 'lucide-react';
import { Typewriter } from 'react-simple-typewriter';
import { cn } from './lib/utils';

// --- Types ---
interface Project {
  title: string;
  description: string;
  image: string;
  tech: string[];
  link: string;
  github?: string;
}

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: { name: string; level: number }[];
}

interface EducationItem {
  degree: string;
  institution: string;
  year: string;
  description: string;
}

interface ExperienceItem {
  role: string;
  company: string;
  duration: string;
  description: string;
  certificate?: string;
}

interface CoCurricularItem {
  title: string;
  organization: string;
  year: string;
  description: string;
  certificate: string;
}

// --- Data ---
const EDUCATION: EducationItem[] = [
  {
    degree: "Bachelor of Science (BSc) in Software Engineering (SWE)",
    institution: "Daffodil International University",
    year: "2025 - Running",
    description: "Currently pursuing a degree in Software Engineering with a strong focus on Data Science and Machine Learning. Actively engaged in building data-driven applications and exploring advanced statistical models."
  },
  {
    degree: "Higher Secondary Certificate (HSC)",
    institution: "Nawab Habibullah Model School And College",
    year: "2022 - 2023",
    description: "Science Group. Achieved a perfect GPA of 5.00 / 5.00. Developed a strong foundation in Mathematics, Physics, and Chemistry."
  },
  {
    degree: "Secondary School Certificate (SSC)",
    institution: "Nawab Habibullah Model School And College",
    year: "2019 - 2021",
    description: "Science Group. Achieved a perfect GPA of 5.00 / 5.00. This was the beginning of my journey into the world of science and technology."
  }
];

const EXPERIENCE: ExperienceItem[] = [
  {
    role: "Executive",
    company: "Software Engineering Club, Daffodil International University (DIU_SEC)",
    duration: "2026 - Present",
    description: "Actively contributing to the Software Engineering Club at DIU, organizing technical events, workshops, and fostering a collaborative environment for software engineering students to enhance their skills.",
    certificate: "https://scontent.fdac5-1.fna.fbcdn.net/v/t39.30808-6/332508474_6046392472048292_2890871221494787100_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=1d70fc&_nc_eui2=AeG4aaHSYtVWYBU08lEJB6wrsaCwPPc2vgGxoLA89za-AWDpJHA9U4CM4_qsfZ994Fep4ofSvdIErq-npseo3rwA&_nc_ohc=n1vhDmb8y5QQ7kNvwHEBvAb&_nc_oc=AdrGcQTv-WLHTGHIpzU3qDtpXNerUa54PecUMUsRpUH3XZMG64dCJLs5KcD6Cjm1J88&_nc_zt=23&_nc_ht=scontent.fdac5-1.fna&_nc_gid=lGUyD_2zJcsm0GP3ZInVYQ&_nc_ss=7a3a8&oh=00_Af3bvgDtwNTl1N17N1tDvMfk7GYwt68cS4uxm-B5fl_HTQ&oe=69DB1155"
  },
  {
    role: "Deputy Organizer",
    company: "Uttara Students Community - DIU",
    duration: "2025-2026",
    description: "Serving as the Deputy Organizer for the Uttara Students Community at Daffodil International University, coordinating community events and student engagement initiatives.",
    certificate: "https://scontent.fdac5-2.fna.fbcdn.net/v/t39.30808-6/431013507_375259155460153_344758632154253066_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=1d70fc&_nc_eui2=AeFzHriOEjX_RCjQkkac1WEyYoFyBhJctxZigXIGEly3Fqk0-5xRcF6faeNaMv3OScEq8OiK8pYETEgna6mTAhQg&_nc_ohc=z5vjaA113jUQ7kNvwF9vKoP&_nc_oc=Adq8AOfX56bZOHhfS29gtc9Qyhrt8FQbXMDAX5g7ORIQJ9ZKAXFy0hXNPS08AZ1iHF0&_nc_zt=23&_nc_ht=scontent.fdac5-2.fna&_nc_gid=NIW2CeCS6j0B1dntWFkepA&_nc_ss=7a3a8&oh=00_Af3_UhYI_b_UDhGmckJxtp4EtdAtfFkcJSbl5MYJQfAxWQ&oe=69DC06E0"
  },
  {
    role: "SRM",
    company: "SRM - NHMSC Scout Group",
    duration: "2019 - Present",
    description: "Scouting is a voluntary, non-political, and non-formal educational movement for young people. It focuses on personal growth, leadership development, and community service, helping individuals become responsible global citizens and agents of change.",
    certificate: "https://lh3.googleusercontent.com/d/1aVX7YTYxAmYf46bH3Zj8qYg21AD7wbhC"
  },
  {
    role: "Chief Executive",
    company: "Taan Raat Institute of Bangladesh",
    duration: "2023 - Present",
    description: "A platform designed to help individuals earn while learning new skills. Focused on building trust and creating opportunities for people to develop their own identity through events and learning programs.",
    certificate: "https://lh3.googleusercontent.com/d/1KFAi7lDAd65JkYkm6hjZa4NJ7s7RZTZI"
  },
  {
    role: "Volunteer",
    company: "LEO Club Of Dhaka Palthan Heritage",
    duration: "2024-2025",
    description: "Actively participated as a volunteer in various community service projects and leadership initiatives organized by the LEO Club of Dhaka Palthan Heritage.",
    certificate: "https://scontent.fdac5-1.fna.fbcdn.net/v/t39.30808-6/638882623_122208677726572133_6378724386412165192_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=1d70fc&_nc_eui2=AeGAxSdOZ4yn0mBjEbDVkF27OV540jGoQvU5XnjSMahC9eGFpXSLYpSTy8cfNn8CNTqNs10NDnhSPd0nvwFIGk3S&_nc_ohc=MSs5VsszBwsQ7kNvwH_V9-b&_nc_oc=AdpWzq6GfM4YTFhg73zDDFi54JsRkES0U5CY2euw6ZntCKBJI35K2PpMVtz0u-YGruY&_nc_zt=23&_nc_ht=scontent.fdac5-1.fna&_nc_gid=AFRXIJug95xQmpx_GeUwmA&_nc_ss=7a3a8&oh=00_Af3XMc3VDzsNnE8hzYFKTH5zEz1L6H-6nSx5wyCBhtMovw&oe=69DC106C"
  },
  {
    role: "Calling Agent",
    company: "EluvaTech",
    duration: "2021 - 2022",
    description: "Worked as a telemarketing agent, communicating with clients and promoting services effectively.",
    certificate: "https://lh3.googleusercontent.com/d/1R4M0oQdd_IzAy1JOWj93NvxDD-cslzU_"
  },
  {
    role: "Calling Agent (CA)",
    company: "Essential-Infotech",
    duration: "2022 - 2023",
    description: "Handled telemarketing responsibilities, including customer interaction and service promotion.",
    certificate: "https://lh3.googleusercontent.com/d/11QnqNI9UUax_uY-aLR3mUPNFCUvOUzLQ"
  },
  {
    role: "Chartered Accountant",
    company: "Professional Role",
    duration: "2024 - 2024",
    description: "A professional role involving financial services such as accounting, auditing, and financial management. (Associated with ACI Logistics Limited).",
    certificate: "https://lh3.googleusercontent.com/d/1HCk1S0KIaXcGLjZPEJdzCV7-f9AM9_JB"
  },
  {
    role: "Founder & CEO",
    company: "Aspire (Clothing Brand)",
    duration: "2023 - Present",
    description: "A fashion brand where tradition meets modern style, focusing on unique and stylish clothing.",
    certificate: "https://lh3.googleusercontent.com/d/1x5W78trtBoo3pMqaM-rnX26nQ3JiAThQ"
  },
  {
    role: "Founder & CEO",
    company: "Agrapaathik (Community & Events)",
    duration: "2023 - Present",
    description: "An organization dedicated to community development and engagement. Purpose: Community support and engagement. Activities: Organizing events (workshops, drives, festivals). Services: Volunteer opportunities for social causes. Goal: Create social impact through active participation.",
    certificate: "https://lh3.googleusercontent.com/d/1MqUXwywXZ9ng9I9KxFZozTQB8OuVeoVS"
  }
];

const CO_CURRICULAR: CoCurricularItem[] = [
  {
    title: "Corporate Etiquette Course",
    organization: "Professional Development Program",
    year: "2024",
    description: "Completed a comprehensive course on professional behavior, communication, and workplace ethics.",
    certificate: "https://lh3.googleusercontent.com/d/1ZyAxDDf93SG4mxQdHtpFY4Pg0rF6jghf"
  },
  {
    title: "Digital Literacy Course",
    organization: "Online Certification",
    year: "2023",
    description: "Successfully completed a course focusing on essential digital skills and online safety.",
    certificate: "https://lh3.googleusercontent.com/d/1IZ-OD_VcKRfW-c8KPVb9QT2NIWFA0xRq"
  },
  {
    title: "Project Humanity",
    organization: "Social Welfare Initiative",
    year: "2023 - Present",
    description: "Contributing to various social welfare activities and community support programs.",
    certificate: "https://lh3.googleusercontent.com/d/1XgHxzeuy80bNG_bxfTZ9hx1EiSlqugsg"
  },
  {
    title: "Lunchpad Participant",
    organization: "UIHP @ UIU",
    year: "2024",
    description: "Participated in the Lunchpad program at United International University, focusing on innovation and entrepreneurship.",
    certificate: "https://lh3.googleusercontent.com/d/1BgsKdQkcZ9OPyQhOEJAFvNEYBCcl0TxY"
  },
  {
    title: "Scout Camp",
    organization: "National Scout Group",
    year: "2023",
    description: "Participated in a national-level scout camp, focusing on leadership and survival skills.",
    certificate: "https://lh3.googleusercontent.com/d/1748wF_IvXnB6ZIUEMmJIRNZoiTkPd5E2"
  },
  {
    title: "Know Thyself",
    organization: "Personal Development Workshop",
    year: "2023",
    description: "Attended a workshop focused on self-awareness, emotional intelligence, and personal growth.",
    certificate: "https://lh3.googleusercontent.com/d/1mEYjDv5rN6IK_ypm_-Oa4Om-wkGnYjXo"
  },
  {
    title: "Chief Executive",
    organization: "Student Organization",
    year: "2023 - 2024",
    description: "Served as the Chief Executive, managing operations and leading a diverse team of volunteers.",
    certificate: "https://lh3.googleusercontent.com/d/1bBeOoExDg6oSOEZQOoNTuw3FHVTHCPDQ"
  },
  {
    title: "Chief Executive Officer (CEO)",
    organization: "Agrapaathik",
    year: "2023 - Present",
    description: "Leading Agrapaathik, an organization dedicated to community development, social impact, and organizing impactful events.",
    certificate: "https://lh3.googleusercontent.com/d/1SRg9qRwsQQaDSJRdXHdv1aeCKevmit-n"
  },
  {
    title: "Recognized Video Editor",
    organization: "Creative Media Awards",
    year: "2022 - Present",
    description: "Acknowledged for excellence in video editing and digital storytelling across various platforms.",
    certificate: "https://lh3.googleusercontent.com/d/1anmYgKnbVeBJlcjnkovKZlYJ9618wmZH"
  },
  {
    title: "Youth Empowerment Workshop",
    organization: "Global Youth Forum",
    year: "2022",
    description: "Participated in a workshop dedicated to empowering young leaders and fostering social change.",
    certificate: "https://lh3.googleusercontent.com/d/1_2Cbgcvs07wH8jyGBDX5ZB7Fpuu-jLRI"
  },
  {
    title: "Database Management Course",
    organization: "Professional Certification",
    year: "2026",
    description: "In-depth study of SQL, database design, and management systems.",
    certificate: "https://lh3.googleusercontent.com/d/1q4AIllXCXpYOT3rBQughx1DMADP1KXje"
  },
  {
    title: "Computer Architecture",
    organization: "Online Course",
    year: "2026",
    description: "Comprehensive study of computer architecture, instruction sets, and hardware-software interface.",
    certificate: "https://lh3.googleusercontent.com/d/17iWjF6l0brFj07XcZgBqTJcZGaGJptHz"
  }
];

const PROJECTS: Project[] = [
  {
    title: "Banking Transaction Management System",
    description: "A secure and efficient system for managing bank transactions, account balances, and financial records with data-driven insights.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1200&h=800",
    tech: ["Python", "SQL", "Data Analysis", "Flask"],
    link: "#",
    github: "#"
  },
  {
    title: "Agrapathik Social Organization Website",
    description: "A dedicated platform for Agrapaathik to showcase community impact, manage volunteer activities, and organize social events.",
    image: "https://lh3.googleusercontent.com/d/1MqUXwywXZ9ng9I9KxFZozTQB8OuVeoVS",
    tech: ["React", "Tailwind CSS", "Firebase", "Motion"],
    link: "#",
    github: "#"
  },
  {
    title: "Personal Portfolio Website",
    description: "A modern, responsive portfolio website built to highlight my expertise in Data Science, Machine Learning, and Software Engineering.",
    image: "https://lh3.googleusercontent.com/d/1Ndola8V3NBqVVnb0o3vo7pQCcPuA8ol9",
    tech: ["React", "TypeScript", "Tailwind CSS", "Motion"],
    link: "#",
    github: "#"
  }
];

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Data Science",
    icon: <Code2 className="w-5 h-5" />,
    skills: [
      { name: "Python (Pandas, NumPy)", level: 90 },
      { name: "SQL & Databases", level: 85 },
      { name: "C Language", level: 80 },
      { name: "Machine Learning", level: 80 },
      { name: "Data Visualization", level: 85 }
    ]
  },
  {
    title: "ML Frameworks",
    icon: <Cpu className="w-5 h-5" />,
    skills: [
      { name: "Scikit-learn", level: 85 },
      { name: "TensorFlow / Keras", level: 70 },
      { name: "NLTK / NLP", level: 75 },
      { name: "Matplotlib / Seaborn", level: 90 }
    ]
  },
  {
    title: "Tools & Soft Skills",
    icon: <Users className="w-5 h-5" />,
    skills: [
      { name: "Jupyter Notebooks", level: 95 },
      { name: "Git & GitHub", level: 90 },
      { name: "Problem Solving", level: 95 },
      { name: "Communication", level: 85 },
      { name: "Leadership", level: 90 }
    ]
  }
];

// --- Components ---

const CertificateModal = ({ isOpen, onClose, imageUrl, title }: { isOpen: boolean; onClose: () => void; imageUrl: string; title: string }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative max-w-5xl w-full warp-card p-2 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-violet-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="p-4">
              <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
              <div className="aspect-[16/10] overflow-hidden rounded-lg">
                <img
                  src={imageUrl}
                  alt={title}
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
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
    { name: 'Co-Curriculum', href: '/co-curriculum' },
    { name: 'Projects', href: '/projects' },
    { name: 'Skills', href: '/skills' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
      isScrolled || location.pathname !== '/' ? "bg-black/80 backdrop-blur-md border-b border-white/5" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-violet-500/20 group-hover:border-violet-500 transition-all">
                <img 
                  src="https://lh3.googleusercontent.com/d/1Ndola8V3NBqVVnb0o3vo7pQCcPuA8ol9" 
                  alt="Abid" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            <span className="text-2xl font-bold tracking-tighter text-white">
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
                  "text-sm font-medium transition-colors",
                  isActive ? "text-violet-400" : "text-slate-400 hover:text-white"
                )}
              >
                {link.name}
              </NavLink>
            </motion.div>
          ))}
          <motion.a
            href="https://drive.google.com/file/d/1av2uOGhOnMayS2xQPic2vAB0hcpmdG3h/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
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

const Home = () => {
  return (
    <PageWrapper>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-violet-600/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-blue-600/15 blur-[120px] rounded-full pointer-events-none" />
        
        {/* Floating Icons */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div 
            animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute top-[15%] left-[10%] text-violet-500/20"
          >
            <Cpu className="w-24 h-24" />
          </motion.div>
          <motion.div 
            animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
            transition={{ duration: 7, repeat: Infinity }}
            className="absolute bottom-[20%] right-[15%] text-blue-500/20"
          >
            <Terminal className="w-32 h-32" />
          </motion.div>
          <motion.div 
            animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-[40%] right-[5%] text-indigo-500/10"
          >
            <Code2 className="w-40 h-40" />
          </motion.div>
          <motion.div 
            animate={{ x: [0, 30, 0], opacity: [0.05, 0.15, 0.05] }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute top-[60%] left-[5%] text-violet-400/10"
          >
            <Brain className="w-48 h-48" />
          </motion.div>
          <motion.div 
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-[10%] left-[20%] text-blue-400/5"
          >
            <Activity className="w-32 h-32" />
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-left"
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-violet-400 uppercase bg-violet-400/10 rounded-full border border-violet-400/20">
              Software Engineering & Data Science
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white mb-6">
              Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400 warp-text-glow">Mehedi Hasan Abid</span>
            </h1>
            <div className="text-xl md:text-2xl lg:text-3xl font-medium text-slate-400 mb-10 h-12">
              I am a{' '}
              <span className="text-white">
                <Typewriter
                  words={['Software Engineering Student', 'ML Enthusiast', 'Problem Solver', 'Data Science Enthusiast']}
                  loop={0}
                  cursor
                  cursorStyle='|'
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={1000}
                />
              </span>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/projects"
                  className="px-8 py-4 bg-violet-600 text-white font-bold rounded-full shadow-lg shadow-violet-600/20 hover:bg-violet-500 transition-all flex items-center gap-2"
                >
                  View Projects <ChevronRight className="w-4 h-4" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/contact"
                  className="px-8 py-4 bg-white/5 text-white border border-white/10 rounded-full font-bold hover:bg-white/10 transition-all"
                >
                  Contact Me
                </Link>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="hidden lg:block relative"
          >
            <div className="relative w-full aspect-square max-w-[500px] mx-auto">
              <div className="absolute inset-0 bg-violet-500/20 blur-[100px] rounded-full animate-pulse" />
              <div className="relative z-10 w-full h-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-violet-500/20">
                <img 
                  src="https://lh3.googleusercontent.com/d/13gola0am9SfPMxbJUjGR_V7IGSK9Ga-I" 
                  alt="Mehedi Hasan Abid" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-violet-600/20 blur-2xl rounded-full" />
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-blue-600/20 blur-2xl rounded-full" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section (Integrated) */}
      <section className="py-24 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square max-w-[400px] mx-auto rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-violet-500/10">
                <img 
                  src="https://lh3.googleusercontent.com/d/1Ndola8V3NBqVVnb0o3vo7pQCcPuA8ol9" 
                  alt="Mehedi Hasan Abid" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-violet-600/20 blur-3xl rounded-full -z-10" />
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-blue-600/10 blur-3xl rounded-full -z-10" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex-1"
            >
              <h2 className="text-4xl font-bold text-white mb-6 tracking-tight">About Me</h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                I am a <span className="text-white font-semibold">Software Engineering student</span> at <span className="text-white font-semibold">Daffodil International University</span> with a track record of academic excellence, including a <span className="text-white font-semibold">perfect 5.00 GPA</span> in my SSC and HSC. Currently serving as the <span className="text-white font-semibold">Chief Executive Officer (CEO) of Agrapathik</span>, I blend executive leadership with a deep technical curiosity. My vision is to evolve into a <span className="text-white font-semibold">Data Science professional</span> specializing in <span className="text-white font-semibold">Machine Learning and AI</span>. I am dedicated to designing intelligent, data-driven solutions that solve real-world problems and enhance efficiency through innovative system architecture.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="flex gap-4 p-4 warp-card">
                  <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-400">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold uppercase tracking-wider text-sm">Focus</h4>
                    <p className="text-xs text-slate-500">Machine Learning & Analytics</p>
                  </div>
                </div>
                
                <div className="flex gap-4 p-4 warp-card">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold uppercase tracking-wider text-sm">Education</h4>
                    <p className="text-xs text-slate-500">Data Science & SWE Student</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* My Vision Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="warp-card p-8 md:p-16 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/10 blur-[100px] rounded-full -z-10" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full -z-10" />
            
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="w-20 h-20 rounded-2xl bg-violet-500/10 flex items-center justify-center text-violet-400 shrink-0">
                <Target className="w-10 h-10" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white mb-6 tracking-tight">My Vision</h2>
                <p className="text-gray-400 text-lg md:text-xl leading-relaxed italic">
                  "My vision is to become a highly skilled software engineer and data science professional with expertise in machine learning and artificial intelligence. I aim to combine my technical proficiency with analytical thinking to design intelligent, data-driven solutions that solve real-world problems. By leveraging the power of AI and modern software development, I strive to create innovative systems that enhance efficiency, improve decision-making, and contribute to technological advancement. I am committed to continuous learning and growth, with the goal of making a meaningful impact in the evolving world of data and intelligent technologies."
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
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
    </PageWrapper>
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
    </PageWrapper>
  );
};

const WorkExperience = () => {
  const [selectedCert, setSelectedCert] = useState<{ url: string; title: string } | null>(null);

  return (
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
                      className="group relative aspect-[4/3] rounded-xl overflow-hidden border border-white/5 shadow-2xl shadow-blue-500/5 cursor-pointer"
                      onClick={() => setSelectedCert({ url: item.certificate!, title: item.role })}
                    >
                      <img 
                        src={item.certificate} 
                        alt={`${item.role} Certificate`} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>
                )}
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

          <div className="grid md:grid-cols-3 gap-8">
            {SKILL_CATEGORIES.map((cat, i) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 warp-card"
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center text-violet-400">
                    {cat.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white">{cat.title}</h3>
                </div>
                
                <div className="space-y-6">
                  {cat.skills.map(skill => (
                    <div key={skill.name}>
                      <div className="flex justify-between mb-2">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{skill.name}</span>
                        <span className="text-[10px] font-bold text-violet-400">{skill.level}%</span>
                      </div>
                      <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.5 }}
                          className="h-full bg-gradient-to-r from-violet-600 to-blue-400 rounded-full"
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
    </PageWrapper>
  );
};

const Contact = () => {
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
                <a href="mailto:mehedihasanabid17@gmail.com" className="flex items-center gap-4 group p-4 warp-card transition-all hover:border-violet-500/50 block">
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
              <form 
                className="space-y-6" 
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const name = formData.get('name');
                  const email = formData.get('email');
                  const message = formData.get('message');
                  const mailtoLink = `mailto:mehedihasanabid17@gmail.com?subject=Contact from ${name}&body=From: ${name} (${email})%0D%0A%0D%0A${message}`;
                  window.location.href = mailtoLink;
                }}
              >
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
                <button type="submit" className="w-full py-4 bg-violet-600 text-white font-bold rounded-xl hover:bg-violet-500 transition-all flex items-center justify-center gap-2 shadow-lg shadow-violet-600/20 warp-glow">
                  Send Message <Send className="w-4 h-4" />
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </PageWrapper>
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
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      
      {/* Mouse Follow Glow */}
      <motion.div 
        animate={{ 
          x: mousePos.x - 250,
          y: mousePos.y - 250,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200, mass: 0.5 }}
        className="absolute w-[500px] h-[500px] bg-violet-500/10 blur-[100px] rounded-full"
      />

      {/* Animated Blobs */}
      <motion.div 
        animate={{ 
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-violet-600/10 blur-[120px] rounded-full"
      />
      <motion.div 
        animate={{ 
          x: [0, -100, 0],
          y: [0, 100, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full"
      />
      <motion.div 
        animate={{ 
          x: [0, 50, 0],
          y: [0, -50, 0],
          scale: [1, 1.3, 1]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-indigo-600/5 blur-[100px] rounded-full"
      />
      
      {/* Stars */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              opacity: Math.random() * 0.5,
              scale: Math.random() * 0.5 + 0.5
            }}
            animate={{ 
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 3 + Math.random() * 3, 
              repeat: Infinity,
              delay: Math.random() * 5
            }}
            className="absolute w-[2px] h-[2px] bg-white rounded-full"
            style={{ 
              top: `${Math.random() * 100}%`, 
              left: `${Math.random() * 100}%` 
            }}
          />
        ))}
      </div>

      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-[var(--color-bg-dark)] text-slate-300 selection:bg-violet-500/30 selection:text-violet-200 relative">
        <BackgroundEffect />
        
        {/* Floating Data Packets */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ x: Math.random() * 100 + "%", y: "-10%" }}
              animate={{ y: "110%" }}
              transition={{ 
                duration: 10 + Math.random() * 20, 
                repeat: Infinity, 
                ease: "linear",
                delay: Math.random() * 20
              }}
              className="absolute w-[1px] h-20 bg-gradient-to-b from-transparent via-violet-500/50 to-transparent"
            />
          ))}
          {/* Tech Terms */}
          {['CPU', 'GPU', 'CUDA', 'NEURAL', 'DATA', 'CYBER', 'ML', 'AI'].map((term, i) => (
            <motion.div
              key={term}
              initial={{ x: Math.random() * 100 + "%", y: Math.random() * 100 + "%", opacity: 0 }}
              animate={{ opacity: [0, 0.1, 0] }}
              transition={{ 
                duration: 5 + Math.random() * 5, 
                repeat: Infinity, 
                delay: i * 2
              }}
              className="absolute text-[8px] font-mono font-bold text-violet-400/20 tracking-[0.5em]"
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
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/education" element={<Education />} />
              <Route path="/experience" element={<WorkExperience />} />
              <Route path="/co-curriculum" element={<CoCurriculum />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </AnimatePresence>
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}
