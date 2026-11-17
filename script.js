// ============================================================================
// Portfolio Of Abid — Vanilla JavaScript
// ============================================================================

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // Lucide-compatible SVG Icons
  // --------------------------------------------------------------------------
  const svgAttr =
    'xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"';

  const ICONS = {
    menu: `<svg ${svgAttr}><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>`,
    x: `<svg ${svgAttr}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`,
    chevronRight: `<svg ${svgAttr}><path d="m9 18 6-6-6-6"/></svg>`,
    cpu: `<svg ${svgAttr}><rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/></svg>`,
    terminal: `<svg ${svgAttr}><polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/></svg>`,
    code2: `<svg ${svgAttr}><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>`,
    brain: `<svg ${svgAttr}><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/><path d="M17.599 6.5a3 3 0 0 0 .399-1.375"/><path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"/><path d="M3.477 10.896a4 4 0 0 1 .585-.396"/><path d="M19.938 10.5a4 4 0 0 1 .585.396"/><path d="M6 18a4 4 0 0 1-1.967-.516"/><path d="M19.967 17.484A4 4 0 0 1 18 18"/></svg>`,
    users: `<svg ${svgAttr}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
    briefcase: `<svg ${svgAttr}><path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect width="20" height="14" x="2" y="6" rx="2"/></svg>`,
    graduationCap: `<svg ${svgAttr}><path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/></svg>`,
    target: `<svg ${svgAttr}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`,
    arrowDown: `<svg ${svgAttr}><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg>`,
    bookOpen: `<svg ${svgAttr}><path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/></svg>`,
    award: `<svg ${svgAttr}><path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"/><circle cx="12" cy="8" r="6"/></svg>`,
    layers: `<svg ${svgAttr}><path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/></svg>`,
    mail: `<svg ${svgAttr}><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`,
    home: `<svg ${svgAttr}><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>`,
    externalLink: `<svg ${svgAttr}><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>`,
    github: `<svg ${svgAttr}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>`,
    mapPin: `<svg ${svgAttr}><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg>`,
    phone: `<svg ${svgAttr}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
    linkedin: `<svg ${svgAttr}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>`,
    facebook: `<svg ${svgAttr}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>`,
    messageCircle: `<svg ${svgAttr}><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>`,
    send: `<svg ${svgAttr}><path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/><path d="m21.854 2.147-10.94 10.939"/></svg>`,
    loader2: `<svg ${svgAttr}><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>`,
    sun: `<svg ${svgAttr}><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`,
    moon: `<svg ${svgAttr}><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`
  };

  // --------------------------------------------------------------------------
  // Portfolio Data (Kept Identical)
  // --------------------------------------------------------------------------
  const NAV_LINKS = [
    { name: 'Home', href: '/' },
    { name: 'Education', href: '/education' },
    { name: 'Experience', href: '/experience' },
    { name: 'Certificates', href: '/certificates' },
    { name: 'Projects', href: '/projects' },
    { name: 'Contact', href: '/contact' }
  ];

  const JOURNEY_PAGES = [
    {
      title: 'Home',
      desc: 'Back to the beginning.',
      icon: ICONS.home,
      href: '/',
      bgColor: 'bg-slate-soft',
      textColor: 'text-slate-400'
    },
    {
      title: 'Education',
      desc: 'Academic background and certifications.',
      icon: ICONS.bookOpen,
      href: '/education',
      bgColor: 'bg-violet-soft',
      textColor: 'text-violet-400'
    },
    {
      title: 'Experience',
      desc: 'Professional work and leadership roles.',
      icon: ICONS.briefcase,
      href: '/experience',
      bgColor: 'bg-blue-soft',
      textColor: 'text-blue-400'
    },
    {
      title: 'Certificates',
      desc: 'Extracurricular activities and awards.',
      icon: ICONS.award,
      href: '/certificates',
      bgColor: 'bg-amber-soft',
      textColor: 'text-amber-400'
    },
    {
      title: 'Projects',
      desc: 'Showcase of my technical builds.',
      icon: ICONS.layers,
      href: '/projects',
      bgColor: 'bg-emerald-soft',
      textColor: 'text-emerald-400'
    },
    {
      title: 'Contact',
      desc: 'Get in touch for collaborations.',
      icon: ICONS.mail,
      href: '/contact',
      bgColor: 'bg-indigo-soft',
      textColor: 'text-indigo-400'
    }
  ];

  const EDUCATION = [
    {
      degree: 'Bachelor of Science (BSc) in Software Engineering (SWE)',
      institution: 'Daffodil International University',
      year: '2025 - Running',
      description:
        'Currently pursuing a degree in Software Engineering with a strong focus on Data Science and Machine Learning. Actively engaged in building data-driven applications and exploring advanced statistical models.'
    },
    {
      degree: 'Higher Secondary Certificate (HSC)',
      institution: 'Nawab Habibullah Model School And College',
      year: '2022 - 2023',
      description:
        'Science Group. Achieved a perfect GPA of 5.00 / 5.00. Developed a strong foundation in Mathematics, Physics, and Chemistry.'
    },
    {
      degree: 'Secondary School Certificate (SSC)',
      institution: 'Nawab Habibullah Model School And College',
      year: '2019 - 2021',
      description:
        'Science Group. Achieved a perfect GPA of 5.00 / 5.00. This was the beginning of my journey into the world of science and technology.'
    }
  ];

  const EXPERIENCE = [
    {
      role: 'Executive',
      company: 'Software Engineering Club, Daffodil International University (DIU_SEC)',
      duration: '2026 - Present',
      description:
        'Actively contributing to the Software Engineering Club at DIU, organizing technical events, workshops, and fostering a collaborative environment for software engineering students to enhance their skills.',
      certificate: 'https://lh3.googleusercontent.com/d/1FY74w_yEIAukLg8OgF6Qc8WJ9JiALkZI'
    },
    {
      role: 'Sawtul ilm Co-Ordinator',
      company: 'Grantha Shala',
      duration: '2026',
      description:
        'Serving as the Sawtul ilm Co-Ordinator at Grantha Shala, managing educational programs and coordinating knowledge-sharing initiatives.',
      certificate: 'https://lh3.googleusercontent.com/d/13T9VQfIHiQrZkNBoPeaqVod7UzRFqIHK'
    },
    {
      role: 'Founder & CEO',
      company: 'Agrapaathik (Community & Events)',
      duration: '2025 - present',
      description:
        'An organization dedicated to community development and engagement. Purpose: Community support and engagement. Activities: Organizing events (workshops, drives, festivals). Services: Volunteer opportunities for social causes. Goal: Create social impact through active participation.',
      certificate: 'https://lh3.googleusercontent.com/d/1MqUXwywXZ9ng9I9KxFZozTQB8OuVeoVS'
    },
    {
      role: 'Deputy Organizer',
      company: 'Uttara Students Community - DIU',
      duration: '2025-2026',
      description:
        'Serving as the Deputy Organizer for the Uttara Students Community at Daffodil International University, coordinating community events and student engagement initiatives.',
      certificate: 'https://lh3.googleusercontent.com/d/1pZO25b04wNRddgknc3qt0Nx-V-6T56Iv'
    },
    {
      role: 'Volunteer',
      company: 'LEO Club Of Dhaka Palthan Heritage',
      duration: '2024-2025',
      description:
        'Actively participated as a volunteer in various community service projects and leadership initiatives organized by the LEO Club of Dhaka Palthan Heritage.',
      certificate: 'https://lh3.googleusercontent.com/d/1zfYwTSUN-6vVwhqyYsvdYXyvn3Rrfjvp'
    },
    {
      role: 'Chartered Accountant',
      company: 'Professional Role',
      duration: '2024 - 2024',
      description:
        'A professional role involving financial services such as accounting, auditing, and financial management. (Associated with ACI Logistics Limited).',
      certificate: 'https://lh3.googleusercontent.com/d/1HCk1S0KIaXcGLjZPEJdzCV7-f9AM9_JB'
    },
    {
      role: 'Founder & CEO',
      company: 'Aspire (Clothing Brand)',
      duration: '2023 - Present',
      description:
        'A fashion brand where tradition meets modern style, focusing on unique and stylish clothing.',
      certificate: 'https://lh3.googleusercontent.com/d/1x5W78trtBoo3pMqaM-rnX26nQ3JiAThQ'
    },
    {
      role: 'Chief Executive',
      company: 'Taan Raat Institute of Bangladesh',
      duration: '2023 - 2024',
      description:
        'A platform designed to help individuals earn while learning new skills. Focused on building trust and creating opportunities for people to develop their own identity through events and learning programs.',
      certificate: 'https://lh3.googleusercontent.com/d/1KFAi7lDAd65JkYkm6hjZa4NJ7s7RZTZI'
    },
    {
      role: 'Calling Agent (CA)',
      company: 'Essential-Infotech',
      duration: '2022 - 2023',
      description:
        'Handled telemarketing responsibilities, including customer interaction and service promotion.',
      certificate: 'https://lh3.googleusercontent.com/d/11QnqNI9UUax_uY-aLR3mUPNFCUvOUzLQ'
    },
    {
      role: 'SRM',
      company: 'SRM - NHMSC Scout Group',
      duration: '2021 - 2023',
      description:
        'Scouting is a voluntary, non-political, and non-formal educational movement for young people. It focuses on personal growth, leadership development, and community service, helping individuals become responsible global citizens and agents of change.',
      certificate: 'https://lh3.googleusercontent.com/d/1aVX7YTYxAmYf46bH3Zj8qYg21AD7wbhC'
    },
    {
      role: 'Calling Agent',
      company: 'EluvaTech',
      duration: '2021 - 2022',
      description:
        'Worked as a telemarketing agent, communicating with clients and promoting services effectively.',
      certificate: 'https://lh3.googleusercontent.com/d/1R4M0oQdd_IzAy1JOWj93NvxDD-cslzU_'
    }
  ];

  const CO_CURRICULAR = [
    {
      title: 'Seminar on Career Planning Roadmap',
      organization: 'Certification of Achievement',
      year: '2026',
      description:
        'Awarded for exceptional performance and dedication in professional development and community engagement initiatives.',
      certificate: 'https://lh3.googleusercontent.com/d/10nYhle0WurcdfaBx-QuWou-lkQSqmK5t'
    },
    {
      title: 'Sawtul ilm',
      organization: 'Educational Platform',
      year: '2026',
      description:
        'Involved in educational initiatives and knowledge-sharing programs through the Sawtul ilm platform.',
      certificate: 'https://lh3.googleusercontent.com/d/1EEIhE9SeHbOR9wC6QyA9aOasUT1MZ9CV'
    },
    {
      title: 'Computer Architecture',
      organization: 'Online Course',
      year: '2026',
      description:
        'Comprehensive study of computer architecture, instruction sets, and hardware-software interface.',
      certificate: 'https://lh3.googleusercontent.com/d/17iWjF6l0brFj07XcZgBqTJcZGaGJptHz'
    },
    {
      title: 'Database Management Course',
      organization: 'Professional Certification',
      year: '2026',
      description: 'In-depth study of SQL, database design, and management systems.',
      certificate: 'https://lh3.googleusercontent.com/d/1q4AIllXCXpYOT3rBQughx1DMADP1KXje'
    },
    {
      title: 'Chief Executive Officer (CEO)',
      organization: 'Agrapaathik',
      year: '2025 - present',
      description:
        'Leading Agrapaathik, an organization dedicated to community development, social impact, and organizing impactful events.',
      certificate: 'https://lh3.googleusercontent.com/d/1SRg9qRwsQQaDSJRdXHdv1aeCKevmit-n'
    },
    {
      title: 'Code Trap',
      organization: 'Coding Challenge',
      year: '2025',
      description:
        'Successfully completed the Code Trap challenge, showcasing proficiency in programming and debugging.',
      certificate: 'https://lh3.googleusercontent.com/d/1KTJR5XVsTQpkpDX7OHyVQpTytwzXSYvm'
    },
    {
      title: 'Microsoft Office Starter Course',
      organization: 'Digital Skills Program',
      year: '2025',
      description:
        'Completed a foundational course on Microsoft Office tools, including Word, Excel, and PowerPoint.',
      certificate: 'https://lh3.googleusercontent.com/d/11EcLgfnoKhUABZM9vCWkqRaBDGh9PrZl'
    },
    {
      title: 'Know Thyself',
      organization: 'Personal Development Workshop',
      year: '2025',
      description:
        'Attended a workshop focused on self-awareness, emotional intelligence, and personal growth.',
      certificate: 'https://lh3.googleusercontent.com/d/1mEYjDv5rN6IK_ypm_-Oa4Om-wkGnYjXo'
    },
    {
      title: 'Breakout Algorithm',
      organization: 'Algorithm Competition',
      year: '2025',
      description:
        'Participated in the Breakout Algorithm competition, demonstrating problem-solving skills and algorithmic thinking.',
      certificate: 'https://lh3.googleusercontent.com/d/1wIiZBOK__3Up2AD9EW89CKuHDGdV21dU'
    },
    {
      title: 'Recognized Video Editor',
      organization: 'Creative Media Awards',
      year: '2024',
      description:
        'Acknowledged for excellence in video editing and digital storytelling across various platforms.',
      certificate: 'https://lh3.googleusercontent.com/d/1anmYgKnbVeBJlcjnkovKZlYJ9618wmZH'
    },
    {
      title: 'Lunchpad Participant',
      organization: 'UIHP @ UIU',
      year: '2024',
      description:
        'Participated in the Lunchpad program at United International University, focusing on innovation and entrepreneurship.',
      certificate: 'https://lh3.googleusercontent.com/d/1BgsKdQkcZ9OPyQhOEJAFvNEYBCcl0TxY'
    },
    {
      title: 'Chief Executive',
      organization: 'Student Organization',
      year: '2023 - 2024',
      description:
        'Served as the Chief Executive, managing operations and leading a diverse team of volunteers.',
      certificate: 'https://lh3.googleusercontent.com/d/1bBeOoExDg6oSOEZQOoNTuw3FHVTHCPDQ'
    },
    {
      title: 'Scout Camp',
      organization: 'National Scout Group',
      year: '2023',
      description:
        'Participated in a national-level scout camp, focusing on leadership and survival skills.',
      certificate: 'https://lh3.googleusercontent.com/d/1748wF_IvXnB6ZIUEMmJIRNZoiTkPd5E2'
    },
    {
      title: 'Project Humanity',
      organization: 'Social Welfare Initiative',
      year: '2023',
      description:
        'Contributing to various social welfare activities and community support programs.',
      certificate: 'https://lh3.googleusercontent.com/d/1XgHxzeuy80bNG_bxfTZ9hx1EiSlqugsg'
    },
    {
      title: 'Corporate Etiquette Course',
      organization: 'Professional Development Program',
      year: '2023',
      description:
        'Completed a comprehensive course on professional behavior, communication, and workplace ethics.',
      certificate: 'https://lh3.googleusercontent.com/d/1ZyAxDDf93SG4mxQdHtpFY4Pg0rF6jghf'
    },
    {
      title: 'Youth Empowerment Workshop',
      organization: 'Global Youth Forum',
      year: '2022',
      description:
        'Participated in a workshop dedicated to empowering young leaders and fostering social change.',
      certificate: 'https://lh3.googleusercontent.com/d/1_2Cbgcvs07wH8jyGBDX5ZB7Fpuu-jLRI'
    },
    {
      title: 'Digital Literacy Course',
      organization: 'Online Certification',
      year: '2022',
      description:
        'Successfully completed a course focusing on essential digital skills and online safety.',
      certificate: 'https://lh3.googleusercontent.com/d/1IZ-OD_VcKRfW-c8KPVb9QT2NIWFA0xRq'
    }
  ];

  const PROJECTS = [
    {
      title: 'Banking Transaction Management System',
      description:
        'A secure and efficient system for managing bank transactions, account balances, and financial records with data-driven insights.',
      image:
        'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1200&h=800',
      tech: ['C', 'File Handling', 'Data Management'],
      link: '',
      github: 'https://github.com/mehediabid17-lgtm/Banking_Transaction_Management_System'
    },
    {
      title: 'Agrapathik Social Organization Website',
      description:
        'A dedicated platform for Agrapaathik to showcase community impact, manage volunteer activities, and organize social events.',
      image: 'https://lh3.googleusercontent.com/d/1MqUXwywXZ9ng9I9KxFZozTQB8OuVeoVS',
      tech: ['React', 'Tailwind CSS', 'Firebase', 'Motion'],
      link: '#',
      github: '#'
    },
    {
      title: 'Personal Portfolio Website',
      description:
        'A modern, responsive portfolio website built to highlight my expertise in Data Science, Machine Learning, and Software Engineering.',
      image: 'https://lh3.googleusercontent.com/d/1Ndola8V3NBqVVnb0o3vo7pQCcPuA8ol9',
      tech: ['React', 'TypeScript', 'Tailwind CSS', 'Motion'],
      link: 'https://portfolio-of-abid.vercel.app/',
      github: 'https://github.com/mehediabid17-lgtm/Portfolio-Of-Abid'
    }
  ];

  const SKILL_CATEGORIES = [
    {
      title: 'Data Science',
      icon: ICONS.code2,
      skills: [
        { name: 'Python (Pandas, NumPy)', level: 90 },
        { name: 'SQL & Database Design', level: 85 },
        { name: 'Statistical Modeling', level: 80 },
        { name: 'Data Visualization', level: 85 }
      ]
    },
    {
      title: 'Machine Learning',
      icon: ICONS.brain,
      skills: [
        { name: 'Scikit-Learn', level: 85 },
        { name: 'Neural Networks', level: 75 },
        { name: 'Predictive Analytics', level: 80 },
        { name: 'Deep Learning', level: 70 }
      ]
    },
    {
      title: 'Software Engineering',
      icon: ICONS.terminal,
      skills: [
        { name: 'C Programming', level: 86 },
        { name: 'React & TypeScript', level: 85 },
        { name: 'System Architecture', level: 80 },
        { name: 'API Development', level: 85 },
        { name: 'Git & Version Control', level: 90 }
      ]
    },
    {
      title: 'Soft Skills',
      icon: ICONS.users,
      skills: [
        { name: 'Leadership (CEO & Founder)', level: 95 },
        { name: 'Event Management', level: 90 },
        { name: 'Public Speaking', level: 85 },
        { name: 'Team Collaboration', level: 92 },
        { name: 'Strategic Planning', level: 88 }
      ]
    }
  ];

  const TYPEWRITER_WORDS = [
    'Software Engineering Student',
    'ML Enthusiast',
    'Problem Solver',
    'Data Science Enthusiast'
  ];

  // --------------------------------------------------------------------------
  // State & DOM References
  // --------------------------------------------------------------------------
  const navbar = document.getElementById('navbar');
  const desktopNavLinks = document.getElementById('desktop-nav-links');
  const mobileNavLinks = document.getElementById('mobile-nav-links');
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const themeToggle = document.getElementById('theme-toggle');
  const pageRoot = document.getElementById('page-root');
  const mouseGlow = document.getElementById('mouse-glow');
  const floatingPackets = document.getElementById('floating-packets');
  const footerYear = document.getElementById('footer-year');

  const certModal = document.getElementById('certificate-modal');
  const certModalCard = document.getElementById('cert-modal-card');
  const certModalTitle = document.getElementById('cert-modal-title');
  const certModalImg = document.getElementById('cert-modal-img');
  const certModalLoader = document.getElementById('cert-modal-loader');
  const certModalCloseIcon = document.getElementById('cert-modal-close-icon');
  const certModalCloseBtn = document.getElementById('cert-modal-close-btn');

  let isMobileMenuOpen = false;
  let currentPath = '/';
  let currentTheme = 'night';
  let typewriterTimer = null;
  let revealObserver = null;

  // --------------------------------------------------------------------------
  // Helpers
  // --------------------------------------------------------------------------
  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function normalizePath(path) {
    if (!path || path === '/') return '/';
    const cleaned = path.replace(/\/+$/, '');
    const validRoutes = NAV_LINKS.map((l) => l.href);
    return validRoutes.includes(cleaned) ? cleaned : '/';
  }

  function getInitialPath() {
    if (window.location.protocol === 'file:' && window.location.hash) {
      return normalizePath(window.location.hash.slice(1));
    }
    return normalizePath(window.location.pathname);
  }

  // --------------------------------------------------------------------------
  // Day / Night Mode Theme
  // --------------------------------------------------------------------------
  function applyTheme(theme) {
    currentTheme = theme === 'day' ? 'day' : 'night';
    document.documentElement.setAttribute('data-theme', currentTheme);

    try {
      window.localStorage.setItem('portfolio-theme', currentTheme);
    } catch (_) {
      // Ignore storage errors in restricted environments
    }

    if (themeToggle) {
      const isDay = currentTheme === 'day';
      const label = isDay ? 'Night' : 'Day';
      const actionLabel = isDay ? 'Switch to Night Mode' : 'Switch to Day Mode';
      themeToggle.innerHTML = `${isDay ? ICONS.moon : ICONS.sun}<span>${label}</span>`;
      themeToggle.setAttribute('aria-label', actionLabel);
      themeToggle.setAttribute('title', actionLabel);
      themeToggle.setAttribute('aria-pressed', String(isDay));
    }
  }

  function initTheme() {
    let savedTheme = 'night';
    try {
      const stored = window.localStorage.getItem('portfolio-theme');
      if (stored === 'day' || stored === 'night') {
        savedTheme = stored;
      }
    } catch (_) {
      savedTheme = 'night';
    }
    applyTheme(savedTheme);

    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        applyTheme(currentTheme === 'day' ? 'night' : 'day');
      });
    }
  }

  // --------------------------------------------------------------------------
  // Ambient Background Initialization
  // --------------------------------------------------------------------------
  function initFloatingPackets() {
    if (!floatingPackets) return;
    let html = '';

    for (let i = 0; i < 5; i++) {
      const left = (Math.random() * 100).toFixed(2);
      const duration = (15 + Math.random() * 15).toFixed(2);
      const delay = (Math.random() * 10).toFixed(2);
      html += `<div class="data-packet" style="left:${left}%;animation-duration:${duration}s;animation-delay:${delay}s;"></div>`;
    }

    const terms = ['DATA', 'ML', 'AI'];
    terms.forEach((term, i) => {
      const left = (Math.random() * 100).toFixed(2);
      const top = (Math.random() * 100).toFixed(2);
      const duration = (8 + Math.random() * 8).toFixed(2);
      const delay = i * 4;
      html += `<div class="tech-term" style="left:${left}%;top:${top}%;animation-duration:${duration}s;animation-delay:${delay}s;">${term}</div>`;
    });

    floatingPackets.innerHTML = html;
  }

  function initMouseGlow() {
    if (!mouseGlow) return;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    window.addEventListener(
      'mousemove',
      (e) => {
        targetX = e.clientX;
        targetY = e.clientY;
      },
      { passive: true }
    );

    function tick() {
      currentX += (targetX - currentX) * 0.1;
      currentY += (targetY - currentY) * 0.1;
      mouseGlow.style.transform = `translate3d(${currentX - 300}px, ${currentY - 300}px, 0)`;
      window.requestAnimationFrame(tick);
    }

    window.requestAnimationFrame(tick);
  }

  // --------------------------------------------------------------------------
  // Navbar & Mobile Menu
  // --------------------------------------------------------------------------
  function updateNavbarScrollState() {
    if (!navbar) return;
    const isScrolled = window.scrollY > 20 || currentPath !== '/';
    navbar.classList.toggle('scrolled', isScrolled);
  }

  function renderNavbar() {
    if (desktopNavLinks) {
      desktopNavLinks.innerHTML = NAV_LINKS.map((link) => {
        const isActive = currentPath === link.href;
        return `
          <a href="${link.href}" data-route="${link.href}" class="nav-link ${isActive ? 'active' : ''}">
            ${escapeHtml(link.name)}
            ${isActive ? '<span class="nav-link-underline"></span>' : ''}
          </a>
        `;
      }).join('');
    }

    if (mobileNavLinks) {
      mobileNavLinks.innerHTML =
        NAV_LINKS.map((link) => {
          const isActive = currentPath === link.href;
          return `
            <a href="${link.href}" data-route="${link.href}" class="mobile-nav-link ${isActive ? 'active' : ''}">
              ${escapeHtml(link.name)}
            </a>
          `;
        }).join('') +
        `
          <a
            href="https://drive.google.com/file/d/1av2uOGhOnMayS2xQPic2vAB0hcpmdG3h/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            class="mobile-cv-btn"
          >
            CV
          </a>
        `;
    }

    if (mobileMenuToggle) {
      mobileMenuToggle.innerHTML = isMobileMenuOpen ? ICONS.x : ICONS.menu;
      mobileMenuToggle.setAttribute('aria-expanded', String(isMobileMenuOpen));
    }

    if (mobileMenu) {
      mobileMenu.classList.toggle('open', isMobileMenuOpen);
    }
  }

  function setMobileMenu(open) {
    isMobileMenuOpen = open;
    renderNavbar();
  }

  // --------------------------------------------------------------------------
  // Shared ExploreJourney Section (for subpages) & Home Sections
  // --------------------------------------------------------------------------
  function renderExploreJourney() {
    const displayPages = JOURNEY_PAGES.filter((page) => page.href !== currentPath);

    return `
      <section class="explore-section">
        <div class="container-xl">
          <div class="section-header-center">
            <h2 class="explore-title">Explore My Journey</h2>
            <p class="explore-sub">
              Dive deeper into my academic background, professional experiences, and the projects I've built.
            </p>
          </div>

          <div class="explore-grid">
            ${displayPages
              .map(
                (item) => `
              <div class="explore-card-wrap reveal-scale">
                <a href="${item.href}" data-route="${item.href}" class="warp-card explore-card">
                  <div class="explore-card-icon ${item.bgColor} ${item.textColor}">
                    ${item.icon}
                  </div>
                  <h3 class="explore-card-title">
                    ${escapeHtml(item.title)}
                    <span class="explore-card-chevron">${ICONS.chevronRight}</span>
                  </h3>
                  <p class="explore-card-desc">${escapeHtml(item.desc)}</p>
                </a>
              </div>
            `
              )
              .join('')}
          </div>
        </div>
      </section>
    `;
  }

  function renderHomeSkillsSection() {
    return `
      <section class="home-skills-section">
        <div class="container-xl">
          <div class="section-header-center">
            <h2 class="page-title">Expertise</h2>
            <p class="page-subtitle">Technical stack and statistical tools in my environment.</p>
          </div>

          <div class="skills-grid">
            ${SKILL_CATEGORIES.map(
              (cat) => `
              <div class="warp-card skill-card reveal-up">
                <div class="skill-card-head">
                  <div class="skill-icon-box">
                    ${cat.icon}
                  </div>
                  <h3 class="skill-cat-title">${escapeHtml(cat.title)}</h3>
                </div>
                <div class="skill-list">
                  ${cat.skills
                    .map(
                      (skill) => `
                    <div>
                      <div class="skill-row-head">
                        <span class="skill-name">${escapeHtml(skill.name)}</span>
                        <span class="skill-pct">${skill.level}%</span>
                      </div>
                      <div class="skill-track">
                        <div class="skill-bar" data-level="${skill.level}"></div>
                      </div>
                    </div>
                  `
                    )
                    .join('')}
                </div>
              </div>
            `
            ).join('')}
          </div>
        </div>
      </section>
    `;
  }

  function renderHomeExploreJourney() {
    const featuredEducation =
      EDUCATION.find((item) => item.degree.includes('Bachelor of Science (BSc) in Software Engineering')) ||
      EDUCATION[0];
    const featuredExperience =
      EXPERIENCE.find((item) => item.role === 'Executive' && item.company.includes('DIU_SEC')) ||
      EXPERIENCE[0];
    const featuredCertificate =
      CO_CURRICULAR.find((item) => item.title === 'Code Trap') || CO_CURRICULAR[0];
    const featuredProject =
      PROJECTS.find((item) => item.title === 'Agrapathik Social Organization Website') || PROJECTS[0];

    return `
      <section class="explore-section">
        <div class="container-xl">
          <div class="section-header-center">
            <h2 class="explore-title">Explore My Journey</h2>
            <p class="explore-sub">
              Dive deeper into my academic background, professional experiences, and the projects I've built.
            </p>
          </div>

          <div class="journey-showcase-list">
            <!-- 1. Education -->
            <div class="journey-showcase-item reveal-up">
              <div class="journey-item-header" data-route="/education" role="link" tabindex="0">
                <div class="journey-item-icon bg-violet-soft text-violet-400">
                  ${ICONS.bookOpen}
                </div>
                <h3 class="journey-item-label">Education</h3>
              </div>

              <div class="warp-card edu-card journey-card-interactive" data-route="/education" role="link" tabindex="0">
                <div>
                  <span class="item-year-violet">${escapeHtml(featuredEducation.year)}</span>
                  <h4 class="item-title-3xl">${escapeHtml(featuredEducation.degree)}</h4>
                  <p class="item-org-xl">${escapeHtml(featuredEducation.institution)}</p>
                  <p class="item-desc-lg">${escapeHtml(featuredEducation.description)}</p>
                </div>
              </div>

              <div class="explore-more-wrap">
                <a href="/education" data-route="/education" class="explore-more-btn warp-glow">
                  Explore more ${ICONS.chevronRight}
                </a>
              </div>
            </div>

            <!-- 2. Experience -->
            <div class="journey-showcase-item reveal-up">
              <div class="journey-item-header" data-route="/experience" role="link" tabindex="0">
                <div class="journey-item-icon bg-blue-soft text-blue-400">
                  ${ICONS.briefcase}
                </div>
                <h3 class="journey-item-label">Experience</h3>
              </div>

              <div class="warp-card exp-card journey-card-interactive" data-route="/experience" role="link" tabindex="0">
                <div>
                  <span class="item-year-blue">${escapeHtml(featuredExperience.duration)}</span>
                  <h4 class="item-title-3xl">${escapeHtml(featuredExperience.role)}</h4>
                  <p class="item-org-xl">${escapeHtml(featuredExperience.company)}</p>
                  <p class="item-desc-lg">${escapeHtml(featuredExperience.description)}</p>
                </div>
                ${
                  featuredExperience.certificate
                    ? `
                  <div>
                    <div class="exp-cert-box">
                      <img
                        src="${escapeHtml(featuredExperience.certificate)}"
                        alt="${escapeHtml(featuredExperience.role)} Certificate"
                        referrerpolicy="no-referrer"
                        loading="lazy"
                        decoding="async"
                      />
                      <div class="exp-cert-overlay">
                        <span class="exp-cert-pill">
                          Explore Experience ${ICONS.chevronRight}
                        </span>
                      </div>
                    </div>
                  </div>
                `
                    : ''
                }
              </div>

              <div class="explore-more-wrap">
                <a href="/experience" data-route="/experience" class="explore-more-btn warp-glow">
                  Explore more ${ICONS.chevronRight}
                </a>
              </div>
            </div>

            <!-- 3. Certificates (Code Trap) -->
            <div class="journey-showcase-item reveal-up">
              <div class="journey-item-header" data-route="/certificates" role="link" tabindex="0">
                <div class="journey-item-icon bg-amber-soft text-amber-400">
                  ${ICONS.award}
                </div>
                <h3 class="journey-item-label">Certificates</h3>
              </div>

              <div class="warp-card exp-card journey-card-interactive" data-route="/certificates" role="link" tabindex="0">
                <div>
                  <span class="item-year-violet">${escapeHtml(featuredCertificate.year)}</span>
                  <h4 class="item-title-3xl">${escapeHtml(featuredCertificate.title)}</h4>
                  <p class="item-org-xl">${escapeHtml(featuredCertificate.organization)}</p>
                  <p class="item-desc-lg">${escapeHtml(featuredCertificate.description)}</p>
                </div>
                <div>
                  <div class="exp-cert-box">
                    <img
                      src="${escapeHtml(featuredCertificate.certificate)}"
                      alt="${escapeHtml(featuredCertificate.title)} Certificate"
                      referrerpolicy="no-referrer"
                      loading="lazy"
                      decoding="async"
                    />
                    <div class="cert-overlay">
                      <span class="cert-pill warp-glow">
                        Explore Certificates ${ICONS.chevronRight}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="explore-more-wrap">
                <a href="/certificates" data-route="/certificates" class="explore-more-btn warp-glow">
                  Explore more ${ICONS.chevronRight}
                </a>
              </div>
            </div>

            <!-- 4. Projects (Agrapathik Social Organization Website) -->
            <div class="journey-showcase-item reveal-up">
              <div class="journey-item-header" data-route="/projects" role="link" tabindex="0">
                <div class="journey-item-icon bg-emerald-soft text-emerald-400">
                  ${ICONS.layers}
                </div>
                <h3 class="journey-item-label">Projects</h3>
              </div>

              <div class="warp-card journey-project-card journey-card-interactive" data-route="/projects" role="link" tabindex="0">
                <div class="journey-project-thumb">
                  <img
                    src="${escapeHtml(featuredProject.image)}"
                    alt="${escapeHtml(featuredProject.title)}"
                    referrerpolicy="no-referrer"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div>
                  <div class="project-tech-list">
                    ${featuredProject.tech
                      .map((t) => `<span class="project-tech-tag">${escapeHtml(t)}</span>`)
                      .join('')}
                  </div>
                  <h4 class="item-title-3xl">${escapeHtml(featuredProject.title)}</h4>
                  <p class="item-desc-lg">${escapeHtml(featuredProject.description)}</p>
                </div>
              </div>

              <div class="explore-more-wrap">
                <a href="/projects" data-route="/projects" class="explore-more-btn warp-glow">
                  Explore more ${ICONS.chevronRight}
                </a>
              </div>
            </div>

            <!-- 5. Contact -->
            <div class="journey-showcase-item reveal-up">
              <div class="journey-item-header" data-route="/contact" role="link" tabindex="0">
                <div class="journey-item-icon bg-indigo-soft text-indigo-400">
                  ${ICONS.mail}
                </div>
                <h3 class="journey-item-label">Contact</h3>
              </div>

              <div class="warp-card journey-contact-card journey-card-interactive" data-route="/contact" role="link" tabindex="0">
                <h4 class="item-title-3xl">Connect</h4>
                <p class="item-desc-lg">
                  I'm always open to new opportunities and collaborations. Feel free to reach out via any of the channels below.
                </p>

                <div class="journey-contact-channels">
                  <div class="warp-card contact-channel-card violet">
                    <div class="contact-channel-icon violet">
                      ${ICONS.mail}
                    </div>
                    <div>
                      <p class="contact-channel-label">Email</p>
                      <p class="contact-channel-val">mehedihasanabid17@gmail.com</p>
                    </div>
                  </div>

                  <div class="warp-card contact-channel-card blue">
                    <div class="contact-channel-icon blue">
                      ${ICONS.mapPin}
                    </div>
                    <div>
                      <p class="contact-channel-label">Location</p>
                      <p class="contact-channel-val">Uttara Sector 6, Dhaka-1230, Bangladesh</p>
                    </div>
                  </div>

                  <div class="warp-card contact-channel-card emerald">
                    <div class="contact-channel-icon emerald">
                      ${ICONS.phone}
                    </div>
                    <div>
                      <p class="contact-channel-label">Phone</p>
                      <p class="contact-channel-val">01905032251</p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="explore-more-wrap">
                <a href="/contact" data-route="/contact" class="explore-more-btn warp-glow">
                  Explore more ${ICONS.chevronRight}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  // --------------------------------------------------------------------------
  // Page Renderers
  // --------------------------------------------------------------------------
  function renderHomePage() {
    return `
      <div class="page-wrapper">
        <!-- Hero Section -->
        <section class="hero-section">
          <div class="hero-glow-1"></div>
          <div class="hero-glow-2"></div>

          <div class="hero-floating-icons" aria-hidden="true">
            <div class="hero-float-cpu">${ICONS.cpu}</div>
            <div class="hero-float-terminal">${ICONS.terminal}</div>
            <div class="hero-float-code">${ICONS.code2}</div>
          </div>

          <div class="container-xl hero-grid">
            <div class="hero-copy">
              <span class="hero-badge">Software Engineering &amp; Data Science</span>
              <h1 class="hero-title">
                Hi, I'm <span class="hero-name-gradient">Mehedi Hasan Abid</span>
              </h1>
              <div class="hero-typewriter-wrap">
                I am a <span class="text-white"><span id="typewriter-text"></span><span class="typewriter-cursor">|</span></span>
              </div>

              <div class="hero-actions">
                <a href="/projects" data-route="/projects" class="hero-btn-primary">
                  View Projects ${ICONS.chevronRight}
                </a>
                <a href="/contact" data-route="/contact" class="hero-btn-secondary">
                  Contact Me
                </a>
              </div>
            </div>

            <div class="hero-image-col">
              <div class="hero-image-frame-wrap">
                <div class="hero-image-pulse"></div>
                <div class="hero-image-card">
                  <img
                    src="https://lh3.googleusercontent.com/d/13gola0am9SfPMxbJUjGR_V7IGSK9Ga-I"
                    alt="Mehedi Hasan Abid"
                    referrerpolicy="no-referrer"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div class="hero-deco-tr"></div>
                <div class="hero-deco-bl"></div>
              </div>
            </div>
          </div>

          <div class="scroll-indicator">
            <span class="scroll-indicator-label">Scroll to explore</span>
            <div class="scroll-indicator-arrow">${ICONS.arrowDown}</div>
          </div>
        </section>

        <!-- About Section -->
        <section class="about-section">
          <div class="container-xl">
            <div class="about-grid">
              <div class="about-image-wrap reveal-left">
                <div class="about-image-card">
                  <img
                    src="https://lh3.googleusercontent.com/d/1bKCgrClSnZ740vDgDpjWALJKmc0wW8Hl"
                    alt="Mehedi Hasan Abid"
                    referrerpolicy="no-referrer"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div class="about-deco-br"></div>
                <div class="about-deco-tl"></div>
              </div>

              <div class="reveal-right">
                <h2 class="about-heading">About Me</h2>
                <p class="about-text">
                  I am a <span class="highlight">Software Engineering student</span> at <span class="highlight">Daffodil International University</span> with a track record of academic excellence, including a <span class="highlight">perfect 5.00 GPA</span> in my SSC and HSC. Currently serving as the <span class="highlight">Chief Executive Officer (CEO) of Agrapathik</span>, I blend executive leadership with a deep technical curiosity. My vision is to evolve into a <span class="highlight">Data Science professional</span> specializing in <span class="highlight">Machine Learning and AI</span>. I am dedicated to designing intelligent, data-driven solutions that solve real-world problems and enhance efficiency through innovative system architecture.
                </p>

                <div class="about-cards-grid">
                  <div class="warp-card about-mini-card">
                    <div class="about-mini-icon bg-violet-soft text-violet-400">
                      ${ICONS.briefcase}
                    </div>
                    <div>
                      <h4 class="about-mini-title">Focus</h4>
                      <p class="about-mini-desc">Machine Learning &amp; Analytics</p>
                    </div>
                  </div>

                  <div class="warp-card about-mini-card">
                    <div class="about-mini-icon bg-blue-soft text-blue-400">
                      ${ICONS.graduationCap}
                    </div>
                    <div>
                      <h4 class="about-mini-title">Education</h4>
                      <p class="about-mini-desc">Data Science &amp; SWE Student</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- My Vision Section -->
        <section class="vision-section">
          <div class="container-xl">
            <div class="warp-card vision-card reveal-up">
              <div class="vision-glow-tr"></div>
              <div class="vision-glow-bl"></div>

              <div class="vision-flex">
                <div class="vision-icon-box">
                  ${ICONS.target}
                </div>
                <div>
                  <h2 class="vision-title">My Vision</h2>
                  <p class="vision-quote">
                    "My vision is to become a highly skilled software engineer and data science professional with expertise in machine learning and artificial intelligence. I aim to combine my technical proficiency with analytical thinking to design intelligent, data-driven solutions that solve real-world problems. By leveraging the power of AI and modern software development, I strive to create innovative systems that enhance efficiency, improve decision-making, and contribute to technological advancement. I am committed to continuous learning and growth, with the goal of making a meaningful impact in the evolving world of data and intelligent technologies."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        ${renderHomeSkillsSection()}

        ${renderHomeExploreJourney()}
      </div>
    `;
  }

  function renderEducationPage() {
    return `
      <div class="page-wrapper">
        <section class="page-section">
          <div class="container-xl">
            <div class="section-header-center">
              <h2 class="page-title">Education</h2>
              <p class="page-subtitle">Academic records from my journey.</p>
            </div>

            <div class="stack-16">
              ${EDUCATION.map(
                (item) => `
                <div class="warp-card edu-card reveal-up">
                  <div>
                    <span class="item-year-violet">${escapeHtml(item.year)}</span>
                    <h3 class="item-title-3xl">${escapeHtml(item.degree)}</h3>
                    <p class="item-org-xl">${escapeHtml(item.institution)}</p>
                    <p class="item-desc-lg">${escapeHtml(item.description)}</p>
                  </div>
                </div>
              `
              ).join('')}
            </div>
          </div>
        </section>
        ${renderExploreJourney()}
      </div>
    `;
  }

  function renderExperiencePage() {
    return `
      <div class="page-wrapper">
        <section class="page-section">
          <div class="container-xl">
            <div class="section-header-center">
              <h2 class="page-title">Experience</h2>
              <p class="page-subtitle">Professional history and roles executed in the field.</p>
            </div>

            <div class="stack-16">
              ${EXPERIENCE.map(
                (item) => `
                <div class="warp-card exp-card reveal-up">
                  <div>
                    <span class="item-year-blue">${escapeHtml(item.duration)}</span>
                    <h3 class="item-title-3xl">${escapeHtml(item.role)}</h3>
                    <p class="item-org-xl">${escapeHtml(item.company)}</p>
                    <p class="item-desc-lg">${escapeHtml(item.description)}</p>
                  </div>
                  ${
                    item.certificate
                      ? `
                    <div>
                      <div
                        class="exp-cert-box"
                        data-cert-url="${escapeHtml(item.certificate)}"
                        data-cert-title="${escapeHtml(item.role)}"
                        role="button"
                        tabindex="0"
                      >
                        <img
                          src="${escapeHtml(item.certificate)}"
                          alt="${escapeHtml(item.role)} Certificate"
                          referrerpolicy="no-referrer"
                          loading="lazy"
                          decoding="async"
                        />
                        <div class="exp-cert-overlay">
                          <span class="exp-cert-pill">
                            View Certificate ${ICONS.externalLink}
                          </span>
                        </div>
                      </div>
                    </div>
                  `
                      : ''
                  }
                </div>
              `
              ).join('')}
            </div>
          </div>
        </section>
        ${renderExploreJourney()}
      </div>
    `;
  }

  function renderCertificatesPage() {
    return `
      <div class="page-wrapper">
        <section class="page-section">
          <div class="container-xl">
            <div class="section-header-center">
              <h2 class="page-title">Certificates</h2>
              <p class="page-subtitle">Activities and leadership roles beyond the curriculum.</p>
            </div>

            <div class="cert-grid">
              ${CO_CURRICULAR.map(
                (item) => `
                <div class="warp-card cert-card reveal-up">
                  <div
                    class="cert-thumb-box"
                    data-cert-url="${escapeHtml(item.certificate)}"
                    data-cert-title="${escapeHtml(item.title)}"
                    role="button"
                    tabindex="0"
                  >
                    <img
                      src="${escapeHtml(item.certificate)}"
                      alt="${escapeHtml(item.title)} Certificate"
                      referrerpolicy="no-referrer"
                      loading="lazy"
                      decoding="async"
                    />
                    <div class="cert-overlay">
                      <span class="cert-pill warp-glow">
                        View Certificate ${ICONS.externalLink}
                      </span>
                    </div>
                  </div>
                  <div class="cert-content">
                    <span class="item-year-violet">${escapeHtml(item.year)}</span>
                    <h3 class="cert-title">${escapeHtml(item.title)}</h3>
                    <p class="cert-org">${escapeHtml(item.organization)}</p>
                    <p class="cert-desc">${escapeHtml(item.description)}</p>
                  </div>
                </div>
              `
              ).join('')}
            </div>
          </div>
        </section>
        ${renderExploreJourney()}
      </div>
    `;
  }

  function renderProjectsPage() {
    return `
      <div class="page-wrapper">
        <section class="page-section">
          <div class="container-xl">
            <div class="section-header-center">
              <h2 class="page-title">Data Projects</h2>
              <p class="page-subtitle-projects">
                A selection of my work in data analysis, machine learning, and statistical modeling.
              </p>
            </div>

            <div class="projects-grid">
              ${PROJECTS.map(
                (project) => `
                <div class="warp-card project-card reveal-up">
                  <div class="project-thumb">
                    <img
                      src="${escapeHtml(project.image)}"
                      alt="${escapeHtml(project.title)}"
                      referrerpolicy="no-referrer"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div class="project-body">
                    <div class="project-tech-list">
                      ${project.tech
                        .map((t) => `<span class="project-tech-tag">${escapeHtml(t)}</span>`)
                        .join('')}
                    </div>
                    <h3 class="project-title">${escapeHtml(project.title)}</h3>
                    <p class="project-desc">${escapeHtml(project.description)}</p>
                    <div class="project-links">
                      ${
                        project.link && project.link !== '#'
                          ? `<a href="${escapeHtml(project.link)}" class="project-link-demo">Live Demo ${ICONS.externalLink}</a>`
                          : ''
                      }
                      ${
                        project.github && project.github !== '#'
                          ? `<a href="${escapeHtml(project.github)}" class="project-link-source">Source ${ICONS.github}</a>`
                          : ''
                      }
                    </div>
                  </div>
                </div>
              `
              ).join('')}
            </div>
          </div>
        </section>
        ${renderExploreJourney()}
      </div>
    `;
  }


  function renderContactPage() {
    const socials = [
      { icon: ICONS.github, href: 'https://github.com/mehediabid17-lgtm' },
      { icon: ICONS.linkedin, href: 'https://www.linkedin.com/in/mehediabid/' },
      { icon: ICONS.facebook, href: 'https://www.facebook.com/mehedihasan.abid' },
      { icon: ICONS.messageCircle, href: 'https://wa.me/8801905032251' }
    ];

    return `
      <div class="page-wrapper">
        <section class="page-section">
          <div class="container-xl">
            <div class="contact-grid">
              <div class="reveal-left">
                <h2 class="contact-heading">Connect</h2>
                <p class="contact-sub">
                  I'm always open to new opportunities and collaborations. Feel free to reach out via any of the channels below.
                </p>

                <div class="contact-channels">
                  <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=mehedihasanabid17@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="warp-card contact-channel-card violet"
                  >
                    <div class="contact-channel-icon violet">
                      ${ICONS.mail}
                    </div>
                    <div>
                      <p class="contact-channel-label">Email</p>
                      <p class="contact-channel-val">mehedihasanabid17@gmail.com</p>
                    </div>
                  </a>

                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Uttara+Sector+6+Dhaka-1230+Bangladesh"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="warp-card contact-channel-card blue"
                  >
                    <div class="contact-channel-icon blue">
                      ${ICONS.mapPin}
                    </div>
                    <div>
                      <p class="contact-channel-label">Location</p>
                      <p class="contact-channel-val">Uttara Sector 6, Dhaka-1230, Bangladesh</p>
                    </div>
                  </a>

                  <a href="tel:01905032251" class="warp-card contact-channel-card emerald">
                    <div class="contact-channel-icon emerald">
                      ${ICONS.phone}
                    </div>
                    <div>
                      <p class="contact-channel-label">Phone</p>
                      <p class="contact-channel-val">01905032251</p>
                    </div>
                  </a>
                </div>

                <div class="contact-socials">
                  ${socials
                    .map(
                      (social) => `
                    <a
                      href="${social.href}"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="social-btn"
                    >
                      ${social.icon}
                    </a>
                  `
                    )
                    .join('')}
                </div>
              </div>

              <div class="warp-card contact-form-card reveal-right">
                <form id="contact-form" class="contact-form">
                  <div class="contact-form-row">
                    <div class="form-field">
                      <label class="form-label" for="contact-name">Name</label>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        required
                        placeholder="Enter name..."
                        class="form-input"
                      />
                    </div>
                    <div class="form-field">
                      <label class="form-label" for="contact-email">Email</label>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        required
                        placeholder="Enter email..."
                        class="form-input"
                      />
                    </div>
                  </div>

                  <div class="form-field">
                    <label class="form-label" for="contact-message">Message</label>
                    <textarea
                      id="contact-message"
                      rows="5"
                      name="message"
                      required
                      placeholder="Type message here..."
                      class="form-input form-textarea"
                    ></textarea>
                  </div>

                  <button type="submit" class="form-submit-btn warp-glow">
                    Send Message ${ICONS.send}
                  </button>

                  <p class="form-note">
                    This will open your email app to send the message directly.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
        ${renderExploreJourney()}
      </div>
    `;
  }

  // --------------------------------------------------------------------------
  // Typewriter Effect
  // --------------------------------------------------------------------------
  function stopTypewriter() {
    if (typewriterTimer !== null) {
      window.clearTimeout(typewriterTimer);
      typewriterTimer = null;
    }
  }

  function startTypewriter() {
    stopTypewriter();
    const target = document.getElementById('typewriter-text');
    if (!target) return;

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function step() {
      const currentEl = document.getElementById('typewriter-text');
      if (!currentEl) return;

      const currentWord = TYPEWRITER_WORDS[wordIndex];

      if (!isDeleting) {
        charIndex += 1;
        currentEl.textContent = currentWord.slice(0, charIndex);

        if (charIndex === currentWord.length) {
          isDeleting = true;
          typewriterTimer = window.setTimeout(step, 1000);
          return;
        }
        typewriterTimer = window.setTimeout(step, 70);
      } else {
        charIndex -= 1;
        currentEl.textContent = currentWord.slice(0, charIndex);

        if (charIndex === 0) {
          isDeleting = false;
          wordIndex = (wordIndex + 1) % TYPEWRITER_WORDS.length;
          typewriterTimer = window.setTimeout(step, 200);
          return;
        }
        typewriterTimer = window.setTimeout(step, 50);
      }
    }

    step();
  }

  // --------------------------------------------------------------------------
  // Scroll Reveal & Skill Bars Observer
  // --------------------------------------------------------------------------
  function initObservers() {
    if (revealObserver) {
      revealObserver.disconnect();
      revealObserver = null;
    }

    const revealElements = document.querySelectorAll(
      '.reveal-up, .reveal-left, .reveal-right, .reveal-scale'
    );
    const skillBars = document.querySelectorAll('.skill-bar');

    if (!('IntersectionObserver' in window)) {
      revealElements.forEach((el) => el.classList.add('is-visible'));
      skillBars.forEach((bar) => {
        bar.style.width = `${bar.getAttribute('data-level') || 0}%`;
      });
      return;
    }

    revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;

          if (el.classList.contains('skill-bar')) {
            el.style.width = `${el.getAttribute('data-level') || 0}%`;
          } else {
            el.classList.add('is-visible');
          }
          observer.unobserve(el);
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -30px 0px' }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
    skillBars.forEach((bar) => revealObserver.observe(bar));
  }

  // --------------------------------------------------------------------------
  // Certificate Modal
  // --------------------------------------------------------------------------
  function openCertificateModal(url, title) {
    if (!certModal || !certModalImg || !certModalTitle || !certModalLoader) return;

    certModalTitle.textContent = title || '';
    certModalLoader.classList.remove('hidden');
    certModalImg.classList.add('is-loading');
    certModalImg.alt = title || 'Certificate';
    certModalImg.src = url;

    certModal.classList.add('open');
    certModal.setAttribute('aria-hidden', 'false');
  }

  function closeCertificateModal() {
    if (!certModal) return;
    certModal.classList.remove('open');
    certModal.setAttribute('aria-hidden', 'true');
  }

  function initCertificateModal() {
    if (certModalCloseIcon) {
      certModalCloseIcon.innerHTML = ICONS.x;
      certModalCloseIcon.addEventListener('click', closeCertificateModal);
    }
    if (certModalCloseBtn) {
      certModalCloseBtn.addEventListener('click', closeCertificateModal);
    }
    if (certModalLoader) {
      certModalLoader.innerHTML = ICONS.loader2;
    }
    if (certModalImg) {
      const doneLoading = () => {
        certModalLoader.classList.add('hidden');
        certModalImg.classList.remove('is-loading');
      };
      certModalImg.addEventListener('load', doneLoading);
      certModalImg.addEventListener('error', doneLoading);
    }
    if (certModal) {
      certModal.addEventListener('click', closeCertificateModal);
    }
    if (certModalCard) {
      certModalCard.addEventListener('click', (e) => e.stopPropagation());
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && certModal && certModal.classList.contains('open')) {
        closeCertificateModal();
      }
    });
  }

  // --------------------------------------------------------------------------
  // Contact Form Handler
  // --------------------------------------------------------------------------
  function bindContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const name = formData.get('name');
      const email = formData.get('email');
      const message = formData.get('message');

      const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);

      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=mehedihasanabid17@gmail.com&su=${subject}&body=${body}`;
      const mailtoUrl = `mailto:mehedihasanabid17@gmail.com?subject=${subject}&body=${body}`;

      const newWindow = window.open(gmailUrl, '_blank');
      if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
        window.location.href = mailtoUrl;
      }
    });
  }

  // --------------------------------------------------------------------------
  // Router & Page Lifecycle
  // --------------------------------------------------------------------------
  function renderCurrentPage() {
    if (!pageRoot) return;
    stopTypewriter();

    let html = '';
    switch (currentPath) {
      case '/education':
        html = renderEducationPage();
        break;
      case '/experience':
        html = renderExperiencePage();
        break;
      case '/certificates':
        html = renderCertificatesPage();
        break;
      case '/projects':
        html = renderProjectsPage();
        break;
      case '/contact':
        html = renderContactPage();
        break;
      case '/':
      default:
        html = renderHomePage();
        break;
    }

    pageRoot.innerHTML = html;
    renderNavbar();
    updateNavbarScrollState();
    initObservers();

    if (currentPath === '/') {
      startTypewriter();
    } else if (currentPath === '/contact') {
      bindContactForm();
    }
  }

  function navigateTo(targetPath, pushHistory = true) {
    const nextPath = normalizePath(targetPath);
    if (isMobileMenuOpen) {
      isMobileMenuOpen = false;
    }

    if (pushHistory) {
      if (window.location.protocol === 'file:') {
        window.location.hash = nextPath;
      } else if (window.location.pathname !== nextPath) {
        window.history.pushState({ path: nextPath }, '', nextPath);
      }
    }

    currentPath = nextPath;
    window.scrollTo(0, 0);
    renderCurrentPage();
  }

  // --------------------------------------------------------------------------
  // Global Event Delegation & Bootstrap
  // --------------------------------------------------------------------------
  function init() {
    if (footerYear) {
      footerYear.textContent = String(new Date().getFullYear());
    }

    initTheme();
    initFloatingPackets();
    initMouseGlow();
    initCertificateModal();

    if (mobileMenuToggle) {
      mobileMenuToggle.addEventListener('click', () => {
        setMobileMenu(!isMobileMenuOpen);
      });
    }

    window.addEventListener('scroll', updateNavbarScrollState, { passive: true });

    window.addEventListener('popstate', () => {
      currentPath = getInitialPath();
      isMobileMenuOpen = false;
      window.scrollTo(0, 0);
      renderCurrentPage();
    });

    window.addEventListener('hashchange', () => {
      if (window.location.protocol === 'file:') {
        currentPath = getInitialPath();
        isMobileMenuOpen = false;
        window.scrollTo(0, 0);
        renderCurrentPage();
      }
    });

    // Delegate route link/card clicks and certificate modal clicks
    document.addEventListener('click', (e) => {
      const routeTrigger = e.target.closest('[data-route]');
      if (routeTrigger) {
        if (routeTrigger.tagName === 'A' && (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0)) {
          return;
        }
        e.preventDefault();
        navigateTo(routeTrigger.getAttribute('data-route'), true);
        return;
      }

      const certTrigger = e.target.closest('[data-cert-url]');
      if (certTrigger) {
        const url = certTrigger.getAttribute('data-cert-url');
        const title = certTrigger.getAttribute('data-cert-title') || '';
        if (url) {
          openCertificateModal(url, title);
        }
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        const routeTrigger = e.target.closest('[data-route]');
        if (routeTrigger && routeTrigger.tagName !== 'A') {
          e.preventDefault();
          navigateTo(routeTrigger.getAttribute('data-route'), true);
          return;
        }

        const certTrigger = e.target.closest('[data-cert-url]');
        if (certTrigger) {
          e.preventDefault();
          const url = certTrigger.getAttribute('data-cert-url');
          const title = certTrigger.getAttribute('data-cert-title') || '';
          if (url) {
            openCertificateModal(url, title);
          }
        }
      }
    });

    currentPath = getInitialPath();
    renderCurrentPage();
  }

  init();
})();
