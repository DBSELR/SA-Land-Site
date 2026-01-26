import React, { useState } from 'react';
import axios from 'axios';

// REPLACE THIS WITH YOUR BROCHURE GOOGLE APPS SCRIPT WEB APP URL
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzCjxPObmO8SY5ihFO0EtkrXelDHw1MS-4scJba8Q3USGlX4q58tUI09xuOyp9TN81U/exec";

const BrochureModal = ({ isOpen, courseTitle, onDownload, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        email: ''
    });
    const [status, setStatus] = useState('idle'); // idle, loading, success, error

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');

        // Map form state to API expected keys
        const payload = {
            name: formData.name,
            email: formData.email,
            mobileNo: formData.mobile,
            course: courseTitle,
            Source: 'Website' // Added for consistency with validation rules if any
        };
        console.log("Brochure Payload:", payload);

        // Send to Google Sheets (Fire and forget)
        submitToGoogleSheets(payload);

        try {
            await axios.post('https://localhost:7045/api/BulkSms/Broucherleadsave', payload, {
                headers: { 'Content-Type': 'application/json' }
            });

            // On success
            setStatus('success');

            // Trigger the download action immediately after success 
            setTimeout(() => {
                onDownload();
            }, 1000);

            // Close modal after a short delay to show success state
            setTimeout(() => {
                onClose();
                setStatus('idle');
                setFormData({ name: '', mobile: '', email: '' });
            }, 3000);

        } catch (error) {
            console.error("Brochure submission failed", error);
            if (error.response && error.response.data) {
                console.error("Server Response:", error.response.data);
            }
            setStatus('error');
        }
    };

    const submitToGoogleSheets = async (data) => {
        try {
            await fetch(GOOGLE_SCRIPT_URL, {
                method: "POST",
                mode: "no-cors",
                headers: {
                    "Content-Type": "text/plain",
                },
                body: JSON.stringify(data),
            });
            console.log("Submitted Brochure Lead to Google Sheets");
        } catch (error) {
            console.error("Error submitting Brochure Lead to Google Sheets:", error);
        }
    };

    return (
        <div className="gk-modal-overlay">
            <div className="gk-modal-content">
                <button className="gk-modal-close-btn" onClick={onClose} aria-label="Close Modal">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
                <div className="gk-modal-header">
                    <h3>Download Curriculum</h3>
                    <p>Enter your details to unlock the full course Curriculum for <strong>{courseTitle}</strong>.</p>
                </div>

                <form onSubmit={handleSubmit} className="gk-modal-form">
                    <div className="gk-form-group">
                        <label>Full Name *</label>
                        <input
                            type="text"
                            required
                            placeholder="Enter Your Name"
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>

                    <div className="gk-form-group">
                        <label>Mobile Number *</label>
                        <input
                            type="tel"
                            required
                            placeholder="Enter Your 10 digit Mobile Number"
                            pattern="[0-9]{10}"
                            title="Please enter a valid 10 digit mobile number"
                            value={formData.mobile}
                            onChange={e => setFormData({ ...formData, mobile: e.target.value })}
                        />
                    </div>

                    <div className="gk-form-group">
                        <label>Email Address *</label>
                        <input
                            type="email"
                            required
                            placeholder="Enter Your Email"
                            value={formData.email}
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>

                    {status === 'error' && <p className="gk-error-msg">Something went wrong. Please try again.</p>}

                    <button
                        type="submit"
                        className={`gk-submit-btn ${status === 'loading' ? 'loading' : ''} ${status === 'success' ? 'success' : ''}`}
                        disabled={status === 'loading' || status === 'success'}
                    >
                        {status === 'loading' ? 'Processing...' : status === 'success' ? 'Downloading Now... ⬇️' : 'Download Curriculum'}
                    </button>

                    <p className="gk-privacy-note">🔒 Your information is safe with us.</p>
                </form>
            </div>
        </div>
    );
};

export default BrochureModal;
