import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { portfolioContent } from '../data/portfolioContent';
import { caseStudies as fallbackCaseStudies } from '../data/caseStudies';

const DataContext = createContext({
  projects: [],
  caseStudies: [],
  loading: true,
  isUsingFallback: true,
  refreshData: async () => {},
  createProject: async () => {},
  updateProject: async () => {},
  deleteProject: async () => {},
  toggleProjectFeatured: async () => {},
  createCaseStudy: async () => {},
  updateCaseStudy: async () => {},
  deleteCaseStudy: async () => {},
});

// Normalize Supabase DB project row to the shape expected by public frontend components
const normalizeProject = (row) => ({
  id: row.id,
  legacyId: row.legacy_id,
  title: row.title,
  summary: row.summary,
  problem: row.problem || '',
  role: row.role || '',
  outcome: row.outcome || '',
  stack: row.stack || [],
  featured: Boolean(row.featured),
  accent: row.accent || '#0f766e',
  order_index: row.order_index ?? 0,
  links: {
    repo: row.repo_url || null,
    demo: row.demo_url || null,
    caseStudy: row.case_study_url || null,
  },
});

// Normalize Supabase DB case study row to the shape expected by public frontend components
const normalizeCaseStudy = (row) => ({
  id: row.id,
  slug: row.slug,
  number: row.number,
  title: row.title,
  category: row.category,
  description: row.description,
  role: row.role || '',
  timeline: row.timeline || '',
  platform: row.platform || '',
  tools: row.tools || [],
  accent: row.accent || 'workplace',
  mockData: Boolean(row.mock_data),
  problem: row.problem || '',
  goal: row.goal || '',
  users: Array.isArray(row.users) ? row.users : [],
  research: Array.isArray(row.research) ? row.research : [],
  findings: Array.isArray(row.findings) ? row.findings : [],
  flow: Array.isArray(row.flow) ? row.flow : [],
  journey: Array.isArray(row.journey) ? row.journey : [],
  screens: Array.isArray(row.screens) ? row.screens : [],
  reflections: Array.isArray(row.reflections) ? row.reflections : [],
  order_index: row.order_index ?? 0,
});

export const DataProvider = ({ children }) => {
  const [projects, setProjects] = useState(portfolioContent.projects);
  const [caseStudies, setCaseStudies] = useState(fallbackCaseStudies);
  const [loading, setLoading] = useState(true);
  const [isUsingFallback, setIsUsingFallback] = useState(true);

  const fetchData = useCallback(async () => {
    if (!isSupabaseConfigured || !supabase) {
      setProjects(portfolioContent.projects);
      setCaseStudies(fallbackCaseStudies);
      setIsUsingFallback(true);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const [projRes, csRes] = await Promise.all([
        supabase.from('projects').select('*').order('order_index', { ascending: true }),
        supabase.from('case_studies').select('*').order('order_index', { ascending: true }),
      ]);

      let hasLiveProjects = false;
      let hasLiveCaseStudies = false;

      if (!projRes.error && projRes.data && projRes.data.length > 0) {
        setProjects(projRes.data.map(normalizeProject));
        hasLiveProjects = true;
      } else {
        setProjects(portfolioContent.projects);
      }

      if (!csRes.error && csRes.data && csRes.data.length > 0) {
        setCaseStudies(csRes.data.map(normalizeCaseStudy));
        hasLiveCaseStudies = true;
      } else {
        setCaseStudies(fallbackCaseStudies);
      }

      setIsUsingFallback(!hasLiveProjects && !hasLiveCaseStudies);
    } catch (err) {
      console.warn('Error fetching portfolio data from Supabase, using fallback:', err);
      setProjects(portfolioContent.projects);
      setCaseStudies(fallbackCaseStudies);
      setIsUsingFallback(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Project Mutations
  const createProject = async (projectData) => {
    if (!supabase) throw new Error('Supabase not configured');
    const { data, error } = await supabase
      .from('projects')
      .insert([projectData])
      .select();
    if (error) throw error;
    await fetchData();
    return data[0];
  };

  const updateProject = async (id, projectData) => {
    if (!supabase) throw new Error('Supabase not configured');
    const { data, error } = await supabase
      .from('projects')
      .update(projectData)
      .eq('id', id)
      .select();
    if (error) throw error;
    await fetchData();
    return data[0];
  };

  const deleteProject = async (id) => {
    if (!supabase) throw new Error('Supabase not configured');
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (error) throw error;
    await fetchData();
  };

  const toggleProjectFeatured = async (id, currentFeatured) => {
    return updateProject(id, { featured: !currentFeatured });
  };

  // Case Study Mutations
  const createCaseStudy = async (csData) => {
    if (!supabase) throw new Error('Supabase not configured');
    const { data, error } = await supabase
      .from('case_studies')
      .insert([csData])
      .select();
    if (error) throw error;
    await fetchData();
    return data[0];
  };

  const updateCaseStudy = async (id, csData) => {
    if (!supabase) throw new Error('Supabase not configured');
    const { data, error } = await supabase
      .from('case_studies')
      .update(csData)
      .eq('id', id)
      .select();
    if (error) throw error;
    await fetchData();
    return data[0];
  };

  const deleteCaseStudy = async (id) => {
    if (!supabase) throw new Error('Supabase not configured');
    const { error } = await supabase.from('case_studies').delete().eq('id', id);
    if (error) throw error;
    await fetchData();
  };

  return (
    <DataContext.Provider
      value={{
        projects,
        caseStudies,
        loading,
        isUsingFallback,
        refreshData: fetchData,
        createProject,
        updateProject,
        deleteProject,
        toggleProjectFeatured,
        createCaseStudy,
        updateCaseStudy,
        deleteCaseStudy,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const usePortfolioData = () => useContext(DataContext);
