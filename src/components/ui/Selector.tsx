import React, { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import type { SelectChangeEvent } from '@mui/material/Select';
import Select from '@mui/material/Select';

export type SelectProps = {
  id: string;
  labelId: string;
  label: string;
  options: Array<string>;
  defaultValue?: string;
  onSelectedValue: (newVal: string) => void;
};

export const Selector: React.FC<SelectProps> = ({
  id,
  labelId,
  label,
  defaultValue,
  options,
  onSelectedValue,
}) => {
  const [value, setSelectedValue] = useState(defaultValue ?? '');

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedValue(event.target.value);
  };

  useEffect(() => {
    onSelectedValue(value);
  }, [value]);

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id={id} sx={{ color: 'black' }}>
        {label}
      </InputLabel>
      <Select
        labelId={labelId}
        id={id}
        value={value}
        label={label}
        onChange={handleChange}
        sx={{ color: 'black' }}
      >
        {options.map(opt => (
          <MenuItem value={opt}>{opt}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
