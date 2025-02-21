import { useState } from "react";

const SearchBox = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar películas..."
          className="flex-1 px-4 py-2 border-2 border-sky-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"/>
        <button
          type="submit"
          className="px-6 py-2 bg-sky-700 text-white rounded-lg hover:bg-sky-600">
          Buscar
        </button>
      </div>
    </form>
  );
};

export default SearchBox;
