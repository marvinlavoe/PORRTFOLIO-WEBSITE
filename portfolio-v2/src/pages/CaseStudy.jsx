import React from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { caseStudies } from "../data/caseStudies";
import {
  PersonaCard,
  ProductPreview,
  Workflow,
} from "../components/PortfolioVisuals";

const CaseStudy = () => {
  const { slug } = useParams();
  const project = caseStudies.find((item) => item.slug === slug);
  if (!project) return <Navigate to="/work" replace />;
  const index = caseStudies.indexOf(project);
  const next = caseStudies[(index + 1) % caseStudies.length];
  return (
    <article className={`case-study case-${project.accent}`}>
      <header className="case-hero">
        <div className="container">
          <Link to="/work" className="back-link">
            <FaArrowLeft /> All work
          </Link>
          <p className="eyebrow">
            {project.number} / Case study · {project.category}
          </p>
          <h1>{project.title}</h1>
          <p className="case-lede">{project.description}</p>
          <div className="case-meta">
            {[
              ["Role", project.role],
              ["Timeline", project.timeline],
              ["Platform", project.platform],
              ["Tools", project.tools.join(" · ")],
            ].map(([label, value]) => (
              <div key={label}>
                <small>{label}</small>
                <b>{value}</b>
              </div>
            ))}
          </div>
          <p className="honesty-note">
            Selected product design work focused on user needs, workflow
            clarity, and practical delivery decisions.
          </p>
          <div className="case-preview-wrap">
            <ProductPreview type={project.accent} />
          </div>
        </div>
      </header>
      <div className="container case-body">
        <section className="case-section overview-grid">
          <div>
            <p className="eyebrow">01 / Overview</p>
            <h2>Making the complex feel navigable.</h2>
          </div>
          <p>{project.goal}</p>
        </section>
        <section className="case-section two-col">
          <div>
            <p className="eyebrow">02 / Problem & goal</p>
            <h2>Start with the friction.</h2>
          </div>
          <div>
            <h3>The problem</h3>
            <p>{project.problem}</p>
            <h3>Design goal</h3>
            <p>{project.goal}</p>
          </div>
        </section>
        <section className="case-section">
          <div className="section-head">
            <div>
              <p className="eyebrow">03 / Research</p>
              <h2>Learn before designing.</h2>
            </div>
            <span className="sample-pill">Research framing</span>
          </div>
          <div className="research-grid">
            {project.research.map((item, i) => (
              <article className="research-item" key={item}>
                <span>0{i + 1}</span>
                <p>{item}</p>
              </article>
            ))}
          </div>
          <div className="findings">
            <h3>Key themes to design for</h3>
            {project.findings.map((item, i) => (
              <p key={item}>
                <span>↗</span>
                {item}
              </p>
            ))}
          </div>
        </section>
        <section className="case-section">
          <div className="section-head">
            <div>
              <p className="eyebrow">04 / Users</p>
              <h2>Design for real contexts.</h2>
            </div>
            <span className="sample-pill">Primary user profiles</span>
          </div>
          <div className="persona-grid">
            {project.users.map((persona) => (
              <PersonaCard key={persona.name} persona={persona} />
            ))}
          </div>
        </section>
        <section className="case-section journey-section">
          <p className="eyebrow">05 / User journey</p>
          <h2>From uncertainty to a clear next step.</h2>
          <div className="journey-grid">
            {project.journey.map((stage, i) => (
              <article key={stage.stage}>
                <span>0{i + 1}</span>
                <h3>{stage.stage}</h3>
                <p>{stage.detail}</p>
                <small>“{stage.emotion}”</small>
              </article>
            ))}
          </div>
        </section>
        <section className="case-section">
          <div className="section-head">
            <div>
              <p className="eyebrow">06 / User flow</p>
              <h2>A path users can follow.</h2>
            </div>
            <span className="sample-pill">Core flow</span>
          </div>
          <Workflow steps={project.flow} />
          {project.slug === "smart-workplace" && (
            <div className="approval-audit">
              <article>
                <span>Approval flow</span>
                <h3>What happens next?</h3>
                <p>
                  Supervisor <i>→</i> HR <i>→</i> Director
                </p>
              </article>
              <article>
                <span>Activity / audit trail</span>
                <h3>What has already happened?</h3>
                <p>
                  Submitted · Oct 08 <i>→</i> Supervisor comment · Oct 09
                </p>
              </article>
            </div>
          )}
        </section>
        <section className="case-section two-col">
          <div>
            <p className="eyebrow">07 / Structure & ideation</p>
            <h2>Useful structure beats more screens.</h2>
          </div>
          <div>
            <h3>Information architecture</h3>
            <ul className="ia-tree">
              <li>Overview</li>
              <li>
                Workplace
                <ul>
                  <li>Correspondence</li>
                  <li>Leave & approvals</li>
                  <li>Memos · Circulars · Help desk</li>
                </ul>
              </li>
              <li>
                Administration
                <ul>
                  <li>People · Departments · Roles</li>
                </ul>
              </li>
            </ul>
            <h3>Concept exploration</h3>
            <p>
              Compared a status-first dashboard, a task-first dashboard, and a
              role-specific queue. The selected direction prioritizes the next
              action while keeping wider context available.
            </p>
          </div>
        </section>
        <section className="case-section iterations-section">
          <div>
            <p className="eyebrow">08 / Wireframe → prototype → test</p>
            <h2>Make assumptions visible early.</h2>
          </div>
          <div className="iteration-track">
            <div>
              <span>01 · Structure</span>
              <div className="wire-sketch">
                <i />
                <i />
                <i />
                <i />
              </div>
              <p>Sketch task hierarchy and layout.</p>
            </div>
            <div>
              <span>02 · Low fidelity</span>
              <div className="wire-sketch mid">
                <i />
                <i />
                <i />
                <i />
                <i />
              </div>
              <p>Explore navigation and information order.</p>
            </div>
            <div>
              <span>03 · Interactive prototype</span>
              <div className="wire-sketch hi">
                <i />
                <i />
                <i />
                <i />
                <i />
              </div>
              <p>Walk through primary task paths.</p>
            </div>
          </div>
          <p className="sample-callout">
            A usability scenario focused on task completion and approval clarity
            helped refine the flow and information hierarchy.
          </p>
        </section>
        <section className="case-section before-after">
          <p className="eyebrow">09 / Design iterations</p>
          <h2>From form-filling to visible progress.</h2>
          <div className="compare-grid">
            <article>
              <span>Before · opportunity</span>
              <h3>Long, flat process</h3>
              <ul>
                <li>Many fields at once</li>
                <li>Little progress indication</li>
                <li>Ownership is hard to spot</li>
              </ul>
            </article>
            <article>
              <span>After · design direction</span>
              <h3>Guided, transparent workflow</h3>
              <ul>
                <li>Grouped inputs and useful defaults</li>
                <li>Visible status and next approver</li>
                <li>Separate history and approval stages</li>
              </ul>
            </article>
          </div>
          {project.iterations.map((item, i) => (
            <p className="iteration-line" key={item}>
              <span>0{i + 1}</span>
              {item}
            </p>
          ))}
        </section>
        <section className="case-section final-showcase">
          <div className="section-head">
            <div>
              <p className="eyebrow">10 / Final UI & design system</p>
              <h2>One system, clear states.</h2>
            </div>
            <span className="sample-pill">Interface direction</span>
          </div>
          <ProductPreview type={project.accent} />
          <div className="design-tokens">
            <div>
              <small>COLOR</small>
              <span className="swatches">
                <i />
                <i />
                <i />
                <i />
              </span>
            </div>
            <div>
              <small>TYPE</small>
              <b>
                Clear hierarchy
                <br />
                <span>Readable body text</span>
              </b>
            </div>
            <div>
              <small>COMPONENTS</small>
              <b>
                Cards · status · forms
                <br />
                <span>Tables · alerts · navigation</span>
              </b>
            </div>
            <div>
              <small>INTERACTION</small>
              <b>
                Visible focus
                <br />
                <span>Helpful feedback · error recovery</span>
              </b>
            </div>
          </div>
        </section>
        <section className="case-section two-col">
          <div>
            <p className="eyebrow">11 / Accessibility & outcome</p>
            <h2>Clear for more people.</h2>
          </div>
          <div>
            <ul className="access-list">
              <li>Contrast-conscious color and non-color status cues</li>
              <li>Keyboard-operable controls and visible focus states</li>
              <li>
                Readable typography, semantic structure, and labeled actions
              </li>
              <li>Touch-friendly controls and reduced-motion support</li>
            </ul>
            <h3>Outcome</h3>
            <p>{project.outcome}</p>
          </div>
        </section>
        <section className="case-section lessons">
          <p className="eyebrow">12 / Reflection</p>
          <h2>What this work reinforced.</h2>
          <div className="lesson-grid">
            {project.lessons.map((item, i) => (
              <p key={item}>
                <span>0{i + 1}</span>
                {item}
              </p>
            ))}
          </div>
        </section>
        <Link to={`/work/${next.slug}`} className="next-project">
          <span>
            Next case study <b>{next.title}</b>
          </span>
          <FaArrowRight />
        </Link>
      </div>
    </article>
  );
};
export default CaseStudy;
