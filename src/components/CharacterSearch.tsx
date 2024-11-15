import React, { useState } from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  PaginationState,
} from "@tanstack/react-table";
import { fetchCharacters } from "@/services/marvelApi";
import { Input } from "./ui/input";
import {
  Table,
  TableBody,
  TableHeader,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";

const CharacterSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  // Fetch characters using TanStack Infinite Query
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["characters", searchTerm],
    queryFn: ({ pageParam = 1 }) =>
      fetchCharacters(pageParam - 1, 10, searchTerm),
    getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
    initialPageParam: 0,
  });

  // Set up TanStack Table
  const table = useReactTable({
    data: data,
    columns: [
      {
        accessorKey: "name", // Accessor for character name
        header: "Name",
      },
      {
        accessorKey: "description", // Accessor for character description
        header: "Description",
      },
    ],
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),

    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    //no need to pass pageCount or rowCount with client-side pagination as it is calculated automatically
    state: {
      pagination,
    },
    // autoResetPageIndex: false, // turn off page index reset when sorting or filtering
  });

  // Handle search functionality
  // const handleSearch = () => {
  //   setPageIndex(0); // Reset to first page on new search
  //   table.setPageSize(localPageSize); // Set the local page size
  //   table.setPageIndex(0); // Reset page index when searching
  // };

  // useEffect(() => {
  //   handleSearch(); // Trigger search on searchTerm change
  // }, [searchTerm]);

  return (
    <div>
      <Input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for a character"
      />
      {/* <button onClick={handleSearch}>Search</button> */}

      {isLoading && <p>Loading...</p>}
      {isError && <p>Failed to fetch characters</p>}

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              <td>{row.getValue("name")}</td>
              <td>{row.getValue("description")}</td>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination Controls */}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <button
              className="border rounded p-1"
              onClick={() => table.lastPage()}
              disabled={!table.getCanNextPage()}
            />
          </PaginationItem>

          {/* Display current page number */}
          <PaginationItem>{pagination.pageIndex + 1}</PaginationItem>

          <PaginationItem>
            <button
              className="border rounded p-1"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      {/* Fetch Next Set of Characters
      {hasNextPage && (
        <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
          {isFetchingNextPage ? "Loading more..." : "Load More"}
        </button>
      )} */}
    </div>
  );
};

export default CharacterSearch;
