import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { designProcess } from "../data/caseStudies";
import { usePortfolioData } from "../context/DataContext";
import { ProductPreview } from "../components/PortfolioVisuals";

const reveal = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

const Home = () => {
  const shouldReduceMotion = useReducedMotion();
  const { caseStudies } = usePortfolioData();

  return (
    <>
      <motion.section
        className="hero container"
        initial={shouldReduceMotion ? false : "hidden"}
        animate={shouldReduceMotion ? undefined : "visible"}
      >
        <motion.div
          className="hero-main"
          variants={reveal}
          custom={0.05}
          initial={shouldReduceMotion ? false : "hidden"}
          animate={shouldReduceMotion ? undefined : "visible"}
        >
          <p className="eyebrow">
            <span className="availability-dot" /> Available for design
            opportunities
          </p>
          <h1>
            Designing digital experiences that make <em>complex things</em> feel
            simple.
          </h1>
          <p className="hero-description">
            I&apos;m Marvin Lavoe, a UX/UI and product designer focused on
            enterprise systems, mobile products, IoT, and emerging technology.
          </p>

          <motion.div
            className="hero-actions"
            variants={reveal}
            custom={0.18}
            initial={shouldReduceMotion ? false : "hidden"}
            animate={shouldReduceMotion ? undefined : "visible"}
          >
            <Link className="button button-dark" to="/work">
              View my work <FaArrowRight />
            </Link>
            <Link className="button button-light" to="/about">
              About me
            </Link>
          </motion.div>

          <motion.div
            className="hero-footnote"
            variants={reveal}
            custom={0.26}
            initial={shouldReduceMotion ? false : "hidden"}
            animate={shouldReduceMotion ? undefined : "visible"}
          >
            <span>UX RESEARCH</span>
            <i />
            <span>PRODUCT DESIGN</span>
            <i />
            <span>TECHNICAL FLUENCY</span>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-side"
          initial={
            shouldReduceMotion ? false : { opacity: 0, scale: 0.92, y: 18 }
          }
          animate={
            shouldReduceMotion ? undefined : { opacity: 1, scale: 1, y: 0 }
          }
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.22 }}
        >
          <div
            className="hero-portrait"
            aria-label="Marvin Lavoe profile summary"
          >
            <img src="/marvin-lavoe.jpg" alt="Portrait of Marvin Lavoe" />
          </div>
          <p>
            Curiosity for people.
            <br />
            Respect for complexity.
          </p>
        </motion.div>
      </motion.section>

      <section className="section-block container" id="work">
        <div className="section-heading">
          <div>
            <p className="eyebrow">01 — Selected work</p>
            <h2>
              Different contexts.
              <br />
              <em>One clear intent.</em>
            </h2>
          </div>
          <Link to="/work" className="text-link">
            All projects <FaArrowRight />
          </Link>
        </div>

        <div className="project-grid">
          {caseStudies.map((project, index) => (
            <motion.article
              key={project.slug}
              className={`project-card project-${project.accent}`}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={
                shouldReduceMotion ? undefined : { opacity: 1, y: 0 }
              }
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <Link to={`/work/${project.slug}`} className="project-visual">
                <ProductPreview type={project.accent} compact />
                <span className="project-open" aria-hidden="true">
                  ↗
                </span>
              </Link>
              <div className="project-info">
                <div>
                  <span className="project-number">
                    {project.number} / CASE STUDY
                  </span>
                  <h3>
                    <Link to={`/work/${project.slug}`}>{project.title}</Link>
                  </h3>
                </div>
                <p>{project.description}</p>
                <div className="project-meta">
                  <span>{project.category.split(" · ")[0]}</span>
                  <Link
                    to={`/work/${project.slug}`}
                    aria-label={`Read ${project.title} case study`}
                  >
                    <FaArrowRight />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="process-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">02 — How I work</p>
              <h2>
                Thoughtful by design.
                <br />
                <em>Grounded in evidence.</em>
              </h2>
            </div>
            <p className="section-intro">
              A flexible process that keeps people, context, and the details of
              implementation in the same conversation.
            </p>
          </div>
          <div className="process-grid">
            {designProcess.map(([number, title, detail]) => (
              <motion.article
                key={number}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={
                  shouldReduceMotion ? undefined : { opacity: 1, y: 0 }
                }
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45 }}
              >
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{detail}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-teaser container">
        <p className="eyebrow">03 — The designer behind the work</p>
        <div>
          <h2>
            Designing at the intersection of <em>people and technology.</em>
          </h2>
          <p>
            Technical experience helps me collaborate deeply with builders.
            Design helps me keep the product grounded in what people need.
          </p>
          <Link to="/about" className="text-link">
            More about Marvin <FaArrowRight />
          </Link>
        </div>
        <div className="discipline-list">
          {[
            "UX Research",
            "Product Design",
            "Interface Design",
            "Prototyping",
            "Frontend & IoT",
          ].map((x, i) => (
            <span key={x}>
              <i>0{i + 1}</i>
              {x}
            </span>
          ))}
        </div>
      </section>

      <section className="contact-cta">
        <div className="container">
          <p className="eyebrow">Have a good problem?</p>
          <h2>
            Let&apos;s make it easier
            <br />
            to <em>use and understand.</em>
          </h2>
          <Link to="/contact" className="button button-dark">
            Start a conversation <FaArrowRight />
          </Link>
        </div>
      </section>
    </>
  );
};

export default Home;
