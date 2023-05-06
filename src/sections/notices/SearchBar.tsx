interface SearchBarProps {
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ handleInputChange }) => {
  return (
    <div
      id="search-bar-card"
      className="w-1/2 h-20 bg-white relative rounded-lg shadow"
    >
      <div
        id="search-input"
        className="absolute top-1/2 -translate-y-1/2 pl-3 w-4/5 ml-3 h-12 border rounded-lg bg-white flex flex-row gap-2 justify-start items-center focus-within:border-purple-800"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
        <input
          type="text"
          name="search"
          id="search"
          placeholder="搜索公告名"
          className="inline-block w-full h-9 outline-none"
          onChange={(e) => handleInputChange(e)}
        />
      </div>
    </div>
  );
};

export default SearchBar;
