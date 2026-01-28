import React, { useState, useEffect } from 'react';

const RegistrationPage = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        course: '',
        feeType: 'registration', // Default to registration
    });

   // const [extraDiscount, setExtraDiscount] = useState(0); // Extra discount for existing mobile
    const [loaded, setLoaded] = useState(false); // Animation trigger
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        setLoaded(true);
        // Fetch courses initially without mobile
        fetchCourses();
    }, []);

    // Fetch courses function with optional mobile number
    const fetchCourses = async (mobileNo = null) => {
        try {
            const url = mobileNo
                ? `https://localhost:7045/api/student/LandingFeeCalculation?mobileNo=${mobileNo}`
                : 'https://localhost:7045/api/student/LandingFeeCalculation';
            const res = await fetch(url);
            const data = await res.json();
            setCourses(data);
        } catch (err) {
            console.error('Error fetching courses:', err);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle phone number input and check for extra discount
    // Handle phone number input and check for extra discount
    const handlePhoneChange = async (e) => {
        const phone = e.target.value;

        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone,
            course: '',
            feeType: 'registration',
        });

        if (phone.length === 10) {
            await fetchCourses(phone);   // apply loyalty discount if exists
        } else {
            await fetchCourses(null);    // reset to base offer
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const selectedCourse = courses.find(c => c.programmeName === formData.course);
        const programmeId = selectedCourse ? selectedCourse.programmeId : 0;

        const payload = {
            email: formData.email,
            firstName: formData.firstName,
            lastName: formData.lastName,
            phoneNumber: formData.phone,
            programmeId: programmeId
        };

        try {
            const res = await fetch('https://localhost:7045/api/student/Landingregister', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                alert('Registration Successful!');
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    course: '',
                    feeType: 'registration',
                });
              //  setExtraDiscount(0);
                fetchCourses(); // Reset courses
            } else {
                const errorText = await res.text();
                try {
                    const errorObj = JSON.parse(errorText);
                    if (errorObj.errors) {
                        const messages = Object.values(errorObj.errors).flat().join('\n');
                        alert('Registration Failed:\n' + messages);
                    } else {
                        alert('Registration Failed: ' + (errorObj.title || errorText));
                    }
                } catch {
                    alert('Registration Failed: ' + errorText);
                }
            }
        } catch (err) {
            console.error('Error submitting form:', err);
            alert('An error occurred. Please try again.');
        }
    };

    const selectedCourse = courses.find(c => c.programmeName === formData.course);

    // Calculate display fee with extra discount
   const displayFee = selectedCourse
        ? selectedCourse.offerFee
        : 'Select Course';

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
                    </div>

                    <form onSubmit={handleSubmit} className="gk-reg-form">
                        {/* Phone & Email */}
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
                                        onChange={handlePhoneChange}
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

                        {/* Name Fields */}
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
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="" disabled>Select your Course</option>
                                    {courses.map(course => (
                                        <option key={course.programmeId} value={course.programmeName}>
                                            {course.programmeName}
                                        </option>
                                    ))}
                                </select>
                                <i className="fa-solid fa-chevron-down gk-select-arrow"></i>
                            </div>
                        </div>

                        {/* Fee Cards */}
                        <div className="gk-fee-selection">
                            <label className="gk-fee-label">Select Payment Option</label>
                            <div className="gk-fee-cards">
                                {/* Registration Fee */}
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
                                    <div className="gk-fee-amount">Rs. 999</div>
                                    <div className="gk-fee-desc">Book your seat</div>
                                </div>

                                {/* Course Fee */}
                                <div
                                    className={`gk-fee-card ${formData.feeType === 'course' ? 'selected' : ''}`}
                                    onClick={() => setFormData({ ...formData, feeType: 'course' })}
                                >
                                    <div className="gk-fee-header">
                                        <div className="gk-radio-circle">
                                            {formData.feeType === 'course' && <div className="gk-radio-dot"></div>}
                                        </div>
                                        <span style={{ textTransform: 'uppercase' }}>
                                            {selectedCourse ? selectedCourse.runningOffer : 'Course Fee'}
                                        </span>
                                    </div>
                                    <div className="gk-fee-amount">
                                        {selectedCourse ? (
                                            <>
                                                Rs. {displayFee}
                                                <span style={{ textDecoration: 'line-through', fontSize: '0.8em', color: '#888', marginLeft: '8px' }}>
                                                    Rs. {selectedCourse.fee}
                                                </span>
                                            </>
                                        ) : 'Select Course'}
                                    </div>
                                    <div className="gk-fee-desc">Full course access</div>
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
