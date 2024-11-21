import Choices from 'choices.js';
import { useEffect, useRef } from 'react';
const ChoicesFormInput = ({
  children,
  multiple,
  className,
  onChange,
  allowInput,
  options,
  ...props
}) => {
  const choicesRef = useRef(null);
  useEffect(() => {
    if (choicesRef.current) {
      const choices = new Choices(choicesRef.current, {
        ...options,
        placeholder: true,
        allowHTML: true,
        shouldSort: false
      });
      choices.passedElement.element.addEventListener('change', e => {
        if (!(e.target instanceof HTMLSelectElement)) return;
        if (onChange) {
          onChange(e.target.value);
        }
      });
    }
  }, [choicesRef]);
  return allowInput ? <input ref={choicesRef} multiple={multiple} className={className} {...props} /> : <select ref={choicesRef} multiple={multiple} className={className} {...props}>
      {children}
    </select>;
};
export default ChoicesFormInput;