import React from 'react';

const DemoBook = () => {
    return (
        <section className="demo-book-section">
            <div className="demo-book-container">
                {/* Left Side: AI Features */}
                <div className="demo-content-wrapper">
                    
                    {/* Resume Builder Section */}
                    <div className="demo-feature-card">
                        <div className="feature-icon-wrapper">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                        </div>
                        <div className="feature-content">
                            <h3 className="feature-title">AI Resume Builder</h3>
                            <p className="feature-desc">Create professional, ATS-friendly resumes in minutes with our AI-powered builder. tailored to your industry and role.</p>
                            <div className="lms-availability">
                                <span className="lms-dot"></span> Available in our LMS Platform
                            </div>
                        </div>
                    </div>

                    {/* Mock Interview Section */}
                    <div className="demo-feature-card">
                        <div className="feature-icon-wrapper purple-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                        </div>
                        <div className="feature-content">
                            <h3 className="feature-title">AI Mock Interviews</h3>
                            <p className="feature-desc">Practice with realistic AI interviewers, get instant feedback on your answers, and improve your confidence.</p>
                             <div className="lms-availability">
                                <span className="lms-dot"></span> Available in our LMS Platform
                            </div>
                        </div>
                    </div>

                </div>

                {/* Right Side: Image */}
                <div className="demo-cert-img">
                    <img src="/certi.jpg" alt="Certificate of Completion" />
                </div>
            </div>
        </section>
    );
};

export default DemoBook;
