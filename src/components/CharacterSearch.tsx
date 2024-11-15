import { useEffect, useState, useRef } from "react";
import { useDebounce } from "use-debounce";
import { useCharacters } from "./hooks/useCharacters";
import { Input } from "./ui/input";
import { PAGE_SIZE } from "./hooks/useCharacters";

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

const GridComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 2000);
  const { data, error, size, setSize, isValidating } =
    useCharacters(debouncedSearchTerm);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const loadMoreItems = () => {
      if (!isValidating) {
        setSize(size + 1);
      }
    };
    const loaderElement = loaderRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadMoreItems();
        }
      },
      {
        rootMargin: "300px",
      }
    );

    if (loaderElement) {
      observer.observe(loaderElement);
    }

    return () => {
      if (loaderElement) {
        observer.unobserve(loaderElement);
      }
    };
  }, [isValidating, setSize, size]);

  if (error) return <div>Error loading characters: {error.message}</div>;

  const allCharacters = data?.flatMap((page) => page.characters) || [];
  const totalResults = data?.[0]?.total || 0;
  const displayedCharacters = allCharacters;
  const isEmptyPage = displayedCharacters.length === 0 && isValidating;

  return (
    <div className="p-10 h-full bg-gray-950 rounded-lg">
      <div className="flex items-center justify-between h-[10%]">
        <Input
          id="search-input"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
          className="border rounded-md p-2"
        />
        <h2 className="text-2xl font-semibold mb-4">
          Total Characters: {totalResults}
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 auto-rows-fr">
        {isEmptyPage
          ? Array.from({ length: PAGE_SIZE }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          : displayedCharacters.map((character) => (
              <div
                key={character.id}
                className="border rounded-lg flex-col flex text-center shadow-md hover:shadow-lg transition-all overflow-hidden bg-gray-900 cursor-pointer hover:scale-105 h-[300px]"
              >
                <img
                  src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                  alt={character.name}
                  className="w-full h-[40%] object-cover brightness-90"
                />
                <div className="text-xs text-left text-gray-400 flex gap-4 justify-center -mt-7 z-10">
                  <div className="rounded-full flex flex-col bg-gray-700 font-medium text-gray-400 w-fit px-2 py-1 aspect-square items-center justify-center h-14">
                    <div>{character.comics.available}</div> <div>comics</div>
                  </div>
                  <div className="rounded-full flex flex-col bg-gray-700 font-medium text-gray-400 w-fit px-2 py-1 aspect-square items-center justify-center h-14">
                    <div>{character.stories.available}</div> <div>stories</div>
                  </div>
                  <div className="rounded-full flex flex-col bg-gray-700 font-medium text-gray-400 w-fit px-2 py-1 aspect-square items-center justify-center h-14">
                    <div>{character.series.available}</div> <div>series</div>
                  </div>
                </div>
                <div className="px-4 pt-2 flex flex-col gap-2 w-30">
                  <h3 className="text-md text-left font-medium line-clamp-1">
                    {character.name}
                  </h3>
                  <p className="text-sm text-left text-gray-600 line-clamp-5">
                    {character.description || "No description available"}
                  </p>
                </div>
              </div>
            ))}
        {isValidating &&
          Array.from({ length: PAGE_SIZE }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
      </div>
      <div ref={loaderRef} className="h-10 w-full bg-transparent"></div>
    </div>
  );
};

export default GridComponent;
