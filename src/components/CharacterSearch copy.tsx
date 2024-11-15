import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { useCharacters } from "./hooks/useCharacters";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

const ShadCNTableComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 2000);
  const { data, error, size, setSize, isValidating } =
    useCharacters(debouncedSearchTerm);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // Default items per page

  const handlePageChange = (newPage: number) => {
    if (newPage > size) {
      setSize(newPage);
    }
    setCurrentPage(newPage);
  };

  if (error) return <div>Error loading characters: {error.message}</div>;

  const allCharacters = data?.flatMap((page) => page.characters) || [];
  const totalResults = data?.[0]?.total || 0;

  const totalPages = Math.ceil(totalResults / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const displayedCharacters = allCharacters.slice(startIndex, endIndex);

  const isEmptyPage = displayedCharacters.length === 0 && isValidating;

  console.log(isEmptyPage, size, isValidating);

  return (
    <div className="p-10 h-full bg-gray-950 rounded-lg">
      <div className="flex items-center justify-between h-[10%] mb-4">
        <Input
          id="search-input"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
          className="border rounded-md p-2"
        />

        <h2 className="text-2xl font-semibold">
          Total Characters: {totalResults}
        </h2>

        <div className="flex gap-4">
          <Button
            onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100"
          >
            Previous
          </Button>
          <span className="text-sm font-medium">{`Page ${currentPage} of ${totalPages}`}</span>
          <Button
            onClick={() =>
              currentPage < totalPages && handlePageChange(currentPage + 1)
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100"
          >
            Next
          </Button>
        </div>
      </div>

      <div className="h-[90%] overflow-y-auto">
        {isEmptyPage ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Comics</TableHead>
                <TableHead>Stories</TableHead>
                <TableHead>Series</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayedCharacters.map((character) => (
                <TableRow key={character.id}>
                  <TableCell>
                    <div className="flex items-center gap-8">
                      <img
                        src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                        alt={character.name}
                        className="w-12 h-12 object-cover rounded-full"
                      />
                      <span>{character.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {character.description || "No description available"}
                  </TableCell>
                  <TableCell className="text-center">
                    {character.comics.available}
                  </TableCell>
                  <TableCell className="text-center">
                    {character.stories.available}
                  </TableCell>
                  <TableCell className="text-center">
                    {character.series.available}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default ShadCNTableComponent;
