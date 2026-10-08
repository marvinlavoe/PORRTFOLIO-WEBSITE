import React from 'react';
import { FaArrowDown } from 'react-icons/fa';

const Resume = () => (
  <section className="container resume-page">
    <header className="page-intro">
      <p className="eyebrow">Profile · experience · education</p>
      <h1>Marvin Lavoe</h1>
      <p>Product Designer | UI/UX Designer | Software Developer</p>
      <p>Ghana • 055 258 1864 • phiking451@gmail.com<br />linkedin.com/in/marvin-lavoe • github.com/marvinlavoe</p>
      <a
        className="button button-dark"
        href="/marvin-lavoe-resume.pdf"
        target="_blank"
        rel="noreferrer"
        download="Marvin-Lavoe-Resume.pdf"
      >
        Download resume <FaArrowDown />
      </a>
      <small className="resume-note">
        Download the latest verified PDF version of the resume.
      </small>
    </header>

    <div className="resume-grid">
      <div>
        <section className="resume-block">
          <p className="eyebrow">Summary</p>
          <h2>Professional profile</h2>
          <p>
            Product Designer and UI/UX Designer with a BTech in Computer Technology and hands-on
            experience designing digital products for real users and organizations. Experienced in user
            research, personas, user journeys, information architecture, wireframing, prototyping,
            usability testing, design systems, responsive design, and developer handoff. Currently a
            UI/UX &amp; Product Designer at the Ministry of Youth Development and Empowerment,
            contributing to the design and testing of enterprise digital solutions and workflows.
            Strong technical background in Flutter, Firebase, GetX, Python, IoT, and embedded
            systems, enabling effective collaboration between design and development teams.
          </p>
        </section>

        <section className="resume-block">
          <p className="eyebrow">Experience</p>
          <h2>Career experience</h2>

          <div className="resume-entry">
            <span>2026 — Present</span>
            <div>
              <h3>UI/UX &amp; Product Designer — National Service</h3>
              <p className="resume-meta">Ministry of Youth Development and Empowerment</p>
              <ul>
                <li>Design user interfaces and digital experiences for enterprise applications and workflow-management systems.</li>
                <li>Conduct requirements analysis and translate organizational needs into practical product and user-experience solutions.</li>
                <li>Create user flows, wireframes, prototypes, and high-fidelity interfaces in Figma.</li>
                <li>Contribute to the design of the Smart Workplace / Ministry ERP, supporting the digitalization of organizational workflows.</li>
                <li>Improve usability, navigation, and information architecture through user-centered design principles.</li>
                <li>Participate in system testing and usability evaluation to identify issues and refine the final product.</li>
                <li>Collaborate with stakeholders and contribute to product decisions across correspondence, leave management, memos, and other processes.</li>
              </ul>
            </div>
          </div>

          <div className="resume-entry">
            <span>2023 — 2024</span>
            <div>
              <h3>Intern</h3>
              <p className="resume-meta">Wise Ant Publications</p>
              <ul>
                <li>Contributed to the development of a Sales Management application using Flutter and Firebase.</li>
                <li>Supported software and IT-related activities and assisted with customer engagement and technology tasks.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="resume-block">
          <p className="eyebrow">Selected projects</p>
          <h2>Product and system work</h2>

          <div className="resume-entry project-entry">
            <span>Enterprise</span>
            <div>
              <h3>Smart Workplace / Ministry ERP</h3>
              <p className="resume-meta">Product Design · UI/UX · Enterprise Software</p>
              <p>Designed experiences for an enterprise platform that digitalizes organizational workflows, translating business processes into user flows and interfaces.</p>
            </div>
          </div>

          <div className="resume-entry project-entry">
            <span>Mobile</span>
            <div>
              <h3>ElectroManager</h3>
              <p className="resume-meta">Product Design · Flutter · Firebase · GetX</p>
              <p>Designed and developed a complete mobile business-management app, including UX and interface design across multiple business workflows.</p>
            </div>
          </div>

          <div className="resume-entry project-entry">
            <span>App</span>
            <div>
              <h3>Sales Management App</h3>
              <p className="resume-meta">Flutter · Firebase</p>
              <p>Developed a mobile sales-management app with real-time data storage and authentication, and designed its interfaces and workflows.</p>
            </div>
          </div>

          <div className="resume-entry project-entry">
            <span>Product</span>
            <div>
              <h3>Deadline Assistant</h3>
              <p className="resume-meta">Flutter · Mobile Product</p>
              <p>Designed and developed a mobile app for deadline tracking, task management, and reminders.</p>
            </div>
          </div>
        </section>

        <section className="resume-block">
          <p className="eyebrow">Education</p>
          <h2>Academic background</h2>
          <div className="resume-entry">
            <span>2025</span>
            <div>
              <h3>BTech, Computer Technology</h3>
              <p className="resume-meta">Kumasi Technical University</p>
              <p>GPA: 4.0 / 5.0</p>
            </div>
          </div>
          <div className="resume-entry">
            <span>2018</span>
            <div>
              <h3>WASSCE — General Science</h3>
              <p className="resume-meta">Winneba Secondary School</p>
            </div>
          </div>
        </section>
      </div>

      <aside>
        <section className="resume-block">
          <p className="eyebrow">Design skills</p>
          <h2>Capabilities</h2>
          <div className="skill-list">
            {[
              'User Research',
              'User Interviews',
              'User Personas',
              'User Journeys',
              'Information Architecture',
              'User Flows',
              'Wireframing',
              'Prototyping',
              'Usability Testing',
              'Design Systems',
              'Responsive Design',
              'Mobile App Design',
              'Web & Desktop Design',
              'Design-to-Code',
              'Developer Handoff'
            ].map((skill) => (
              <span key={skill}>{skill}</span>
            ))}
          </div>
        </section>

        <section className="resume-block">
          <p className="eyebrow">Tools &amp; technologies</p>
          <h2>Stack</h2>
          <ul className="resume-list">
            <li><strong>Design:</strong> Figma, Adobe Photoshop</li>
            <li><strong>Mobile Development:</strong> Flutter, Dart</li>
            <li><strong>Programming:</strong> Python, C++</li>
            <li><strong>Backend &amp; Data:</strong> Firebase, Local Databases</li>
            <li><strong>Architecture:</strong> GetX</li>
            <li><strong>IoT &amp; Embedded:</strong> ESP32, Arduino, MQTT, Embedded Systems</li>
            <li><strong>Development Tools:</strong> Git, GitHub</li>
          </ul>
        </section>

        <section className="resume-block">
          <p className="eyebrow">Certifications</p>
          <h2>Training</h2>
          <ul className="resume-list">
            <li>Agile Scrum Methodology — Leanicon Technology, 2026</li>
            <li>Data Analytics with Power BI — Ghana-India Kofi Annan Centre of Excellence in ICT (GI-KACE), 2024</li>
          </ul>
        </section>

        <section className="resume-block">
          <p className="eyebrow">Leadership</p>
          <h2>Achievements</h2>
          <ul className="resume-list">
            <li>KsTU Army Cadet Commander — 2024</li>
            <li>KsTU Army Cadet Adjutant — 2023</li>
          </ul>
        </section>

        <section className="resume-block">
          <p className="eyebrow">Languages</p>
          <h2>Communication</h2>
          <p>English — Fluent • Twi — Fluent • Ewe — Fluent</p>
        </section>

        <section className="resume-block">
          <p className="eyebrow">Additional info</p>
          <h2>Interest</h2>
          <p>Strong interest in product development, digital innovation, software engineering, IoT, and technology-driven problem solving.</p>
        </section>
      </aside>
    </div>
  </section>
);

export default Resume;
