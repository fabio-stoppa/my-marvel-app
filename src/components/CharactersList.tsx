import MarvelBackgrond from "@/assets/marvel-background-web.webp";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDebounce } from "use-debounce";
import { Filter, PAGE_SIZE, useCharacters } from "../hooks/useCharacters";
import CharacterDetail from "./CharacterDetails";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

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

const CharactersList = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<Filter>({
    text: "",
    type: "character",
  });
  const [debouncedFilter] = useDebounce(filter, 1000);
  const { data, error, size, setSize, isValidating } =
    useCharacters(debouncedFilter);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const { id } = useParams();

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
    <>
      <div className="flex items-center gap-6  py-4 px-4 fixed left-1/2 bottom-10 z-50 bg-black bg-opacity-50 shadow-md backdrop-blur-lg rounded-md translate-x-[-50%]">
        <Input
          id="filter"
          type="text"
          value={filter.text}
          onChange={(e) =>
            setFilter((prev) => ({ ...prev, text: e.target.value }))
          }
          placeholder="Filter by..."
          className="w-[180px] bg-black"
        />
        <Select
          onValueChange={(value: Filter["type"]) =>
            setFilter((prev) => ({ ...prev, type: value }))
          }
          value={filter.type}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="character">Character</SelectItem>
            <SelectItem value="comics">Comics</SelectItem>
            <SelectItem value="stories">Stories</SelectItem>
            <SelectItem value="series">Series</SelectItem>
            <SelectItem value="series">Events</SelectItem>
          </SelectContent>
        </Select>
        <span className="font-semibold whitespace-nowrap">
          Results: {totalResults}
        </span>
      </div>
      <div
        className="p-10 bg-gray-950 relative"
        style={{
          background: `linear-gradient(to bottom, rgb(3 7 18 / 10%) 0, rgb(3 7 18 / 100%) 500px), url('${MarvelBackgrond}')`,
          backgroundPosition: "top",
        }}
      >
        <div className="flex flex-col justify-center py-20 px-4 text-center items-center">
          <h1 className="text-3xl font-bold mb-4">
            Welcome to the Marvel Character Hub!
          </h1>
          <p className="text-gray-300 max-w-[800px]">
            Explore the epic world of Marvel, from Iron Man and Spider-Man to
            Thor and Deadpool! Heroes, villains, and cosmic forces await you.
            Looking for someone specific? Use the <b>search bar</b> or{" "}
            <b>filters</b> above to easily find your favorite character
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 auto-rows-fr">
          {isEmptyPage
            ? Array.from({ length: PAGE_SIZE }).map((_, index) => (
                <SkeletonCard key={index} />
              ))
            : displayedCharacters.map((character) => (
                <div
                  key={character.id}
                  onClick={() => navigate(`/characters/${character.id}`)}
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
                      <div>{character.stories.available}</div>{" "}
                      <div>stories</div>
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

      {id && <CharacterDetail />}
    </>
  );
};

export default CharactersList;
