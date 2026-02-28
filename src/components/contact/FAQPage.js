import React, { useState } from 'react';
import { Plus, Minus, MessageCircle } from 'lucide-react';

const faqData = [
    {
        question: "Who can enroll in Skill Ascent courses?",
        answer: "Our courses are designed for everyone—from beginners with no prior experience to professionals looking to upskill or transition into the IT industry."
    },
    {
        question: "Do you offer placement assistance?",
        answer: "Yes! We provide dedicated placement support, including resume building, interview preparation, and connecting you with our network of hiring partners."
    },
    {
        question: "Are the training sessions online or offline?",
        answer: "We offer both flexible online classes and hands-on offline training sessions. You can choose the mode of learning that best fits your schedule and preferences."
    },
    {
        question: "Will I get a certificate after completing the course?",
        answer: "Absolutely. Upon successful completion of your course and projects, you will receive an industry-recognized certificate from Skill Ascent."
    },
    {
        question: "What kind of projects will I work on?",
        answer: "You will work on real-world, industry-relevant projects designed to give you practical experience and build a strong portfolio to showcase to employers."
    },
    {
        question: "How do I clear my doubts during the training?",
        answer: "Our expert mentors are available to help you. You can ask questions during live sessions, participate in dedicated doubt-clearing classes, or use our community forums."
    }
];

const FAQPage = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="sa-faq-modern-section">
            <div className="sa-faq-bg-blob sa-faq-blob-1"></div>
            <div className="sa-faq-bg-blob sa-faq-blob-2"></div>

            <div className="sa-faq-modern-container">
                <div className="sa-faq-header-wrapper">
                    <div className="sa-faq-badge">
                        <MessageCircle size={16} />
                        <span>Got Questions?</span>
                    </div>
                    <h2 className="sa-faq-main-title">
                        Frequently Asked Questions
                    </h2>
                    <p className="sa-faq-sub-title">
                        Everything you need to know about Skill Ascent and our IT training programs.
                    </p>
                </div>

                <div className="sa-faq-accordion-container">
                    {faqData.map((faq, index) => {
                        const isActive = activeIndex === index;
                        return (
                            <div
                                key={index}
                                className={`sa-faq-accordion-item ${isActive ? 'active' : ''}`}
                            >
                                <button
                                    className="sa-faq-accordion-header"
                                    onClick={() => toggleFAQ(index)}
                                    aria-expanded={isActive}
                                >
                                    <span className="sa-faq-accordion-question">{faq.question}</span>
                                    <div className="sa-faq-accordion-icon">
                                        {isActive ? <Minus size={20} /> : <Plus size={20} />}
                                    </div>
                                </button>
                                <div className="sa-faq-accordion-collapse">
                                    <div className="sa-faq-accordion-body">
                                        <p>{faq.answer}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default FAQPage;
