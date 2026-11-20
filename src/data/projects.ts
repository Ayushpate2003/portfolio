import type { Project } from '../types'

/**
 * Add or edit projects here. `links.github` and `links.live` are optional:
 * the UI only shows a link when a real URL is provided.
 */
export const projects: Project[] = [
  {
    slug: 'arogya-prepare',
    name: 'Arogya-Prepare',
    problem:
      'Emergency trauma care cannot wait for identification, while hospital networks suffer from fragmented medical histories and unverifiable health records.',
    description:
      'A continuous healthcare identity and longitudinal clinical timeline platform built for Indian healthcare (ABDM & DPDP compliant). Features instant emergency trauma triage, verifiable cryptographic audit ledgers with zero-PHI signatures, and an integrated Arogya Trusted AI Assistant for clinical care continuity.',
    context: 'Healthcare Platform · Cryptographic Identity & AI',
    tags: ['React', 'Healthcare Tech', 'Cryptographic Ledger', 'ABDM / DPDP', 'AI Assistant', 'Emergency Triage', 'Vercel'],
    contributions: [
      'Engineered the continuous healthcare identity platform enabling instant emergency triage and longitudinal patient records.',
      'Implemented verifiable cryptographic audit ledgers with zero-PHI signatures for patient data integrity and security.',
      'Integrated the Arogya Trusted AI Assistant to assist duty doctors and nurses with care continuity, vitals tracking, and medication rounds.',
      'Architected responsive clinical workflows including live hospital event feeds, emergency queues, and bed allocation management.',
    ],
    links: {
      live: 'https://arogya-prepare-adv-3iyc.vercel.app/',
      github: 'https://github.com/Ayushpate2003/Arogya-Prepare.git',
    },
  },
  {
    slug: 'ml-interviewer',
    name: 'ML Interviewer',
    problem: 'Candidates lack accessible, automated technical interview practice with intelligent contextual feedback.',
    description:
      'Designed and implemented an AI interviewer leveraging the Gemma LLM and RAG architecture to conduct structured evaluations, generate context-aware questions, and analyze responses.',
    context: 'ML Nashik Hackathon Champion 2026 · Build with Gemma',
    tags: ['Gemma LLM', 'RAG Architecture', 'Python', 'AI Product Development', 'Cloud'],
    contributions: [
      'Built an ML Interviewer leveraging Gemma LLM + RAG architecture in a competitive hackathon.',
      'Designed structured AI workflows, prompt engineering templates, and retrieval pipelines.',
      'Handled application setup, cloud infrastructure, and live deployment to secure the Champion title.',
    ],
  },
  {
    slug: 'krishi-drishti',
    name: 'Krishi-Drishti',
    problem: 'Farmers in rural regions need accessible crop guidance and insights without being hindered by poor connectivity.',
    description:
      'Built a platform to help farmers optimize crop growth, featuring offline-first accessibility to ensure reliable usability in rural environments.',
    context: 'Sun Hack Hackathon · 2025',
    tags: ['Offline-First', 'Accessibility', 'Cloud Deployment', 'Agriculture Tech', 'Full-Stack'],
    contributions: [
      'Developed a comprehensive platform for farmers to improve crop growth as Software & Cloud Developer.',
      'Improved accessibility by designing offline-first features and caching for low-bandwidth rural use.',
      'Focused on reliable, accessible cloud application deployment.',
    ],
  },
  {
    slug: 'aws-cloud-project',
    name: 'AWS Cloud Project',
    problem: 'Modern web applications require cost-effective, scalable hosting, robust compute, and secure asset storage.',
    description:
      'Implemented cloud deployment using AWS EC2 and S3 to achieve scalable storage and efficient, high-performance application hosting.',
    context: 'Cloud Infrastructure & Hosting',
    tags: ['AWS EC2', 'AWS S3', 'Cloud Deployment', 'Scalability', 'DevOps'],
    contributions: [
      'Implemented end-to-end cloud deployment using AWS EC2 for compute and S3 for static assets.',
      'Achieved scalable storage and efficient application hosting with optimized security groups.',
      'Assisted in configuring cloud infrastructure, monitoring, and optimizing resource usage.',
    ],
  },
  {
    slug: 'docker-based-project',
    name: 'Docker-Based Project',
    problem: 'Discrepancies across local development and production environments create deployment friction and waste server resources.',
    description:
      'Containerized applications with Docker for consistent runtime environments, eliminating environment discrepancies and boosting resource utilization.',
    context: 'Containerization & DevOps',
    tags: ['Docker', 'Containers', 'DevOps', 'Linux', 'Resource Optimization'],
    contributions: [
      'Containerized multi-service applications using Docker for consistent cross-platform environments.',
      'Reduced deployment issues and improved system resource utilization and startup speed.',
      'Collaborated with teams on automation scripts and containerized delivery workflows.',
    ],
  },
  {
    slug: 'skill-hub-quiz',
    name: 'Skill Hub Quiz Website',
    problem: 'Students and learners need an interactive, reliable web platform to test and benchmark their technical skills.',
    description:
      'Built an interactive quiz platform featuring instant evaluations, responsive user interfaces, and robust deployment configurations.',
    context: 'Software & Deployment Developer · 2023',
    tags: ['React', 'Web Application', 'Testing', 'Deployment', 'Troubleshooting'],
    contributions: [
      'Built an interactive quiz platform with responsive frontend architecture and state management.',
      'Managed application testing, troubleshooting, and bug fixing for seamless user experience.',
      'Handled application deployment and continuous workflow maintenance using Git/GitHub.',
    ],
  },
]

export function getProject(slug: string | undefined): Project | undefined {
  return projects.find((project) => project.slug === slug)
}
