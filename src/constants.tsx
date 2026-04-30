import React from 'react';
import { 
  Code2, 
  Terminal, 
  Cpu, 
  Wrench, 
  Brain, 
  Activity,
  Award,
  Users
} from 'lucide-react';

export interface Project {
  title: string;
  description: string;
  image: string;
  tech: string[];
  link: string;
  github?: string;
}

export interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: { name: string; level: number }[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  year: string;
  description: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  duration: string;
  description: string;
  certificate?: string;
}

export interface CoCurricularItem {
  title: string;
  organization: string;
  year: string;
  description: string;
  certificate: string;
}

export const EDUCATION: EducationItem[] = [
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

export const EXPERIENCE: ExperienceItem[] = [
  {
    role: "Executive",
    company: "Software Engineering Club, Daffodil International University (DIU_SEC)",
    duration: "2026 - Present",
    description: "Actively contributing to the Software Engineering Club at DIU, organizing technical events, workshops, and fostering a collaborative environment for software engineering students to enhance their skills.",
    certificate: "https://lh3.googleusercontent.com/d/1FY74w_yEIAukLg8OgF6Qc8WJ9JiALkZI"
  },
  {
    role: "Sawtul ilm Co-Ordinator",
    company: "Grantha Shala",
    duration: "2026",
    description: "Serving as the Sawtul ilm Co-Ordinator at Grantha Shala, managing educational programs and coordinating knowledge-sharing initiatives.",
    certificate: "https://lh3.googleusercontent.com/d/13T9VQfIHiQrZkNBoPeaqVod7UzRFqIHK"
  },
  {
    role: "Founder & CEO",
    company: "Agrapaathik (Community & Events)",
    duration: "2025 - present",
    description: "An organization dedicated to community development and engagement. Purpose: Community support and engagement. Activities: Organizing events (workshops, drives, festivals). Services: Volunteer opportunities for social causes. Goal: Create social impact through active participation.",
    certificate: "https://lh3.googleusercontent.com/d/1MqUXwywXZ9ng9I9KxFZozTQB8OuVeoVS"
  },
  {
    role: "Deputy Organizer",
    company: "Uttara Students Community - DIU",
    duration: "2025-2026",
    description: "Serving as the Deputy Organizer for the Uttara Students Community at Daffodil International University, coordinating community events and student engagement initiatives.",
    certificate: "https://lh3.googleusercontent.com/d/1pZO25b04wNRddgknc3qt0Nx-V-6T56Iv"
  },
  {
    role: "Volunteer",
    company: "LEO Club Of Dhaka Palthan Heritage",
    duration: "2024-2025",
    description: "Actively participated as a volunteer in various community service projects and leadership initiatives organized by the LEO Club of Dhaka Palthan Heritage.",
    certificate: "https://lh3.googleusercontent.com/d/1zfYwTSUN-6vVwhqyYsvdYXyvn3Rrfjvp"
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
    role: "Chief Executive",
    company: "Taan Raat Institute of Bangladesh",
    duration: "2023 - 2024",
    description: "A platform designed to help individuals earn while learning new skills. Focused on building trust and creating opportunities for people to develop their own identity through events and learning programs.",
    certificate: "https://lh3.googleusercontent.com/d/1KFAi7lDAd65JkYkm6hjZa4NJ7s7RZTZI"
  },
  {
    role: "Calling Agent (CA)",
    company: "Essential-Infotech",
    duration: "2022 - 2023",
    description: "Handled telemarketing responsibilities, including customer interaction and service promotion.",
    certificate: "https://lh3.googleusercontent.com/d/11QnqNI9UUax_uY-aLR3mUPNFCUvOUzLQ"
  },
  {
    role: "SRM",
    company: "SRM - NHMSC Scout Group",
    duration: "2021 - 2023",
    description: "Scouting is a voluntary, non-political, and non-formal educational movement for young people. It focuses on personal growth, leadership development, and community service, helping individuals become responsible global citizens and agents of change.",
    certificate: "https://lh3.googleusercontent.com/d/1aVX7YTYxAmYf46bH3Zj8qYg21AD7wbhC"
  },
  {
    role: "Calling Agent",
    company: "EluvaTech",
    duration: "2021 - 2022",
    description: "Worked as a telemarketing agent, communicating with clients and promoting services effectively.",
    certificate: "https://lh3.googleusercontent.com/d/1R4M0oQdd_IzAy1JOWj93NvxDD-cslzU_"
  }
];

export const CO_CURRICULAR: CoCurricularItem[] = [
  {
    title: "Certification of Achievement",
    organization: "Professional Recognition",
    year: "2026",
    description: "Awarded for exceptional performance and dedication in professional development and community engagement initiatives.",
    certificate: "https://lh3.googleusercontent.com/d/10nYhle0WurcdfaBx-QuWou-lkQSqmK5t"
  },
  {
    title: "Sawtul ilm",
    organization: "Educational Platform",
    year: "2026",
    description: "Involved in educational initiatives and knowledge-sharing programs through the Sawtul ilm platform.",
    certificate: "https://lh3.googleusercontent.com/d/1EEIhE9SeHbOR9wC6QyA9aOasUT1MZ9CV"
  },
  {
    title: "Computer Architecture",
    organization: "Online Course",
    year: "2026",
    description: "Comprehensive study of computer architecture, instruction sets, and hardware-software interface.",
    certificate: "https://lh3.googleusercontent.com/d/17iWjF6l0brFj07XcZgBqTJcZGaGJptHz"
  },
  {
    title: "Database Management Course",
    organization: "Professional Certification",
    year: "2026",
    description: "In-depth study of SQL, database design, and management systems.",
    certificate: "https://lh3.googleusercontent.com/d/1q4AIllXCXpYOT3rBQughx1DMADP1KXje"
  },
  {
    title: "Chief Executive Officer (CEO)",
    organization: "Agrapaathik",
    year: "2025 - present",
    description: "Leading Agrapaathik, an organization dedicated to community development, social impact, and organizing impactful events.",
    certificate: "https://lh3.googleusercontent.com/d/1SRg9qRwsQQaDSJRdXHdv1aeCKevmit-n"
  },
  {
    title: "Code Trap",
    organization: "Coding Challenge",
    year: "2025",
    description: "Successfully completed the Code Trap challenge, showcasing proficiency in programming and debugging.",
    certificate: "https://lh3.googleusercontent.com/d/1KTJR5XVsTQpkpDX7OHyVQpTytwzXSYvm"
  },
  {
    title: "Microsoft Office Starter Course",
    organization: "Digital Skills Program",
    year: "2025",
    description: "Completed a foundational course on Microsoft Office tools, including Word, Excel, and PowerPoint.",
    certificate: "https://lh3.googleusercontent.com/d/11EcLgfnoKhUABZM9vCWkqRaBDGh9PrZl"
  },
  {
    title: "Know Thyself",
    organization: "Personal Development Workshop",
    year: "2025",
    description: "Attended a workshop focused on self-awareness, emotional intelligence, and personal growth.",
    certificate: "https://lh3.googleusercontent.com/d/1mEYjDv5rN6IK_ypm_-Oa4Om-wkGnYjXo"
  },
  {
    title: "Breakout Algorithm",
    organization: "Algorithm Competition",
    year: "2025",
    description: "Participated in the Breakout Algorithm competition, demonstrating problem-solving skills and algorithmic thinking.",
    certificate: "https://lh3.googleusercontent.com/d/1wIiZBOK__3Up2AD9EW89CKuHDGdV21dU"
  },
  {
    title: "Recognized Video Editor",
    organization: "Creative Media Awards",
    year: "2024",
    description: "Acknowledged for excellence in video editing and digital storytelling across various platforms.",
    certificate: "https://lh3.googleusercontent.com/d/1anmYgKnbVeBJlcjnkovKZlYJ9618wmZH"
  },
  {
    title: "Lunchpad Participant",
    organization: "UIHP @ UIU",
    year: "2024",
    description: "Participated in the Lunchpad program at United International University, focusing on innovation and entrepreneurship.",
    certificate: "https://lh3.googleusercontent.com/d/1BgsKdQkcZ9OPyQhOEJAFvNEYBCcl0TxY"
  },
  {
    title: "Chief Executive",
    organization: "Student Organization",
    year: "2023 - 2024",
    description: "Served as the Chief Executive, managing operations and leading a diverse team of volunteers.",
    certificate: "https://lh3.googleusercontent.com/d/1bBeOoExDg6oSOEZQOoNTuw3FHVTHCPDQ"
  },
  {
    title: "Scout Camp",
    organization: "National Scout Group",
    year: "2023",
    description: "Participated in a national-level scout camp, focusing on leadership and survival skills.",
    certificate: "https://lh3.googleusercontent.com/d/1748wF_IvXnB6ZIUEMmJIRNZoiTkPd5E2"
  },
  {
    title: "Project Humanity",
    organization: "Social Welfare Initiative",
    year: "2023",
    description: "Contributing to various social welfare activities and community support programs.",
    certificate: "https://lh3.googleusercontent.com/d/1XgHxzeuy80bNG_bxfTZ9hx1EiSlqugsg"
  },
  {
    title: "Corporate Etiquette Course",
    organization: "Professional Development Program",
    year: "2023",
    description: "Completed a comprehensive course on professional behavior, communication, and workplace ethics.",
    certificate: "https://lh3.googleusercontent.com/d/1ZyAxDDf93SG4mxQdHtpFY4Pg0rF6jghf"
  },
  {
    title: "Youth Empowerment Workshop",
    organization: "Global Youth Forum",
    year: "2022",
    description: "Participated in a workshop dedicated to empowering young leaders and fostering social change.",
    certificate: "https://lh3.googleusercontent.com/d/1_2Cbgcvs07wH8jyGBDX5ZB7Fpuu-jLRI"
  },
  {
    title: "Digital Literacy Course",
    organization: "Online Certification",
    year: "2022",
    description: "Successfully completed a course focusing on essential digital skills and online safety.",
    certificate: "https://lh3.googleusercontent.com/d/1IZ-OD_VcKRfW-c8KPVb9QT2NIWFA0xRq"
  }
];

export const PROJECTS: Project[] = [
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
    link: "https://portfolio-of-abid.vercel.app/",
    github: "https://github.com/mehediabid17-lgtm/Portfolio-Of-Abid"
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Data Science",
    icon: <Code2 className="w-5 h-5" />,
    skills: [
      { name: "Python (Pandas, NumPy)", level: 90 },
      { name: "SQL & Database Design", level: 85 },
      { name: "Statistical Modeling", level: 80 },
      { name: "Data Visualization", level: 85 }
    ]
  },
  {
    title: "Machine Learning",
    icon: <Brain className="w-5 h-5" />,
    skills: [
      { name: "Scikit-Learn", level: 85 },
      { name: "Neural Networks", level: 75 },
      { name: "Predictive Analytics", level: 80 },
      { name: "Deep Learning", level: 70 }
    ]
  },
  {
    title: "Software Engineering",
    icon: <Terminal className="w-5 h-5" />,
    skills: [
      { name: "C Programming", level: 86 },
      { name: "React & TypeScript", level: 85 },
      { name: "System Architecture", level: 80 },
      { name: "API Development", level: 85 },
      { name: "Git & Version Control", level: 90 }
    ]
  },
  {
    title: "Soft Skills",
    icon: <Users className="w-5 h-5" />,
    skills: [
      { name: "Leadership (CEO & Founder)", level: 95 },
      { name: "Event Management", level: 90 },
      { name: "Public Speaking", level: 85 },
      { name: "Team Collaboration", level: 92 },
      { name: "Strategic Planning", level: 88 }
    ]
  }
];
