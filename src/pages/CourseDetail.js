import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { coursesData } from './courses/coursesData';
import BrochureModal from '../components/BrochureModal';
import '../global.css'; // Ensure we have styles

// Helper to get color class based on category (matching global.css border logic)
const getCategoryColor = (category) => {
    const map = {
        'Software': '#3b82f6', // Blue
        'Design': '#a855f7', // Purple
        'Business Courses': '#22c55e', // Green
        'Medical': '#ef4444', // Red
        'Competetive Exams': '#f59e0b', // Amber
        'Languages': '#ec4899', // Pink
        'Agriculture': '#84cc16', // Lime
        'Mechanical': '#6366f1', // Indigo
        'Civil': '#64748b', // Slate
        'Lifestyle': '#14b8a6', // Teal
    };
    return map[category] || '#ea580c'; // Default Orange
};

const CourseDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const course = coursesData.find(c => c.id === parseInt(id));

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!course) {
        return (
            <div className="gk-container" style={{ padding: '100px 20px', textAlign: 'center' }}>
                <h2>Course Not Found</h2>
                <Link to="/" className="gk-explore-btn" style={{ maxWidth: '200px', margin: '20px auto' }}>Back to Home</Link>
            </div>
        );
    }

    const themeColor = getCategoryColor(course.category);

    const handleBack = () => {
        navigate('/', { state: { category: course.category } });
    };

    const handleDownloadBrochure = () => {
        setShowModal(true);
    };

    const handleModalDownload = () => {
        // Trigger actual file download or open PDF link
        // For demo: create a dummy link and click it
        // Or if you have a real URL in course data: window.open(course.brochureUrl, '_blank');

        /* 
           Demo Implementation: 
           Using 'MERN STACK.pdf' as the generic brochure for all courses as per requirement.
           Ideally `course.brochureUrl` would be in the data for specific files.
        */
        const link = document.createElement('a');
        link.href = course.brochureUrl || '/MERN STACK.pdf';
        link.download = `${course.title.replace(/\s+/g, '-')}-Curriculum.pdf`; // Force download name
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Inline styles for dynamic theming
    const heroStyle = {
        background: `linear-gradient(135deg, ${themeColor}20 0%, #ffffff 100%)`,
        padding: '50px 20px',
        paddingTop: '120px',
        position: 'relative',
        overflow: 'hidden'
    };

    const sectionTitleStyle = {
        fontSize: '2rem',
        fontWeight: '800',
        color: '#0f172a',
        marginBottom: '40px',
        position: 'relative',
        display: 'inline-block'
    };

    return (
        <div className="course-detail-page">
            {/* Hero Section */}
            <section style={heroStyle}>
                <div className="gk-container" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '40px' }}>
                    <div style={{ flex: '1', minWidth: '350px' }}>

                        {/* Back Button */}
                        <button
                            onClick={handleBack}
                            style={{
                                display: 'flex',
                                width: 'fit-content',
                                alignItems: 'center',
                                gap: '8px',
                                background: '#ffffff',
                                border: '1px solid #e2e8f0',
                                color: '#475569',
                                fontSize: '0.95rem',
                                fontWeight: '600',
                                marginBottom: '25px',
                                cursor: 'pointer',
                                padding: '12px 24px',
                                borderRadius: '50px',
                                boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateX(-5px)';
                                e.currentTarget.style.color = themeColor;
                                e.currentTarget.style.borderColor = themeColor;
                                e.currentTarget.style.boxShadow = `0 10px 15px -3px ${themeColor}20`;
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateX(0)';
                                e.currentTarget.style.color = '#475569';
                                e.currentTarget.style.borderColor = '#e2e8f0';
                                e.currentTarget.style.boxShadow = '0 1px 2px rgba(0,0,0,0.05)';
                            }}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"></path><polyline points="12 19 5 12 12 5"></polyline></svg>
                            Back to Courses
                        </button>

                        <span style={{
                            background: themeColor,
                            color: '#fff',
                            padding: '6px 12px',
                            borderRadius: '50px',
                            fontSize: '0.85rem',
                            fontWeight: '700',
                            marginBottom: '20px',
                            display: 'inline-block'
                        }}>
                            {course.category}
                        </span>
                        <h1 style={{ fontSize: '3.5rem', fontWeight: '800', color: '#0f172a', lineHeight: '1.1', marginBottom: '20px' }}>
                            {course.title}
                        </h1>
                        <p style={{ fontSize: '1.2rem', color: '#475569', lineHeight: '1.6', marginBottom: '30px', maxWidth: '600px' }}>
                            {course.description || "Master the skills needed to excel in this field with our comprehensive, industry-aligned curriculum."}
                        </p>

                        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                            <div className="gk-meta-item" style={{ fontSize: '1rem' }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={themeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                                <span style={{ color: '#0f172a' }}>{course.duration}</span>
                            </div>
                            <div className="gk-meta-item" style={{ fontSize: '1rem' }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={themeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                <span style={{ color: '#0f172a' }}>{course.role}</span>
                            </div>
                        </div>
                    </div>

                    {/* Course Card / Image */}
                    <div style={{
                        flex: '1',
                        maxWidth: '450px',
                        background: '#fff',
                        padding: '40px',
                        borderRadius: '24px',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1)',
                        border: `1px solid ${themeColor}30`,
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center', // Centering content
                        textAlign: 'center'
                    }}>
                        <div style={{
                            width: '100px',
                            height: '100px',
                            margin: '0 0 25px 0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '10px',
                            background: `${themeColor}10`,
                            borderRadius: '20px'
                        }}>
                            <img src={course.image} alt={course.title} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                        </div>

                        <div className="gk-price-info" style={{
                            display: 'flex',
                            alignItems: 'baseline',
                            justifyContent: 'center',
                            gap: '12px',
                            marginBottom: '30px',
                            width: '100%'
                        }}>
                            <span className="gk-price-current" style={{
                                fontSize: '2.5rem',
                                fontWeight: '800',
                                color: themeColor,
                                lineHeight: 1
                            }}>
                                {course.price}
                            </span>
                            {course.originalPrice && (
                                <span className="gk-price-original" style={{
                                    fontSize: '1.25rem',
                                    color: '#94a3b8',
                                    textDecoration: 'line-through',
                                    fontWeight: '500'
                                }}>
                                    {course.originalPrice}
                                </span>
                            )}
                        </div>

                        <Link to="/register" className="gk-explore-btn" style={{
                            background: themeColor,
                            color: '#fff',
                            border: 'none',
                            marginBottom: '15px',
                            width: '100%',
                            justifyContent: 'center',
                            textDecoration: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px'
                        }}>
                            Enroll Now
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                        </Link>

                        <button
                            className="gk-explore-btn"
                            onClick={handleDownloadBrochure}
                            style={{
                                background: '#fff',
                                color: '#0f172a',
                                border: '2px solid #e2e8f0',
                                width: '100%',
                                justifyContent: 'center'
                            }}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                            Download Curriculum
                        </button>
                    </div>
                </div>
            </section>

            <BrochureModal
                isOpen={showModal}
                courseTitle={course.title}
                onDownload={handleModalDownload}
                onClose={() => setShowModal(false)}
            />

            {/* Curriculum / Details Section */}
            <section style={{ padding: '60px 20px', background: '#fff' }}>
                <div className="gk-container">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' }}>
                        <h2 style={{ ...sectionTitleStyle, marginBottom: 0 }}>What You Will Learn</h2>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            padding: '10px 20px',
                            background: '#f8fafc',
                            borderRadius: '50px',
                            border: '1px solid #e2e8f0',
                            fontSize: '0.9rem',
                            color: '#64748b'
                        }}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                            For detailed curriculum, please click <span style={{ fontWeight: '700', color: themeColor, cursor: 'pointer' }} onClick={handleDownloadBrochure}>Download Curriculum</span>
                        </div>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '24px'
                    }}>
                        {(course.curriculum || ["Fundamental Concepts", "Advanced Techniques", "Practical Projects", "Industry Tools", "Career Preparation"]).map((item, index) => (
                            <div key={index} style={{
                                padding: '20px',
                                background: '#ffffff',
                                borderRadius: '16px',
                                border: '1px solid #f1f5f9',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.02)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '16px',
                                transition: 'transform 0.2s ease',
                                cursor: 'default'
                            }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-3px)';
                                    e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.05)';
                                    e.currentTarget.style.borderColor = `${themeColor}40`;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.02)';
                                    e.currentTarget.style.borderColor = '#f1f5f9';
                                }}
                            >
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    background: `${themeColor}15`,
                                    color: themeColor,
                                    borderRadius: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0
                                }}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                </div>
                                <span style={{ fontSize: '1.05rem', fontWeight: '600', color: '#334155' }}>{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CourseDetail;
