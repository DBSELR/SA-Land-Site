import React, { useState } from 'react';
import axios from 'axios';

// REPLACE THIS WITH YOUR DEPLOYED GOOGLE APPS SCRIPT WEB APP URL
// REPLACE THIS WITH YOUR DEPLOYED GOOGLE APPS SCRIPT WEB APP URL
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwXP4ymGeZclenTDIRG1zgXLY1CQ_MOc5amXlxVaweTgtbZEKRe9iq7CvxsJ76YYE_oyg/exec";

const ContactUsPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobileNo: '', // Matching API key "mobileNo"
        message: ''
    });
    const [status, setStatus] = useState('idle'); // idle, loading, success, error

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    // Version Check Log
    console.log("ContactForm Loaded: v1.2 (Source Fix Applied)");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        const payload = { ...formData, Source: 'Website' };
        console.log("Sending Payload:", payload); // Debugging log

        // Send to Google Sheets (Fire and forget)
        submitToGoogleSheets(payload);

        try {
            await axios.post('https://localhost:7045/api/BulkSms/mainleadsave', payload, {
                headers: { 'Content-Type': 'application/json' }
            });
            setStatus('success');
            setFormData({ name: '', email: '', mobileNo: '', message: '' });
            setTimeout(() => setStatus('idle'), 5000);
        } catch (error) {
            console.error("Contact form submission failed details:", error);
            if (error.response && error.response.data && error.response.data.errors) {
                // Formatting validation errors for display
                const validationErrors = Object.values(error.response.data.errors).flat().join(', ');
                console.error("Validation Errors:", validationErrors);
                setStatus(`Error: ${validationErrors}`);
            } else {
                setStatus('error');
            }
            setTimeout(() => setStatus('idle'), 8000);
        }
    };

    const submitToGoogleSheets = async (data) => {
        try {
            await fetch(GOOGLE_SCRIPT_URL, {
                method: "POST",
                mode: "no-cors", // Important: Google Apps Script Web App requires no-cors for simple POSTs
                headers: {
                    "Content-Type": "text/plain", // Avoids CORS preflight options request
                },
                body: JSON.stringify(data),
            });
            console.log("Submitted to Google Sheets");
        } catch (error) {
            console.error("Error submitting to Google Sheets:", error);
        }
    };

    return (
        <section className="gk-contact-section">

            {/* Header Section */}
            <div className="gk-contact-header">
                <h2 className="gk-header-title">Get in Touch</h2>
                <p className="gk-header-subtitle">
                    We’re here to help! If you have any questions, feedback, or need support regarding our courses and services, reach out to us anytime.
                </p>
            </div>

            <div className="gk-contact-container">
                <div className="gk-contact-wrapper gk-fade-up">

                    {/* Left Sidebar: Contact Info */}
                    <div className="gk-contact-info-box">
                        <h3 className="gk-info-title">Contact Information</h3>

                        <div className="gk-info-details">
                            {/* Phone Icon & Link */}
                            <a href="tel:+8297222301" className="gk-detail-item">
                                <div className="gk-icon-circle">
                                    <i className="fa-solid fa-phone"></i>
                                </div>
                                <span>+91-8297222301</span>
                            </a>

                            {/* Email Icon & Link */}
                            <a href="mailto:info@skillascent.in" className="gk-detail-item">
                                <div className="gk-icon-circle">
                                    <i className="fa-solid fa-envelope"></i>
                                </div>
                                <span>info@skillascent.in</span>
                            </a>

                            {/* Address Icon & Text */}
                            <div className="gk-detail-item">
                                <div className="gk-icon-circle">
                                    <i className="fa-solid fa-location-dot"></i>
                                </div>
                                <span>
                                    D BASE SOLUTIONS PRIVATE LIMITED<br /> D.NO.16-58/33, Sai Sadan,<br />
                                    Hanuman Nagar, Eluru<br />
                                    AP– 534001, India
                                </span>
                            </div>
                        </div>

                        {/* Reuse Social Styles from Footer if available */}
                        <div className="gk-contact-socials">
                            <div className="gk-social-icons-row">
                                <a href="#" className="gk-soc-link"><i className="fab fa-facebook-f"></i></a>
                                <a href="#" className="gk-soc-link"><i className="fab fa-linkedin-in"></i></a>
                                <a href="#" className="gk-soc-link"><i className="fab fa-instagram"></i></a>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Contact Form */}
                    <div className="gk-contact-form-box">
                        <form onSubmit={handleSubmit}>
                            <div className="gk-form-grid">

                                {/* Name Input */}
                                <div className="gk-input-group">
                                    <label htmlFor="name">Your Name *</label>
                                    <input
                                        type="text"
                                        id="name"
                                        placeholder="Enter Your Name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </div>

                                {/* Email Input */}
                                <div className="gk-input-group">
                                    <label htmlFor="email">Your Email *</label>
                                    <input
                                        type="email"
                                        id="email"
                                        placeholder="Enter Your Email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            {/* Phone Input (Optional -> now mapped to mobileNo) */}
                            <div className="gk-input-group">
                                <label htmlFor="mobileNo">Mobile Number *</label>
                                <input
                                    type="tel"
                                    id="mobileNo"
                                    placeholder="Enter Your 10 digit Mobile Number"
                                    required
                                    pattern="[0-9]{10}"
                                    title="Please enter a valid 10 digit mobile number"
                                    value={formData.mobileNo}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Message Textarea */}
                            <div className="gk-input-group">
                                <label htmlFor="message">Message *</label>
                                <textarea
                                    id="message"
                                    rows="5"
                                    placeholder="How can we help you?"
                                    required
                                    value={formData.message}
                                    onChange={handleChange}
                                ></textarea>
                            </div>

                            {/* Feedback messages */}
                            {status === 'error' && <p style={{ color: 'red', marginBottom: '10px' }}>Something went wrong. Please check your inputs.</p>}
                            {status.startsWith('Error:') && <p style={{ color: 'red', marginBottom: '10px' }}>{status}</p>}

                            {/* Submit Button with conditional state */}
                            <button
                                type="submit"
                                className={`gk-send-btn ${status === 'success' ? 'submitted' : ''}`}
                                disabled={status === 'loading' || status === 'success'}
                            >
                                {status === 'loading' ? 'Sending...' : status === 'success' ? 'Message Sent! ✓' : 'Send Message'}
                            </button>
                        </form>
                    </div>

                    {/* <div className="gk-support-note" style={{ gridColumn: "1 / -1", textAlign: "center", marginTop: "2rem", color: "#64748b" }}>
                        <p>Our support team at Skillascent will get back to you promptly during business hours.</p>
                    </div> */}

                </div>
            </div>
        </section>
    );
};

export default ContactUsPage;