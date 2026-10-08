import React from "react";
import { FaArrowRight, FaGithub, FaEnvelope, FaLinkedin } from "react-icons/fa";

const Contact = () => (
  <section className="container contact-page">
    <p className="eyebrow">Contact · Kumasi, Ghana</p>
    <h1>
      Have a product or design problem <em>to solve?</em>
    </h1>
    <p className="contact-lede">
      I'm interested in thoughtful products, complex problems, and opportunities
      where design can make technology easier to use.
    </p>
    <div className="contact-main">
      <div>
        <span className="availability-dot" /> Available for design opportunities
      </div>
      <p className="contact-email">
        <a href="mailto:phiking451@gmail.com">phiking451@gmail.com</a>
      </p>
      <p className="contact-disclaimer">
        Open to product design work, UX strategy conversations, and digital
        experience opportunities.
      </p>
    </div>
    <div className="contact-links">
      <a href="https://github.com/marvinlavoe" target="_blank" rel="noreferrer">
        <FaGithub /> GitHub <span>Public profile</span>
        <FaArrowRight />
      </a>
      <a
        href="https://www.linkedin.com/in/marvin-lavoe"
        target="_blank"
        rel="noreferrer"
      >
        <FaLinkedin /> LinkedIn <span>Professional profile</span>
        <FaArrowRight />
      </a>
      <a href="mailto:phiking451@gmail.com">
        <FaEnvelope /> Email <span>Direct contact</span>
        <FaArrowRight />
      </a>
    </div>
  </section>
);
export default Contact;
