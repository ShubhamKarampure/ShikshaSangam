import React, { useEffect, useRef, useState } from 'react';
import { tns } from 'tiny-slider';
import { objectsEqual, childrenEqual } from './utils';
const TinySlider = ({
  settings,
  onClick,
  onIndexChanged,
  onTransitionStart,
  onTransitionEnd,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
  onInit,
  className,
  style,
  children
}) => {
  const ref = useRef(null);
  const [slider, setSlider] = useState(null);
  const [prevSettings, setPrevSettings] = useState(settings);
  const [prevChildren, setPrevChildren] = useState(children);
  let dragging = false;
  let count = 0;
  const build = (customSettings = {}) => {
    if (slider && slider.destroy && slider.rebuild) {
      slider.destroy();
      slider.rebuild();
    } else {
      if (ref.current == null) return;
      const mergedSettings = {
        ...customSettings,
        container: ref.current,
        onInit: () => postInit()
      };
      setSlider(tns(mergedSettings));
      if (!slider) return;
      if (ref.current) ref.current.className += ' tns-item';
    }
  };
  const postInit = () => {
    if (!slider) {
      if (count >= 4) {
        return onInit?.(false);
      }
      count++;
      return setTimeout(postInit, 100);
    }
    count = 0;
    const {
      events
    } = slider;
    if (events) {
      events.on('transitionStart', info => {
        dragging = true;
        onTransitionStart?.(info);
      });
      events.on('transitionEnd', info => {
        dragging = false;
        onTransitionEnd?.(info);
      });
      if (onIndexChanged) events.on('indexChanged', onIndexChanged);
      if (onTouchStart) events.on('touchStart', onTouchStart);
      if (onTouchMove) events.on('touchMove', onTouchMove);
      if (onTouchEnd) events.on('touchEnd', onTouchEnd);
    }
    onInit?.(true);
  };
  useEffect(() => {
    build(settings);
  }, [settings]);
  useEffect(() => {
    if (!objectsEqual(settings, prevSettings) || !childrenEqual(children, prevChildren)) {
      build(settings);
    }
    setPrevSettings(settings);
    setPrevChildren(children);
  }, [settings, children]);
  useEffect(() => {
    return () => {
      if (slider && slider.destroy) slider.destroy();
    };
  }, []);
  const onClickHandler = event => {
    if (dragging || !onClick) return;
    if (!slider) return onClick(null, null, event);
    const info = slider.getInfo();
    const slideClicked = info.slideItems[info.index];
    onClick(slideClicked, info, event);
  };
  return <div ref={ref} onClick={onClickHandler} className={className} style={style}>
      {children}
    </div>;
};
export default TinySlider;