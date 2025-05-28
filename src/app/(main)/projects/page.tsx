
import { ProjectCard, type Project } from "@/components/projects/project-card";

const projectsData: Project[] = [
  {
    id: "1",
    title: "E-commerce Platform",
    shortDescription: "A full-featured online store with modern UI/UX.",
    longDescription: "This project is a comprehensive e-commerce solution built from scratch, offering features like product listings, user accounts, shopping cart, and a secure checkout process. It's designed to be scalable and customizable for various business needs.",
    imageUrl: "https://placehold.co/600x375.png",
    imageHint: "online store interface",
    purpose: "To provide a robust and user-friendly platform for businesses to sell products online and manage their operations efficiently.",
    functionality: [
      "User registration and authentication",
      "Product catalog with search and filtering",
      "Shopping cart and wishlist",
      "Secure payment gateway integration",
      "Order management dashboard for admins",
    ],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe", "PostgreSQL", "Prisma"],
    liveLink: "#", // Replace with actual link
    repoLink: "#", // Replace with actual link
  },
  {
    id: "2",
    title: "Task Management App",
    shortDescription: "A collaborative tool to organize and track tasks.",
    longDescription: "A web application designed to help individuals and teams manage their projects and tasks effectively. It features a Kanban-style board, task assignments, deadlines, and progress tracking.",
    imageUrl: "https://placehold.co/600x375.png",
    imageHint: "task board application",
    purpose: "To improve productivity and collaboration by providing a clear and intuitive way to manage workflows and deadlines.",
    functionality: [
      "Kanban board with drag-and-drop",
      "Task creation, assignment, and commenting",
      "Due dates and reminders",
      "Project progress visualization",
      "Team collaboration features",
    ],
    techStack: ["React", "Firebase", "Material UI", "Node.js", "Express"],
    // liveLink: "#",
    repoLink: "#",
  },
  {
    id: "3",
    title: "Personal Portfolio Website",
    shortDescription: "This very website, showcasing my skills and projects.",
    longDescription: "A dynamic and responsive personal portfolio built to showcase my skills, experience, and projects. It features a clean design, smooth navigation, and integrates AI for bio generation.",
    imageUrl: "https://placehold.co/600x375.png",
    imageHint: "portfolio website design",
    purpose: "To create a professional online presence that effectively communicates my capabilities and serves as a central hub for my work.",
    functionality: [
      "Responsive design for all devices",
      "Sections for About Me, Achievements, Projects, Contact",
      "Interactive project showcase",
      "AI-powered bio generator",
      "Contact form with validation",
    ],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Shadcn/UI", "Genkit AI"],
    liveLink: "/",
    // repoLink: "#",
  },
];

export default function ProjectsSection() {
  return (
    <div className="container mx-auto max-w-7xl py-8 px-4 md:py-12">
      <header className="mb-10 text-center">
        <h2 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
          My Projects
        </h2>
        <p className="mt-3 text-lg text-muted-foreground sm:text-xl">
          A collection of my work, demonstrating my skills and passion.
        </p>
      </header>

      {projectsData.length > 0 ? (
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {projectsData.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground">No projects to display yet.</p>
      )}
    </div>
  );
}
