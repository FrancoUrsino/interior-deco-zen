export default function SidebarLoading() {
  return (
    <aside className="sticky top-0 left-4 md:left-0 pt-20 h-screen bg-primary-color transition-all duration-300 ease-in-out z-40 md:w-64 w-96 border-r border-zinc-800">
      <div className="p-6 pt-16 md:pt-6">
        <div className="flex items-center justify-between mb-6">
          <div className="h-6 w-32 bg-zinc-700 rounded-md animate-pulse"></div>
        </div>

        <div className="space-y-4">
          {Array(6).fill(null)
            .map((_, index) => (
              <div key={index} className="h-6 w-48 bg-zinc-700 rounded-md animate-pulse"></div>
            ))}
        </div>
      </div>
    </aside>
  );
}
