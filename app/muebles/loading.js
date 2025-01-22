function Loading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="h-48 col-span-3 bg-gray-200 rounded w-3/4 animate-pulse" />
      {[...Array(6)].map((_, i) => (
        <div key={i} className="border rounded-lg p-4 animate-pulse">
          <div className="w-full h-48 bg-gray-200 rounded-md mb-4" />
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
            <div className="h-4 bg-gray-200 rounded w-1/4" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default Loading