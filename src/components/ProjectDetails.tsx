import { projectSchema } from "../types";

type ProjectDetailsProps = {
  project: projectSchema;
};

export default function ProjectDetails({ project }: ProjectDetailsProps) {
  return (
    <div className="relative bg-white p-6 rounded-lg shadow-md border border-gray-200 space-y-2">
      {/* Icono de tres puntos alineado a la derecha */}
      <div className="absolute top-4 right-4 text-gray-500 cursor-pointer hover:text-gray-700">
        icono
      </div>

      {/* Contenido del proyecto */}
      <h2 className="text-xl font-bold text-slate-800">{project.projectName}</h2>
      <p className="text-sm text-gray-500">Client: {project.clientName}</p>
      <p className="text-gray-700">{project.description}</p>
    </div>
  );
}
