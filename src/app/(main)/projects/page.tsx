
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
    title: "TaskFlow",
    shortDescription: "My to-do list app is designed to help users stay organized, focused, and productive. With a clean interface and easy-to-use features, it makes task management simple and effective.",
    longDescription: "TaskFlow is a user-friendly to-do list application aimed at boosting personal productivity. It allows users to create, manage, and track their tasks, set priorities, and mark them as complete. The clean and intuitive interface ensures a seamless user experience.",
    imageUrl: "https://placehold.co/600x375.png",
    imageHint: "to-do list app", // This hint is appropriate for the image provided
    purpose: "To offer a simple yet powerful tool for individuals to manage their daily tasks, improve organization, and enhance productivity.",
    functionality: [
      "Create new tasks with titles and descriptions",
      "Mark tasks as complete/incomplete",
      "Set task priorities (e.g., high, medium, low)",
      "Filter tasks by status or priority",
      "User-friendly interface for easy task management",
    ],
    techStack: ["React", "TypeScript", "Shadcn/UI", "Tailwind CSS", "Local Storage"],
    // liveLink: "#", // Replace with actual link
    // repoLink: "#", // Replace with actual link
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
