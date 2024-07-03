import PropTypes from "prop-types";
import { useState, useMemo } from "react";
import { pokemons } from "../utils/utils";
import { ChevronUpDownIcon } from "@heroicons/react/24/solid";

function DataTable() {
  const [query, setQuery] = useState("");
  const [sortColumn, setSortColumn] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");

  const filteredData = useMemo(() => {
    if (query.length === 0) return pokemons;
    return pokemons.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()));
  }, [query]);

  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      if (sortColumn === "name") {
        if (a.name.toLowerCase() < b.name.toLowerCase()) return sortOrder === "asc" ? -1 : 1;
        if (a.name.toLowerCase() > b.name.toLowerCase()) return sortOrder === "asc" ? 1 : -1;
        return 0;
      } else {
        return sortOrder === "asc" ? a[sortColumn] - b[sortColumn] : b[sortColumn] - a[sortColumn];
      }
    });
  }, [sortColumn, sortOrder, filteredData]);

  const handleQueryChange = (e) => setQuery(e.target.value);

  const handleSortColumn = (type) => {
    if (sortColumn === type) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortColumn(type);
      setSortOrder("asc");
    }
  };

  return (
    <div className="w-full max-w-[700px] flex flex-col gap-8">
      <input type="text" placeholder="Search Pokemon.." className="input" value={query} onChange={handleQueryChange} />
      <table>
        <thead>
          <tr>
            <TableHeader title="Id" onClick={() => handleSortColumn("id")} />
            <TableHeader title="Name" onClick={() => handleSortColumn("name")} />
            <TableHeader title="Weight" onClick={() => handleSortColumn("weight")} />
          </tr>
        </thead>
        <tbody>
          {sortedData.map((pokemon) => (
            <TableRow key={pokemon.id} pokemon={pokemon} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TableHeader({ title, onClick }) {
  return (
    <th className="th">
      <button className="th-btn" onClick={onClick}>
        {title} <ChevronUpDownIcon className="size-4 sm:size-5" />
      </button>
    </th>
  );
}

function TableRow({ pokemon }) {
  return (
    <tr>
      <TableCell>{pokemon.id}</TableCell>
      <TableCell>{pokemon.name}</TableCell>
      <TableCell>{pokemon.weight}</TableCell>
    </tr>
  );
}

function TableCell({ children }) {
  return (
    <td className="p-2 text-sm sm:text-base border border-primary-700 text-secondary-100 selection:bg-b-rose selection:text-primary-900">
      {children}
    </td>
  );
}

TableHeader.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

TableRow.propTypes = {
  pokemon: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    weight: PropTypes.number.isRequired,
  }).isRequired,
};

TableCell.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DataTable;
