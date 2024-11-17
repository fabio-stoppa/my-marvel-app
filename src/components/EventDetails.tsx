import { useEventById } from "@/hooks/useEventById"; // Use the event hook
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Lightbox from "./ui/Lightbox";
import ShieldSpinner from "./ui/Spinner";
import noImage from "@/assets/no-image.svg";

const EventDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, loading } = useEventById(id); // Fetch event data using the event hook
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const openLightbox = useCallback((imageSrc: string) => {
    setSelectedImage(imageSrc);
    setIsLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setIsLightboxOpen(false);
    setSelectedImage(null);
  }, []);

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
    <>
      <div
        onClick={() => navigate("/events")}
        className="fixed inset-0 bg-gray-800 bg-opacity-50 backdrop-blur-sm transition-all flex justify-center items-center z-50 md:p-6"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-gray-900 rounded-lg overflow-hidden max-w-[1280px] w-full max-h-[1000px] h-full shadow-md relative flex md:flex-row flex-col border"
        >
          {!data?.event || loading ? (
            <div className="flex justify-center items-center w-full h-full">
              <ShieldSpinner />
            </div>
          ) : (
            <>
              <button
                onClick={() => navigate("/events")}
                className="absolute top-10 right-10 text-3xl text-white z-10"
              >
                &times;
              </button>
              <div className="md:w-[30%] w-full md:h-full h-[15%] relative">
                <img
                  src={`${data.event.thumbnail.path}.${data.event.thumbnail.extension}`}
                  alt={data.event.title}
                  className="object-cover w-full h-full opacity-5"
                />
                <img
                  src={`${data.event.thumbnail.path}.${data.event.thumbnail.extension}`}
                  alt={data.event.title}
                  className="aspect-square object-cover object-top rounded-full md:w-[80%] w-48 left-1/2 -translate-x-1/2 md:top-6 top-2 absolute bg-gray-950"
                />
              </div>

              <div className="p-6 md:pt-6 pt-24 flex flex-col gap-4 overflow-auto w-full">
                <h2 className="text-4xl font-bold mt-4">{data.event.title}</h2>
                <p className="mt-2 text-gray-600 max-w-[800px]">
                  {data.event.description || "No description available."}
                </p>
                <div className="flex flex-col gap-10">
                  <div>
                    <h3 className="font-semibold mb-2">
                      Comics ({data.event.comics.available}):
                    </h3>
                    <div className="flex flex-wrap gap-4">
                      {data.eventComics?.map((comic) => (
                        <div key={comic?.id} className="w-[100px]">
                          <img
                            src={
                              comic.thumbnail
                                ? comic.thumbnail.path +
                                  "." +
                                  comic.thumbnail.extension
                                : noImage
                            }
                            className="object-cover w-[100px] h-[154px] rounded-lg border transition-all hover:scale-105"
                            style={{
                              cursor: comic.thumbnail ? "pointer" : "default",
                            }}
                            loading="lazy"
                            alt={comic?.title}
                            onClick={() =>
                              comic.thumbnail &&
                              openLightbox(
                                comic?.thumbnail?.path +
                                  "." +
                                  comic?.thumbnail?.extension
                              )
                            }
                          />
                          <span className="line-clamp-1 text-xs">
                            {comic?.title}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">
                      Characters ({data.event.characters.available}):
                    </h3>
                    <div className="flex flex-wrap gap-4">
                      {data.eventCharacters?.map((character) => (
                        <div key={character?.id} className="w-[100px]">
                          <img
                            src={
                              character.thumbnail
                                ? character.thumbnail.path +
                                  "." +
                                  character.thumbnail.extension
                                : noImage
                            }
                            className="object-cover w-[100px] h-[154px] rounded-lg border transition-all hover:scale-105"
                            style={{
                              cursor: character.thumbnail
                                ? "pointer"
                                : "default",
                            }}
                            loading="lazy"
                            alt={character?.name}
                            onClick={() =>
                              character.thumbnail &&
                              openLightbox(
                                character?.thumbnail?.path +
                                  "." +
                                  character?.thumbnail?.extension
                              )
                            }
                          />
                          <span className="line-clamp-1 text-xs">
                            {character?.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">
                      Series ({data.event.series.available}):
                    </h3>
                    <div className="flex flex-wrap gap-4">
                      {data.eventSeries?.map((series) => (
                        <div key={series?.id} className="w-[100px]">
                          <img
                            src={
                              series.thumbnail
                                ? series.thumbnail.path +
                                  "." +
                                  series.thumbnail.extension
                                : noImage
                            }
                            className="object-cover w-[100px] h-[154px] rounded-lg border transition-all hover:scale-105"
                            style={{
                              cursor: series.thumbnail ? "pointer" : "default",
                            }}
                            loading="lazy"
                            alt={series?.title}
                            onClick={() =>
                              series.thumbnail &&
                              openLightbox(
                                series?.thumbnail?.path +
                                  "." +
                                  series?.thumbnail?.extension
                              )
                            }
                          />
                          <span className="line-clamp-1 text-xs">
                            {series?.title}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">
                      Stories ({data.event.stories.available}):
                    </h3>
                    <div className="flex flex-wrap gap-4">
                      {data.eventStories?.map((comic) => (
                        <div key={comic?.id} className="w-[100px]">
                          <img
                            src={
                              comic.thumbnail
                                ? comic.thumbnail.path +
                                  "." +
                                  comic.thumbnail.extension
                                : noImage
                            }
                            className="object-cover w-[100px] h-[154px] rounded-lg border transition-all hover:scale-105"
                            style={{
                              cursor: comic.thumbnail ? "pointer" : "default",
                            }}
                            loading="lazy"
                            alt={comic?.title}
                            onClick={() =>
                              comic.thumbnail &&
                              openLightbox(
                                comic?.thumbnail?.path +
                                  "." +
                                  comic?.thumbnail?.extension
                              )
                            }
                          />

                          <span className="line-clamp-1 text-xs">
                            {comic?.title}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <Lightbox
        isOpen={isLightboxOpen}
        imageSrc={selectedImage}
        onClose={closeLightbox}
      />
    </>
  );
};

export default EventDetail;
