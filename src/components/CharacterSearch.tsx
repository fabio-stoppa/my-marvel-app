import { useState } from "react";
import { Button } from "./ui/button"; // Assuming you have a button component
import { useCharacters, PAGE_SIZE } from "./hooks/useCharacters";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHead,
  TableRow,
} from "./ui/table"; // Importing Shadcn table components

const TableComponent = () => {
  const { data, error, size, setSize } = useCharacters();
  const [currentPage, setCurrentPage] = useState(1);

  // Preload next page if needed
  const handlePageChange = (newPage: number) => {
    // Check if we need to load more pages
    if (newPage > size) {
      setSize(newPage); // Load more data when moving to a new page
    }
    setCurrentPage(newPage);
  };

  if (error) return <div>Error loading characters: {error.message}</div>;
  if (!data) return <div>Loading...</div>;

  // Flatten all pages' characters
  const allCharacters = data.flatMap((page) => page.characters);
  const totalResults = data[0]?.total || 0;

  // Pagination logic
  const totalPages = Math.ceil(totalResults / PAGE_SIZE); // Total number of pages

  // Calculate the start and end index for slicing the array
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;

  // Slice the characters array for the current page
  const displayedCharacters = allCharacters.slice(startIndex, endIndex);

  return (
    <div>
      <h2>Total Characters: {totalResults}</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayedCharacters.map((character) => (
            <TableRow key={character.id}>
              <TableCell>
                <img
                  src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                />
                {character.name}
              </TableCell>
              <TableCell>{character.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="pagination">
        <Button
          onClick={() => {
            if (currentPage > 1) {
              handlePageChange(currentPage - 1);
            }
          }}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span>{` Page ${currentPage} of ${totalPages} `}</span>
        <Button
          onClick={() => {
            if (currentPage < totalPages) {
              handlePageChange(currentPage + 1);
            }
          }}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default TableComponent;
