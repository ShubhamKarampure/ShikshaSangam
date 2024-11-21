import { useEffect, useState } from 'react';
import { ProgressBar } from 'react-bootstrap';
const getProgress = progress => {
  if (progress > 75) return {
    variant: 'success',
    message: 'Yeah! that password rocks ;)'
  };else if (progress > 50) return {
    variant: 'info',
    message: 'That is better'
  };else if (progress > 25) return {
    variant: 'warning',
    message: 'That is a simple one'
  };else return {
    variant: 'danger',
    message: 'Easy peasy!'
  };
};
const calculatePasswordStrength = password => {
  let score = 0;
  const regexLower = new RegExp('(?=.*[a-z])');
  const regexUpper = new RegExp('(?=.*[A-Z])');
  const regexDigits = new RegExp('(?=.*[0-9])');
  const regexLength = new RegExp('(?=.{' + 8 + ',})');
  if (password.match(regexLower)) score += 25;
  if (password.match(regexUpper)) score += 25;
  if (password.match(regexDigits)) score += 25;
  if (password.match(regexLength)) score += 25;
  return score;
};
const PasswordStrengthMeter = ({
  password
}) => {
  const [fillAmount, setFillAmount] = useState(0);
  useEffect(() => {
    setFillAmount(calculatePasswordStrength(password));
  }, [password]);
  const progressVariant = getProgress(fillAmount);
  return <>
      <ProgressBar animated variant={progressVariant.variant} style={{
      height: '9px'
    }} now={fillAmount} />
      <div className="mt-1 text-start">{progressVariant.message}</div>
    </>;
};
export default PasswordStrengthMeter;