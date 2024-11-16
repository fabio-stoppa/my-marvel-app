import { useCharacterById } from "@/hooks/useCharactersById";
import { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ShieldSpinner from "./ui/spinner";

const CharacterDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { character, loading } = useCharacterById(id);

  const comicLink = useMemo(
    () => character?.urls.find((url) => url.type === "comiclink")?.url,
    [character]
  );

  useEffect(() => {
    if (id) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [id]);

  return (
    <div
      onClick={() => navigate("/characters")}
      className="fixed inset-0 bg-gray-800 bg-opacity-50 backdrop-blur-sm transition-all flex justify-center items-center z-50 md:p-6"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-gray-900 rounded-lg overflow-hidden max-w-[1280px] w-full max-h-[1000px] h-full shadow-md relative flex md:flex-row flex-col border"
      >
        {!character || loading ? (
          <div className="flex justify-center items-center w-full h-full">
            <ShieldSpinner />
          </div>
        ) : (
          <>
            <button
              onClick={() => navigate("/characters")}
              className="absolute top-6 right-6 text-xl text-white z-10"
            >
              ✕
            </button>
            <div className="md:w-[30%] w-full md:h-full h-[15%] relative">
              <img
                src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                alt={character.name}
                className="object-cover w-full h-full opacity-5"
              />
              <img
                src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                alt={character.name}
                className="aspect-square object-cover object-top rounded-full md:w-[80%] w-48 left-1/2 -translate-x-1/2 md:top-6 top-2 absolute bg-gray-950"
              />
            </div>

            <div className="p-6 md:pt-6 pt-24 flex flex-col gap-4 overflow-auto w-full">
              <h2 className="text-4xl font-bold mt-4">{character.name}</h2>
              <p className="mt-2 text-gray-600 max-w-[800px]">
                {character.description || "No description available."}
              </p>
              <div className="flex md:flex-row flex-col gap-4 justify-between mt-auto">
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">
                    Comics ({character.comics.available}):
                  </h3>
                  <ul className="text-gray-600">
                    {character.comics.items.map((comic, index) => (
                      <li key={index} className="text-xs mb-2">
                        {comic.name}
                      </li>
                    ))}
                    {character.comics.items.length > 0 && comicLink && (
                      <li className="text-sm underline text-gray-400 ">
                        <a href={comicLink} rel="noreferrer" target="_blank">
                          View more
                        </a>
                      </li>
                    )}
                  </ul>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">
                    Series ({character.series.available}):
                  </h3>
                  <ul className="text-gray-600">
                    {character.series.items.map((series, index) => (
                      <li key={index} className="text-xs mb-2">
                        {series.name}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex-1 flex flex-col">
                  <h3 className="font-semibold mb-2">
                    Stories ({character.stories.available}):
                  </h3>
                  <ul className="text-gray-600">
                    {character.stories.items.map((story, index) => (
                      <li key={index} className="text-xs mb-2">
                        {story.name}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">
                    Events ({character.events.available}):
                  </h3>
                  <ul className="text-gray-600">
                    {character.events.items.map((story, index) => (
                      <li key={index} className="text-xs mb-2">
                        {story.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CharacterDetail;
