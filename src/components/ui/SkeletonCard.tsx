const SkeletonCard = () => {
  return (
    <div className="border rounded-lg flex-col flex text-center shadow-md hover:shadow-lg transition-shadow overflow-hidden animate-pulse bg-gray-900 h-[300px]">
      <div className="w-full h-[40%] bg-gray-800 rounded-t-md"></div>
      <div className="text-xs text-left text-gray-400 flex gap-4 justify-center -mt-7 z-10">
        <div className="rounded-full bg-gray-600 w-14 h-14" />
        <div className="rounded-full bg-gray-600 w-14 h-14" />
        <div className="rounded-full bg-gray-600 w-14 h-14" />
      </div>
      <div className="p-4 flex flex-col gap-2 w-30">
        <div className="w-24 h-4 bg-gray-600 rounded mb-2"></div>
        <div className="w-32 h-3 bg-gray-600 rounded"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
