import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import portfolioContent from '../data/portfolioContent';
import { caseStudies } from '../data/caseStudies';

const Layout = () => {
    const location = useLocation();
    const { siteMeta } = portfolioContent;

    React.useEffect(() => {
        const segments = location.pathname.split('/').filter(Boolean);
        const routeNames = { about: 'About', resume: 'Resume', contact: 'Contact', work: 'Work' };
        const project = caseStudies.find((item) => item.slug === segments[1]);
        const currentTitle = project?.title || routeNames[segments[0]] || 'Home';
        document.title = `${siteMeta.name} — ${currentTitle} | ${siteMeta.role}`;
        window.scrollTo({ top: 0, behavior: 'auto' });
    }, [location.pathname, siteMeta.name, siteMeta.role]);

    return (
        <div className="layout">
            <Navbar />
            <main className="page-shell">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
