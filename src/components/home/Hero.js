import React, { useState, useEffect } from "react";

/* --- COURSE DATA --- */
const coursesData = [
    // Priority Courses
    { title: "Medical Coding", category: "Medical", duration: "40 Days", role: "Medical Coder", description: "Launch a rewarding healthcare career by mastering medical coding standards and practices. Learn to accurately translate medical diagnoses and procedures into universal codes." },
    { title: "Graphic Designing", category: "Design", duration: "45 Days", role: "Creative Designer", description: "Design captivating visuals and compelling branding materials using industry-standard tools. Unleash your creativity to produce stunning graphics for print and digital media." },
    { title: "Digital Marketing", category: "Business Courses", duration: "45 Days", role: "Digital Marketer", description: "Drive business growth through strategic online marketing, SEO, and social media campaigns. Learn to reach target audiences effectively and maximize ROI in the digital space." },
    { title: "Accounts & Tally", category: "Business Courses", duration: "45 Days", role: "Accountant", description: "Manage financial accounts proficiently with practical Tally and comprehensive accounting training. Gain the skills needed for accurate bookkeeping and financial reporting." },
    { title: "Cyber Security", category: "Software", duration: "45 Days", role: "Security Analyst", description: "Protect critical systems and networks from evolving cyber threats with advanced security strategies. Learn vulnerability assessment, ethical hacking, and risk management." },

    // Software
    { title: "MERN Stack Development", category: "Software", duration: "60 Days", role: "MERN Developer", description: "Build robust, scalable full-stack web applications using MongoDB, Express, React, and Node.js. Master the complete development lifecycle from backend logic to dynamic frontend interactivity." },
    { title: "Java Full Stack Development", category: "Software", duration: "60 Days", role: "Java Developer", description: "Master core and advanced Java programming to build secure, enterprise-grade applications. Gain deep expertise in Spring Boot, Hibernate, and microservices architecture for modern development." },
    { title: "Python Full Stack Development", category: "Software", duration: "60 Days", role: "Python Developer", description: "Learn Python from the ground up and develop dynamic, high-performance web applications using Django. Master data handling, API integration, and backend scalability with ease." },
    { title: "Data Science", category: "Software", duration: "90 Days", role: "Data Scientist", description: "Analyze complex datasets and build advanced predictive models using Python and Machine Learning. Transform raw data into actionable intelligence for strategic decision-making." },
    { title: "Data Analytics", category: "Software", duration: "50 Days", role: "Data Analyst", description: "Transform raw data into meaningful business insights using statistical analysis and visualization tools. Master the art of storytelling with data to drive organizational success." },
    { title: "DevOps with AWS", category: "Software", duration: "50 Days", role: "DevOps Engineer", description: "Streamline software development workflows and deploy scalable applications on the cloud. Master CI/CD pipelines, containerization, and infrastructure automation." },
    { title: "Frontend Development (React)", category: "Software", duration: "45 Days", role: "Frontend Developer", description: "Create stunning, interactive user interfaces using the powerful React library. Build responsive, component-based web applications that deliver exceptional user experiences." },

    // Business Courses (Remaining)
    { title: "Power BI with Adv.Excel", category: "Business Courses", duration: "45 Days", role: "Power BI Developer", description: "Visualize business data and create interactive, real-time dashboards for informed decision-making. Transform disparate data sources into clear, actionable business intelligence." },

    // Mechanical
    { title: "AutoCAD (Mechanical)", category: "Mechanical", duration: "45 Days", role: "Design Engineer", description: "Master 2D drafting and 3D modeling for mechanical engineering. Learn to create precise technical drawings and blueprints using industry-standard AutoCAD software." },
    { title: "CATIA", category: "Mechanical", duration: "45 Days", role: "Design Engineer", description: "Expertise in product design and innovation with CATIA. Learn advanced 3D modeling, surfacing, and simulation for aerospace and automotive engineering." },
    { title: "SolidWorks", category: "Mechanical", duration: "45 Days", role: "Design Engineer", description: "Design and validate products with SolidWorks. Master 3D CAD modeling, assembly design, and engineering drawings for efficient product development." },
    { title: "ANSYS", category: "Mechanical", duration: "45 Days", role: "Analysis Engineer", description: "Perform advanced engineering simulations with ANSYS. Learn finite element analysis (FEA) to solve complex structural, thermal, and fluid dynamics problems." },

    // Civil
    { title: "AutoCAD (Civil)", category: "Civil", duration: "45 Days", role: "Civil Draughtsman", description: "Design and draft civil infrastructure with AutoCAD. Master architectural drawing, structural detailing, and site planning for construction projects." },
    { title: "Revit Architecture", category: "Civil", duration: "45 Days", role: "BIM Modeler", description: "Master Building Information Modeling (BIM) with Revit. Create intelligent 3D models for architectural design, structural engineering, and construction documentation." },
    { title: "SketchUp", category: "Civil", duration: "30 Days", role: "3D Visualizer", description: "Create intuitive 3D models for architecture and interior design. Learn to visualize concepts, create walkthroughs, and present designs effectively with SketchUp." },

    // Agriculture
    { title: "Drones in Indian Agriculture", category: "Agriculture", duration: "45 Days", role: "Drone Pilot", description: "Revolutionize farming with drone technology. Learn aerial mapping, crop monitoring, and precision spraying techniques to enhance agricultural productivity." },
    { title: "Organic Farming", category: "Agriculture", duration: "45 Days", role: "Organic Farmer", description: "Learn sustainable organic farming techniques for a healthier environment and profitable harvest. Master soil management, crop rotation, and chemical-free cultivation methods." },
    { title: "Seed Technology", category: "Agriculture", duration: "45 Days", role: "Seed Analyst", description: "Master the science of seed production, processing, and quality control. Learn essential techniques for seed testing, storage, and certification to ensure high-yield agricultural success." },
    { title: "Carbon Credit Farming", category: "Agriculture", duration: "45 Days", role: "Carbon Specialist", description: "Explore the emerging market of carbon credits in agriculture. Learn sustainable practices that sequester carbon and generate new revenue streams for farmers." },

    // Competetive Exams
    { title: "TET / DSC Exams", category: "Competetive Exams", duration: "60 Days", role: "Accredited Teacher", description: "Prepare comprehensively for teacher eligibility and recruitment exams with expert guidance. innovative teaching methodologies and subject mastery for guaranteed success." },
    { title: "Aptitude & Reasoning", category: "Competetive Exams", duration: "30 Days", role: "Aptitude Trainer", description: "Enhance your logical thinking and problem-solving skills to crack competitive entrance exams. Master shortcuts and strategies to solve complex problems with speed." },

    // Lifestyle
    { title: "Food Security and Nutrition", category: "Lifestyle", duration: "45 Days", role: "Nutritionist", description: "Understand global food systems and the science of nutrition for a healthier future. Learn about food safety, dietary planning, and sustainable food security strategies." },
];

const Hero = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % coursesData.length);
        }, 5000);

        return () => clearInterval(timer);
    }, []);

    // Safe index access to prevent crashes on hot-reload or data changes
    const safeIndex = index % coursesData.length;
    const current = coursesData[safeIndex] || coursesData[0];

    return (
        <section className="hero-container" id="home">
            <div className="hero-bg-grid"></div>

            <div className="hero-content">
                {/* LEFT CONTENT */}
                <div className="hero-text">
                    <span className="badge">🚀 Skill Ascent Courses</span>

                    <div key={index} className="animate-text">
                        <h1>{current.title}</h1>

                        <p>{current.description}</p>

                        {/* META INFO */}
                        <div className="hero-meta">
                            <span className="meta-pill">
                                <i className="fa-solid fa-layer-group"></i> {current.category}
                            </span>
                            <span className="meta-pill">
                                <i className="fa-solid fa-clock"></i> {current.duration}
                            </span>
                        </div>
                    </div>

                    <div className="cta-group">
                        <button
                            className="btn-primary"
                            onClick={() => {
                                const section = document.getElementById('courses1');
                                if (section) {
                                    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                }
                            }}
                        >
                            Explore Courses <i className="fa-solid fa-arrow-right"></i>
                        </button>

                        <button
                            className="btn-secondary"
                            onClick={() => {
                                const section = document.getElementById('contact');
                                if (section) {
                                    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                }
                            }}
                        >
                            Book A Demo <i className="fa-solid fa-calendar-check"></i>
                        </button>
                    </div>
                </div>

                {/* RIGHT VISUAL */}
                <div className="hero-visual">
                    <div className="card-stack">
                        <div className="card-layer layer-0"></div>
                        <div className="card-layer layer-1"></div>
                        <div className="card-layer layer-2"></div>

                        <div className="card-layer layer-3" key={index}>
                            <span className="card-text">{current.role}</span>
                        </div>

                        <div className="card-glow"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
