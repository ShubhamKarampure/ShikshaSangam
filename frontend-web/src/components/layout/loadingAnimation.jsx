import React from 'react';
import { RotatingLines } from 'react-loader-spinner'; // Ensure you have the right import for RotatingLines

const Loader = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // Full viewport height
        width: '100vw', // Full viewport width
        position: 'absolute', // Ensure it's centered within the viewport
        top: '0',
        left: '0',
      }}
    >
      <RotatingLines
        height="96"
        width="96"
        color="grey"
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default Loader;
