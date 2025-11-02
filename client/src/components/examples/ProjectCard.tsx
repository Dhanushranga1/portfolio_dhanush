import ProjectCard from '../ProjectCard'
import projectImage from '@assets/generated_images/Project_dashboard_interface_694e38f2.png'

export default function ProjectCardExample() {
  return (
    <div className="max-w-md">
      <ProjectCard
        title="TaskFlow Pro"
        description="A modern task management application with real-time collaboration, beautiful UI, and powerful features for teams."
        image={projectImage}
        tags={["React", "TypeScript", "Node.js"]}
        liveUrl="#"
        githubUrl="#"
      />
    </div>
  )
}
