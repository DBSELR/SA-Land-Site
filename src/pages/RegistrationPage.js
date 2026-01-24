import React, { useState, useEffect } from 'react';
// import { coursesData, categories } from './courses/coursesData';

const RegistrationPage = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        course: '',
        feeType: 'registration' // Default to registration
    });

    const [courseFee, setCourseFee] = useState(0); // Placeholder for future API

    // State for animation triggering
    const [loaded, setLoaded] = useState(false);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        setLoaded(true);

        // Fetch courses from API
        fetch('https://localhost:7045/api/Student/GetLandCourses')
            .then(response => response.json())
            .then(data => {
                setCourses(data);
            })
            .catch(error => {
                console.error('Error fetching courses:', error);
            });
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Find the selected course object to get the ID
        const selectedCourse = courses.find(c => c.programmeName === formData.course);
        const programmeId = selectedCourse ? selectedCourse.programmeId : 0;

        const payload = {
            email: formData.email,
            firstName: formData.firstName,
            lastName: formData.lastName,
            phoneNumber: formData.phone,
            programmeId: programmeId
        };

        fetch('https://localhost:7045/api/student/Landingregister', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
            .then(async response => {
                if (response.ok) {
                    alert("Registration Successful!");
                    setFormData({
                        firstName: '',
                        lastName: '',
                        email: '',
                        phone: '',
                        course: '',
                    });
                } else {
                    const errorText = await response.text();
                    try {
                        // Try to parse JSON error to be more helpful
                        const errorObj = JSON.parse(errorText);
                        // If errors object exists, format it nicely
                        if (errorObj.errors) {
                            const messages = Object.values(errorObj.errors).flat().join('\n');
                            alert("Registration Failed:\n" + messages);
                        } else {
                            alert("Registration Failed: " + (errorObj.title || errorText));
                        }
                    } catch (e) {
                        alert("Registration Failed: " + errorText);
                    }
                    console.error("Registration failed:", errorText);
                }
            })
            .catch(error => {
                console.error('Error submitting form:', error);
                alert("An error occurred. Please try again.");
            });
    };

    return (
        <div className="gk-reg-container">

            <div className={`gk-reg-wrapper ${loaded ? 'loaded' : ''}`}>

                {/* Left Side: Visual & Brand */}
                <div className="gk-reg-visual">
                    <div className="gk-visual-decor gk-blob-1"></div>
                    <div className="gk-visual-decor gk-blob-2"></div>

                    <div className="gk-visual-content">
                        <div className="gk-brand-tag">
                            <img src="/logo.jpg" alt="Skill Ascent" className="gk-reg-logo" />
                        </div>

                        <h1 className="gk-visual-title">
                            Start your <br />
                            <span className="gk-text-highlight">Learning Journey.</span>
                        </h1>

                        <p className="gk-visual-desc">
                            Join a community of 10,000+ learners and master the skills top companies are hiring for today.
                        </p>

                        <div className="gk-features-list">
                            <div className="gk-feat-item">
                                <i className="fa-solid fa-circle-check"></i> <span>Life-time Access</span>
                            </div>
                            <div className="gk-feat-item">
                                <i className="fa-solid fa-circle-check"></i> <span>Expert Mentorship</span>
                            </div>
                            <div className="gk-feat-item">
                                <i className="fa-solid fa-circle-check"></i> <span>Global Certification</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Form */}
                <div className="gk-reg-form-section">
                    <div className="gk-form-header">
                        <h2>Create Account</h2>
                        {/* <p>Already have an account? <a href="/login">Log in</a></p> */}
                    </div>

                    <form onSubmit={handleSubmit} className="gk-reg-form">

                        {/* Phone & Email Grid */}
                        <div className="gk-form-row">
                            <div className="gk-input-field">
                                <label>Phone Number</label>
                                <div className="gk-input-wrapper">
                                    <i className="fa-solid fa-phone gk-input-icon"></i>
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="Mobile Number"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="gk-input-field">
                                <label>Email Address</label>
                                <div className="gk-input-wrapper">
                                    <i className="fa-regular fa-envelope gk-input-icon"></i>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email Address"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Name Fields Row */}
                        <div className="gk-form-row">
                            <div className="gk-input-field">
                                <label>First Name</label>
                                <div className="gk-input-wrapper">
                                    <i className="fa-regular fa-user gk-input-icon"></i>
                                    <input
                                        type="text"
                                        name="firstName"
                                        placeholder="First Name"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="gk-input-field">
                                <label>Last Name</label>
                                <div className="gk-input-wrapper">
                                    <i className="fa-regular fa-user gk-input-icon"></i>
                                    <input
                                        type="text"
                                        name="lastName"
                                        placeholder="Last Name"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Course Selection */}
                        <div className="gk-input-field">
                            <label>Interested Course</label>
                            <div className="gk-input-wrapper">
                                <i className="fa-solid fa-graduation-cap gk-input-icon"></i>
                                <select
                                    name="course"
                                    value={formData.course}
                                    onChange={(e) => {
                                        // Update course fee when course changes (mock logic for now)
                                        const selected = courses.find(c => c.programmeName === e.target.value);
                                        setCourseFee(selected ? selected.fee : 0);
                                        setFormData({ ...formData, course: e.target.value });
                                    }}
                                    required
                                >
                                    <option value="" disabled>Select your Course</option>

                                    {courses.map((course) => (
                                        <option key={course.programmeId} value={course.programmeName}>
                                            {course.programmeName}
                                        </option>
                                    ))}
                                </select>
                                <i className="fa-solid fa-chevron-down gk-select-arrow"></i>
                            </div>
                        </div>

                        {/* Fee Selection Section */}
                        <div className="gk-fee-selection">
                            <label className="gk-fee-label">Select Payment Option</label>

                            <div className="gk-fee-cards">
                                {/* Registration Fee Card */}
                                <div
                                    className={`gk-fee-card ${formData.feeType === 'registration' ? 'selected' : ''}`}
                                    onClick={() => setFormData({ ...formData, feeType: 'registration' })}
                                >
                                    <div className="gk-fee-header">
                                        <div className="gk-radio-circle">
                                            {formData.feeType === 'registration' && <div className="gk-radio-dot"></div>}
                                        </div>
                                        <span>Registration Fee</span>
                                    </div>
                                    <div className="gk-fee-amount">
                                        Rs. 999
                                    </div>
                                    <div className="gk-fee-desc">
                                        Book your seat
                                    </div>
                                </div>

                                {/* Course Fee Card */}
                                <div
                                    className={`gk-fee-card ${formData.feeType === 'course' ? 'selected' : ''}`}
                                    onClick={() => setFormData({ ...formData, feeType: 'course' })}
                                >
                                    <div className="gk-fee-header">
                                        <div className="gk-radio-circle">
                                            {formData.feeType === 'course' && <div className="gk-radio-dot"></div>}
                                        </div>
                                        <span>Course Fee</span>
                                    </div>
                                    <div className="gk-fee-amount">
                                        {courseFee > 0 ? `Rs. ${courseFee}` : 'Select Course'}
                                    </div>
                                    <div className="gk-fee-desc">
                                        Full course access
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button type="submit" className="gk-reg-btn">
                            Register Now <i className="fa-solid fa-arrow-right-long"></i>
                        </button>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegistrationPage;