import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FaExternalLinkAlt } from 'react-icons/fa';
import portfolioContent from '../data/portfolioContent';
import './Projects.css';

const Projects = () => {
    const shouldReduceMotion = useReducedMotion();
    const { projects } = portfolioContent;
    const featuredProjects = projects.filter((project) => project.featured);
    const secondaryProjects = projects.filter((project) => !project.featured);
    const linkLabels = {
        repo: 'Repository',
        demo: 'Demo',
        caseStudy: 'Case study',
    };

    return (
        <section className="projects-page">
            <div className="container">
                <h2 className="section-title">Projects</h2>
                <p className="section-subtitle">
                    A focused look at the work that best reflects my strengths in software, embedded systems, and prototype building.
                </p>

                <div className="project-section-heading">
                    <p className="section-kicker">Featured work</p>
                    <h3>Projects with the clearest story and strongest signal</h3>
                </div>

                <div className="projects-grid featured-projects-grid">
                    {featuredProjects.map((project, index) => (
                        <motion.article
                            key={project.id}
                            className="project-card surface-card featured-project-card"
                            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                            animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.08 }}
                        >
                            <div className="project-accent" style={{ background: project.accent }} />
                            <div className="project-content">
                                <div className="project-header">
                                    <span className="status-pill">Featured</span>
                                    <h3>{project.title}</h3>
                                </div>

                                <p className="project-summary">{project.summary}</p>

                                <div className="project-detail-grid">
                                    <div>
                                        <h4>Problem</h4>
                                        <p>{project.problem}</p>
                                    </div>
                                    <div>
                                        <h4>Role</h4>
                                        <p>{project.role}</p>
                                    </div>
                                    <div>
                                        <h4>Outcome</h4>
                                        <p>{project.outcome}</p>
                                    </div>
                                </div>

                                <div className="tag-list">
                                    {project.stack.map((tag) => (
                                        <span key={tag} className="tag">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="project-links" aria-label={`${project.title} links`}>
                                    {Object.entries(linkLabels).map(([key, label]) => (
                                        project.links[key] ? (
                                            <a
                                                key={key}
                                                href={project.links[key]}
                                                className="project-link"
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                {label} <FaExternalLinkAlt />
                                            </a>
                                        ) : (
                                            <span key={key} className="project-link project-link-disabled">
                                                {label} soon
                                            </span>
                                        )
                                    ))}
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>

                <div className="project-section-heading secondary-heading">
                    <p className="section-kicker">Additional builds</p>
                    <h3>Supporting projects that round out the portfolio</h3>
                </div>

                <div className="projects-grid secondary-projects-grid">
                    {secondaryProjects.map((project) => (
                        <article key={project.id} className="project-card surface-card secondary-project-card">
                            <div className="project-content">
                                <div className="project-header compact">
                                    <h3>{project.title}</h3>
                                </div>
                                <p className="project-summary">{project.summary}</p>
                                <p>{project.outcome}</p>
                                <div className="tag-list">
                                    {project.stack.map((tag) => (
                                        <span key={tag} className="tag">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
