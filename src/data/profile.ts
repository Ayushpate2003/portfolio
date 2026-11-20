import type { Profile } from '../types'

/**
 * Single source for identity and contact details. Values come from the owner's resume.
 * The phone number on the resume is intentionally not published here.
 */
export const profile: Profile = {
  name: 'Ayush Patel',
  role: 'CLOUD, SECURITY & FULL-STACK DEVELOPER',
  headline: 'Building Intelligent Solutions',
  tagline: 'Passionate about turning challenges into opportunities through cloud and security innovation.',
  intro:
    "I'm Ayush Patel, a Computer Science Engineering student specializing in Cloud Computing and Information Security at Sandip University, Nashik. Passionate about turning challenges into opportunities through cloud and security innovation, I build resilient web applications, architect scalable AWS infrastructure, and engineer AI-driven solutions.",
  location: 'Sandip University, Nashik, Maharashtra',
  email: 'ayushpatel7869595243@gmail.com',
  phone: '+91 7869595243',
  emailSubject: 'Hello from your portfolio',
  socials: [
    { label: 'GitHub', href: 'https://github.com/Ayushpate2003', icon: 'github' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ayush-patel-a04515281', icon: 'linkedin' },
    { label: 'Email', href: 'mailto:ayushpatel7869595243@gmail.com', icon: 'mail' },
  ],
  about: [
    "Passionate about turning challenges into opportunities through cloud and security innovation. I am pursuing my Diploma + B.Tech in Computer Science Engineering with a specialization in Cloud Computing and Information Security at Sandip University, Nashik (2024–2027, GPA: 8.52), having completed my Diploma in Computer Science at Government Polytechnic College Itarsi (GPA: 7.4).",
    "With industry experience as a Cloud Developer Intern at Ediglobe and Software Developer Intern at Miraiyantra, I build and deploy scalable cloud infrastructure on AWS, automate containerized environments using Docker, develop responsive full-stack applications with React and the MERN stack, and leverage Git/GitHub for streamlined development workflows.",
    "I hold a Cyber Security Certification from IIT Jodhpur covering network security and threat analysis, and was crowned Champion at the ML Nashik Hackathon 2026 for building the 'ML Interviewer' using Gemma LLM and RAG architecture, alongside winning the Sun Hack Production Award for cybersecurity web applications.",
  ],
  interests: [
    'Cloud Deployment & AWS Architecture (EC2, S3, Scalable Hosting)',
    'Cybersecurity & Threat Analysis (IIT Jodhpur Certified)',
    'AI Product Development & LLMs (Gemma, Gemini, GPT, RAG)',
    'Front-End & Full-Stack Development (React, MERN, Python)',
    'Linux OS Administration (Shell Scripting, Networking)',
    'Containerization & DevOps (Docker, Git/GitHub Workflows)',
  ],
  siteTitle: 'Ayush Patel — Cloud, Security & Full-Stack Developer',
  siteDescription:
    'Portfolio of Ayush Patel, CSE student specializing in Cloud Computing and Information Security at Sandip University, Nashik.',
}
