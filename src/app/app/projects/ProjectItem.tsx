"use client";

import { backendFetch } from "@/utils/backendFetch";

type ProjectItemProps = {
  id: string;
  userId: string;
  name: string;
  dueDate?: string;
  status: "active" | "archived" | "cancelled" | "completed";
  description?: string | null | undefined;
  createdAt: string;
  accessToken: string;
};

function ProjectItem({
  id,
  userId,
  name,
  dueDate,
  status,
  description,
  createdAt,
  accessToken,
}: ProjectItemProps) {
  async function deleteProject(projectId: string, userId: string) {
    await backendFetch(
      `http://localhost:3000/api/projects/${projectId}`,
      accessToken,
      {
        method: "DELETE",
      },
    );
  }

  return (
    <div className="p-5 rounded-sm border border-gray-300 flex flex-col items-start gap-2">
      <div className="flex justify-between items-center w-full">
        <div className="w-full">
          <h2 className="text-2xl">{name}</h2>
          <small>Due date: {dueDate}</small>
        </div>
        <p className="bg-green-200 rounded-full px-5 py-1 flex items-center gap-2">
          <svg
            className="mt-0.5"
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="5" cy="5" r="5" fill="#00B71B" />
          </svg>
          {status}
        </p>
      </div>
      <p className="line-clamp-1">{description}</p>
      <div className="flex justify-between w-full items-center">
        <div className="flex gap-5">
          <button className="bg-blue-500 mt-5 py-2 px-13 rounded-sm text-white cursor-pointer hover:bg-white hover:text-black transition-all shadow-sm">
            Details
          </button>
          <button
            onClick={() => deleteProject(id, userId)}
            className="bg-red-500 mt-5 py-2 px-13 rounded-sm text-white cursor-pointer hover:bg-white hover:text-black transition-all shadow-sm"
          >
            Delete
          </button>
        </div>
        <small className="mt-5">Created at: {createdAt}</small>
      </div>
    </div>
  );
}
export default ProjectItem;
