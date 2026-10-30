# Marvin Lavoe — Portfolio Website

A responsive personal portfolio for Marvin Lavoe, a UX/UI and product designer interested in enterprise systems, mobile products, IoT, and emerging technology. The site presents selected work, background, skills, projects, and contact information, with a protected admin CMS for managing portfolio projects, case studies, and media.

> The deploy configuration serves the Vite app in `portfolio-v2/` as a static site on Render. This README documents the app code under that directory.

## Project Fields (Admin CMS)

Use these fields when creating or editing a project at `/admin/projects`. Required fields are marked with `*`. Generated or imported content should be reviewed and edited before saving; do not claim metrics, shipped outcomes, or personal responsibilities unless they are accurate.

| CMS field                  | Required | What to enter                                                                                        |
| -------------------------- | -------- | ---------------------------------------------------------------------------------------------------- |
| Project Title              | Yes      | A clear, human-readable name.                                                                        |
| Short Summary              | Yes      | One or two concise sentences describing what the project is and does.                                |
| Problem Statement          | No       | The real problem, user need, or technical constraint that motivated the work.                        |
| My Role & Responsibilities | No       | Your actual contributions and ownership.                                                             |
| Outcome / Result           | No       | What was delivered, key capabilities, and prototype or production status. Avoid unsupported metrics. |
| Tech Stack Tags            | No       | Technologies and tools used. Enter a tag and press Enter or comma; remove a tag with its × control.  |
| Accent Color               | No       | A hex color for the project visual accent. Choose a preset or custom color. Default: `#0f766e`.      |
| Repository URL             | No       | Public or accessible source-code repository URL.                                                     |
| Live Demo URL              | No       | Public demo or deployment URL, if available.                                                         |
| Case Study Link            | No       | Internal case-study path or URL, if available.                                                       |
| Featured                   | No       | Whether the project should be featured on the homepage and projects page.                            |
| Order index                | Managed  | The CMS assigns an order index when creating a project. It is not entered in the form.               |

### GitHub Auto-fill

The project form includes an expandable **Auto-fill from GitHub** panel. Enter a repository as `owner/repo` or as a GitHub repository URL, or choose one of the configured GitHub user's recent public repositories. Auto-fill reads the repository README and public metadata, then proposes title, summary, problem, role, outcome, stack, accent, repository URL, and demo URL. Review all suggested fields before saving.

- When `VITE_GEMINI_API_KEY` is configured, Gemini generates a structured project draft.
- Without a Gemini key—or if the Gemini request fails—the local markdown parser uses the README and available metadata.
- The fallback cannot reliably infer your role or project outcomes; those fields may remain blank for you to complete.
- GitHub and Gemini requests are made from the browser. A Vite `VITE_` key is visible to users of the deployed app. For production privacy and key protection, route Gemini requests through a server-side endpoint and apply provider-side restrictions and quotas.

## Features

- Responsive portfolio pages for home, work, case studies, about, education, skills, projects, blog, GitHub, resume, and contact.
- Admin sign-in and protected CMS routes for projects, case studies, and media.
- Supabase-backed portfolio data with bundled content as a fallback when Supabase is not configured or available.
- GitHub README project auto-fill using Gemini or the built-in parser.
- Lazy-loaded routes and page components.

## Technology Stack

- React 18
- Vite 7
- React Router 6
- Supabase JavaScript client for data and authentication
- Framer Motion for motion
- React Icons
- Google Gemini REST API (optional, for AI auto-fill)

## Requirements

- Node.js compatible with the installed Vite version (Node.js 20.19+ or 22.12+ recommended for Vite 7).
- npm.
- A Supabase project for live admin authentication, database-backed CMS changes, and media storage. The public portfolio can render bundled fallback content without Supabase; CMS writes require a configured Supabase client and suitable project policies.
- A Google AI Studio API key is optional. Without it, GitHub auto-fill uses the local parser.

## Local Development

Run commands from the app directory:

```sh
cd portfolio-v2
npm ci
```

Create a local `.env` file based on `.env.example` and fill in the values you need:

```sh
cp .env.example .env
```

On Windows PowerShell, use `Copy-Item .env.example .env` instead of `cp` if needed. Do not commit `.env` or paste secret keys into source files.

Start the Vite development server:

```sh
npm run dev
```

Open the local URL printed by Vite (by default, `http://localhost:5173`).

## Environment Variables

| Variable                 | Required for           | Description                                                                                                                                                       |
| ------------------------ | ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `VITE_GITHUB_USERNAME`   | Optional quick picks   | GitHub username whose recent public repositories appear in the auto-fill panel. The sample value is `marvinlavoe`.                                                |
| `VITE_SUPABASE_URL`      | Live CMS/data          | Supabase project URL.                                                                                                                                             |
| `VITE_SUPABASE_ANON_KEY` | Live CMS/data          | Supabase anon/public key. Configure Supabase authentication, database access policies, and the `portfolio-media` storage bucket for the CMS capabilities you use. |
| `VITE_GEMINI_API_KEY`    | Optional AI extraction | Google AI Studio API key for browser-side Gemini generation. Leave unset to use heuristic extraction. This client-side variable is public in the built app.       |

The repository's `.env.example` contains placeholder Supabase settings. Replace them with values from your own Supabase project; placeholders do not enable live persistence.

## Admin CMS

- Login: `/admin/login`
- Dashboard: `/admin`
- Projects: `/admin/projects`
- Case studies: `/admin/case-studies`
- Media: `/admin/media`

Admin routes are protected by the app's auth context. Configure Supabase auth and database policies before using production CMS actions. The project form requires both a title and summary. It stores problem, role, and outcome as optional text; stack as an array; and the accent, featured flag, repository, demo, case-study URL, and order index as project metadata.

## Validation and Build

```sh
npm run lint
npm run build
npm run preview
```

`npm run build` creates the static production bundle in `portfolio-v2/dist`. `npm run preview` serves that built bundle locally for a production-like check.

## Deployment

The repository-level `render.yaml` configures a Render static site with `portfolio-v2` as its root directory. It installs locked dependencies, builds the app, publishes `dist`, and rewrites routes to `index.html` for React Router navigation. Set the required `VITE_` environment values in the deployment environment before building if using Supabase or Gemini. Remember that all `VITE_` values are shipped to browsers and must not contain secrets that need to remain private.

## Repository Layout

```text
.
├── README.md
├── render.yaml                 # Render static-site configuration
└── portfolio-v2/
    ├── .env.example            # Vite environment variable template
    ├── package.json            # Dependencies and scripts
    ├── public/                 # Static public assets
    ├── src/
    │   ├── admin/              # Protected CMS screens and styles
    │   ├── components/         # Shared portfolio layout and components
    │   ├── context/            # Auth and portfolio data contexts
    │   ├── data/               # Local fallback portfolio content
    │   ├── lib/                # Supabase and Gemini clients
    │   ├── pages/              # Public routes
    │   └── utils/              # GitHub integration and seed utilities
    └── supabase/               # Supabase project assets/migrations, if present
```

## Content and Data Notes

The public portfolio uses content from `src/data/portfolioContent.js` and `src/data/caseStudies.js` as fallback data. When Supabase is configured and contains records, the app loads portfolio data from the `projects` and `case_studies` tables. CMS changes are written to Supabase; they are not saved to the local fallback JavaScript files. The app expects the project table fields used by `DataContext`, including `title`, `summary`, `problem`, `role`, `outcome`, `stack`, `featured`, `accent`, `order_index`, `repo_url`, `demo_url`, and `case_study_url`.

## License

No license file was identified in the application folder. Add a license before redistributing this project if you intend to grant reuse rights.
