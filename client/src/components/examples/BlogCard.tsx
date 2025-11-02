import BlogCard from '../BlogCard'

export default function BlogCardExample() {
  return (
    <div className="max-w-2xl bg-background p-6">
      <BlogCard
        title="building modern web applications"
        excerpt="intuitive page transitions that map website hierarchy to 2D space (in sveltekit)"
        date="02/22/2025"
        category="Development"
      />
    </div>
  )
}
