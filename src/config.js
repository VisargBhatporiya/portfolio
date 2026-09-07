export const portfolioData = {
  profile: {
    name: "Visarg Bhatporiya",
    role: "SOFTWARE ENGINEER / CREATIVE DEVELOPER",
    headline: "BUILDING SCALABLE BACKENDS & MOTION-RICH DIGITAL EXPERIENCES.",
    bio: "I'm Visarg Bhatporiya — a Software Engineer experienced in ASP.NET Core, C#, JavaScript, React.js, Mendix, RESTful APIs, and database-driven applications.",
    subBio: "I focus on developing scalable backend architectures, real-time web applications, interactive interfaces, and dynamic user experiences with precision and modern design rhythm.",
    location: "Surat, Gujarat, India / Global Remote",
    availability: "Available for Full-time & Freelance",
    email: "vickybhatporiya123@gmail.com",
    linkedin: "https://www.linkedin.com/in/visarg-bhatporiya/",
    github: "https://github.com/VisargBhatporiya",
    avatarImage: "/visarg-portrait.jpg",
    stats: [
      { label: "BASED IN", value: "SURAT, INDIA" },
      { label: "FOCUS", value: ".NET / REACT / MENDIX" },
      { label: "AVAILABLE FOR", value: "FULLTIME & FREELANCE" },
      { label: "MINDSET", value: "ALWAYS LEARNING" },
      { label: "PROJECTS DONE", value: "10+" },
      { label: "EDUCATION", value: "MCA / CGPA 8.10" }
    ]
  },

  expertise: [
    {
      id: "01",
      icon: "</>",
      title: "Backend & System Architecture",
      description: "Building enterprise backend services, RESTful APIs, and real-time platforms using ASP.NET Core, C#, SignalR, Entity Framework Core, and SQL Server.",
      tags: ["ASP.NET CORE", "C#", "WEB API", "SIGNALR", "EF CORE", "SQL SERVER"]
    },
    {
      id: "02",
      icon: "⚡",
      title: "Frontend & Creative Development",
      description: "Developing modern responsive web applications and interactive UIs using React.js, JavaScript (ES6+), GSAP, Tailwind CSS, and HTML5/CSS3.",
      tags: ["REACT.JS", "JAVASCRIPT", "GSAP", "TAILWIND", "HTML5", "LENIS"]
    },
    {
      id: "03",
      icon: "🎨",
      title: "Low-Code & Enterprise Systems",
      description: "Creating domain models, microflows, CRUD workflows, and business application logic on the Mendix low-code platform.",
      tags: ["MENDIX", "MICROFLOWS", "DOMAIN MODELING", "DATA VIEWS", "ENTERPRISE WORKFLOWS"]
    },
    {
      id: "04",
      icon: "💻",
      title: "Full-Stack Web & Mobile Apps",
      description: "Designing end-to-end web and mobile applications using Node.js, Express.js, MongoDB (MERN), Laravel, PHP, Python, and Flutter.",
      tags: ["NODE.JS", "EXPRESS", "MONGODB", "LARAVEL", "PHP", "PYTHON"]
    }
  ],

  projects: [
    {
      id: "01",
      number: "01",
      title: "BidWicket — Real-Time Cricket Auction Platform",
      category: "REAL-TIME AUCTION PLATFORM (.NET CORE)",
      period: "DEC 2025 — MAY 2026",
      description: "Developed a real-time cricket auction platform using ASP.NET Core MVC, Entity Framework Core, SignalR, and SQL Server, engineered for high-concurrency live bidding and IPL-style player auctions.",
      tags: ["ASP.NET Core", "C#", "SignalR", "EF Core", "SQL Server", "Bootstrap"],
      image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=800&auto=format&fit=crop",
      highlights: [
        "Implemented live bidding functionality with real-time WebSocket updates via SignalR and dynamic countdown timers.",
        "Built secure role-based authentication and authorization system for Super Admin, Admin, Team Owners, and Viewers.",
        "Designed responsive IPL-style user interfaces featuring dynamic dashboards, team management, player management, and auction analytics.",
        "Developed optimized RESTful APIs, integrated real-time communication using SignalR, and optimized database queries for smooth auction performance."
      ]
    },
    {
      id: "02",
      number: "02",
      title: "WorkSphere — Job Portal Platform",
      category: "FULL-STACK JOB PORTAL (MERN STACK)",
      period: "MAR 2025 — MAY 2025",
      description: "Built a modern full-stack job portal using the MERN stack (MongoDB, Express.js, React.js, Node.js) to efficiently connect job seekers and corporate recruiters.",
      tags: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT", "Tailwind CSS"],
      image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=800&auto=format&fit=crop",
      highlights: [
        "Implemented secure user authentication and authorization using JWT (JSON Web Tokens) and bcrypt password encryption.",
        "Developed advanced search filters, location parameters, and a highly responsive candidate dashboard UI in React.js.",
        "Created scalable RESTful APIs in Node.js & Express.js with optimized MongoDB schema indexing for rapid response times.",
        "Engineered recruiter management panels for job postings, applicant tracking, and resume downloads."
      ]
    },
    {
      id: "03",
      number: "03",
      title: "Learning Management System (LMS)",
      category: "EDUCATION PLATFORM (LARAVEL)",
      period: "MAR 2025 — MAY 2025",
      description: "Developed a comprehensive Learning Management System using Laravel with dedicated student and administrator management panels.",
      tags: ["Laravel", "PHP", "MySQL", "JavaScript", "Bootstrap"],
      image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=800&auto=format&fit=crop",
      highlights: [
        "Created dedicated Student and Admin dashboards with role-based permission control.",
        "Implemented interactive course enrollment, progress tracking meters, multimedia lesson streaming, and quiz evaluations.",
        "Enhanced overall user experience through responsive layout design, secure data handling, and optimized database queries."
      ]
    },
    {
      id: "04",
      number: "04",
      title: "Medico — Pharmacy & Inventory System",
      category: "E-COMMERCE & INVENTORY (LARAVEL + ANDROID)",
      period: "DEC 2023 — FEB 2024",
      description: "Designed a pharmacy e-commerce platform and real-time inventory management system with role-based access for Admins and Customers.",
      tags: ["Laravel", "Android", "Razorpay", "PHP", "MySQL"],
      image: "https://images.unsplash.com/photo-1576602976047-174e57a47881?q=80&w=800&auto=format&fit=crop",
      highlights: [
        "Designed a user-friendly web & mobile interface with encrypted user credentials and secure login/registration workflows.",
        "Integrated Razorpay payment gateway for secure, seamless online payment transactions.",
        "Built a real-time inventory management engine to track medicine availability and prevent inventory overbooking."
      ]
    }
  ],

  journal: [
    {
      id: "01",
      date: "DEC 2025 — MAY 2026",
      category: "WORK EXPERIENCE",
      title: "Software Engineer Intern @ Toshal Infotech",
      summary: "Developing scalable backend services using .NET Core & C# for enterprise legal case management workflows, building interactive UIs with Bootstrap & jQuery, and implementing Elasticsearch document searching.",
      tags: [".NET CORE", "C#", "ELASTICSEARCH", "JQUERY", "REST API"],
      linkText: "View Experience"
    },
    {
      id: "02",
      date: "CERTIFICATION 2026",
      category: "ENTERPRISE CERTIFICATION",
      title: "Rapid Developer Certification — Mendix Platform",
      summary: "Certified in building rapid enterprise web applications, domain modeling, microflows, page layouts, associations, and custom application logic on the Mendix Low-Code platform.",
      tags: ["MENDIX", "MICROFLOWS", "LOW-CODE", "DOMAIN MODELING"],
      linkText: "Verified Certificate"
    },
    {
      id: "03",
      date: "TECHNICAL INSIGHT",
      category: "ARCHITECTURE & DESIGN",
      title: "Architecting Real-Time Auction Engines with .NET Core & SignalR",
      summary: "Exploring real-time WebSocket communication, live bidding countdown synchronization, role-based authorization, and database query optimization for high-concurrency web platforms.",
      tags: ["SIGNALR", "ASP.NET CORE", "WEBSOCKETS", "C#"],
      linkText: "Read Article"
    },
    {
      id: "04",
      date: "CERTIFICATION",
      category: "ACADEMIC & CONTINUOUS LEARNING",
      title: "NPTEL & LinkedIn Engineering Certifications",
      summary: "Completed 'Joy with Python' NPTEL certification and 'Introduction to Prompt Engineering' on LinkedIn Learning, strengthening algorithmic thinking and AI developer tooling.",
      tags: ["PYTHON", "PROMPT ENG", "NPTEL", "CONTINUOUS LEARNING"],
      linkText: "View Details"
    }
  ]
};
