export default function NotFound() {
  return (
    <div className="min-screen flex flex-col items-center justify-center bg-gray-100 text-slate-700">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-6">Page Not Found</p>
      <a
        href="/"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Go to Home
      </a>
    </div>
  );
}
