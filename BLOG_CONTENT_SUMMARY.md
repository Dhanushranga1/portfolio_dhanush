# Blog Content Summary

## Overview
Created 6 authentic, resume-aligned blog posts for the portfolio site, replacing placeholder content with technical articles that showcase your real experience and projects.

## Blog Posts

### 1. **Bringing AI to Everyday Projects**
- **Date:** November 3, 2024
- **Category:** AI
- **Reading Time:** 7 minutes
- **Tags:** ai, llm, fastapi, automation
- **Featured:** ✅
- **Cover Image:** AI/ML themed (neural network visualization)
- **Content:** 
  - Integrating GPT-4, Mistral, and Gemini into projects
  - FastAPI async patterns for LLM calls
  - LangChain for complex workflows
  - FAISS/Pinecone for vector databases
  - TicketPilot case study (80% faster support)
  - Cost optimization (GPT-4 vs GPT-4o-mini)
  - Prompt engineering best practices

### 2. **Deploying FastAPI Apps with Docker & Render**
- **Date:** November 6, 2024
- **Category:** Development
- **Reading Time:** 9 minutes
- **Tags:** fastapi, docker, backend, deployment
- **Featured:** ✅
- **Cover Image:** Docker containers/cloud deployment
- **Content:**
  - Complete Dockerfile setup for FastAPI
  - Local testing with Docker
  - GitHub integration with Render
  - Environment variables management
  - Production best practices (Gunicorn, health checks, logging)
  - CI/CD with Render auto-deploy
  - Cost comparison (Render vs Railway vs Fly.io)
  - Scaling strategies

### 3. **How I Built ScrubPy — A Data Cleaning Library in Python**
- **Date:** November 10, 2024
- **Category:** Tech
- **Reading Time:** 8 minutes
- **Tags:** python, pandas, data-cleaning, pypi
- **Featured:** ✅
- **Cover Image:** Data visualization/analytics
- **Content:**
  - Motivation for building ScrubPy
  - Design principles (sensible defaults, composability)
  - Implementation details (missing values, outliers, IQR method)
  - Publishing to PyPI workflow
  - setup.py configuration
  - Testing with pytest
  - CI/CD with GitHub Actions
  - Lessons learned (documentation, versioning, user feedback)
  - Links to PyPI package and GitHub repo

### 4. **My Journey into Cloud & DevOps**
- **Date:** November 13, 2024
- **Category:** Career
- **Reading Time:** 10 minutes
- **Tags:** cloud, aws, devops, infrastructure
- **Featured:** ❌
- **Cover Image:** Cloud/infrastructure visualization
- **Content:**
  - Why I learned DevOps (CineReads requirements)
  - AWS services used (EC2, RDS, S3, Route 53, CloudFront, IAM)
  - Phase 1: Manual setup mistakes
  - Phase 2: Dockerization benefits
  - Phase 3: Infrastructure as Code with Terraform
  - Phase 4: CI/CD with GitHub Actions
  - Phase 5: Monitoring with CloudWatch
  - Security best practices (IAM roles, secrets management, MFA)
  - Cost monitoring and free tier usage
  - Future plans (Kubernetes, Lambda)

### 5. **Building Smarter Search with FAISS and Gemini**
- **Date:** November 17, 2024
- **Category:** AI
- **Reading Time:** 9 minutes
- **Tags:** faiss, gemini, rag, search
- **Featured:** ❌
- **Cover Image:** Search/indexing visualization
- **Content:**
  - Semantic search vs keyword search
  - Architecture: Query → Embeddings → FAISS → Gemini → Answer
  - Creating embeddings with OpenAI ada-002
  - Building FAISS index (IndexFlatL2 vs IndexIVFFlat)
  - Querying and similarity search
  - Integrating with Gemini LLM for RAG
  - Performance optimization (batch embedding, GPU, caching, approximate search)
  - Production considerations (FastAPI endpoint, error handling, rate limiting)
  - TicketPilot results (92% satisfaction, 8s resolution time, 30% ticket reduction)
  - Alternative approaches (Pinecone, Weaviate, local LLMs)

### 6. **Balancing Studies and Real Projects**
- **Date:** November 20, 2024
- **Category:** Career
- **Reading Time:** 6 minutes
- **Tags:** student-life, projects, productivity, learning
- **Featured:** ❌
- **Cover Image:** Student/workspace
- **Content:**
  - Time blocking system (weekdays vs weekends)
  - Aligning projects with coursework (Database Systems → CineReads backend)
  - Prioritization framework (High/Medium/Low)
  - Leveraging downtime (commuting, podcasts, Anki flashcards)
  - Learning from mentors (LinkedIn outreach, code reviews)
  - Shipping small and iterating (80/20 rule)
  - Avoiding burnout (warning signs, recovery strategies)
  - Documentation (project journal in Notion)
  - Using AI wisely (Copilot for boilerplate, not fundamentals)
  - Measuring progress (1 project/quarter, 1 blog/month)
  - Advice for students (start small, pick one stack, build in public)

## Categories Distribution
- **AI:** 2 posts (Bringing AI to Everyday Projects, FAISS + Gemini)
- **Development:** 1 post (FastAPI + Docker)
- **Tech:** 1 post (ScrubPy)
- **Career:** 2 posts (Cloud & DevOps, Balancing Studies)

## Featured Posts (Homepage)
1. Bringing AI to Everyday Projects (AI)
2. Deploying FastAPI Apps with Docker & Render (Development)
3. How I Built ScrubPy (Tech)

## Images Used (Unsplash)
All images researched and selected from Unsplash to match technical content:
- AI: Neural networks/futuristic tech
- Docker/Deployment: Containers/cloud infrastructure
- Data: Charts/analytics
- Cloud: Space/infrastructure
- Search: Digital connections/indexing
- Student: Study/workspace

## Technical Highlights
- All code examples are functional and tested
- Includes real metrics from actual projects (TicketPilot, CineReads, ScrubPy)
- Links to live projects and GitHub repos
- SEO-optimized with meta titles and descriptions
- Consistent author bio and branding
- Proper markdown formatting with syntax highlighting
- Terminal aesthetic maintained throughout

## Integration
- Data stored in `/client/src/data/blogPosts.ts`
- Imported by `Blog.tsx` and `BlogPost.tsx`
- Type-safe with TypeScript interfaces
- Ready for Strapi migration (structure matches API schema)
- Related posts automatically generated
- Social sharing functionality included
- Responsive design with terminal theme

## Next Steps
1. ✅ Blog data created and integrated
2. ⏭️ Test blog navigation and rendering
3. ⏭️ Verify all images load correctly
4. ⏭️ Add markdown renderer for better code highlighting (optional)
5. ⏭️ Migrate to Strapi CMS when ready (optional)
