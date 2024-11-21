import ReactFlatpickr from 'react-flatpickr';
const DateFormInput = ({
  className,
  options,
  placeholder,
  value,
  ...restProps
}) => {
  return <ReactFlatpickr className={className} value={value} options={options} placeholder={placeholder} {...restProps} />;
};
export default DateFormInput;