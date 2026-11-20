import type { BlogPost } from '../types'

export const blogs: BlogPost[] = [
  {
    slug: 'architecting-multimodal-rag-pipelines',
    title: 'Architecting Multi-Modal RAG Pipelines with Vector Databases',
    excerpt:
      'A deep dive into building production-grade Retrieval-Augmented Generation workflows, indexing heterogeneous documents, and minimizing hallucinations with hybrid reranking.',
    date: 'Oct 2024',
    readTime: '6 min read',
    tags: ['AI / ML', 'Python', 'Vector DB', 'RAG'],
    platform: 'Medium',
    url: 'https://medium.com',
  },
  {
    slug: 'zero-downtime-container-deployments-aws',
    title: 'Zero-Downtime Container Deployments on AWS with Docker & GitHub Actions',
    excerpt:
      'Practical blueprints for setting up automated CI/CD staging, container health verification, reverse proxy configuration with Nginx, and automated SSL cert renewals.',
    date: 'Sep 2024',
    readTime: '8 min read',
    tags: ['AWS', 'Docker', 'CI/CD', 'DevOps'],
    platform: 'Dev.to',
    url: 'https://dev.to',
  },
  {
    slug: 'hardening-modern-web-apis-defense-in-depth',
    title: 'Hardening Modern Web APIs: Defense in Depth for Full-Stack Systems',
    excerpt:
      'Essential security patterns for production APIs — from token revocation and rate limiting to robust CORS policies, parameterized ORMs, and proactive threat modeling.',
    date: 'Aug 2024',
    readTime: '5 min read',
    tags: ['Cybersecurity', 'FastAPI', 'Node.js', 'OAuth2'],
    platform: 'Hashnode',
    url: 'https://hashnode.com',
  },
  {
    slug: 'optimizing-react-performance-state-hydration',
    title: 'Optimizing React Performance & State Hydration in Modern Web Apps',
    excerpt:
      'Strategies for accelerating Core Web Vitals, optimizing bundle sizes with dynamic imports, and streamlining state synchronization across distributed client interfaces.',
    date: 'Jul 2024',
    readTime: '7 min read',
    tags: ['React', 'TypeScript', 'Web Perf', 'Architecture'],
    platform: 'Tech Blog',
    url: 'https://github.com',
  },
]
