import { backendFetch } from "@/utils/backendFetch";
import ProjectItem from "./ProjectItem";

type Projects = {
  id: string;
  name: string;
  description: string;
  status: "active" | "archived" | "cancelled" | "completed";
  due_date: string | null | undefined;
  craeted_at: string;
};

type ProjectsResponse = {
  data: Projects[];
};

async function ProjectList({
  userId,
  accessToken,
}: {
  userId: string;
  accessToken: string;
}) {
  const res = await backendFetch(
    "http://localhost:3000/api/projects",
    accessToken,
  );

  const projects: ProjectsResponse = await res.json();

  if (!projects.data) {
    return (
      <div className="mt-10 flex flex-col gap-10 border border-gray-300 rounded-sm p-5">
        <p>No projects found, create your very first project!</p>
      </div>
    );
  }
  return (
    <div className="mt-10 flex flex-col gap-10">
      {projects.data.map((project) => {
        return (
          <ProjectItem
            key={project.id}
            id={project.id}
            userId={userId}
            name={project.name}
            description={project.description}
            dueDate={project.due_date ?? ""}
            status={project.status}
            createdAt={project.craeted_at}
            accessToken={accessToken}
          />
        );
      })}
    </div>
  );
}
export default ProjectList;
