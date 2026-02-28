import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("home");
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === '/about') setActiveTab('about');
        else if (location.pathname === '/contact') setActiveTab('contact');
        else if (location.pathname === '/register') setActiveTab('register');
        else if (location.pathname === '/') {
            // Only reset to home if we aren't looking at courses
            if (activeTab !== 'courses') setActiveTab('home');
        }
    }, [location.pathname]);

    const handleNavClick = (tab, e = null) => {
        if (e) e.preventDefault();
        setActiveTab(tab);
        if (tab === "home" || tab === "courses") {
            scrollToSection(tab);
        } else {
            setMenuOpen(false);
        }
    };

    const scrollToSection = (id) => {
        if (location.pathname !== '/') {
            navigate("/");
            setTimeout(() => {
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                }
            }, 100);
        } else {
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        }
        setMenuOpen(false); // Close mobile menu
    };

    const handleRegisterClick = (e) => {
        e.preventDefault();
        navigate("/register");
        window.scrollTo(0, 0);
        setMenuOpen(false);
    }

    return (
        <header className="navbar">
            <div className="navbar-container">
                {/* Logo */}
                <div className="logo" onClick={() => scrollToSection('home')} style={{ cursor: 'pointer' }}>
                    <img src="../images/logo.png" alt="Skill Ascent" />
                </div>

                {/* Menu */}
                <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
                    <a href="#home" onClick={(e) => handleNavClick("home", e)} className={activeTab === "home" ? "active" : ""}>Home</a>
                    <a href="#courses" onClick={(e) => handleNavClick("courses", e)} className={activeTab === "courses" ? "active" : ""}>Learn</a>
                    <Link to="/about" onClick={() => handleNavClick("about")} className={activeTab === "about" ? "active" : ""}>About</Link>
                    <Link to="/contact" onClick={() => handleNavClick("contact")} className={activeTab === "contact" ? "active" : ""}>Contact</Link>
                    <a href="/register" onClick={handleRegisterClick} className="nav-cta-btn">Register</a>
                </nav>

                {/* Mobile Toggle */}
                <div
                    className={`hamburger ${menuOpen ? "active" : ""}`}
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
