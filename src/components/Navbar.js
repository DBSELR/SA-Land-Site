import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

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
                    <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection("home"); }}>Home</a>
                    <a href="#courses" onClick={(e) => { e.preventDefault(); scrollToSection("courses"); }}>Learn</a>

                    <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection("about"); }}>About</a>
                    <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection("contact"); }}>Contact</a>
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
