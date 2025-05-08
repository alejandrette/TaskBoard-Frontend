import { getProjects } from "@/services/ProjectApi";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { ProjectSchema } from "../types";
import ProjectDetails from "@/components/project/ProjectDetails";

export default function DashboardView() {
  const { isPending, error, data } = useQuery<{ data: ProjectSchema[] }>({
    queryKey: ['projects'],
    queryFn: getProjects
  });

  useEffect(() => {
    if (error instanceof Error) {
      toast.error(error.message);
    }
  }, [error]);

  const projects = data?.data ?? [];

  return (
    <>
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-slate-800">My Projects</h1>
        <p className="text-gray-500">Manage and administer your projects</p>
      </div>

      <div className="my-4">
        <Link to="/project/create">
          <button className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-semibold transition">
            + New Project
          </button>
        </Link>
      </div>

      <div>
        {isPending && (
          <div className="flex justify-center items-center mt-6">
            <ClipLoader color="#6b21a8" size={50} />
          </div>
        )}

        {!isPending && projects.length === 0 && (
          <p className="text-gray-600">
            There are no projects yet. You can{" "}
            <Link to="/project/create" className="text-purple-600 font-bold underline">
              create one
            </Link>.
          </p>
        )}

        {!isPending && projects.length > 0 && (
          <div className="mt-6 space-y-4">
            {projects.map((project) => (
              <ProjectDetails key={project._id} project={project} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
