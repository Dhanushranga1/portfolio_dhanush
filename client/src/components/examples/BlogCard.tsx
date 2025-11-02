import BlogCard from '../BlogCard'
import blogImage from '@assets/generated_images/Abstract_tech_visual_1ab6a0b2.png'

export default function BlogCardExample() {
  return (
    <div className="max-w-md">
      <BlogCard
        title="Building Modern Web Applications with React"
        excerpt="Learn how to create beautiful, performant web applications using React, TypeScript, and modern development practices."
        date="Nov 2, 2025"
        readTime="5 min read"
        category="Development"
        image={blogImage}
      />
    </div>
  )
}
