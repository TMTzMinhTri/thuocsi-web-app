import { NativeSelect, useMediaQuery } from '@material-ui/core';
import { InfoFormControl, InfoInput } from 'components/atoms';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import styles from './styles.module.css';

const AddressSelect = ({ label, id, options, onChange, value, disabled }) => {
  const maxWidthAddressSelect = useMediaQuery('(max-width:720px)');

  return (
    <InfoFormControl xs={maxWidthAddressSelect ? 12 : 4} label={label} htmlFor={id} isRequired>
      <NativeSelect
        id={id}
        input={<InfoInput />}
        IconComponent={ExpandMoreIcon}
        value={value}
        onChange={onChange}
        className={styles.native_select}
        disabled={disabled}
      >
        {options.map((option) => (
          <option value={option.value}>{option.label}</option>
        ))}
      </NativeSelect>
    </InfoFormControl>
  );
};

export default AddressSelect;