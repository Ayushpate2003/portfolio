import { About } from '../components/sections/About'
import { Achievements } from '../components/sections/Achievements'
import { Blog } from '../components/sections/Blog'
import { Contact } from '../components/sections/Contact'
import { Experience } from '../components/sections/Experience'
import { Hero } from '../components/sections/Hero'
import { Projects } from '../components/sections/Projects'
import { Skills } from '../components/sections/Skills'
import { profile } from '../data/profile'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

export function Home() {
  useDocumentMeta(profile.siteTitle, profile.siteDescription)

  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Achievements />
      <Blog />
      <Contact />
    </>
  )
}
