
import { ProjectCard, type Project } from "@/components/projects/project-card";

const projectsData: Project[] = [
  {
    id: "2",
    title: "TaskFlow",
    shortDescription: "My to-do list app is designed to help users stay organized, focused, and productive. With a clean interface and easy-to-use features, it makes task management simple and effective.",
    longDescription: "TaskFlow is a user-friendly to-do list application aimed at boosting personal productivity. It allows users to create, manage, and track their tasks, set priorities, and mark them as complete. The clean and intuitive interface ensures a seamless user experience.",
    imageUrl: "https://www.canva.com/design/DAGoyviuChg/xgUzqIQwc5GNsJ833qzixA/view?utm_content=DAGoyviuChg&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=hcceee7fead", 
    imageHint: "checklist icon",
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
