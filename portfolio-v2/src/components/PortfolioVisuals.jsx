import React from "react";
import workplaceImage from "../../erp.png";

export function ProductPreview({ type = "workplace", compact = false }) {
  if (type === "freesub")
    return (
      <div
        className={`product-preview preview-${type}${compact ? " compact" : ""}`}
        aria-label="Illustrative FreeSub mobile dashboard preview"
      >
        <div className="phone-screen">
          <div className="mock-top">
            <span>9:41</span>
            <span>•••</span>
          </div>
          <p className="mock-overline">GOOD MORNING, MARVIN</p>
          <h3>Your subscriptions</h3>
          <div className="spend-card">
            <small>MONTHLY SPENDING · SAMPLE</small>
            <strong>$84.97</strong>
            <span>7 active · $24 potential monthly savings*</span>
          </div>
          <div className="renew-row">
            <span className="service-icon violet">✳</span>
            <span>
              <b>ChatGPT Plus</b>
              <small>Renews Oct 12</small>
            </span>
            <b>$20</b>
          </div>
          <div className="renew-row">
            <span className="service-icon blue">✦</span>
            <span>
              <b>Midjourney</b>
              <small>Renews Oct 18</small>
            </span>
            <b>$10</b>
          </div>
          <div className="mock-nav">
            <span>⌂</span>
            <span>▤</span>
            <span>◷</span>
            <span>⚙</span>
          </div>
        </div>
      </div>
    );
  if (type === "electro")
    return (
      <div
        className={`product-preview preview-${type}${compact ? " compact" : ""}`}
        aria-label="ElectroManager billing and quotations app screenshot"
      >
        <img
          className="electro-screenshot"
          src="/electromanager-dashboard.png"
          alt="ElectroManager mobile billing and quotations dashboard"
        />
      </div>
    );
  return (
    <div
      className={`product-preview preview-workplace${compact ? " compact" : ""}`}
      aria-label="Emma360 workflow dashboard preview"
    >
      <img
        src={workplaceImage}
        alt="Emma360 dashboard overview"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          borderRadius: "12px",
          border: "1px solid #e5e1d9",
          boxShadow: "0 18px 36px rgba(17, 20, 18, 0.08)",
        }}
      />
    </div>
  );
}

export function Workflow({ steps, vertical = false }) {
  return (
    <ol className={`workflow${vertical ? " workflow-vertical" : ""}`}>
      {steps.map((step, index) => (
        <li key={`${step}-${index}`}>
          <span className="workflow-index">
            {String(index + 1).padStart(2, "0")}
          </span>
          <b>{step}</b>
        </li>
      ))}
    </ol>
  );
}

export function PersonaCard({ persona }) {
  return (
    <article className="persona-card">
      <div className="persona-top">
        <span className="avatar">{persona.initials}</span>
        <span className="mock-label">{persona.label}</span>
      </div>
      <h3>{persona.name}</h3>
      <p className="persona-title">{persona.title}</p>
      <p>
        <b>Goal</b>
        {persona.goal}
      </p>
      <p>
        <b>Needs</b>
        {persona.needs}
      </p>
      <p>
        <b>Friction</b>
        {persona.pain}
      </p>
    </article>
  );
}
