export const coursesData = [
    // Software (formerly IT)
    {
        id: 101, title: "MERN Stack Development", category: "Software", duration: "90 Days", role: "Full Stack Dev", price: "₹28,000", originalPrice: "₹35,000", image: "/programing.png",
        description: "Master MongoDB, Express, React, and Node.js to become a complete full-stack developer. Build scalable web applications from scratch.",
        curriculum: ["HTML/CSS/JS Basics", "React.js Framework", "Node.js & Express", "MongoDB Database", "Real-time Projects"]
    },
    {
        id: 102, title: "Java Full Stack", category: "Software", duration: "90 Days", role: "Java Developer", price: "₹28,000", originalPrice: "₹35,000", image: "/java.png",
        description: "Comprehensive training in Core Java, Advanced Java, Spring Boot, and Microservices architecture combined with frontend technologies.",
        curriculum: ["Core Java & OOPS", "Advanced Java (J2EE)", "Spring Boot & Hibernate", "Frontend (HTML/CSS/JS)", "Microservices"]
    },
    {
        id: 103, title: "Python Full Stack", category: "Software", duration: "90 Days", role: "Python Developer", price: "₹28,000", originalPrice: "₹35,000", image: "/python.png",
        description: "Learn Python programming along with Django/Flask frameworks and frontend tools to build robust web solutions.",
        curriculum: ["Python Core & Advanced", "Django/Flask Framework", "Database Management", "Frontend Basics", "Capstone Project"]
    },
    {
        id: 104, title: "Data Science", category: "Software", duration: "150 Days", role: "Data Scientist", price: "₹40,000", originalPrice: "₹50,000", image: "/data-science.png",
        description: "Dive deep into data analysis, machine learning, and statistical modeling to extract meaningful insights from data.",
        curriculum: ["Python for Data Science", "Statistics & Probability", "Machine Learning Algorithms", "Data Visualization", "Deep Learning Basics"]
    },
    {
        id: 105, title: "Data Analytics", category: "Software", duration: "100 Days", role: "Data Analyst", price: "₹36,000", originalPrice: "₹45,000", image: "/data analytics.png",
        description: "Master the art of analyzing raw data to find trends and answer questions using tools like SQL, Excel, and Tableau.",
        curriculum: ["Advanced Excel", "SQL for Data Analysis", "Tableau/Power BI", "Python Basics", "Business Intelligence"]
    },
    {
        id: 106, title: "DevOps with AWS", category: "Software", duration: "50 Days", role: "DevOps Engineer", price: "₹28,000", originalPrice: "₹35,000", image: "/devops.png",  
        description: "Learn the practices and tools that increase an organization's ability to deliver applications and services at high velocity.",
        curriculum: ["Linux Basics", "AWS Cloud Computing", "Docker & Kubernetes", "CI/CD Pipelines (Jenkins)", "Infrastructure as Code"]
    },
    {
        id: 107, title: "Cyber Security", category: "Software", duration: "90 Days", role: "Security Analyst", price: "₹28,000", originalPrice: "₹35,000", image: "/cyber-security.png",  
        description: "Understand network security, ethical hacking, and how to protect systems and data from cyber threats.",
        curriculum: ["Networking Basics", "Ethical Hacking", "Network Security", "Web Application Security", "Cyber Forensics"]
    },
    {
        id: 109, title: "Frontend Development (React)", category: "Software", duration: "30 Days", role: "Frontend Dev", price: "₹8,000", originalPrice: "₹10,000", image: "/React.png",
        description: "Specialize in building modern, interactive user interfaces using the React.js library and modern JavaScript.",
        curriculum: ["Modern JavaScript (ES6+)", "React.js Core Concepts", "State Management (Redux)", "Routing & Hooks", "API Integration"]
    },

    // Design
    {
        id: 201, title: "Graphic Designing", category: "Design", duration: "45 Days", role: "Graphic Designer", price: "₹12,000", originalPrice: "₹15,000", image: "/graphic-designer.png",
        description: "Learn to communicate visually using typography, photography, and illustration with industry-standard tools.",
        curriculum: ["Adobe Photoshop", "Adobe Illustrator", "CorelDRAW", "Design Principles", "Brand Identity Design"]
    },

    // Business Courses
    {
        id: 301, title: "Digital Marketing", category: "Business Courses", duration: "90 Days", role: "Digital Marketer", price: "₹20,000", originalPrice: "₹25,000", image: "/digital.png",
        description: "Master the strategies to market products and services online through search engines, social media, and more.",
        curriculum: ["SEO (Search Engine Optimization)", "Social Media Marketing", "Google Ads (PPC)", "Content Marketing", "Analytics"]
    },
    {
        id: 302, title: "Accounts & Tally", category: "Business Courses", duration: "30 Days", role: "Accountant", price: "₹8,000", originalPrice: "₹10,000", image: "/accounting.png",
        description: "Learn computerized accounting and inventory management using Tally Prime software.",
        curriculum: ["Accounting Fundamentals", "Tally Prime Basics", "GST & Taxation", "Payroll Management", "Financial Reporting"]
    },
    {
        id: 304, title: "Power BI with Adv.Excel", category: "Business Courses", duration: "45 Days", role: "Power BI Developer", price: "₹12,000", originalPrice: "₹15,000", image: "/powerbi.png",
        description: "Combine the power of Advanced Excel and Microsoft Power BI to visualize data and share insights.",
        curriculum: ["Advanced Excel Formulas", "Data Modeling in Power BI", "DAX Functions", "Interactive Dashboards", "Data Transformation"]
    },

    // Medical
    {
        id: 401, title: "Medical Coding", category: "Medical", duration: "45 Days", role: "Medical Coder", price: "₹20,000", originalPrice: "₹25,000", image: "/medical.png",
        description: "Learn to transform healthcare diagnosis and procedures into universal medical alphanumeric codes.",
        curriculum: ["Medical Terminology", "ICD-10-CM Coding", "CPT Coding", "HCPCS Level II", "Revenue Cycle Management"]
    },

    // Competetive Exams
    {
        id: 501, title: "TET/DSC Exams", category: "Competetive Exams", duration: "60 Days", role: "Aspirant", price: "₹8,000", originalPrice: "₹10,000", image: "/exam.png",
        description: "Comprehensive coaching for Teacher Eligibility Test (TET) and District Selection Committee (DSC) exams.",
        curriculum: ["Child Development & Pedagogy", "Language I & II", "Mathematics", "Environmental Studies", "Mock Tests"]
    },
    {
        id: 502, title: "Aptitude & Reasoning", category: "Competetive Exams", duration: "30 Days", role: "Aptitude Trainer", price: "₹3,600", originalPrice: "₹4,500", image: "/aptitude.png",
        description: "Enhance your logical thinking and problem-solving skills for various competitive exams and interviews.",
        curriculum: ["Quantitative Aptitude", "Logical Reasoning", "Verbal Ability", "Data Interpretation", "Speed Math Tricks"]
    },

    // Agriculture
    {
        id: 701, title: "Drones in Indian Agriculture", category: "Agriculture", duration: "45 Days", role: "Drone Pilot", price: "₹8,000", originalPrice: "₹10,000", image: "/drone.png",
        description: "Learn the application of drone technology in modern farming for monitoring and spraying.",
        curriculum: ["Drone Basics & Regulations", "Flight Simulation", "Crop Monitoring", "Precision Agriculture", "Maintenance & Safety"]
    },
    {
        id: 702, title: "Organic Farming", category: "Agriculture", duration: "45 Days", role: "Organic Farmer", price: "₹12,000", originalPrice: "₹15,000", image: "/organic.png",
        description: "Understand the principles and practices of organic farming for sustainable agriculture.",
        curriculum: ["Soil Health Management", "Composting Techniques", "Organic Pest Control", "Certification Process", "Market Linkage"]
    },
    {
        id: 703, title: "Seed Technology", category: "Agriculture", duration: "45 Days", role: "Seed Analyst", price: "₹16,000", originalPrice: "₹20,000", image: "/seed.png",
        description: "Learn about seed production, processing, testing, and quality control.",
        curriculum: ["Seed Biology", "Seed Production Techniques", "Seed Processing", "Quality Testing", "Legislation & Standards"]
    },
    {
        id: 704, title: "Carbon Credit Farming", category: "Agriculture", duration: "30 Days", role: "Carbon Specialist", price: "₹8,000", originalPrice: "₹10,000", image: "/farming.png",
        description: "Explore the emerging field of carbon farming and how to earn credits through sustainable practices.",
        curriculum: ["Climate Change & Agriculture", "Carbon Sequestration", "Verified Carbon Standard", "Project Development", "Carbon Markets"]
    },

    // Lifestyle
    {
        id: 801, title: "Food Security and Nutrition", category: "Lifestyle", duration: "45 Days", role: "Nutritionist", price: "₹8,000", originalPrice: "₹10,000", image: "/food.png",
        description: "Gain knowledge about food systems, nutrition security, and healthy dietary practices.",
        curriculum: ["Fundamentals of Nutrition", "Food Safety Standards", "Public Health Nutrition", "Diet Planning", "Food Policy"]
    },
    // Mechanical
    {
        id: 901, title: "AutoCAD (Mechanical)", category: "Mechanical", duration: "45 Days", role: "Design Engineer", price: "₹16,000", originalPrice: "₹20,000", image: "/autocad.png",
        description: "Master AutoCAD software for creating precise 2D and 3D mechanical drawings and blueprints.",
        curriculum: ["Interface & Basic Tools", "2D Drafting", "Isometric Drawings", "3D Modeling Basics", "Plotting & Publishing"]
    },
    {
        id: 902, title: "CATIA", category: "Mechanical", duration: "45 Days", role: "Design Engineer", price: "₹12,000", originalPrice: "₹15,000", image: "/catia.png",
        description: "Learn CATIA for advanced 3D modeling, surfacing, and simulation in product design.",
        curriculum: ["Sketcher & Part Design", "Assembly Design", "Drafting", "Generative Shape Design", "Simulation Basics"]
    },
    {
        id: 903, title: "SolidWorks", category: "Mechanical", duration: "30 Days", role: "Design Engineer", price: "₹8,000", originalPrice: "₹10,000", image: "/solid.jpg",
        description: "Become proficient in SolidWorks for creating 3D CAD models and engineering drawings.",
        curriculum: ["Sketching & Features", "Part Modeling", "Assembly Modeling", "Drawing Creation", "Rendering"]
    },
    {
        id: 904, title: "ANSYS", category: "Mechanical", duration: "45 Days", role: "Analysis Engineer", price: "₹16,000", originalPrice: "₹20,000", image: "/ansys.png",
        description: "Learn finite element analysis (FEA) using ANSYS to simulate and test product designs.",
        curriculum: ["FEA Basics", "Structural Analysis", "Thermal Analysis", "Meshing Techniques", "Result Interpretation"]
    },

    // Civil
    {
        id: 1001, title: "AutoCAD (Civil)", category: "Civil", duration: "45 Days", role: "Civil Draughtsman", price: "₹12,000", originalPrice: "₹15,000", image: "/autocad.png",
        description: "Learn AutoCAD specifically for civil engineering applications like construction drawings and layouts.",
        curriculum: ["Drawing Setup & Scales", "Floor Plans", "Elevations & Sections", "Plotting", "Standards & Layers"]
    },
    {
        id: 1002, title: "Revit Architecture", category: "Civil", duration: "45 Days", role: "BIM Modeler", price: "₹16,000", originalPrice: "₹20,000", image: "/revit.png",
        description: "Master Building Information Modeling (BIM) with Revit for architectural design and documentation.",
        curriculum: ["BIM Concepts", "Building Elements", "Views & Sheets", "Rendering", "Family Creation"]
    },
    {
        id: 1003, title: "SketchUp", category: "Civil", duration: "45 Days", role: "3D Visualizer", price: "₹12,000", originalPrice: "₹15,000", image: "/sketch.png",
        description: "Learn to create quick and easy 3D models for architectural and interior design projects.",
        curriculum: ["Interface Navigation", "Drawing Tools", "Groups & Components", "Materials & Textures", "Rendering"]
    },
];

export const categories = ["Software", "Mechanical", "Civil", "Design", "Business Courses", "Medical", "Agriculture", "Competetive Exams", "Lifestyle"];
