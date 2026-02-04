export const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[50vh] w-full gap-4">
      <div className="relative">
        <div className="h-16 w-16 rounded-full border-4 border-gray-200"></div>
        <div className="absolute top-0 left-0 h-16 w-16 rounded-full border-4 border-t-sky-500 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
      </div>
      <p className="text-gray-300 text-2xl font-medium animate-pulse">
        Loading characters...
      </p>
    </div>
  );
};
