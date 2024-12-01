import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoThumbsup, GoPlus } from "react-icons/go";

const AnimatedFollowButton = ({ 
  initialFollowState = false, 
  onFollowChange,
  size = 'md' // Add size prop with default
}) => {
  const [isFollowing, setIsFollowing] = useState(initialFollowState);
  const [isClicked, setIsClicked] = useState(false); // Track if the button has been clicked

  // Size configurations
  const sizeConfig = {
    sm: { 
      width: '2rem', 
      height: '2rem', 
      fontSize: '0.875rem'
    },
    md: { 
      width: '2.5rem', 
      height: '2.5rem', 
      fontSize: '1rem'
    },
    lg: { 
      width: '3rem', 
      height: '3rem', 
      fontSize: '1.25rem'
    }
  };

  const handleClick = () => {
    if (isClicked) return; // Prevent further clicks after the first one

    setIsFollowing(true); // Set follow state to true on first click
    setIsClicked(true); // Lock button after first click

    if (onFollowChange) {
      onFollowChange(true); // Pass follow state change
    }
  };

  const buttonVariants = {
    initial: { 
      scale: 1, 
      rotate: 0, 
      opacity: 1 
    },
    tap: { 
      scale: 0.9,
      transition: { duration: 0.1 }
    },
    followingAnimation: { 
      rotate: [0, 15, -15, 0], // More subtle rotation
      scale: [1, 1.1, 0.95, 1], // Subtle scale variation
      transition: { 
        duration: 0.5, 
        ease: 'easeInOut',
        times: [0, 0.3, 0.7, 1] // More controlled timing
      }
    }
  };

  const iconVariants = {
    initial: { 
      opacity: 0, 
      scale: 0.5,
      rotate: -180 // Add initial rotation
    },
    animate: { 
      opacity: 1, 
      scale: 1,
      rotate: 0,
      transition: { 
        type: 'spring', 
        stiffness: 300, 
        damping: 15 
      } 
    },
    exit: { 
      opacity: 0, 
      scale: 0.5,
      rotate: 180,
      transition: { 
        duration: 0.2 
      } 
    }
  };

  const currentSize = sizeConfig[size] || sizeConfig.md;

  return (
    <motion.button
      className={`btn rounded-circle d-flex align-items-center justify-content-center 
        ${isFollowing ? 'btn-success' : 'btn-primary'} ${isClicked ? 'disabled' : ''}`}
      style={{
        width: currentSize.width,
        height: currentSize.height,
        fontSize: currentSize.fontSize,
        fontWeight: '600',
        position: 'relative',
        overflow: 'hidden',
        border: 'none', // Remove border for cleaner look
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)', // Subtle shadow
        cursor: isClicked ? 'not-allowed' : 'pointer', // Change cursor when clicked
      }}
      onClick={handleClick}
      variants={buttonVariants}
      initial="initial"
      whileTap="tap"
      animate={isFollowing ? "followingAnimation" : "initial"}
      disabled={isClicked} // Disable button after first click
    >
      <AnimatePresence mode="wait">
        {isFollowing ? (
          <motion.span
            key="checkmark"
            style={{ 
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            variants={iconVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <GoThumbsup/>
          </motion.span>
        ) : (
          <motion.span
            key="plusIcon"
            style={{ 
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            variants={iconVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <GoPlus/>
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default AnimatedFollowButton;
