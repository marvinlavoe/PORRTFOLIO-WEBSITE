import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { caseStudies } from '../data/caseStudies';
import { portfolioContent } from '../data/portfolioContent';

export async function seedInitialData() {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error('Supabase is not configured. Please add your credentials in .env.');
  }

  const results = {
    projectsCount: 0,
    caseStudiesCount: 0,
    errors: [],
  };

  // 1. Seed Projects
  const mappedProjects = portfolioContent.projects.map((proj, idx) => ({
    legacy_id: proj.id,
    title: proj.title,
    summary: proj.summary,
    problem: proj.problem,
    role: proj.role,
    outcome: proj.outcome,
    stack: proj.stack || [],
    featured: Boolean(proj.featured),
    accent: proj.accent || '#0f766e',
    repo_url: proj.links?.repo || null,
    demo_url: proj.links?.demo || null,
    case_study_url: proj.links?.caseStudy || null,
    order_index: idx,
  }));

  const { error: projError, data: projData } = await supabase
    .from('projects')
    .upsert(mappedProjects, { onConflict: 'title' })
    .select();

  if (projError) {
    // If onConflict fails because title is not unique constraint, try simple insert
    const { error: insertError, data: insertData } = await supabase
      .from('projects')
      .insert(mappedProjects)
      .select();

    if (insertError) {
      results.errors.push(`Projects seeding: ${insertError.message}`);
    } else {
      results.projectsCount = insertData?.length || mappedProjects.length;
    }
  } else {
    results.projectsCount = projData?.length || mappedProjects.length;
  }

  // 2. Seed Case Studies
  const mappedCaseStudies = caseStudies.map((cs, idx) => ({
    slug: cs.slug,
    number: cs.number,
    title: cs.title,
    category: cs.category,
    description: cs.description,
    role: cs.role,
    timeline: cs.timeline,
    platform: cs.platform,
    tools: cs.tools || [],
    accent: cs.accent || 'workplace',
    mock_data: Boolean(cs.mockData),
    problem: cs.problem,
    goal: cs.goal,
    users: cs.users || [],
    research: cs.research || [],
    findings: cs.findings || [],
    flow: cs.flow || [],
    journey: cs.journey || [],
    screens: cs.screens || [],
    reflections: cs.reflections || [],
    order_index: idx,
  }));

  const { error: csError, data: csData } = await supabase
    .from('case_studies')
    .upsert(mappedCaseStudies, { onConflict: 'slug' })
    .select();

  if (csError) {
    results.errors.push(`Case Studies seeding: ${csError.message}`);
  } else {
    results.caseStudiesCount = csData?.length || mappedCaseStudies.length;
  }

  return results;
}
