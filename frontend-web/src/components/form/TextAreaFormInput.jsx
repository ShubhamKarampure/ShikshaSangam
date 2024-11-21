import { FormControl, FormGroup, FormLabel } from 'react-bootstrap';
import Feedback from 'react-bootstrap/esm/Feedback';
import { Controller } from 'react-hook-form';
const TextAreaFormInput = ({
  name,
  rows = 3,
  containerClassName,
  control,
  id,
  labelClassName,
  label,
  noValidate,
  ...other
}) => {
  return <Controller name={name} defaultValue={''} control={control} render={({
    field,
    fieldState
  }) => <FormGroup className={containerClassName ?? ''}>
          {label && <FormLabel className={labelClassName}>{label}</FormLabel>}
          <FormControl id={id} rows={rows} as="textarea" {...other} {...field} isInvalid={Boolean(fieldState.error?.message)} />
          {!noValidate && fieldState.error?.message && <Feedback type="invalid">{fieldState.error?.message}</Feedback>}
        </FormGroup>} />;
};
export default TextAreaFormInput;