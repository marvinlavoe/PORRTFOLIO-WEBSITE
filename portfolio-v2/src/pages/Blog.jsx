import React from 'react';
import { FaPenNib } from 'react-icons/fa';
import portfolioContent from '../data/portfolioContent';
import './Blog.css';

const Blog = () => {
    const { blog } = portfolioContent;

    return (
        <section className="blog-page">
            <div className="container">
                <h2 className="section-title">Blog</h2>
                <p className="section-subtitle">
                    This section stays intentionally simple until there are real articles worth publishing.
                </p>

                <div className="blog-shell surface-card">
                    <div className="blog-icon">
                        <FaPenNib />
                    </div>
                    <h3>{blog.title}</h3>
                    <p>{blog.intro}</p>

                    <div className="blog-topics">
                        {blog.topics.map((topic) => (
                            <span key={topic} className="tag">
                                {topic}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Blog;
