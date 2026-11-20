import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'
import { ProjectDetail } from './pages/ProjectDetail'
import { AdminBlog } from './pages/AdminBlog'

export default function App() {
  return (
    <Routes>
      <Route path="admin-blog" element={<AdminBlog />} />
      <Route path="admin/blogs" element={<AdminBlog />} />
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="projects/:slug" element={<ProjectDetail />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
