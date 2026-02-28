import React from 'react';

const testimonialsData = [
    {
        id: 1,
        name: "Venkatesh Babu",
        role: "Graphic Designing",
        rating: 5,
        feedback: "Best training institute in Hyderabad out there! The real-time projects helped me build a great portfolio. Got a design job in Hitech City with a great package.",
        initial: "V",
        color: "#EF4444"
    },
    {
        id: 2,
        name: "Sravani Reddy",
        role: "Digital Marketing",
        rating: 5,
        feedback: "The trainers explain concepts very clearly from scratch. I learned all about SEO and Ads. Highly recommend to anyone in AP & TS looking to enter marketing!",
        initial: "S",
        color: "#3B82F6"
    },
    {
        id: 3,
        name: "Kalyan Ram",
        role: "Digital Marketing",
        rating: 5,
        feedback: "Practical teaching with live campaigns! I started my own local ad agency in Vizag right after completing this course. Best place to learn Digital Marketing practically.",
        initial: "K",
        color: "#10B981"
    },
    {
        id: 4,
        name: "Sneha Chowdary",
        role: "Graphic Designing",
        rating: 5,
        feedback: "Complete hands-on training from day one. Their placement support is excellent, and they guided me perfectly for creative agency interviews in Ameerpet.",
        initial: "S",
        color: "#F59E0B"
    },
    {
        id: 5,
        name: "Sai Teja",
        role: "Graphic Designing",
        rating: 5,
        feedback: "I learnt everything from basic Photoshop to advanced branding tools. The design portfolio I built here helped me get a job immediately in Vijayawada! Thank you Skill Ascent.",
        initial: "S",
        color: "#EC4899"
    },
    {
        id: 6,
        name: "Lakshmi Priya",
        role: "Digital Marketing",
        rating: 5,
        feedback: "The teaching style is very good. Complex analytics and ad bidding concepts were made easy to understand. Best choice for learning marketing in our Telugu states.",
        initial: "L",
        color: "#6366F1"
    },
    {
        id: 7,
        name: "Pavan Kumar Goud",
        role: "Graphic Designing",
        rating: 5,
        feedback: "Good faculty and very clear explanations on Illustrator and UI design. The practical assignments really elevated my creative skills.",
        initial: "P",
        color: "#8B5CF6"
    },
    {
        id: 8,
        name: "Haritha Naidu",
        role: "Digital Marketing",
        rating: 5,
        feedback: "Excellent course content. The daily assignments and practice sessions drastically helped me understand social media algorithms. Very happy with the Skill Ascent training.",
        initial: "H",
        color: "#14B8A6"
    },
    {
        id: 9,
        name: "Rajesh Varma",
        role: "Graphic Designing",
        rating: 5,
        feedback: "The course curriculum is very well-structured for beginners. I gained heavy confidence in design principles. Excellent institute for learning graphic design.",
        initial: "R",
        color: "#EF4444"
    },
    {
        id: 10,
        name: "Anusha Boppana",
        role: "Digital Marketing",
        rating: 5,
        feedback: "The hands-on training was top-notch with practical ad campaigns. I loved the real-time project experience and got a social media manager role instantly after completion.",
        initial: "A",
        color: "#3B82F6"
    }
];

const Testimonials = () => {
    const topRow = testimonialsData.slice(0, 5);
    const bottomRow = testimonialsData.slice(5, 10);

    return (
        <section className="gk-testimonials-section" id="testimonials">
            <div className="gk-container">
                <div className="gk-section-header">
                    <span className="gk-subtitle">STUDENT SUCCESS STORIES</span>
                    <h2 className="gk-title">What Our Learners Say</h2>
                    <div className="gk-underline"></div>
                </div>

                {/* Top Row - Scrolls Left */}
                <div className="gk-testimonials-scroll-container">
                    <div className="gk-testimonials-track scroll-left">
                        {[...topRow, ...topRow, ...topRow].map((item, index) => (
                            <div className="gk-testimonial-card compact" key={`top-${item.id}-${index}`}>
                                <div className="gk-card-top">
                                    <div className="gk-user-profile">
                                        <div className="gk-user-avatar small" style={{ backgroundColor: item.color }}>
                                            {item.initial}
                                        </div>
                                        <div className="gk-user-info">
                                            <h4 className="gk-user-name small">{item.name}</h4>
                                            <span className="gk-user-role small">{item.role}</span>
                                        </div>
                                    </div>
                                    <div className="gk-quote-icon small">
                                        <i className="fas fa-quote-right"></i>
                                    </div>
                                </div>

                                <div className="gk-star-rating small">
                                    {[...Array(5)].map((_, i) => (
                                        <i key={i} className="fas fa-star"></i>
                                    ))}
                                </div>

                                <p className="gk-user-feedback small">"{item.feedback}"</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Row - Scrolls Right (Reverse) */}
                <div className="gk-testimonials-scroll-container" style={{ marginTop: '20px' }}>
                    <div className="gk-testimonials-track scroll-right">
                        {[...bottomRow, ...bottomRow, ...bottomRow].map((item, index) => (
                            <div className="gk-testimonial-card compact" key={`bottom-${item.id}-${index}`}>
                                <div className="gk-card-top">
                                    <div className="gk-user-profile">
                                        <div className="gk-user-avatar small" style={{ backgroundColor: item.color }}>
                                            {item.initial}
                                        </div>
                                        <div className="gk-user-info">
                                            <h4 className="gk-user-name small">{item.name}</h4>
                                            <span className="gk-user-role small">{item.role}</span>
                                        </div>
                                    </div>
                                    <div className="gk-quote-icon small">
                                        <i className="fas fa-quote-right"></i>
                                    </div>
                                </div>

                                <div className="gk-star-rating small">
                                    {[...Array(5)].map((_, i) => (
                                        <i key={i} className="fas fa-star"></i>
                                    ))}
                                </div>

                                <p className="gk-user-feedback small">"{item.feedback}"</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
