import { useDroppable } from "@dnd-kit/core";

type DropTaskProps = {
  status: string; 
}

export default function DropTask({ status }: DropTaskProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: status
  })
  return (
    <div 
      ref={setNodeRef}
      style={{ backgroundColor: isOver ? 'rgba(59, 130, 246, 0.1)' : 'transparent' }}
      className="text-sm font-semibold uppercase p-2 border-2 border-dashed border-slate-400 mt-2 grid place-content-center text-slate-600 rounded-lg shadow-sm"
    >
      Drop here
    </div>
  );
}
