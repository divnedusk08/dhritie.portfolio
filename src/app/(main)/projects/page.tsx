
"use client";
import { ProjectCard, type Project } from "@/components/projects/project-card";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { cn } from "@/lib/utils";

const projectsData: Project[] = [
  {
    id: "2",
    title: "TaskFlow",
    shortDescription: "My to-do list app is designed to help users stay organized, focused, and productive. With a clean interface and easy-to-use features, it makes task management simple and effective.",
    longDescription: "TaskFlow is a user-friendly to-do list application aimed at boosting personal productivity. It allows users to create, manage, and track their tasks, set priorities, and mark them as complete. The clean and intuitive interface ensures a seamless user experience.",
    purpose: "To offer a simple yet powerful tool for individuals to manage their daily tasks, improve organization, and enhance productivity.",
    functionality: [
      "Create new tasks with titles and descriptions",
      "Mark tasks as complete/incomplete",
      "Set task priorities (e.g., high, medium, low)",
      "Filter tasks by status or priority",
      "User-friendly interface for easy task management",
    ],
    techStack: ["React", "TypeScript", "Shadcn/UI", "Tailwind CSS", "Local Storage"],
    liveLink: "https://9000-firebase-studio-1748367990635.cluster-pgviq6mvsncnqxx6kr7pbz65v6.cloudworkstations.dev",
  },
];

export default function ProjectsSection() {
  const [containerRef, isVisible] = useIntersectionObserver({ threshold: 0.1, triggerOnce: true });

  return (
    <div className="container mx-auto max-w-7xl py-8 px-4 md:py-12">
      <header className="mb-10 text-center">
        <h2 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl interactive-text-hover">
          My Projects
        </h2>
        <p className="mt-3 text-lg text-muted-foreground sm:text-xl">
          A collection of my work, demonstrating my skills and passion.
        </p>
      </header>

      {projectsData.length > 0 ? (
        <div
          ref={containerRef}
          className={cn(
            "grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
            "fade-in-up",
            { "is-visible": isVisible }
          )}
        >
          {projectsData.map((project, index) => (
            <div key={project.id} style={{ animationDelay: `${index * 100}ms` }}> {/* Stagger animation */}
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground">No projects to display yet.</p>
      )}
    </div>
  );
}
