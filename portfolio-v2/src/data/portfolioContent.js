const githubUsername = 'marvinlavoe';
const githubProfileUrl = `https://github.com/${githubUsername}`;

export const portfolioContent = {
  siteMeta: {
    name: 'Marvin Lavoe',
    shortName: 'ML',
    role: 'UX/UI & Product Designer',
    description:
      'Marvin Lavoe is a UX/UI and product designer focused on enterprise systems, mobile products, IoT, and emerging technology.',
    location: 'Kumasi, Ghana',
    availability: 'Available for design opportunities.',
    navigation: [
      { label: 'Work', to: '/work' },
      { label: 'About', to: '/about' },
      { label: 'Resume', to: '/resume' },
      { label: 'Contact', to: '/contact' },
    ],
  },
  hero: {
    eyebrow: 'Software, hardware, and applied problem solving',
    headline: 'Building practical digital products and technical prototypes that solve real problems.',
    intro:
      'I work across Flutter apps, Python tooling, embedded systems, and IoT experiments. This portfolio is designed to show the projects I can explain clearly, the skills I have actually used, and the direction I want to grow in next.',
    primaryCta: { label: 'View Projects', to: '/projects' },
    secondaryCta: { label: 'Contact', to: '/contact' },
    highlights: [
      'Flutter and Firebase app prototypes',
      'IoT, robotics, and embedded hardware builds',
      'Hands-on learning across software and electronics',
    ],
    credibility: [
      { label: 'Base', value: 'Kumasi Technical University' },
      { label: 'Focus', value: 'Apps, automation, and IoT' },
      { label: 'Status', value: 'Actively building portfolio-ready case studies' },
    ],
    portraitNote:
      'A personal portrait will be added soon. For now, this space is intentionally minimal instead of using a stock photo.',
  },
  about: {
    statement:
      'I enjoy combining technology, creativity, and problem solving to build tools that feel useful in the real world. My best work usually sits at the point where software meets hardware, whether that means mobile apps, automation, embedded devices, or experiments that make daily tasks easier.',
    principles: [
      'Build from real constraints, not abstract ideas alone.',
      'Learn by shipping working prototypes and iterating honestly.',
      'Keep communication clear so technical work stays understandable.',
    ],
    interests: ['Audiobooks', 'Reading', 'Chess'],
    languages: ['English', 'Twi', 'Ewe'],
  },
  education: {
    intro: 'My academic path and the environments that shaped how I approach technical work.',
    items: [
      {
        school: 'Kumasi Technical University',
        period: '2021 - 2025',
        qualification: 'BTech. Computer Technology',
        detail: 'Built a foundation in software development, electronics, and problem-driven technical projects.',
      },
      {
        school: 'Winneba Secondary School',
        period: '2014 - 2018',
        qualification: 'General Science, WASSCE',
        detail: 'Developed the science and analytical background that later fed into engineering and computing work.',
      },
      {
        school: 'Knowledge Hill School',
        period: '2011 - 2015',
        qualification: 'BECE',
        detail: 'Early academic grounding before moving into science and technical study.',
      },
    ],
  },
  skills: {
    intro: 'A practical overview of the tools and disciplines I reach for most often.',
    categories: [
      {
        title: 'Software and Programming',
        items: ['Flutter', 'Python', 'C++', 'Firebase', 'Git', 'Website Design', 'Figma', 'Adobe XD'],
      },
      {
        title: 'IoT and Hardware',
        items: ['ESP32', 'Arduino', 'MQTT', 'Embedded Systems', 'Electrical Repairs'],
      },
      {
        title: 'Creative and Media',
        items: ['Photoshop', 'Video Editing', 'Graphic Design', '3D Modelling'],
      },
      {
        title: 'Professional Skills',
        items: ['Digital Marketing', 'Customer Relationship Management', 'Leadership'],
      },
    ],
  },
  projects: [
    {
      id: 1,
      title: 'Gesture-Controlled Mecanum Wheel Robot',
      summary: 'An IoT robotics prototype that turns hand motion into directional robot control.',
      problem:
        'I wanted a more intuitive control method for a robot platform than a conventional joystick or keyboard setup.',
      role: 'Designed the control flow, hardware integration, wireless communication, and obstacle-awareness logic.',
      outcome:
        'Built a working prototype using ESP32, MPU6050, MQTT, and Raspberry Pi components to translate gestures into movement commands.',
      stack: ['ESP32', 'Raspberry Pi', 'MQTT', 'MPU6050', 'IoT'],
      featured: true,
      accent: '#0f766e',
      links: {
        demo: null,
        repo: null,
        caseStudy: null,
      },
    },
    {
      id: 2,
      title: 'Smart Facial Recognition Attendance System',
      summary: 'A desktop attendance workflow that combines recognition, storage, and reporting.',
      problem:
        'Manual attendance processes can be slow, inconsistent, and difficult to verify at scale.',
      role: 'Built the interface, recognition workflow, and data storage integration.',
      outcome:
        'Created a Python and PyQt5 system with real-time face recognition and Firebase-backed attendance tracking.',
      stack: ['Python', 'PyQt5', 'OpenCV', 'Firebase'],
      featured: true,
      accent: '#1d4ed8',
      links: {
        demo: null,
        repo: null,
        caseStudy: null,
      },
    },
    {
      id: 3,
      title: 'Sales Management App',
      summary: 'A Flutter app focused on practical sales tracking and day-to-day record keeping.',
      problem:
        'Small sales workflows often rely on scattered notes or spreadsheets that are hard to maintain consistently.',
      role: 'Designed and built the mobile experience, data flow, and Firebase-backed storage.',
      outcome:
        'Delivered a mobile app that supports business record management with real-time data access and authentication.',
      stack: ['Flutter', 'Firebase', 'Dart'],
      featured: true,
      accent: '#0369a1',
      links: {
        demo: null,
        repo: null,
        caseStudy: null,
      },
    },
    {
      id: 4,
      title: 'Deadline Assistant',
      summary: 'A lightweight planning app for reminders and task follow-through.',
      problem: 'Students and busy teams need a simple way to keep deadlines visible and actionable.',
      role: 'Built the scheduling flow, reminder logic, and persistence layer.',
      outcome:
        'Produced a Flutter-based deadline tracker with task organization and local data storage.',
      stack: ['Flutter', 'Dart', 'SQLite'],
      featured: false,
      accent: '#4f46e5',
      links: {
        demo: null,
        repo: null,
        caseStudy: null,
      },
    },
    {
      id: 5,
      title: 'Offline Voice Assistant',
      summary: 'A voice-command tool designed to work without relying on an internet connection.',
      problem:
        'Many assistants lose usefulness in low-connectivity environments, especially when commands are simple and local.',
      role: 'Integrated voice recognition and command execution around an offline-first workflow.',
      outcome:
        'Built a Python assistant powered by Vosk to execute commands locally without live internet access.',
      stack: ['Python', 'Vosk', 'Speech Recognition'],
      featured: false,
      accent: '#b91c1c',
      links: {
        demo: null,
        repo: null,
        caseStudy: null,
      },
    },
    {
      id: 6,
      title: 'Mini CNC Drawing Machine',
      summary: 'A compact automation build that explores motion control and precision drawing.',
      problem:
        'I wanted a hands-on way to understand how simple automation systems turn instructions into repeatable physical movement.',
      role: 'Built the hardware assembly and control logic for a small automated drawing mechanism.',
      outcome:
        'Completed a working Arduino-based CNC prototype that demonstrates foundational automation and control concepts.',
      stack: ['Arduino', 'CNC', 'Hardware'],
      featured: false,
      accent: '#c2410c',
      links: {
        demo: null,
        repo: null,
        caseStudy: null,
      },
    },
  ],
  contact: {
    intro:
      'The public contact block is still being finalized. I am still happy to connect about internships, junior roles, and collaboration opportunities.',
    note:
      'Direct email and phone details are intentionally not published yet. This is a temporary honest state, not a broken form.',
    preferredChannel: {
      label: 'View GitHub Profile',
      url: githubProfileUrl,
    },
    location: 'Kumasi, Ghana',
    responseWindow: 'Public contact details will be added once they are ready for long-term use.',
    interests: [
      'Flutter and Firebase application work',
      'Embedded systems and IoT experiments',
      'Junior software and technical support roles',
    ],
    experience: [
      {
        title: 'Intern, Wise Ant Publications',
        period: '2023 and 2024',
        detail: 'Supported practical work in a real team environment while growing technical and communication skills.',
      },
    ],
    achievements: [
      'Data Visualization with Power BI Training Certificate',
      'KsTU Army Cadet Adjutant, 2023',
      'KsTU Army Cadet Commander, 2024',
    ],
  },
  socialLinks: [
    {
      label: 'GitHub',
      href: githubProfileUrl,
      icon: 'github',
    },
  ],
  github: {
    username: githubUsername,
    profileUrl: githubProfileUrl,
    intro:
      'GitHub is a supporting view of how I work in public. The most important project context stays on the Projects page, where each build has more explanation than a repository list alone can provide.',
    featuredRepos: [],
    reposToShow: 6,
    fallbackMessage:
      'If the live GitHub feed is unavailable, the profile link below still points to the latest public account activity.',
  },
  blog: {
    title: 'Writing in progress',
    intro:
      'This section will eventually collect short write-ups about project decisions, lessons from experiments, and what I am learning as I build.',
    topics: ['Flutter architecture notes', 'IoT build breakdowns', 'Lessons from hardware prototypes'],
  },
};

export default portfolioContent;
