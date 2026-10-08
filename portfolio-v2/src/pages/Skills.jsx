import React from 'react';
import { FaCheck, FaCode, FaMicrochip, FaPaintBrush, FaTools } from 'react-icons/fa';
import portfolioContent from '../data/portfolioContent';
import './Skills.css';

const Skills = () => {
    const { skills } = portfolioContent;
    const iconMap = {
        'Software and Programming': FaCode,
        'IoT and Hardware': FaMicrochip,
        'Creative and Media': FaPaintBrush,
        'Professional Skills': FaTools,
    };

    return (
        <section className="skills-page">
            <div className="container">
                <h2 className="section-title">Core Skills</h2>
                <p className="section-subtitle">{skills.intro}</p>

                <div className="skills-container">
                    {skills.categories.map((category) => {
                        const Icon = iconMap[category.title];

                        return (
                            <article key={category.title} className="skill-category surface-card">
                                <h3><Icon /> {category.title}</h3>
                                <ul className="skill-list">
                                    {category.items.map((item) => (
                                        <li key={item}><FaCheck /> {item}</li>
                                    ))}
                                </ul>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Skills;
