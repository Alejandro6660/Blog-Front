import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { useState } from "react";

interface TagProps {
  setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
  selectedTags: string[];
}

export const HandleTagComponent = ({
  setSelectedTags,
  selectedTags,
}: TagProps) => {
  const [inputValue, setInputValue] = useState("");

  const [suggestions] = useState(["web", "js", "tailwind", "sql"]);
  const [isFocused, setIsFocused] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const handleAddTag = (tag: string) => {
    if (!selectedTags.includes(tag) && selectedTags.length < 4 && tag.trim()) {
      setSelectedTags([...selectedTags, tag]);
    }
    setInputValue("");
  };

  const handleRemoveTag = (tag: string) => {
    setSelectedTags(selectedTags.filter((t) => t !== tag));
  };

  const filteredSuggestions = suggestions.filter((tag) => {
    return (
      !selectedTags.includes(tag) &&
      tag.toLowerCase().includes(inputValue.toLowerCase())
    );
  });

  const showCreateOption =
    inputValue &&
    !suggestions.includes(inputValue) &&
    !filteredSuggestions.includes(inputValue);

  return (
    <div className="flex items-center">
      <div className="flex flex-wrap space-x-2">
        {selectedTags.map((tag) => (
          <Badge
            key={tag}
            variant={"secondary"}
            className="py-1 border-none max-h-9 flex items-center"
          >
            <span className="font-medium text-base">#</span>
            <span className="font-medium text-base">{tag}</span>
            <Button
              onClick={() => handleRemoveTag(tag)}
              variant={"link"}
              className="px-2 py-0"
              size={"min"}
            >
              <X />
            </Button>
          </Badge>
        ))}
      </div>
      <div className="relative">
        <Input
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && inputValue.trim() !== "") {
              e.preventDefault();
              handleAddTag(inputValue.trim());
            }
          }}
          placeholder="Add up to 4 tags..."
          type="text"
          className="py-1 focus-visible:ring-0 focus:border-sky-800 text-sm h-auto font-light shadow-none border-none w-full"
        />
        {isFocused && (filteredSuggestions.length > 0 || inputValue) && (
          <div className="absolute top-full mt-1 w-full bg-white border rounded shadow-lg z-10">
            {filteredSuggestions.map((tag) => (
              <div
                key={tag}
                onClick={() => handleAddTag(tag)}
                className="px-3 py-2 hover:bg-gray-200 cursor-pointer text-sm"
              >
                #{tag}
              </div>
            ))}
            {showCreateOption && (
              <div
                onClick={() => handleAddTag(inputValue)}
                className="px-3 py-2 hover:bg-blue-100 cursor-pointer text-sm text-blue-700"
              >
                #{inputValue}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
