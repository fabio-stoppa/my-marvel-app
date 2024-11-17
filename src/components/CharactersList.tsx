import MarvelBackgrond3 from "@/assets/marvel-bg3.jpg";
import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { Filter, PAGE_SIZE, useCharacters } from "../hooks/useCharacters";
import CharacterDetail from "./CharacterDetails";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/Select";
import SkeletonCard from "./ui/SkeletonCard";

const CharactersList = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<Filter>({
    text: "",
    type: "characters",
  });
  const [appliedFilter, setAppliedFilter] = useState<Filter>({
    text: "",
    type: "characters",
  });
  const { data, error, size, setSize, isValidating, isLoading } =
    useCharacters(appliedFilter);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const { id } = useParams();
  const allCharacters = useMemo(() => {
    return data?.flatMap((page) => page.characters) || [];
  }, [data]);

  const totalResults = useMemo(() => {
    return data?.[0]?.total || 0;
  }, [data]);

  const displayedCharacters = useMemo(() => allCharacters, [allCharacters]);

  const isEmptyPage = useMemo(() => {
    return displayedCharacters.length === 0 && isValidating;
  }, [displayedCharacters, isValidating]);

  useEffect(() => {
    const loadMoreItems = () => {
      if (!isValidating && displayedCharacters.length < totalResults) {
        setSize(size + 1);
      }
    };

    const loaderElement = loaderRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isValidating) {
          loadMoreItems();
        }
      },
      { rootMargin: "300px" }
    );

    if (loaderElement) {
      observer.observe(loaderElement);
    }

    return () => {
      if (loaderElement) {
        observer.unobserve(loaderElement);
      }
    };
  }, [isValidating, displayedCharacters.length, totalResults, size, setSize]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter" && filter.text.trim() !== "") {
        setAppliedFilter(filter);
      }
    },
    [filter]
  );

  if (error) return <div>Error loading characters: {error.message}</div>;

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
          onKeyDown={handleKeyDown}
          placeholder="Filter by..."
          className="w-[180px] bg-black"
          disabled={isLoading}
        />
        <Select
          onValueChange={(value: Filter["type"]) =>
            setFilter((prev) => ({ ...prev, type: value }))
          }
          value={filter.type}
          disabled={isLoading}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="characters">Character</SelectItem>
            <SelectItem value="comics">Comics</SelectItem>
            <SelectItem value="series">Series</SelectItem>
            <SelectItem value="events">Events</SelectItem>
          </SelectContent>
        </Select>
        <Button
          disabled={!filter.text || isLoading}
          onClick={() => setAppliedFilter(filter)}
          className="w-20"
        >
          {isLoading ? (
            <ClipLoader size="1em" color={"black"} loading={true} />
          ) : (
            "Filter"
          )}
        </Button>
        <span className="font-semibold whitespace-nowrap">
          Results: {totalResults}
        </span>
      </div>
      <div
        className="p-10 bg-gray-950 relative h-full"
        style={{
          background: `linear-gradient(to bottom, rgb(3 7 18 / 10%) 0, rgb(3 7 18 / 100%) 500px), url('${MarvelBackgrond3}')`,
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
            Looking for someone specific? Use the <b>filters</b> below to easily
            find your favorite character
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 auto-rows-fr">
          {isEmptyPage ? (
            Array.from({ length: PAGE_SIZE }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          ) : displayedCharacters.length === 0 ? (
            <div className="w-full text-center">No results</div>
          ) : (
            displayedCharacters.map((character) => (
              <div
                key={character?.id}
                onClick={() => navigate(`/characters/${character?.id}`)}
                className="border rounded-lg flex-col flex text-center shadow-md hover:shadow-lg transition-all overflow-hidden bg-gray-900 cursor-pointer hover:scale-105 h-[300px]"
              >
                <img
                  src={`${character?.thumbnail.path}.${character?.thumbnail?.extension}`}
                  alt={character?.name}
                  className="w-full h-[40%] object-cover brightness-90"
                  loading="lazy"
                />
                <div className="text-xs text-left text-gray-400 flex gap-4 justify-center -mt-7 z-10">
                  <div className="rounded-full flex flex-col bg-gray-700 font-medium text-gray-400 w-fit px-2 py-1 aspect-square items-center justify-center h-14">
                    <div>{character?.comics.available}</div> <div>comics</div>
                  </div>
                  <div className="rounded-full flex flex-col bg-gray-700 font-medium text-gray-400 w-fit px-2 py-1 aspect-square items-center justify-center h-14">
                    <div>{character?.stories.available}</div> <div>stories</div>
                  </div>
                  <div className="rounded-full flex flex-col bg-gray-700 font-medium text-gray-400 w-fit px-2 py-1 aspect-square items-center justify-center h-14">
                    <div>{character?.series.available}</div> <div>series</div>
                  </div>
                </div>
                <div className="px-4 pt-2 flex flex-col gap-2 w-30">
                  <h3 className="text-md text-left font-medium line-clamp-1">
                    {character?.name}
                  </h3>
                  <p className="text-sm text-left text-gray-600 line-clamp-5">
                    {character?.description || "No description available"}
                  </p>
                </div>
              </div>
            ))
          )}
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
