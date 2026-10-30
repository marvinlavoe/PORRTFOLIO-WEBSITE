import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';

const Education = lazy(() => import('./pages/Education'));
const Skills = lazy(() => import('./pages/Skills'));
const Projects = lazy(() => import('./pages/Projects'));
const Blog = lazy(() => import('./pages/Blog'));
const Github = lazy(() => import('./pages/Github'));
const Contact = lazy(() => import('./pages/Contact'));
const Work = lazy(() => import('./pages/Work'));
const CaseStudy = lazy(() => import('./pages/CaseStudy'));
const Resume = lazy(() => import('./pages/Resume'));

// Admin CMS imports
const AdminLayout = lazy(() => import('./admin/AdminLayout'));
const ProtectedRoute = lazy(() => import('./admin/ProtectedRoute'));
const AdminLogin = lazy(() => import('./admin/pages/AdminLogin'));
const AdminDashboard = lazy(() => import('./admin/pages/AdminDashboard'));
const ProjectsManager = lazy(() => import('./admin/pages/ProjectsManager'));
const CaseStudiesManager = lazy(() => import('./admin/pages/CaseStudiesManager'));
const MediaManager = lazy(() => import('./admin/pages/MediaManager'));

function App() {
  return (
    <Router>
      <AuthProvider>
        <DataProvider>
          <Suspense fallback={<div className="container app-loading">Loading page...</div>}>
            <Routes>
              {/* Public Portfolio Routes */}
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="work" element={<Work />} />
                <Route path="work/:slug" element={<CaseStudy />} />
                <Route path="about" element={<About />} />
                <Route path="resume" element={<Resume />} />
                <Route path="contact" element={<Contact />} />
                <Route path="education" element={<Education />} />
                <Route path="skills" element={<Skills />} />
                <Route path="projects" element={<Projects />} />
                <Route path="blog" element={<Blog />} />
                <Route path="github" element={<Github />} />
              </Route>

              {/* Admin Auth Route */}
              <Route path="/admin/login" element={<AdminLogin />} />

              {/* Protected Admin CMS Routes */}
              <Route path="/admin" element={<ProtectedRoute />}>
                <Route element={<AdminLayout />}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="projects" element={<ProjectsManager />} />
                  <Route path="case-studies" element={<CaseStudiesManager />} />
                  <Route path="media" element={<MediaManager />} />
                </Route>
              </Route>
            </Routes>
          </Suspense>
        </DataProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
