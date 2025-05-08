import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProjectById } from "@/services/ProjectApi";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { ProjectSchema } from "@/types/index";
import { RiTeamFill } from "react-icons/ri";
import AddTaskModal from "@/components/task/ModalCreateTask";
import TaskList from "@/components/task/TaskList";
import EditTaskModal from "@/components/task/EditTaskModal";
import ModalTask from "@/components/task/ModalTask";

export default function ViewProjectDetail() {
  const { projectId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isModalTask, setIsModalTask] = useState(false);

  const { isPending, error, data } = useQuery<{ data: ProjectSchema }>({
    queryKey: ["viewTask", projectId],
    queryFn: () => getProjectById(projectId!),
    retry: false,
  });

  const project = data?.data;

  useEffect(() => {
    if (error instanceof Error) {
      toast.error(error.message);
    }
  }, [error]);

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-40">
        <ClipLoader color="#6b21a8" size={40} />
      </div>
    );
  }

  return (
    <>
      <div className="max-w-3xl mx-auto mt-10 space-y-6 bg-white p-6 rounded shadow-md border border-gray-200">
        <div className="flex justify-start">
          <Link 
            to="/"
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-slate-800 font-medium transition"
          >
            ← Back to Projects
          </Link>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">{project?.projectName}</h1>
            <p className="text-gray-500 mt-1">Client: {project?.clientName}</p>
          </div>

          <div className="flex flex-col items-end gap-2">
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-semibold transition"
            >
              + Add Task
            </button>
          
            <Link 
              to={`team`}
              className="w-full text-center px-4 py-2 bg-fuchsia-600 hover:bg-fuchsia-500 text-white rounded-lg font-semibold transition flex items-center justify-center gap-2"
            >
              <RiTeamFill /> Team
            </Link>
          </div>
        </div>

        <div className="text-gray-700">
          <h2 className="text-xl font-semibold mb-2">Project Description</h2>
          <p>{project?.description}</p>
        </div>
      </div>

      <TaskList tasks={project?.tasks ?? []} setIsModalEditOpen={setIsModalEditOpen} setIsModalTask={setIsModalTask} />

      {isModalOpen && <AddTaskModal closeModal={() => setIsModalOpen(false)} />}
      {isModalEditOpen && <EditTaskModal closeModal={() => setIsModalEditOpen(false)} />}
      {isModalTask && <ModalTask closeModal={() => setIsModalTask(false)} />}
    </>
  );
}
