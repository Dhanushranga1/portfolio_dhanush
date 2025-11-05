// Blog post data - natural, conversational content

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string | null;
  category: {
    id: string;
    name: string;
    slug: string;
  } | null;
  tags: string[];
  featured: boolean;
  publishedAt: string;
  updatedAt: string | null;
  readTime: number;
  author: {
    name: string;
    bio: string;
    avatar: string | null;
  };
  seo: {
    metaTitle: string | null;
    metaDescription: string | null;
  } | null;
};

export const BLOG_POSTS: Record<string, BlogPost> = {
  "bringing-ai-to-everyday-projects": {
    id: "1",
    title: "Bringing AI to Everyday Projects",
    slug: "bringing-ai-to-everyday-projects",
    excerpt:
      "How I integrated AI models like GPT-4 and Mistral into real projects. A practical overview of combining LLMs with APIs to make smarter, context-aware applications.",
    content: `# Bringing AI to Everyday Projects

AI isn't just for tech giants anymore. Over the past year, I've integrated LLMs like GPT-4, Mistral, and Gemini into several projects, from chatbots to document assistants. Here's what I learned about making AI actually useful in real-world applications.

## Why Add AI to Your Projects?

The thing about AI models is they're really good at understanding what people actually mean, not just matching keywords. They can have back-and-forth conversations, summarize long documents, and search through content by meaning rather than exact words. That's the kind of stuff that makes apps feel way smarter.

## The Stack I Use

I built most of my AI features with FastAPI on the backend. Since API calls to OpenAI can take a few seconds, async/await is pretty much required. For anything complex like multi-step reasoning or retrieval augmented generation (fancy term for "search docs first, then ask AI"), I use LangChain. It handles the prompt chaining and conversation memory for you.

The other big piece is vector databases. I use FAISS or Pinecone to store document embeddings, which lets users ask questions in plain English and get relevant context before the LLM generates an answer.

## Real Project: TicketPilot

In my TicketPilot project, I built a support assistant that's basically a smart search system. First, I embedded all the support documentation, then when someone asks a question, it finds the most relevant docs and passes them to Gemini along with the question. The AI generates an answer based only on those docs, so it doesn't make stuff up.

The result? Support resolution went from like 45 seconds average to around 8 seconds, and I haven't had any issues with wrong answers since the responses are grounded in actual documentation.

## What I Learned

Prompt engineering is huge. You can't just throw questions at these models and expect good results. I learned to structure prompts carefully — tell it what role it's playing, give it examples, and set clear boundaries like "only answer based on this context."

Cost management was another surprise. GPT-4 is expensive, like really expensive. I switched to GPT-4o-mini for most queries and only use GPT-4 for complex stuff. Cut my API costs by 70%.

Also, these models can fail in interesting ways. Rate limits, timeouts, weird outputs. I added fallback messages for everything now.

## When NOT to Use AI

Look, AI is cool but it's not always the right tool. For simple deterministic tasks, just write normal code. If you need instant responses, LLMs are too slow. And definitely don't let AI make important decisions without human review. It's powerful but it's not magic.

## What's Next

I'm currently exploring fine-tuning models on domain-specific data to make them even better for niche use cases. Also looking into function calling with GPT-4, which lets the model use tools and APIs directly. And honestly, considering running some local models like Llama 3 or Mistral to cut down on API costs entirely.

The main thing I've learned is to start small. Build one feature, see if it actually helps users, then expand from there. AI is powerful but it needs to solve a real problem, not just be AI for the sake of it.

Tools I'm using: OpenAI API, Google Gemini, FAISS, LangChain, and FastAPI for serving everything. Pretty standard stack at this point.`,
    coverImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=600&fit=crop",
    category: { id: "2", name: "AI", slug: "ai" },
    tags: ["ai", "llm", "fastapi", "automation"],
    featured: true,
    publishedAt: "2024-11-03T10:00:00Z",
    updatedAt: null,
    readTime: 7,
    author: {
      name: "Dhanush Ranga",
      bio: "Computer Science student building AI-powered applications with FastAPI and modern web technologies",
      avatar: null,
    },
    seo: {
      metaTitle: "Bringing AI to Everyday Projects | Dhanush Ranga",
      metaDescription:
        "Learn how to integrate GPT-4, Mistral, and Gemini into real projects with FastAPI, LangChain, and vector databases.",
    },
  },

  "deploying-fastapi-docker-render": {
    id: "2",
    title: "Deploying FastAPI Apps with Docker & Render",
    slug: "deploying-fastapi-docker-render",
    excerpt:
      "A step-by-step breakdown of how I containerized and deployed my FastAPI apps using Docker and Render. Covers setup, CI/CD integration, and scaling best practices.",
    content: `# Deploying FastAPI Apps with Docker & Render

Deploying a FastAPI app to production seemed daunting at first. But with Docker and Render, I got my apps live in under an hour. Here's how I did it.

## Why Docker + Render?

Docker makes sure your app runs the same everywhere. No more "works on my machine" problems. Render is basically Heroku but actually has a free tier that works, plus automatic HTTPS and deploys straight from GitHub.

## Getting Started

The basic setup is pretty straightforward. You need a Dockerfile that tells Docker how to build your app, a requirements.txt with your dependencies, and a dockerignore file to keep junk out of the container.

For my FastAPI apps, I use Python 3.11 slim as the base image, install dependencies, copy the app code, and run it with Uvicorn. Nothing fancy, just the basics.

## Testing Locally

Before deploying, I always test locally. Build the Docker image, run it in a container, and make sure everything works at localhost:8000. If it breaks here, it'll break in production, so better to catch issues early.

## Deploying to Render

This is the easy part. Push your code to GitHub, connect Render to your repo, tell it you're using Docker, and click deploy. Render handles the rest — builds the image, deploys it, sets up SSL, creates health checks. Within a few minutes, your app is live with a render.com domain.

## Environment Variables

For secrets like API keys or database URLs, don't hard-code them. Add them in Render's environment tab, and your app can access them through normal environment variables. Render auto-redeploys when you change them.

## CI/CD

Render auto-deploys every time you push to main. For my projects, that's perfect. Push code, Render deploys it, done. No manual steps, no clicking around dashboards.

## Production Tips

A few things I learned the hard way. First, add a health check endpoint so Render knows your app is actually running. Second, use structured logging so you can debug issues. Third, for better performance, switch from Uvicorn to Gunicorn with Uvicorn workers when you're ready to scale.

## Costs

The free tier is generous — 750 hours per month, which is enough for hobby projects. When you need more, the paid plan is 7 dollars a month, way cheaper than most alternatives.

## What's Next

Right now I'm happy with Render for my side projects. Eventually I want to learn AWS ECS and Kubernetes, but for now this setup handles everything I need without the complexity.

Tools: Docker, Render, FastAPI, Gunicorn. That's it.`,
    coverImage: "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=1200&h=600&fit=crop",
    category: { id: "1", name: "Development", slug: "development" },
    tags: ["fastapi", "docker", "backend", "deployment"],
    featured: true,
    publishedAt: "2024-11-06T14:30:00Z",
    updatedAt: null,
    readTime: 9,
    author: {
      name: "Dhanush Ranga",
      bio: "Computer Science student building AI-powered applications with FastAPI and modern web technologies",
      avatar: null,
    },
    seo: {
      metaTitle: "Deploying FastAPI Apps with Docker & Render | Dhanush Ranga",
      metaDescription:
        "Complete guide to containerizing and deploying FastAPI applications with Docker and Render, including CI/CD and production best practices.",
    },
  },

  "how-i-built-scrubpy": {
    id: "3",
    title: "How I Built ScrubPy — A Data Cleaning Library in Python",
    slug: "how-i-built-scrubpy",
    excerpt:
      "A behind-the-scenes look at ScrubPy — my open-source Python package for quick data cleaning. The motivation, design choices, and lessons from publishing to PyPI.",
    content: `# How I Built ScrubPy

ScrubPy is my open-source Python library for data cleaning. It handles common pandas tasks like missing values, duplicates, and outliers with just one function call. Here's why I built it and what I learned from publishing to PyPI.

Check it out: https://pypi.org/project/scrubpy/

## The Problem

Data cleaning is repetitive. Every data science project starts the same way — load a CSV, drop duplicates, fill missing values, remove outliers, strip whitespace. Twenty lines of boilerplate every single time.

I wanted one function that does all of that. Import clean from scrubpy, pass your dataframe, done. The idea was simple: sensible defaults that work for 80% of cases, but everything configurable when you need it.

## Design Choices

The main principle was sensible defaults. By default, ScrubPy drops duplicate rows, fills missing numeric values with the mean and categorical with the mode, removes outliers using the IQR method, and strips whitespace from strings. But if you want median instead of mean, or don't want to remove duplicates, you can configure that.

I also made each operation a separate function, so you can use them individually if you want. The clean function is just convenience that chains everything together.

## Publishing to PyPI

This was my first time publishing a package and honestly, it was easier than I expected. You need a setup.py file that tells pip how to install your package, build distribution files, and upload with twine. That's it.

The harder part was documentation. I spent like 40% of my time just writing docstrings and README files. Turns out good docs are what makes people actually use your library.

## Testing

I used pytest for testing. Write tests for each function, make sure edge cases work, verify the API doesn't break. GitHub Actions runs tests automatically on every push, which is super helpful for catching bugs before they reach users.

## User Feedback

After publishing, I got feature requests through GitHub Issues. People wanted column-specific cleaning, custom fill values, and stats on what was cleaned. All good ideas, and I added most of them in version 0.2.

## Lessons Learned

Documentation matters way more than I thought. Also, semantic versioning is important — don't break the API without bumping the major version. And CI/CD with GitHub Actions saves so much time.

Publishing an open-source library taught me more about software engineering than any tutorial. You have to think about API design, backward compatibility, edge cases, documentation. It's a different mindset than just building apps.

## What's Next

I'm working on schema validation to enforce column types, automated reports that summarize cleaning operations, and maybe a CLI tool so you can clean data straight from the terminal without writing Python.

If you work with pandas and hate writing the same cleaning code over and over, give ScrubPy a try. Install with pip install scrubpy. Star the repo if you find it useful.`,
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop",
    category: { id: "4", name: "Tech", slug: "tech" },
    tags: ["python", "pandas", "data-cleaning", "pypi"],
    featured: true,
    publishedAt: "2024-11-10T09:00:00Z",
    updatedAt: null,
    readTime: 8,
    author: {
      name: "Dhanush Ranga",
      bio: "Computer Science student building AI-powered applications with FastAPI and modern web technologies",
      avatar: null,
    },
    seo: {
      metaTitle: "How I Built ScrubPy — A Python Data Cleaning Library | Dhanush Ranga",
      metaDescription:
        "Behind-the-scenes look at building and publishing ScrubPy, an open-source Python library for pandas data cleaning, to PyPI.",
    },
  },

  "my-journey-cloud-devops": {
    id: "4",
    title: "My Journey into Cloud & DevOps",
    slug: "my-journey-cloud-devops",
    excerpt:
      "Reflecting on my first real experience with AWS, Terraform, and Kubernetes. From setting up EC2 and RDS to automating deployments — lessons I learned while building CineReads.",
    content: `# My Journey into Cloud & DevOps

Six months ago, I knew nothing about cloud infrastructure. Today, I'm managing AWS services, writing Terraform configs, and automating deployments. Here's what I learned building CineReads, my full-stack movie recommendation app.

Check it out: https://cinereads.dhanushranga1.dev/

## Why I Dove Into DevOps

As a CS student, I'd always deployed to free platforms like Vercel and Render. But for CineReads, I needed a PostgreSQL database that was too large for free tiers, background jobs for data processing, and full control over the infrastructure. AWS was intimidating, but I committed to learning it properly.

## The Stack

I used EC2 for application servers, RDS for PostgreSQL, S3 for storing movie posters, Route 53 for DNS, CloudFront as a CDN, and IAM for access control. On the infrastructure-as-code side, Terraform to manage resources, Docker to containerize the app, and GitHub Actions for CI/CD.

## Phase 1: Manual Setup

I started by clicking through the AWS Console. Bad idea. Launched an EC2 instance, SSH'd in, installed dependencies manually, ran the app. Every update required SSH, manual commands, downtime. And if the instance died, I'd have to recreate everything from scratch. Not reproducible, not scalable, not fun.

## Phase 2: Dockerize Everything

I created a Dockerfile that packages the entire app with its dependencies. Build the image, push to Docker Hub, pull on EC2, run. Now deployments were consistent and I could easily roll back to previous versions if something broke.

## Phase 3: Infrastructure as Code with Terraform

Hand-managing AWS resources was error-prone. With Terraform, I defined all infrastructure (EC2, RDS, S3, etc.) as code. Version control for infrastructure. Preview changes before applying. Destroy and recreate environments cleanly. Game changer.

## Phase 4: CI/CD with GitHub Actions

Manual deployments were tedious. I set up GitHub Actions to automatically build the Docker image, push to Docker Hub, SSH into EC2, and deploy whenever I push to main. Now deployments are automatic. Push code, wait a few minutes, it's live.

## Phase 5: Monitoring & Logging

Running in production means things will break. I added CloudWatch for logs, a health check endpoint, and Route 53 health monitoring. Now I get alerts when something's wrong instead of finding out from users.

## Lessons Learned

Start small. Don't jump to Kubernetes on day one. EC2 plus Docker is fine for most projects. Automate early — manual deployments equal bugs. Use AWS free tier wisely (750 hours of EC2, 20GB RDS, 5GB S3 per month). Security matters — never commit secrets, use IAM roles, enable MFA. And set up billing alerts because I got a surprise 30 dollar bill once.

## What's Next

I'm exploring Kubernetes for container orchestration, Terraform modules for reusable infrastructure, AWS Lambda for serverless functions, and monitoring with Prometheus plus Grafana. DevOps felt overwhelming at first, but breaking it into phases (manual → Docker → IaC → CI/CD) made it manageable.

Resources I used: The Phoenix Project book, Terraform: Up & Running, AWS Cloud Practitioner course, and the r/devops subreddit. Start with one project and build from there.`,
    coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=600&fit=crop",
    category: { id: "3", name: "Career", slug: "career" },
    tags: ["cloud", "aws", "devops", "infrastructure"],
    featured: false,
    publishedAt: "2024-11-13T11:00:00Z",
    updatedAt: null,
    readTime: 10,
    author: {
      name: "Dhanush Ranga",
      bio: "Computer Science student building AI-powered applications with FastAPI and modern web technologies",
      avatar: null,
    },
    seo: {
      metaTitle: "My Journey into Cloud & DevOps with AWS and Terraform | Dhanush Ranga",
      metaDescription:
        "Learn how I went from zero to deploying production apps on AWS using EC2, RDS, Docker, Terraform, and GitHub Actions CI/CD.",
    },
  },

  "building-smarter-search-faiss-gemini": {
    id: "5",
    title: "Building Smarter Search with FAISS and Gemini",
    slug: "building-smarter-search-faiss-gemini",
    excerpt:
      "Explaining how I used FAISS for semantic search and combined it with Gemini LLM to build a context-aware retrieval system in TicketPilot. Includes architecture and tuning notes.",
    content: `# Building Smarter Search with FAISS and Gemini

Traditional keyword search fails when users ask questions like "How do I reset my password?" A keyword search for "reset password" might miss documents titled "Account Recovery Guide" or "Authentication Troubleshooting." Semantic search solves this by understanding meaning, not just matching words.

Here's how I built a context-aware search system for TicketPilot using FAISS and Gemini.

## The Architecture

The flow is pretty simple. User asks a question, we embed that question into a vector, search the FAISS index for similar document vectors, retrieve the top matches, pass those documents plus the question to Gemini, and return a generated answer. The key is that we're not just searching for keywords — we're searching for meaning.

## Creating Embeddings

First step is turning text into vectors. I use OpenAI's text-embedding-ada-002 model. For every document in the knowledge base, generate an embedding (a 1536-dimension vector), then store all those vectors in FAISS. FAISS is basically a library for fast similarity search on vectors.

## Querying the Index

When someone asks a question, embed that question the same way, then search FAISS for the most similar document vectors. You get back the top K results (usually K=3 or K=5) along with their similarity scores. Lower scores mean more similar.

## Integrating with Gemini

Now we have relevant documents. Pass them to Gemini as context along with the user's question. The prompt says "based on the following context, answer this question" and includes the retrieved docs. Gemini generates an answer grounded in those docs, so it doesn't hallucinate.

## Performance Tips

For large document sets, batch your embeddings instead of one at a time. For really large indexes (100K plus documents), use GPU-accelerated FAISS or switch to approximate search methods. Cache embeddings to avoid recomputing. And for high traffic, cache common queries with Redis.

## Results in TicketPilot

After implementing semantic search, user satisfaction went from 78% to 92%, query resolution time dropped from 45 seconds to 8 seconds, and support tickets decreased by 30%. Users could ask questions naturally instead of hunting for exact keywords.

## What I Learned

Embedding quality matters a lot. I started with a free local model and got okay results. Switched to OpenAI's ada-002 and relevance improved by 40%. Also, Gemini has a 32K token context limit, so sometimes you need to truncate the retrieved docs.

Hybrid search works best — combine semantic search with traditional keyword search for optimal results. And always monitor costs. OpenAI embeddings cost 0.0001 dollars per 1K tokens, Gemini API has a free tier with 60 requests per minute. For high traffic, consider self-hosted models like Llama 3 or Mistral.

## Alternatives

Instead of FAISS, you could use Pinecone (managed, scales easily), Weaviate (open-source, GraphQL), or Qdrant (Rust-based, fast). For the LLM, local models like Llama 3, Mistral 7B, or Gemma 2B can save on API costs.

## What's Next

I'm exploring reranking models to improve the top K results, multi-vector search that combines text and image embeddings, and hybrid search that merges FAISS with Elasticsearch for the best of both worlds.

Semantic search transforms how users interact with your app. Start with FAISS plus an LLM, then optimize based on usage patterns.`,
    coverImage: "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?w=1200&h=600&fit=crop",
    category: { id: "2", name: "AI", slug: "ai" },
    tags: ["faiss", "gemini", "rag", "search"],
    featured: false,
    publishedAt: "2024-11-17T16:00:00Z",
    updatedAt: null,
    readTime: 9,
    author: {
      name: "Dhanush Ranga",
      bio: "Computer Science student building AI-powered applications with FastAPI and modern web technologies",
      avatar: null,
    },
    seo: {
      metaTitle: "Building Smarter Search with FAISS and Gemini LLM | Dhanush Ranga",
      metaDescription:
        "Complete guide to building semantic search with FAISS vector database and Gemini LLM for context-aware question answering.",
    },
  },

  "balancing-studies-real-projects": {
    id: "6",
    title: "Balancing Studies and Real Projects",
    slug: "balancing-studies-real-projects",
    excerpt:
      "As a Computer Science student, managing academic load and real-world projects is tricky. Here's how I balance both — planning, learning from mentors, and turning coursework into portfolio-ready work.",
    content: `# Balancing Studies and Real Projects

Being a Computer Science student while building real projects is hard. There's coursework, exams, assignments — and then the projects you actually want to build. Here's how I manage both without burning out.

## The Challenge

Between lectures, assignments, exam prep, and group projects, my academic workload is around 30 hours per week. Add in personal projects like TicketPilot, CineReads, ScrubPy, and this portfolio site, and I'm looking at 50-60 hours per week if I'm not careful.

## My System

Time blocking is key. I use Google Calendar religiously. Weekdays, classes from 9 AM to 1 PM, coursework from 2 PM to 4 PM, personal projects from 7 PM to 10 PM. Weekends, Saturday for deep work on one big project, Sunday as a buffer for catch-up plus rest. The rules: no project work during exam weeks, and one project-free day per week (usually Sunday afternoon).

## Align Projects with Coursework

This is the secret. When possible, I turn assignments into portfolio pieces. For my database systems course, I built the backend for CineReads (PostgreSQL, indexing, query optimization). For web development, I submitted this portfolio as my final project. For machine learning, I used the concepts to build TicketPilot's AI features.

The benefits are huge. You get double ROI on your time, better grades because you're motivated to do good work, and professors love real-world applications. I usually pitch it like "For my final project, I'd like to build a full-stack app that demonstrates the concepts we've learned. Can I document the process as my submission?" Most professors say yes.

## Prioritize Ruthlessly

Not every idea needs to be built. I only work on high-priority projects during the semester (things that align with career goals like FastAPI apps and AI projects). Medium priority stuff (interesting but not urgent, like experimental tech) and low priority ideas (cool but no clear benefit) go on a backlog for summer break.

## Leverage Downtime

Commuting takes an hour per day. I listen to tech podcasts, watch YouTube tutorials at 2x speed, or read docs on my phone. Between classes, I review Anki flashcards for interviews, skim Hacker News, or outline blog posts. Before bed, 30 minutes of reading technical books.

## Learning from Mentors

I reached out to 3 senior developers on LinkedIn. Two responded. We chat monthly about code reviews, career advice, and which technologies to focus on. I found them through LinkedIn (search "Software Engineer" plus my city), GitHub (contributors to projects I use), and meetups. Pro tip: don't just ask for help — offer value. I help with documentation or testing on their projects.

## Ship Small, Iterate

I used to start projects and never finish them. Now I follow the 80/20 rule. First version: core feature only, basic UI, deploy to Vercel or Render, ship in 1-2 weeks. Then iterate: add features based on feedback, improve UI/UX, optimize performance. Examples: TicketPilot v1 was just a chatbot (no search, no embeddings), ScrubPy v1 had one function with no config options. Shipping fast keeps me motivated. Perfection is the enemy of progress.

## Avoid Burnout

I watch for warning signs: staring at code without making progress, dreading opening my laptop, ignoring friends. When I hit burnout, I take 2-3 days completely off, go for walks, read fiction, hang out with non-tech friends, then come back with a smaller goal like "just fix this bug."

What works for me: exercise 3x per week (gym or running), one "no laptop" day per week, sleep 7-8 hours (non-negotiable).

## Document Everything

I keep a project journal in Notion. Every week I log what I built, what I learned, blockers I hit, and next week's goals. This helps me track progress (motivating), debug issues (when did X break?), and prepare for interviews (stories for behavioral questions).

## Use AI Wisely

GitHub Copilot and ChatGPT are game-changers, but use them for boilerplate code, debugging syntax errors, and explaining complex concepts. Don't use them for learning fundamentals (write data structures from scratch), exams (obviously), or understanding why code works.

## Measure Progress, Not Perfection

Instead of vague goals like "I want to be a senior engineer," I track measurable wins. This year: published ScrubPy to PyPI (1.2K downloads), deployed 3 full-stack apps, landed a summer internship. Progress over perfection.

## What I'm Still Learning

I struggle with saying no to interesting side projects, avoiding scope creep (features keep expanding), and balancing social life. Next experiments: Pomodoro technique (25 min focus, 5 min break), pair programming with classmates, blogging publicly to clarify my thinking.

## My Advice

Start small. Don't build the next Instagram. Build a todo app, a personal site, a CLI tool you'd use. Pick one stack and master it before trying everything. Build in public — tweet your progress, write blog posts, share on LinkedIn. Join communities like Discord servers, Reddit (r/webdev, r/cscareerquestions), and local meetups.

And remember: internships matter more than grades. A 3.5 GPA plus 2 internships beats a 4.0 GPA with 0 experience. Grades matter for your first internship, but after that, projects and experience win.

You don't need to sacrifice grades or projects. With intentional time management and smart prioritization, you can do both.`,
    coverImage: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&h=600&fit=crop",
    category: { id: "3", name: "Career", slug: "career" },
    tags: ["student-life", "projects", "productivity", "learning"],
    featured: false,
    publishedAt: "2024-11-20T13:00:00Z",
    updatedAt: null,
    readTime: 6,
    author: {
      name: "Dhanush Ranga",
      bio: "Computer Science student building AI-powered applications with FastAPI and modern web technologies",
      avatar: null,
    },
    seo: {
      metaTitle: "Balancing CS Studies and Real Projects | Dhanush Ranga",
      metaDescription:
        "Practical strategies for managing academic coursework while building real-world software projects as a Computer Science student.",
    },
  },
};

export const RELATED_POSTS = [
  {
    id: "2",
    title: "Deploying FastAPI Apps with Docker & Render",
    slug: "deploying-fastapi-docker-render",
    excerpt: "A step-by-step breakdown of containerizing and deploying FastAPI apps...",
    coverImage: "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=400&h=200&fit=crop",
  },
  {
    id: "3",
    title: "How I Built ScrubPy",
    slug: "how-i-built-scrubpy",
    excerpt: "Behind-the-scenes look at my open-source Python data cleaning library...",
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop",
  },
  {
    id: "5",
    title: "Building Smarter Search with FAISS and Gemini",
    slug: "building-smarter-search-faiss-gemini",
    excerpt: "How I built semantic search with vector databases and LLMs...",
    coverImage: "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?w=400&h=200&fit=crop",
  },
];
