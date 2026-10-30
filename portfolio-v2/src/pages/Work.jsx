import React from 'react';
import { Link } from 'react-router-dom';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { usePortfolioData } from '../context/DataContext';
import { ProductPreview } from '../components/PortfolioVisuals';

const Work = () => {
  const { caseStudies } = usePortfolioData();

  return (
    <section className="work-page container">
      <header className="page-intro">
        <p className="eyebrow">Selected work · 2024—26</p>
        <h1>
          Thoughtful design<br />
          for <em>real complexity.</em>
        </h1>
        <p>
          Three concept case studies spanning enterprise workflows, field operations, and consumer products. Mock research and metrics are clearly identified throughout.
        </p>
      </header>
      <div className="work-list">
        {caseStudies.map((project) => (
          <article key={project.slug} className={`work-card work-${project.accent}`}>
            <Link to={`/work/${project.slug}`} className="work-link">
              <div className="work-copy">
                <span className="project-number">{project.number} / SELECTED PROJECT</span>
                <h2>{project.title}</h2>
                <p className="work-category">{project.category}</p>
                <p>{project.description}</p>
                <div className="tag-list">
                  {project.tools?.map((tool) => (
                    <span key={tool}>{tool}</span>
                  ))}
                </div>
                <span className="text-link">
                  Explore case study <FaExternalLinkAlt />
                </span>
              </div>
              <div className="work-art">
                <ProductPreview type={project.accent} compact />
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Work;
