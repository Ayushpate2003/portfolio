import type { Achievement } from '../types'

/**
 * `kind` keeps claim strength explicit: champion / winner are confirmed awards,
 * participation is a project contribution, certificate is a completed program.
 */
export const achievements: Achievement[] = [
  {
    id: 'ml-nashik-2026',
    title: 'ML Nashik Hackathon Champion 2026',
    issuer: 'ML Nashik Hackathon · Build with Gemma',
    period: '2026',
    kind: 'champion',
    description:
      "Build with Gemma: Designed and implemented 'ML Interviewer' leveraging the Gemma LLM and RAG architecture within a high-pressure competitive environment.",
    relatedProject: 'ml-interviewer',
  },
  {
    id: 'sun-hack-3-2026',
    title: 'Sun Hack 3 Production Winner 2026',
    issuer: 'Sun Hack Hackathon',
    period: '2026',
    kind: 'winner',
    description:
      'Recognized as Sun Hack 3 Production Winner for developing an innovative cybersecurity web application.',
  },
  {
    id: 'iit-jodhpur-cyber',
    title: 'Cyber Security Certificate Program',
    issuer: 'IIT Jodhpur',
    period: 'Oct 2023 – Jan 2024',
    kind: 'certificate',
    description:
      'Completed an intensive program covering network security, ethical hacking, and secure system practices with hands-on exposure to cybersecurity tools and real-world threat analysis.',
  },
  {
    id: 'sun-hack-2025',
    title: 'Sun Hack Hackathon – Krishi-Drishti',
    issuer: 'Sun Hack',
    period: '2025',
    kind: 'participation',
    description:
      'Software & Cloud Developer on Krishi-Drishti, creating an offline-first accessibility platform for agricultural communities to optimize crop growth.',
    relatedProject: 'krishi-drishti',
  },
  {
    id: 'skill-hub-dev',
    title: 'Skill Hub Quiz Website Developer',
    issuer: 'Competitions & Project Milestone',
    period: '2023',
    kind: 'participation',
    description:
      'Software & Deployment Developer for an interactive quiz platform, managing application testing, troubleshooting, and deployment workflows.',
    relatedProject: 'skill-hub-quiz',
  },
]
