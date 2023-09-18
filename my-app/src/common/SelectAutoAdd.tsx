import { SelectOptionModel } from '@models/selectOptionModel';
import React from 'react';
import Select, { StylesConfig, SingleValue } from 'react-select';

interface SelectAutoAddStyles {
  dropdownStyle?: StylesConfig<SelectOptionModel, false>,
  valueContainer?: React.CSSProperties,
  valueContainerText?: React.CSSProperties,
  valueContainerIcon?: React.CSSProperties,
}

interface Props {
  options: SelectOptionModel[];
  customStyles?: SelectAutoAddStyles;
  placeholder?: string;
  selectedOption: SelectOptionModel;
  selectedOptions: SelectOptionModel[];
  isSearchable?: boolean;
  handleSelectChange: (selectedOption: SingleValue<SelectOptionModel>) => void;
  handleRemove: (selectedOption: SingleValue<SelectOptionModel>) => void;
  icon: React.ElementType;
}

const SelectAutoAdd: React.FC<Props> = ({
    options,
    customStyles,
    placeholder,
    selectedOption,
    selectedOptions,
    isSearchable,
    handleSelectChange,
    handleRemove,
    icon: Icon }) => {

    const style: StylesConfig<SelectOptionModel, false> = {
      control: (base) => ({
          ...base,
          width: '100%',
          minHeight: '30px !important',
          borderColor: "#C8C8C8",
          boxShadow: 'none',
          "&:hover": {
              borderColor: "#C8C8C8",
              boxShadow: 'none',
          },
          "*": {
              boxShadow: "none !important",
          },
      }),
      option: (base, state) => ({
          ...base,
          backgroundColor: state.isFocused ? "#E7E7E7" : "white",
          borderColor: "#C8C8C8",
          borderPosition: "inside",
          borderWidth: 1,
      }),
      valueContainer: (provided) => ({
          ...provided,
          height: '30px',
          padding: '0 6px'
      }),
      input: (provided) => ({
          ...provided,
      }),
      indicatorSeparator: state => ({
          display: 'none',
      }),
      indicatorsContainer: (provided) => ({
          ...provided,
          height: '30px',
      }),
    };

  const filteredOptions = options.filter(option => {
    return !selectedOptions.some(selectedOption => 
      selectedOption.value === option.value && selectedOption.label === option.label
    );
  });
    
  return (
    <div>
      <Select
        options={filteredOptions}
        value={selectedOption}
        onChange={handleSelectChange}
        styles={customStyles?.dropdownStyle || style}
        placeholder={placeholder || "Select..."}
        isSearchable={isSearchable || true}
      />
      {selectedOptions.map((option) => (
        <div style={customStyles?.valueContainer || {}} key={option.label}>
            <div style={customStyles?.valueContainerText || {}}>{option.value}</div>
            <Icon style={customStyles?.valueContainerIcon || {}} onClick={() => handleRemove(option)}></Icon>
        </div>
      ))}
    </div>
  );
};

export default SelectAutoAdd;
