import React, { useState } from 'react';
import { Box, TextInput, Button } from 'grommet';
import { Search, Bookmark } from 'grommet-icons';

type FilterBarProps = {
  onSearch?: (query: string) => void;
  onToggleBookmarks?: (onlyBookmarks: boolean) => void;
  initialQuery?: string;
};

const FilterBar: React.FC<FilterBarProps> = ({
  onSearch,
  onToggleBookmarks,
  initialQuery = '',
}: FilterBarProps) => {
  const [query, setQuery] = useState(initialQuery);
  const [onlyBookmarks, setOnlyBookmarks] = useState(false);

  const handleSearch = () => {
    onSearch?.(query.trim());
  };

  const handleKeyDown: React.KeyboardEventHandler = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  const toggleBookmarks = () => {
    const next = !onlyBookmarks;
    setOnlyBookmarks(next);
    onToggleBookmarks?.(next);
  };

  return (
    <Box
      justify="end"
      pad="medium"
      style={{ flexDirection: 'row', gap: '8px', alignItems: 'center' }}
    >
      <Button
        size="small"
        secondary={true}
        hoverIndicator="light-1"
        icon={
          onlyBookmarks ? (
            <Bookmark color="brand" />
          ) : (
            <Bookmark color="dark-3" />
          )
        }
        aria-label="Only bookmarks"
        aria-pressed={onlyBookmarks}
        onClick={toggleBookmarks}
      />
      <Box width="auto">
        <TextInput
          icon={<Search size="20" />}
          size="small"
          value={query}
          onChange={(e) => setQuery((e.target as HTMLInputElement).value)}
          onKeyDown={handleKeyDown}
          placeholder={'Search by genre'}
        />
      </Box>

      <Button label="Search" size="small" onClick={handleSearch} />
    </Box>
  );
};
export default FilterBar;
