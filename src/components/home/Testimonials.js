import React from 'react';

const testimonialsData = [
    {
        id: 1,
        name: "Venkatesh Rao",
        role: "Java Full Stack Developer",
        rating: 5,
        feedback: "Best training institute for Java! The real-time projects helped me crack the interview. Got placed in a top MNC with a good package.",
        initial: "V",
        color: "#EF4444"
    },
    {
        id: 2,
        name: "Sravani Reddy",
        role: "Data Science Student",
        rating: 5,
        feedback: "Sir explains concepts very clearly. I was afraid of coding, but now I am confident in Python and ML. Highly recommend for non-IT students too.",
        initial: "S",
        color: "#3B82F6"
    },
    {
        id: 3,
        name: "Kalyan Ram",
        role: "Digital Marketing Expert",
        rating: 5,
        feedback: "Practical teaching with live campaigns. I started my own agency after this course. Best place to learn Digital Marketing in the region.",
        initial: "K",
        color: "#10B981"
    },
    {
        id: 4,
        name: "Sneha Chowdary",
        role: "MERN Stack Developer",
        rating: 5,
        feedback: "Complete hands-on training. The placement support is excellent. They guided me from resume preparation to mock interviews.",
        initial: "S",
        color: "#F59E0B"
    },
    {
        id: 5,
        name: "Sai Teja",
        role: "Graphic Designer",
        rating: 5,
        feedback: "I learnt everything from basics to advanced tools. The design portfolio I built here helped me get a job immediately. Thank you Skill Ascent!",
        initial: "S",
        color: "#EC4899"
    },
    {
        id: 6,
        name: "Lakshmi Priya",
        role: "AWS DevOps Engineer",
        rating: 5,
        feedback: "Teaching style is very good. Complex Cloud concepts were made easy to understand. Best choice for DevOps training.",
        initial: "L",
        color: "#6366F1"
    },
    {
        id: 7,
        name: "Pavan Kumar",
        role: "Medical Coder",
        rating: 5,
        feedback: "Good faculty and clear explanation. I passed my certification easily. Very helpful for life science students looking for IT jobs.",
        initial: "P",
        color: "#8B5CF6"
    },
    {
        id: 8,
        name: "Haritha Naidu",
        role: "Python Developer",
        rating: 5,
        feedback: "Excellent course content. The daily assignments and practice sessions helped me improve my coding logic. Very happy with the training.",
        initial: "H",
        color: "#14B8A6"
    }
];

const Testimonials = () => {
    return (
        <section className="gk-testimonials-section" id="testimonials">
            <div className="gk-container">
                <div className="gk-section-header">
                    <span className="gk-subtitle">STUDENT SUCCESS STORIES</span>
                    <h2 className="gk-title">What Our Learners Say</h2>
                    <div className="gk-underline"></div>
                </div>

                <div className="gk-testimonials-scroll-container">
                    <div className="gk-testimonials-track">
                        {/* Double the data for seamless loop */}
                        {[...testimonialsData, ...testimonialsData].map((item, index) => (
                            <div className="gk-testimonial-card" key={`${item.id}-${index}`}>
                                <div className="gk-card-top">
                                    <div className="gk-user-profile">
                                        <div className="gk-user-avatar" style={{ backgroundColor: item.color }}>
                                            {item.initial}
                                        </div>
                                        <div className="gk-user-info">
                                            <h4 className="gk-user-name">{item.name}</h4>
                                            <span className="gk-user-role">{item.role}</span>
                                        </div>
                                    </div>
                                    <div className="gk-quote-icon">
                                        <i className="fas fa-quote-right"></i>
                                    </div>
                                </div>

                                <div className="gk-star-rating">
                                    {[...Array(5)].map((_, i) => (
                                        <i key={i} className="fas fa-star"></i>
                                    ))}
                                </div>

                                <p className="gk-user-feedback">"{item.feedback}"</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
