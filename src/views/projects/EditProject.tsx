import EditProjectForm from "@/components/project/EditProjectForm";
import { getProjectById } from "@/services/ProjectApi";
import { ProjectSchema } from "@/types/index";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useParams } from "react-router-dom"
import { CircleLoader } from "react-spinners";
import { toast } from "react-toastify";

export default function EditProject() {
  const { projectId } = useParams()
  
  const { isPending, error, data } = useQuery<{ data: ProjectSchema }>({
    queryKey: ['editProject', projectId],
    queryFn: () => getProjectById(projectId!),
    retry: false
  });

  const project = data?.data

  useEffect(() => {
    if (error instanceof Error) {
      toast.error(error.message);
    }
  }, [error]);

  return (
    <>
      {isPending ? (
        <CircleLoader />
      ) : (
        project && <EditProjectForm project={project} projectId={projectId}/>
      )}
    </>
  )
}
