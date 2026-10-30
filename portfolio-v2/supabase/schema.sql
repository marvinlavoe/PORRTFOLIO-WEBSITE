-- ==============================================================================
-- Portfolio Website CMS - Supabase Database Schema & Storage Setup
-- ==============================================================================

-- 1. Enable UUID Extension if not already enabled
create extension if not exists "uuid-ossp";

-- 2. Create 'projects' Table
create table if not exists public.projects (
  id uuid primary key default uuid_generate_v4(),
  legacy_id integer,
  title text not null,
  summary text not null,
  problem text,
  role text,
  outcome text,
  stack text[] default '{}',
  featured boolean default false,
  accent text default '#0f766e',
  repo_url text,
  demo_url text,
  case_study_url text,
  order_index integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Create 'case_studies' Table
create table if not exists public.case_studies (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  number text not null,
  title text not null,
  category text not null,
  description text not null,
  role text,
  timeline text,
  platform text,
  tools text[] default '{}',
  accent text default 'workplace',
  mock_data boolean default false,
  problem text,
  goal text,
  users jsonb default '[]'::jsonb,
  research jsonb default '[]'::jsonb,
  findings jsonb default '[]'::jsonb,
  flow jsonb default '[]'::jsonb,
  journey jsonb default '[]'::jsonb,
  screens jsonb default '[]'::jsonb,
  reflections jsonb default '[]'::jsonb,
  order_index integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Enable Row Level Security (RLS) on both tables
alter table public.projects enable row level security;
alter table public.case_studies enable row level security;

-- 5. RLS Policies for 'projects'
-- Public can read all projects
create policy "Public can view projects"
  on public.projects
  for select
  to anon, authenticated
  using (true);

-- Authenticated users (admin) can insert projects
create policy "Authenticated users can insert projects"
  on public.projects
  for insert
  to authenticated
  with check ((select auth.uid()) is not null);

-- Authenticated users (admin) can update projects
create policy "Authenticated users can update projects"
  on public.projects
  for update
  to authenticated
  using ((select auth.uid()) is not null)
  with check ((select auth.uid()) is not null);

-- Authenticated users (admin) can delete projects
create policy "Authenticated users can delete projects"
  on public.projects
  for delete
  to authenticated
  using ((select auth.uid()) is not null);

-- 6. RLS Policies for 'case_studies'
-- Public can read all case studies
create policy "Public can view case studies"
  on public.case_studies
  for select
  to anon, authenticated
  using (true);

-- Authenticated users (admin) can insert case studies
create policy "Authenticated users can insert case studies"
  on public.case_studies
  for insert
  to authenticated
  with check ((select auth.uid()) is not null);

-- Authenticated users (admin) can update case studies
create policy "Authenticated users can update case studies"
  on public.case_studies
  for update
  to authenticated
  using ((select auth.uid()) is not null)
  with check ((select auth.uid()) is not null);

-- Authenticated users (admin) can delete case studies
create policy "Authenticated users can delete case studies"
  on public.case_studies
  for delete
  to authenticated
  using ((select auth.uid()) is not null);

-- 7. Setup Storage Bucket for Media Uploads
insert into storage.buckets (id, name, public)
values ('portfolio-media', 'portfolio-media', true)
on conflict (id) do nothing;

-- Storage RLS: Public can view images
create policy "Public can view media"
  on storage.objects
  for select
  to anon, authenticated
  using (bucket_id = 'portfolio-media');

-- Storage RLS: Authenticated users can upload media
create policy "Authenticated users can upload media"
  on storage.objects
  for insert
  to authenticated
  with check (bucket_id = 'portfolio-media' and (select auth.uid()) is not null);

-- Storage RLS: Authenticated users can update media
create policy "Authenticated users can update media"
  on storage.objects
  for update
  to authenticated
  using (bucket_id = 'portfolio-media' and (select auth.uid()) is not null)
  with check (bucket_id = 'portfolio-media' and (select auth.uid()) is not null);

-- Storage RLS: Authenticated users can delete media
create policy "Authenticated users can delete media"
  on storage.objects
  for delete
  to authenticated
  using (bucket_id = 'portfolio-media' and (select auth.uid()) is not null);

-- 8. Auto-update timestamps triggers
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql security invoker;

drop trigger if exists set_projects_updated_at on public.projects;
create trigger set_projects_updated_at
  before update on public.projects
  for each row
  execute function public.handle_updated_at();

drop trigger if exists set_case_studies_updated_at on public.case_studies;
create trigger set_case_studies_updated_at
  before update on public.case_studies
  for each row
  execute function public.handle_updated_at();
