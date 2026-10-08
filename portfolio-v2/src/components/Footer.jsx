import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import portfolioContent from '../data/portfolioContent';
import './Footer.css';

const Footer = () => {
    const { siteMeta, socialLinks } = portfolioContent;
    const [firstName, ...rest] = siteMeta.name.split(' ');
    const lastName = rest.join(' ');
    const iconMap = {
        github: FaGithub,
        linkedin: FaLinkedinIn,
        twitter: FaTwitter,
        instagram: FaInstagram,
    };

    const activeLinks = socialLinks.filter((link) => link.href);

    return (
        <footer>
            <div className="container">
                <div className="footer-content">
                    <div className="footer-copy">
                        <Link to="/" className="logo">{firstName}<span>{lastName}</span></Link>
                        <p className="footer-desc">{siteMeta.description}</p>
                        <p className="footer-note">{siteMeta.availability}</p>
                    </div>

                    {activeLinks.length > 0 && (
                        <div className="social-links" aria-label="Social links">
                            {activeLinks.map((link) => {
                                const Icon = iconMap[link.icon];

                                if (!Icon) {
                                    return null;
                                }

                                return (
                                    <a
                                        key={link.label}
                                        href={link.href}
                                        className="social-link"
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label={link.label}
                                    >
                                        <Icon />
                                    </a>
                                );
                            })}
                        </div>
                    )}
                </div>

                <div className="copyright">
                    <p>&copy; {new Date().getFullYear()} {siteMeta.name}. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
