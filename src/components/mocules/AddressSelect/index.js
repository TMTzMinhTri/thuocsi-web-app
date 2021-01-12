import { NativeSelect, useMediaQuery } from '@material-ui/core';
import { InfoFormControl } from 'components/atoms';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import styled from 'styled-components';
import InfoInput from '../InfoInput';

const AddressSelect = ({ label, id, options, onChange, value, disabled, className }) => {
  const maxWidthAddressSelect = useMediaQuery('(max-width:720px)');

  return (
    <InfoFormControl xs={maxWidthAddressSelect ? 12 : 4} label={label} htmlFor={id} isRequired>
      <NativeSelect
        id={id}
        input={<InfoInput />}
        IconComponent={ExpandMoreIcon}
        value={value}
        onChange={onChange}
        className={className}
        disabled={disabled}
      >
        {options.map((option) => (
          <option value={option.value} key={`${option.id}-${Math.random()}`}>{option.label}</option>
        ))}
      </NativeSelect>
    </InfoFormControl>
  );
};

const StyledAddressSelect = styled(AddressSelect)`
  & .MuiNativeSelect-select {
    padding-top: 0 !important;
    padding-bottom: 0 !important;
  }
  & .MuiNativeSelect-icon {
    right: 5px !important;
  }
  &.MuiOutlinedInput-root {
    height: 2.4em !important;
  }
`;
export default StyledAddressSelect;
