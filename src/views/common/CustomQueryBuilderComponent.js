import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddIcon from '@mui/icons-material/Add';
import {
  Button,
  IconButton,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@mui/material';

export const CombinatorSelector = ({ value, handleOnChange }) => {
  return (
    <FormControl sx={{ width: '20%' }}>
      <InputLabel>Combinator</InputLabel>
      <Select
        value={value}
        defaultValue="and"
        label="Combinator"
        onChange={(e) => handleOnChange(e.target.value)}
      >
        <MenuItem value="and">AND</MenuItem>
        <MenuItem value="or">OR</MenuItem>
      </Select>
    </FormControl>
  );
};

export const FieldSelector = ({ options, value, handleOnChange }) => {
  return (
    <FormControl>
      <InputLabel>Field</InputLabel>
      <Select
        value={value}
        label="Field"
        onChange={(e) => handleOnChange(e.target.value)}
      >
        {options.map((option) => (
          <MenuItem value={option.name} key={option.name}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export const OperatorSelector = ({ options, value, handleOnChange }) => {
  return (
    <FormControl>
      <InputLabel>Operator</InputLabel>
      <Select
        value={value}
        label="Operator"
        onChange={(e) => handleOnChange(e.target.value)}
      >
        {options.map((option) => (
          <MenuItem value={option.name} key={option.name}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export const ValueSourceSelector = ({ options, value, handleOnChange }) => {
  return (
    <FormControl>
      <InputLabel>Source</InputLabel>
      <Select
        value={value}
        label="Source"
        onChange={(e) => handleOnChange(e.target.value)}
      >
        {options.map((option) => (
          <MenuItem value={option.name} key={option.name}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export const ValueEditor = ({ value, handleOnChange, inputType }) => {
  return (
    <TextField
      variant="outlined"
      type={inputType}
      label="Value"
      onChange={(e) => handleOnChange(e.target.value)}
      value={value}
    />
  );
};

export const AddRuleButton = ({ handleOnClick }) => {
  return (
    <Button
      variant="outlined"
      startIcon={<AddIcon fontSize="small" />}
      onClick={handleOnClick}
    >
      Rule
    </Button>
  );
};

export const AddGroupButton = ({ handleOnClick }) => {
  return (
    <Button
      variant="outlined"
      startIcon={<AddIcon fontSize="small" />}
      onClick={handleOnClick}
    >
      Group
    </Button>
  );
};

export const RemoveButton = ({ handleOnClick }) => {
  return (
    <IconButton onClick={handleOnClick}>
      <RemoveCircleIcon fontSize="small" color="error" />
    </IconButton>
  );
};
