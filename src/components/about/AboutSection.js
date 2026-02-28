import React from 'react';

const statsData = [
    { id: 1, value: "10k+", label: "Learners Upskilled" },
    { id: 2, value: "50+", label: "Industry Partners" },
    { id: 3, value: "95%", label: "Career Transition" },
    { id: 4, value: "4.8/5", label: "Average Rating" }
];

const AboutSection = () => {
    return (
   <>
        <section className="gk-about-section">
            <div className="gk-about-container">

                <div className="gk-about-content">
                    <div className="gk-about-text">
                        <span className="gk-about-tagline">ABOUT US</span>
                        <h2 className="gk-about-title">Bridging the Gap Between Education & Industry</h2>
                        <p className="gk-about-desc">
                            Skill Ascent is an innovative online learning platform dedicated to empowering learners with the skills and knowledge needed to succeed in today’s fast-changing world. We specialize in providing high-quality digital courses, skill development programs, and professional training in areas such as technology, business, data science, analytics, and development.
                        </p>
                        <p className="gk-about-desc">
                            Our mission is to make learning accessible, engaging, and effective for individuals across India and beyond. We focus on practical, industry-relevant content designed to help our learners achieve real-world results, whether it’s career growth, skill enhancement, or certification preparation.
                        </p>
                    </div>

                    <div className="gk-about-stats-grid">
                        {statsData.map((stat) => (
                            <div className="gk-stat-card" key={stat.id}>
                                <h3 className="gk-stat-value">{stat.value}</h3>
                                <p className="gk-stat-label">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
   </>

    );
};

export default AboutSection;