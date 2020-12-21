import { FormControl, InputLabel, Grid } from '@material-ui/core';
import styles from './styles.module.css';

const InfoFormControl = ({ xs, isRequired, children, label, htmlFor }) => (
  <Grid item xs={xs}>
    <FormControl className={styles.form_control}>
      <InputLabel shrink htmlFor={htmlFor} className={styles.input_label}>
        {label} {isRequired ? <span className={styles.required}> * </span> : <></>}
      </InputLabel>
      {children}
    </FormControl>
  </Grid>
);

export default InfoFormControl;
