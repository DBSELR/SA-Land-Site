import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { coursesData, categories } from '../../pages/courses/coursesData';

const CoursesSection = () => {
    const [activeTab, setActiveTab] = useState("Recommended");
    const [activeSlab, setActiveSlab] = useState(0);
    const location = useLocation();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    // Set active tab from navigation state if available
    useEffect(() => {
        if (location.state && location.state.category) {
            setActiveTab(location.state.category);

            // Scroll to the section after a robust delay to ensure full rendering
            setTimeout(() => {
                const section = document.getElementById('courses1') || document.getElementById('courses');
                if (section) {
                    const yOffset = -100; // Adjust for any sticky header
                    const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                }
            }, 300);
        }
    }, [location.state]);

    // Animate slabs continuously
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveSlab((prev) => (prev < 2 ? prev + 1 : 0));
        }, 2000); // Allow time for 1.5s line animation + pause
        return () => clearInterval(interval);
    }, []);

    const recommendedTitles = [
        "Medical Coding",
        "Graphic Designing",
        "Digital Marketing",
        "Accounts & Tally",
        "Cyber Security"
    ];

    const filteredCourses = activeTab === "Recommended"
        ? coursesData
            .filter(course => recommendedTitles.includes(course.title))
            .sort((a, b) => recommendedTitles.indexOf(a.title) - recommendedTitles.indexOf(b.title))
        : activeTab === "All"
            ? coursesData
            : coursesData.filter(course => course.category === activeTab);

    return (
        <section className="gk-courses-section" id="courses">
            <div className="gk-container">
                <div className="gk-section-header">
                    <span className="gk-subtitle">Upgrade Your Skills</span>
                    <h2 className="gk-title">Explore Our Top Courses</h2>
                    <div className="gk-underline"></div>
                </div>

                {/* Offer Banner */}
                <div className="gk-offer-banner">
                    <div className="gk-banner-header">
                        <span className="gk-live-badge">🔴 Live Offer</span>
                        <h3>Batch Filling Fast !</h3>
                        <p className="gk-banner-explanation">Course fee discounts decrease as the batch fills. Enroll early to get the highest benefit.</p>
                    </div>

                    <div className="gk-slabs-container">
                        <div className="gk-slab-track">
                            {[
                                { id: 1, label: 'Early Bird', discount: '20% OFF' },
                                { id: 2, label: 'Value Saver', discount: '10% OFF' },
                                { id: 3, label: 'Standard', discount: '0% OFF' },
                            ].map((slab, index) => (
                                <React.Fragment key={slab.id}>
                                    <div className={`gk-slab-wrapper ${index <= activeSlab ? 'active' : ''}`}>
                                        <div className="gk-slab-circle">{slab.id}</div>
                                        <div className="gk-slab-content" id="courses1">
                                            <span className="gk-slab-title">{slab.label}</span>
                                            <span className="gk-slab-discount">{slab.discount}</span>
                                        </div>
                                    </div>
                                    {index < 2 && (
                                        <div className={`gk-slab-line ${index < activeSlab ? 'active' : ''}`}></div>
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Category Tabs */}
                <div className="gk-tabs-container">
                    {categories.map((cat) => {
                        const count = coursesData.filter(course => course.category === cat).length;
                        const isActive = activeTab === cat;
                        return (
                            <button
                                key={cat}
                                className={`gk-tab-btn ${isActive ? 'active' : ''}`}
                                onClick={() => setActiveTab(cat)}
                                style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}
                            >
                                {cat}
                                <span style={{
                                    backgroundColor: isActive ? '#ffffff' : '#ea580c',
                                    color: isActive ? '#ea580c' : '#ffffff',
                                    borderRadius: '50%',
                                    width: '14px',
                                    height: '14px',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '12px',
                                    fontWeight: 'bold',
                                    lineHeight: '0'
                                }}>
                                    {count}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {/* Recommended Tab (Next Line) */}
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem', marginTop: '-1rem' }}>
                    <button
                        className={`gk-tab-btn ${activeTab === "Recommended" ? 'active' : ''}`}
                        onClick={() => setActiveTab("Recommended")}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            background: activeTab === "Recommended" ? 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)' : 'rgba(255, 215, 0, 0.1)',
                            color: activeTab === "Recommended" ? '#000' : '#64748b',
                            border: '1px solid #FFD700',
                            fontWeight: '700',
                            padding: '12px 24px',
                            boxShadow: activeTab === "Recommended" ? '0 4px 15px rgba(255, 215, 0, 0.4)' : 'none'
                        }}
                    >
                        <i className="fa-solid fa-star"></i>
                        Trending Courses
                    </button>
                </div>

                <div className="gk-courses-grid">
                    {filteredCourses.map((course) => (
                        <div className="gk-course-card" key={course.id}>
                            <div className="gk-card-badge">Early Bird 20% OFF</div>
                            <div className={`gk-card-banner gk-border-${course.category.toLowerCase().replace(/\s+/g, '-')}`}>
                                <div className="gk-course-img-wrapper">
                                    <img src={course.image} alt={course.title} />
                                </div>
                            </div>

                            <div className="gk-card-content">
                                <h3 className="gk-course-title">{course.title}</h3>

                                <div className="gk-course-meta">
                                    <div className="gk-meta-item">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                                        <span>{course.duration}</span>
                                    </div>
                                    <div className="gk-meta-item">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                        <span>{course.role}</span>
                                    </div>
                                </div>

                                {/* <div className="gk-price-info">
                                    <span className="gk-price-current">
                                        <i className="fa-solid fa-tag"></i>
                                        {course.price}
                                    </span>
                                    <span className="gk-price-original">{course.originalPrice}</span>
                                </div> */}

                                <div className="gk-price-row">
                                    <span
                                        className="gk-explore-btn"
                                        style={{ textDecoration: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            // Check both router params (after hash) and window params (before hash)
                                            let ref = searchParams.get("ref");
                                            if (!ref) {
                                                const windowParams = new URLSearchParams(window.location.search);
                                                ref = windowParams.get("ref");
                                            }

                                            if (ref) {
                                                // Pass empty object {} as body to ensure POST headers are correct
                                                axios.post(`https://localhost:7045/api/BulkSms/hotleadsave?ref=${encodeURIComponent(ref)}&course=${encodeURIComponent(course.title)}`, {})
                                                    .then(() => console.log(`Hot lead captured for ${course.title}`))
                                                    .catch(err => console.error("Hot lead tracking failed", err))
                                                    .finally(() => {
                                                        navigate(`/course/${course.id}`);
                                                    });
                                            } else {
                                                navigate(`/course/${course.id}`);
                                            }
                                        }}
                                    >
                                        Explore Course
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CoursesSection;