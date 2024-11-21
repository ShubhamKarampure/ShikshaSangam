import SimpleBar from 'simplebar-react';
const SimplebarReactClient = ({
  children,
  ...options
}) => {
  return <SimpleBar {...options}>{children}</SimpleBar>;
};
export default SimplebarReactClient;