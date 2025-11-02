import ProjectCard from '../ProjectCard'
import projectImage from '@assets/generated_images/Project_dashboard_interface_694e38f2.png'

export default function ProjectCardExample() {
  return (
    <div className="max-w-md bg-background p-6">
      <ProjectCard
        title="taskflow"
        description="a context-aware desktop focus companion"
        image={projectImage}
        tags={["React", "TypeScript", "Node.js"]}
        liveUrl="#"
        githubUrl="#"
      />
    </div>
  )
}
