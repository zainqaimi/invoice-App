import React, { useState } from "react";

interface SearchableDropdownProps {
  label?: string;
  placeholder?: string;
  options: string[];
  onSelect: (value: string) => void;
  className?: string;
}

const SearchableDropdown: React.FC<SearchableDropdownProps> = ({
  label = "Search",
  placeholder = "Search...",
  options,
  onSelect,
  className,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.trim() === "") {
      setFilteredOptions([]);
      setShowDropdown(false);
      return;
    }
    const filtered = options.filter((option) =>
      option.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredOptions(filtered);
    setShowDropdown(true);
  };

  const handleSelect = (value: string) => {
    setSearchTerm(value);
    setShowDropdown(false);
    onSelect(value); // Pass selected value back to parent
  };

  return (
    <div className="relative w-full ">
      {label && <label className="block text-sm font-medium">{label}</label>}
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder={placeholder}
        className={className}
      />
      {showDropdown && (
        <ul className="absolute w-full bg-white border border-gray-300 rounded-md  max-h-48 overflow-y-auto shadow-md z-50">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <li
                key={index}
                onClick={() => handleSelect(option)}
                className="p-2 cursor-pointer hover:bg-blue-100"
              >
                {option}
              </li>
            ))
          ) : (
            <li className="p-2 text-gray-500 text-center">No Items Found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchableDropdown;
