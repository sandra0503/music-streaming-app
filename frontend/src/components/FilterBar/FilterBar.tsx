import React, { useContext, useState } from 'react';
import { Box, TextInput, Button, CheckBox, ResponsiveContext } from 'grommet';
import { Search, Bookmark, Filter } from 'grommet-icons';

type FilterBarProps = {
  onSearch?: (query: string) => void;
  onToggleStaffPicks?: (staffPicksEnabled: boolean) => void;
  initialQuery?: string;
  initialStaffPicks?: boolean;
};

const FilterBar: React.FC<FilterBarProps> = ({
  onSearch,
  onToggleStaffPicks,
  initialQuery = '',
  initialStaffPicks = false,
}: FilterBarProps) => {
  const [query, setQuery] = useState(initialQuery);
  const [staffPicksEnabled, setStaffPicksEnabled] = useState(initialStaffPicks);
  const size = useContext(ResponsiveContext);

  const handleSearch = () => {
    onSearch?.(query.trim());
  };

  const handleKeyDown: React.KeyboardEventHandler = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  const toggleStaffPicks = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setStaffPicksEnabled(isChecked);
    onToggleStaffPicks?.(e.target.checked);
  };

  return (
    <Box
      justify="end"
      direction={size !== 'small' ? 'row' : 'column'}
      style={{ minHeight: 'auto', gap: '0.5rem' }}
      pad="medium"
      gap="1 rem"
    >
      <Box direction="row" style={{ gap: '0.5rem', alignItems: 'center' }}>
        <TextInput
          icon={<Search size="20" />}
          size="xsmall"
          value={query}
          onChange={(e) => setQuery((e.target as HTMLInputElement).value)}
          onKeyDown={handleKeyDown}
          placeholder={'Search by genre'}
          style={{ fontSize: '1rem', minWidth: '3rem' }}
        />
        <Button label="Search" size="small" onClick={handleSearch} />
      </Box>

      <CheckBox
        checked={staffPicksEnabled}
        label="Nina's staff picks"
        onChange={(e) => toggleStaffPicks(e)}
        size={10}
        style={{
          alignSelf: 'end',
        }}
      />
    </Box>
  );
};
export default FilterBar;
