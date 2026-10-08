import React from 'react';
import portfolioContent from '../data/portfolioContent';
import './Education.css';

const Education = () => {
    const { education } = portfolioContent;

    return (
        <section className="education-page">
            <div className="container">
                <h2 className="section-title">Education</h2>
                <p className="section-subtitle">{education.intro}</p>

                <div className="timeline">
                    {education.items.map((item) => (
                        <article key={item.school} className="timeline-item">
                            <div className="timeline-content surface-card">
                                <h3>{item.school}</h3>
                                <span className="date">{item.period}</span>
                                <p className="education-qualification">{item.qualification}</p>
                                <p>{item.detail}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Education;
