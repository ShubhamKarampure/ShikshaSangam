import { FormControl, FormGroup, FormLabel } from 'react-bootstrap';
import Feedback from 'react-bootstrap/esm/Feedback';
import { Controller } from 'react-hook-form';
const TextFormInput = ({
  name,
  containerClassName: containerClass,
  control,
  id,
  label,
  noValidate,
  labelClassName: labelClass,
  ...other
}) => {
  return <Controller name={name} defaultValue={''} control={control} render={({
    field,
    fieldState
  }) => <FormGroup className={containerClass}>
          {label && (typeof label === 'string' ? <FormLabel htmlFor={id ?? name} className={labelClass}>
                {label}
              </FormLabel> : <>{label}</>)}
          <FormControl id={id ?? name} {...other} {...field} isInvalid={Boolean(fieldState.error?.message)} />
          {!noValidate && fieldState.error?.message && <Feedback type="invalid" className="text-start">
              {fieldState.error?.message}
            </Feedback>}
        </FormGroup>} />;
};
export default TextFormInput;