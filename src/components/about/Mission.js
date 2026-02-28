import React from 'react';
import { Target, Eye, ArrowRight, CheckCircle2 } from 'lucide-react';

const Mission = () => {
    return (
        <section className="sa-mv-section">
            {/* Animated Background Elements */}
            <div className="sa-mv-bg-animated sa-bg-1"></div>
            <div className="sa-mv-bg-animated sa-bg-2"></div>
            <div className="sa-mv-grid-pattern"></div>

            <div className="sa-mv-container">
                <div className="sa-mv-header-wrapper">
                    <div className="sa-mv-badge-container">
                        <span className="sa-mv-badge">Our Purpose</span>
                    </div>
                    <h2 className="sa-mv-title">
                        Mission <span className="sa-mv-highlight">&</span> Vision
                    </h2>
                    <p className="sa-mv-subtitle">
                        Driving the future of technology learning through excellence, practical skills, and visionary career guidance.
                    </p>
                </div>

                <div className="sa-mv-cards-wrapper">
                    {/* Mission Card */}
                    <div className="sa-mv-card sa-mv-mission">
                        <div className="sa-mv-card-glow"></div>
                        <div className="sa-mv-card-inner">
                            <div className="sa-mv-icon-wrapper">
                                <div className="sa-mv-icon-ring sa-ring-1"></div>
                                <div className="sa-mv-icon-ring sa-ring-2"></div>
                                <div className="sa-mv-icon-circle">
                                    <Target size={36} strokeWidth={2} className="sa-mv-icon" />
                                </div>
                            </div>

                            <h3 className="sa-mv-card-title">Mission – Skill Ascent</h3>
                            <div className="sa-mv-divider"></div>

                            <ul className="sa-mv-list">
                                <li>
                                    <CheckCircle2 size={20} className="sa-mv-list-icon" />
                                    <span>Deliver practical and industry-oriented IT training.</span>
                                </li>
                                <li>
                                    <CheckCircle2 size={20} className="sa-mv-list-icon" />
                                    <span>Bridge the gap between academic knowledge and real-world skills.</span>
                                </li>
                                <li>
                                    <CheckCircle2 size={20} className="sa-mv-list-icon" />
                                    <span>Prepare students for the IT industry through hands-on projects, expert mentorship, and career guidance.</span>
                                </li>
                                <li>
                                    <CheckCircle2 size={20} className="sa-mv-list-icon" />
                                    <span>Empower learners to build confident and successful technology careers.</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Vision Card */}
                    <div className="sa-mv-card sa-mv-vision">
                        <div className="sa-mv-card-glow sa-glow-alt"></div>
                        <div className="sa-mv-card-inner">
                            <div className="sa-mv-icon-wrapper sa-wrapper-alt">
                                <div className="sa-mv-icon-ring sa-ring-1"></div>
                                <div className="sa-mv-icon-ring sa-ring-2"></div>
                                <div className="sa-mv-icon-circle sa-circle-alt">
                                    <Eye size={36} strokeWidth={2} className="sa-mv-icon" />
                                </div>
                            </div>

                            <h3 className="sa-mv-card-title">Vision – Skill Ascent</h3>
                            <div className="sa-mv-divider"></div>

                            <ul className="sa-mv-list">
                                <li>
                                    <CheckCircle2 size={20} className="sa-mv-list-icon" />
                                    <span>Become a trusted leader in skill development and technology education.</span>
                                </li>
                                <li>
                                    <CheckCircle2 size={20} className="sa-mv-list-icon" />
                                    <span>Create a generation of industry-ready professionals equipped with future-ready skills.</span>
                                </li>
                                <li>
                                    <CheckCircle2 size={20} className="sa-mv-list-icon" />
                                    <span>Shape digital careers by embracing innovation and emerging technologies.</span>
                                </li>
                                <li>
                                    <CheckCircle2 size={20} className="sa-mv-list-icon" />
                                    <span>Transform education through practical learning and career excellence.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Mission;
