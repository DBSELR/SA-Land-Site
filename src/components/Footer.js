import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Footer = () => {
    const [pendingScroll, setPendingScroll] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    const scrollToSection = (id) => {
        if (location.pathname !== "/") {
            setPendingScroll(id);
            navigate("/");
        } else {
            scrollNow(id);
        }
    };

    const scrollNow = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    useEffect(() => {
        if (location.pathname === "/" && pendingScroll) {
            scrollNow(pendingScroll);
            setPendingScroll(null);
        }
    }, [location, pendingScroll]);

    return (
        <footer className="gk-footer">
            <div className="gk-footer-container">

                {/* Top Section: Logo, Socials & Newsletter */}
                <div className="gk-footer-top">

                    {/* Brand & Socials */}
                    <div className="gk-brand-column">
                        <div className="gk-footer-logo">
                            <img src="../images/logo.png" alt="Skill Ascent" style={{ maxHeight: '70px', borderRadius: '8px' }} />
                        </div>

                        <div className="gk-social-icons">
                            <a href="https://www.facebook.com/DbsSkillascent" target="_blank" rel="noopener noreferrer" className="gk-social-link"><i className="fab fa-facebook-f"></i></a>
                            <a href="https://www.instagram.com/dbs_skillascent/" target="_blank" rel="noopener noreferrer" className="gk-social-link"><i className="fab fa-instagram"></i></a>
                            <a href="http://youtube.com/post/UgkxgUqog4VnG8URQEleWA2gbSsqlgRn-9jT?si=dbf_k_281vVb5Tp_" target="_blank" rel="noopener noreferrer" className="gk-social-link"><i className="fab fa-youtube"></i></a>
                            <a href="https://www.linkedin.com/company/skill-ascent?trk=blended-typeahead" target="_blank" rel="noopener noreferrer" className="gk-social-link"><i className="fab fa-linkedin-in"></i></a>
                        </div>
                    </div>

                    {/* About Us Description */}
                    <div className="gk-newsletter-column">
                        {/* <h3 className="gk-newsletter-title">About Skill Ascent</h3> */}
                        <p className="gk-newsletter-desc">
                            Skill Ascent is an innovative online learning platform dedicated to empowering learners with the skills and knowledge needed to succeed in today’s fast-changing world. We specialize in providing high-quality digital courses, skill development programs and professional training in areas such as technology, business, data science, analytics and development.
                        </p>
                    </div>
                </div>

                <div className="gk-footer-divider"></div>

                {/* Middle Section: Links Grid */}
                <div className="gk-footer-links">

                    {/* Column 1: Software & Development */}
                    <div className="gk-link-group">
                        <h4 className="gk-link-header">Software Development</h4>
                        <ul>
                            <li><a href="#courses" onClick={(e) => { e.preventDefault(); scrollToSection("courses1"); }}>MERN Stack Dev</a></li>
                            <li><a href="#courses" onClick={(e) => { e.preventDefault(); scrollToSection("courses1"); }}>Java Full Stack</a></li>
                            <li><a href="#courses" onClick={(e) => { e.preventDefault(); scrollToSection("courses1"); }}>Python Full Stack</a></li>
                            <li><a href="#courses" onClick={(e) => { e.preventDefault(); scrollToSection("courses1"); }}>Frontend (React)</a></li>
                            <li><a href="#courses" onClick={(e) => { e.preventDefault(); scrollToSection("courses1"); }}>Data Analytics</a></li>
                        </ul>
                    </div>

                    {/* Column 2: Advanced Tech & Design */}
                    <div className="gk-link-group">
                        <h4 className="gk-link-header">Tech & Design</h4>
                        <ul>
                            <li><a href="#courses" onClick={(e) => { e.preventDefault(); scrollToSection("courses1"); }}>Data Science</a></li>
                            <li><a href="#courses" onClick={(e) => { e.preventDefault(); scrollToSection("courses1"); }}>DevOps (AWS)</a></li>
                            <li><a href="#courses" onClick={(e) => { e.preventDefault(); scrollToSection("courses1"); }}>Cyber Security</a></li>
                            <li><a href="#courses" onClick={(e) => { e.preventDefault(); scrollToSection("courses1"); }}>Graphic Designing</a></li>
                            <li><a href="#courses" onClick={(e) => { e.preventDefault(); scrollToSection("courses1"); }}>Digital Marketing</a></li>
                        </ul>
                    </div>

                    {/* Column 3: Business, Medical & Others */}
                    <div className="gk-link-group">
                        <h4 className="gk-link-header">Business & Others</h4>
                        <ul>
                            <li><a href="#courses" onClick={(e) => { e.preventDefault(); scrollToSection("courses1"); }}>Power BI</a></li>
                            <li><a href="#courses" onClick={(e) => { e.preventDefault(); scrollToSection("courses1"); }}>Medical Coding</a></li>
                            <li><a href="#courses" onClick={(e) => { e.preventDefault(); scrollToSection("courses1"); }}>Accounts & Tally</a></li>
                            <li><a href="#courses" onClick={(e) => { e.preventDefault(); scrollToSection("courses1"); }}>TET / DSC Exams</a></li>
                            <li><a href="#courses" onClick={(e) => { e.preventDefault(); scrollToSection("courses1"); }}>Organic Farming</a></li>
                        </ul>
                    </div>

                    {/* Column 4: Company & Engage */}
                    <div className="gk-link-group">
                        <h4 className="gk-link-header">Company</h4>
                        <ul>
                            <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection("about"); }}>About Us</a></li>
                            <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection("contact"); }}>Contact Us</a></li>
                            <li><Link to="/return-policy" onClick={() => window.scrollTo(0, 0)}>Return Policy</Link></li>
                            <li><Link to="/privacy-policy" onClick={() => window.scrollTo(0, 0)}>Privacy Policy</Link></li>
                            <li><Link to="/terms-conditions" onClick={() => window.scrollTo(0, 0)}>Terms & Conditions</Link></li>
                            {/* <li><Link to="/cancellation-policy" onClick={() => window.scrollTo(0, 0)}>Cancellation Policy</Link></li>
                            <li><Link to="/refund-policy" onClick={() => window.scrollTo(0, 0)}>Refund Policy</Link></li> */}
                        </ul>
                    </div>

                </div>

                <div className="gk-footer-divider"></div>

                {/* Bottom Section: Copyright & Legal */}
                <div className="gk-footer-bottom">
                    <p className="gk-copyright">© 2026 D Base Solutions Pvt. Ltd. All rights reserved.</p>
                    {/* <div className="gk-legal-links">
                        <Link to="/privacy-policy" onClick={() => window.scrollTo(0, 0)}>Privacy Policy</Link>
                        <Link to="/terms-conditions" onClick={() => window.scrollTo(0, 0)}>Terms & Conditions</Link>
                    </div> */}
                </div>

            </div>
        </footer>
    );
};

export default Footer;