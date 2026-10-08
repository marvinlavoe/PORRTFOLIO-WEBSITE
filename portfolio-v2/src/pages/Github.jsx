import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FaCodeBranch, FaExternalLinkAlt, FaStar } from 'react-icons/fa';
import portfolioContent from '../data/portfolioContent';
import './Github.css';

const Github = () => {
    const shouldReduceMotion = useReducedMotion();
    const { github } = portfolioContent;
    const githubUsername = import.meta.env.VITE_GITHUB_USERNAME || github.username;
    const fallbackProfileUrl = `https://github.com/${githubUsername}`;
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [profile, setProfile] = useState(null);
    const [repos, setRepos] = useState([]);

    useEffect(() => {
        const controller = new AbortController();
        let isActive = true;

        const fetchData = async () => {
            try {
                setLoading(true);
                setError('');

                const userRes = await fetch(`https://api.github.com/users/${githubUsername}`, {
                    signal: controller.signal,
                });

                if (userRes.status === 403) {
                    throw new Error('GitHub rate limit reached. Please try again later.');
                }
                if (userRes.status === 404) {
                    throw new Error(`GitHub profile "${githubUsername}" could not be found.`);
                }
                if (!userRes.ok) {
                    throw new Error('Could not fetch the GitHub profile right now.');
                }

                const userData = await userRes.json();

                const reposRes = await fetch(
                    `https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=${github.reposToShow}`,
                    { signal: controller.signal }
                );

                if (reposRes.status === 403) {
                    throw new Error('GitHub rate limit reached. Please try again later.');
                }
                if (!reposRes.ok) {
                    throw new Error('Could not fetch repositories right now.');
                }

                const reposData = await reposRes.json();

                if (!isActive) {
                    return;
                }

                setProfile(userData);
                setRepos(reposData);
            } catch (err) {
                if (err.name !== 'AbortError' && isActive) {
                    setError(err.message || 'Something went wrong loading GitHub data.');
                }
            } finally {
                if (isActive) {
                    setLoading(false);
                }
            }
        };

        fetchData();

        return () => {
            isActive = false;
            controller.abort();
        };
    }, [github.reposToShow, githubUsername]);

    const featuredRepos = github.featuredRepos
        .map((repoName) => repos.find((repo) => repo.name === repoName))
        .filter(Boolean);
    const displayedRepos = featuredRepos.length > 0 ? featuredRepos : repos.slice(0, 3);
    const supportingRepos = featuredRepos.length > 0
        ? repos.filter((repo) => !featuredRepos.some((featuredRepo) => featuredRepo.id === repo.id)).slice(0, 3)
        : repos.slice(3, 6);
    const languages = [...new Set(repos.map((repo) => repo.language).filter(Boolean))].length;
    const stars = repos.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0);

    if (loading) {
        return (
            <section className="github-page">
                <div className="container">
                    <h2 className="section-title">GitHub</h2>
                    <p className="section-subtitle">Loading live GitHub data...</p>
                    <div className="github-state surface-card">
                        <p>Checking profile details and recent repositories.</p>
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="github-page">
                <div className="container">
                    <h2 className="section-title">GitHub</h2>
                    <p className="section-subtitle">{github.intro}</p>
                    <div className="github-state surface-card">
                        <h3>Live GitHub data is unavailable</h3>
                        <p>{error}</p>
                        <p>{github.fallbackMessage}</p>
                        <a href={fallbackProfileUrl} className="btn" target="_blank" rel="noreferrer">
                            Open GitHub Profile <FaExternalLinkAlt />
                        </a>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="github-page">
            <div className="container">
                <h2 className="section-title">GitHub</h2>
                <p className="section-subtitle">{github.intro}</p>

                <div className="github-container">
                    <div className="github-overview surface-card">
                        <div>
                            <span className="status-pill">Live profile</span>
                            <h3>{profile.name || githubUsername}</h3>
                            <p>{profile.bio || 'Public GitHub profile overview.'}</p>
                        </div>
                        <a href={profile.html_url || fallbackProfileUrl} className="btn btn-outline" target="_blank" rel="noreferrer">
                            View full profile <FaExternalLinkAlt />
                        </a>
                    </div>

                    <motion.div
                        className="github-stats"
                        initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
                        animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                        transition={{ duration: 0.35 }}
                    >
                        <div className="stat-card">
                            <h3>{profile.public_repos}</h3>
                            <p>Public Repositories</p>
                        </div>
                        <div className="stat-card">
                            <h3>{profile.followers}</h3>
                            <p>Followers</p>
                        </div>
                        <div className="stat-card">
                            <h3>{languages}</h3>
                            <p>Languages In Loaded Repos</p>
                        </div>
                        <div className="stat-card">
                            <h3>{stars}</h3>
                            <p>Total Stars On Loaded Repos</p>
                        </div>
                    </motion.div>

                    <div className="project-section-heading github-heading">
                        <p className="section-kicker">Repository spotlight</p>
                        <h3>Featured repositories</h3>
                    </div>

                    {displayedRepos.length > 0 ? (
                        <div className="repos-grid">
                            {displayedRepos.map((repo, index) => (
                                <motion.article
                                    key={repo.id}
                                    className="repo-card surface-card"
                                    initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
                                    animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.08 }}
                                >
                                    <div className="repo-header">
                                        <div>
                                            <span className="repo-badge">{repo.private ? 'Private' : 'Public'}</span>
                                            <h3>{repo.name}</h3>
                                        </div>
                                        <a href={repo.html_url} className="repo-link" target="_blank" rel="noreferrer">
                                            Open <FaExternalLinkAlt />
                                        </a>
                                    </div>
                                    <p className="repo-desc">{repo.description || 'No repository description has been published yet.'}</p>
                                    <div className="repo-stats">
                                        <span><FaStar /> {repo.stargazers_count}</span>
                                        <span><FaCodeBranch /> {repo.forks_count}</span>
                                        <span>{repo.language || 'Language not specified'}</span>
                                    </div>
                                </motion.article>
                            ))}
                        </div>
                    ) : (
                        <div className="github-state surface-card">
                            <h3>No public repositories to show yet</h3>
                            <p>The profile exists, but there are no public repositories available in the current response.</p>
                        </div>
                    )}

                    {supportingRepos.length > 0 && (
                        <>
                            <div className="project-section-heading github-heading secondary-heading">
                                <p className="section-kicker">Recent activity</p>
                                <h3>More repositories from the latest updates</h3>
                            </div>

                            <div className="repos-grid supporting-repos-grid">
                                {supportingRepos.map((repo) => (
                                    <article key={repo.id} className="repo-card surface-card compact-repo-card">
                                        <div className="repo-header">
                                            <div>
                                                <span className="repo-badge">{repo.private ? 'Private' : 'Public'}</span>
                                                <h3>{repo.name}</h3>
                                            </div>
                                            <a href={repo.html_url} className="repo-link" target="_blank" rel="noreferrer">
                                                Open <FaExternalLinkAlt />
                                            </a>
                                        </div>
                                        <p className="repo-desc">{repo.description || 'No repository description has been published yet.'}</p>
                                    </article>
                                ))}
                            </div>
                        </>
                    )}

                    <div className="github-cta">
                        <a href={profile.html_url || fallbackProfileUrl} className="btn" target="_blank" rel="noreferrer">
                            Browse GitHub Profile <FaExternalLinkAlt />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Github;
