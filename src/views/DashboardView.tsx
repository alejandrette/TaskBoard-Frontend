import { Link } from "react-router-dom";

export default function DashboardView() {
  return (
    <>
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-slate-800">My Projects</h1>
        <p className="text-gray-500">Manage and administer your projects</p>
      </div>

      <div>
        <Link to="/createproject">
          <button className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-semibold transition">
            + New Project
          </button>
        </Link>
      </div>
    </>
  )
}
