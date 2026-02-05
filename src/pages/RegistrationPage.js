import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RegistrationPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        course: "",
        feeType: "registration", // Default to registration
    });

    // const [extraDiscount, setExtraDiscount] = useState(0); // Extra discount for existing mobile
    const [loaded, setLoaded] = useState(false); // Animation trigger
    const [courses, setCourses] = useState([]);
    const [dummyPaying, setDummyPaying] = useState(false);

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
                : "https://localhost:7045/api/student/LandingFeeCalculation";
            const res = await fetch(url);
            const data = await res.json();
            setCourses(data);
        } catch (err) {
            console.error("Error fetching courses:", err);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle phone number input and check for extra discount
    const [disabledProgrammeId, setDisabledProgrammeId] = useState(null); // Store the programmeId that is disabled
    const [paymentDisabled, setPaymentDisabled] = useState(false); // Derived state for UI

    // Update paymentDisabled whenever disabledProgrammeId or selected course changes
    useEffect(() => {
        const selectedCourse = courses.find(c => c.programmeName === formData.course);
        if (selectedCourse && disabledProgrammeId && selectedCourse.programmeId === disabledProgrammeId) {
            setPaymentDisabled(true);
        } else {
            setPaymentDisabled(false);
        }
    }, [disabledProgrammeId, formData.course, courses]);


    // Fetch student details by mobile
    const fetchStudentDetails = async (mobileNo) => {
        try {
            const res = await fetch(`https://localhost:7045/api/Student/GetStudentDetailsByMobile/${mobileNo}`);
            if (res.ok) {
                const data = await res.json();
                console.log("Fetched student details:", data);
                if (data) {
                    setFormData((prev) => ({
                        ...prev,
                        firstName: data.firstName || prev.firstName,
                        lastName: data.lastName || prev.lastName,
                        email: data.email || prev.email,
                        course: data.programme || prev.course, // Auto-select course if matches
                    }));
                }
            }
        } catch (err) {
            console.error("Error fetching student details:", err);
        }
    };

    // Fetch payment status by mobile
    const fetchPaymentStatus = async (mobileNo) => {
        try {
            const res = await fetch(`https://localhost:7045/api/Student/GetStudentPaymentStatus/${mobileNo}`);
            if (res.ok) {
                const data = await res.json();
                console.log("Fetched payment status:", data);
                if (data && data.paymentStatus === "DISABLE") {
                    setDisabledProgrammeId(data.programmeId || data.groupId); // Store disabled programme ID
                } else {
                    setDisabledProgrammeId(null);
                }
            } else {
                setDisabledProgrammeId(null);
            }
        } catch (err) {
            console.error("Error fetching payment status:", err);
            setDisabledProgrammeId(null);
        }
    };

    // Handle phone number input and check for extra discount
    const handlePhoneChange = async (e) => {
        const phone = e.target.value;

        setFormData((prev) => ({
            ...prev,
            phone,
        }));

        if (phone.length === 10) {
            await fetchCourses(phone); // apply loyalty discount if exists
            await fetchStudentDetails(phone); // Auto-fill details
            await fetchPaymentStatus(phone); // Check payment status
        } else {
            if (formData.phone.length === 10 && phone.length !== 10) {
                await fetchCourses(null); // reset to base offer only if it was previously 10 digits
                setDisabledProgrammeId(null); // Reset payment status
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (dummyPaying) return;

        // Basic validations
        if (!formData.phone || formData.phone.length !== 10) {
            alert("Enter a valid 10-digit mobile number");
            return;
        }
        if (!formData.email || !formData.firstName || !formData.course) {
            alert("Email, First Name, and Course are required.");
            return;
        }

        setDummyPaying(true);

        try {
            const selectedCourse = courses.find(
                (c) => c.programmeName === formData.course,
            );
            const programmeId = selectedCourse ? selectedCourse.programmeId : 0;

            // Register student
            const registrationPayload = {
                email: formData.email,
                firstName: formData.firstName,
                lastName: formData.lastName,
                phoneNumber: formData.phone,
                programmeId: programmeId,
            };

            console.log("🚀 Registration payload:", registrationPayload);

            const registrationRes = await fetch(
                "https://localhost:7045/api/student/Landingregister",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(registrationPayload),
                },
            );

            if (!registrationRes.ok) {
                const errorText = await registrationRes.text();
                console.error("Registration failed:", errorText);
                try {
                    const errorObj = JSON.parse(errorText);
                    if (errorObj.errors) {
                        const messages = Object.values(errorObj.errors).flat().join("\n");
                        alert("Registration Failed:\n" + messages);
                    } else {
                        alert("Registration Failed: " + (errorObj.title || errorText));
                    }
                } catch {
                    alert("Registration Failed: " + errorText);
                }
                setDummyPaying(false);
                return;
            }

            const regResult = await registrationRes.json();
            const username = regResult.username || regResult.Username;

            if (!username) {
                alert("Registration successful, but username missing from response.");
                setDummyPaying(false);
                return;
            }

            console.log("✅ Registration successful. Username:", username);

            // Calculate amount (production)
            const amount =
                formData.feeType === "registration"
                    ? 999
                    : selectedCourse
                        ? selectedCourse.offerFee
                        : 0;

            // Initiate payment
            const fullName = `${formData.firstName || ""} ${formData.lastName || ""}`.trim();

            const paymentPayload = {
                Username: username,
                MobileNumber: formData.phone,
                Amount: amount,
                Name: fullName || username,
                BatchName: "",
                ProgrammeId: programmeId,
                GroupId: 0,
            };

            console.log("🚀 Payment initiate payload:", paymentPayload);

            const payRes = await fetch(
                "https://localhost:7045/api/payments/phonepe/initiate",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(paymentPayload),
                },
            );

            if (!payRes.ok) {
                const payErrText = await payRes.text();
                console.error("Payment initiate failed:", payErrText);
                alert(
                    "Registration completed, but payment could not be started. Please contact support.",
                );
                setDummyPaying(false);
                return;
            }

            const payResult = await payRes.json();
            console.log("✅ Payment initiated successfully:", payResult);

            const redirectUrl = payResult.redirectUrl;
            const merchantOrderId = payResult.merchantOrderId;

            if (!redirectUrl) {
                console.error("PhonePe redirectUrl missing", payResult);
                alert(
                    "Registration completed, but payment URL missing. Please contact support.",
                );
                setDummyPaying(false);
                return;
            }

            // Store payment info for PaymentResult
            localStorage.setItem(
                "paymentInfo",
                JSON.stringify({
                    merchantOrderId: merchantOrderId,
                    username: username,
                    amount: amount,
                    courseInfo: formData.course,
                    timestamp: new Date().toISOString(),
                }),
            );

            // Redirect to payment gateway
            window.location.href = redirectUrl;
        } catch (err) {
            console.error("Error submitting form:", err);
            alert("An error occurred. Please try again.");
        } finally {
            setDummyPaying(false);
        }
    };

    const handleDummyPayment = async (e) => {
        e.preventDefault();
        if (dummyPaying) return;

        // Validation
        if (!formData.phone || formData.phone.length !== 10) {
            alert("Enter a valid 10-digit mobile number");
            return;
        }

        if (!formData.email || !formData.firstName || !formData.course) {
            alert("Email, First Name, and Course are required.");
            return;
        }

        setDummyPaying(true);

        try {
            const selectedCourseData = courses.find(
                (c) => c.programmeName === formData.course,
            );
            const programmeId = selectedCourseData ? selectedCourseData.programmeId : 0;

            // Step 1: Register the student
            const registrationPayload = {
                email: formData.email,
                firstName: formData.firstName,
                lastName: formData.lastName,
                phoneNumber: formData.phone,
                programmeId: programmeId,
            };

            console.log("🚀 Registration payload:", registrationPayload);

            const registrationRes = await fetch(
                "https://localhost:7045/api/student/Landingregister",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(registrationPayload),
                },
            );

            if (!registrationRes.ok) {
                const errorText = await registrationRes.text();
                console.error("Registration failed:", errorText);
                try {
                    const errorObj = JSON.parse(errorText);
                    if (errorObj.errors) {
                        const messages = Object.values(errorObj.errors).flat().join("\n");
                        alert("Registration Failed:\n" + messages);
                    } else {
                        alert("Registration Failed: " + (errorObj.title || errorText));
                    }
                } catch {
                    alert("Registration Failed: " + errorText);
                }
                setDummyPaying(false);
                return;
            }

            const regResult = await registrationRes.json();
            const username = regResult.username || regResult.Username;

            if (!username) {
                alert("Registration successful, but username missing from response.");
                setDummyPaying(false);
                return;
            }

            console.log("✅ Registration successful. Username:", username);

            // Step 2: Calculate amount (fixed 1 rupee for testing)
            const amount = 1;

            // Step 3: Initiate payment
            const fullName = `${formData.firstName || ""} ${formData.lastName || ""}`.trim();

            const paymentPayload = {
                Username: username,
                MobileNumber: formData.phone,
                Amount: amount,
                Name: fullName || username,
                BatchName: "", // Optional
                ProgrammeId: programmeId,
                GroupId: 0, // Optional
            };

            console.log("🚀 Payment initiate payload:", paymentPayload);

            const payRes = await fetch(
                "https://localhost:7045/api/payments/phonepe/initiate",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(paymentPayload),
                },
            );

            if (!payRes.ok) {
                const payErrText = await payRes.text();
                console.error("Payment initiate failed:", payErrText);
                alert(
                    "Registration completed, but payment could not be started. Please contact support.",
                );
                setDummyPaying(false);
                return;
            }

            const payResult = await payRes.json();
            console.log("✅ Payment initiated successfully:", payResult);

            const redirectUrl = payResult.redirectUrl;
            const merchantOrderId = payResult.merchantOrderId;

            if (!redirectUrl) {
                console.error("PhonePe redirectUrl missing", payResult);
                alert(
                    "Registration completed, but payment URL missing. Please contact support.",
                );
                setDummyPaying(false);
                return;
            }

            // Store payment info in localStorage for payment-result page
            localStorage.setItem(
                "paymentInfo",
                JSON.stringify({
                    merchantOrderId: merchantOrderId,
                    username: username,
                    amount: amount,
                    courseInfo: formData.course,
                    timestamp: new Date().toISOString(),
                }),
            );

            // Redirect to PhonePe payment gateway
            window.location.href = redirectUrl;
        } catch (err) {
            console.error("Error in payment flow:", err);
            alert("An error occurred. Please try again.");
        } finally {
            setDummyPaying(false);
        }
    };

    const selectedCourse = courses.find(
        (c) => c.programmeName === formData.course,
    );

    // Calculate display fee with extra discount
    const displayFee = selectedCourse ? selectedCourse.offerFee : "Select Course";

    return (
        <div className="gk-reg-container">
            <div className={`gk-reg-wrapper ${loaded ? "loaded" : ""}`}>
                {/* Left Side: Visual & Brand */}
                <div className="gk-reg-visual">
                    <div className="gk-visual-decor gk-blob-1"></div>
                    <div className="gk-visual-decor gk-blob-2"></div>
                    <div className="gk-visual-content">
                        <div className="gk-brand-tag">
                            <img src="../images/logo.jpg" alt="Skill Ascent" className="gk-reg-logo" />
                        </div>
                        <h1 className="gk-visual-title">
                            Start your <br />
                            <span className="gk-text-highlight">Learning Journey.</span>
                        </h1>
                        <p className="gk-visual-desc">
                            Join a community of 10,000+ learners and master the skills top
                            companies are hiring for today.
                        </p>
                        <div className="gk-features-list">
                            <div className="gk-feat-item">
                                <i className="fa-solid fa-circle-check"></i>{" "}
                                <span>Life-time Access</span>
                            </div>
                            <div className="gk-feat-item">
                                <i className="fa-solid fa-circle-check"></i>{" "}
                                <span>Expert Mentorship</span>
                            </div>
                            <div className="gk-feat-item">
                                <i className="fa-solid fa-circle-check"></i>{" "}
                                <span>Global Certification</span>
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
                                    <option value="" disabled>
                                        Select your Course
                                    </option>
                                    {courses.map((course) => (
                                        <option
                                            key={course.programmeId}
                                            value={course.programmeName}
                                        >
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
                                    className={`gk-fee-card ${formData.feeType === "registration" ? "selected" : ""}`}
                                    onClick={() =>
                                        setFormData({ ...formData, feeType: "registration" })
                                    }
                                >
                                    <div className="gk-fee-header">
                                        <div className="gk-radio-circle">
                                            {formData.feeType === "registration" && (
                                                <div className="gk-radio-dot"></div>
                                            )}
                                        </div>
                                        <span>Registration Fee</span>
                                    </div>
                                    <div className="gk-fee-amount">Rs. 499</div>
                                    <div className="gk-fee-desc">Book your seat</div>
                                </div>

                                {/* Course Fee */}
                                <div
                                    className={`gk-fee-card ${formData.feeType === "course" ? "selected" : ""}`}
                                    onClick={() =>
                                        setFormData({ ...formData, feeType: "course" })
                                    }
                                >
                                    <div className="gk-fee-header">
                                        <div className="gk-radio-circle">
                                            {formData.feeType === "course" && (
                                                <div className="gk-radio-dot"></div>
                                            )}
                                        </div>
                                        <span style={{ textTransform: "uppercase" }}>
                                            {selectedCourse
                                                ? selectedCourse.runningOffer
                                                : "Course Fee"}
                                        </span>
                                    </div>
                                    <div className="gk-fee-amount">
                                        {selectedCourse ? (
                                            <>
                                                Rs. {displayFee}
                                                <span
                                                    style={{
                                                        textDecoration: "line-through",
                                                        fontSize: "0.8em",
                                                        color: "#888",
                                                        marginLeft: "8px",
                                                    }}
                                                >
                                                    Rs. {selectedCourse.fee}
                                                </span>
                                            </>
                                        ) : (
                                            "Select Course"
                                        )}
                                    </div>
                                    <div className="gk-fee-desc">Full course access</div>
                                </div>
                            </div>
                        </div>

                        <button type="submit" className="gk-reg-btn" disabled={paymentDisabled} style={{ opacity: paymentDisabled ? 0.5 : 1, cursor: paymentDisabled ? 'not-allowed' : 'pointer' }}>
                            {paymentDisabled ? "Payment Disabled" : (<span>Register Now <i className="fa-solid fa-arrow-right-long"></i></span>)}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegistrationPage;
