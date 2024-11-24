import { createContext, useContext, useMemo, useState } from 'react';
import { toggleDocumentAttribute } from '@/utils/layout';
const LayoutContext = createContext(undefined);
function useLayoutContext() {
  const context = useContext(LayoutContext);
  if (context === undefined) {
    throw new Error('useLayoutContext must be used within an LayoutProvider');
  }
  return context;
}
const storageThemeKey = 'SOCIAL_REACTJS_THEME_KEY';
const themeAttributeKey = 'data-bs-theme';
const LayoutProvider = ({
  children
}) => {
  const getSavedTheme = () => {
    const foundTheme = localStorage.getItem(storageThemeKey);
    const preferredTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    if (foundTheme) {
      if (foundTheme === 'auto') {
        toggleDocumentAttribute(themeAttributeKey, preferredTheme);
        return preferredTheme;
      }
      toggleDocumentAttribute(themeAttributeKey, foundTheme);
      return foundTheme;
    }
    if (!foundTheme) localStorage.setItem(storageThemeKey, preferredTheme);
    return preferredTheme;
  };
  const INIT_STATE = {
    theme: getSavedTheme()
  };
  const [settings, setSettings] = useState(INIT_STATE);
  const [offcanvasStates, setOffcanvasStates] = useState({
    showMobileMenu: false,
    showMessagingOffcanvas: false,
    showStartOffcanvas: false
  });
  const updateSettings = _newSettings => setSettings({
    ...settings,
    ..._newSettings
  });
  const updateTheme = newTheme => {
    const foundTheme = localStorage.getItem(themeAttributeKey);
    if (foundTheme !== newTheme) {
      toggleDocumentAttribute(themeAttributeKey, newTheme);
      localStorage.setItem(storageThemeKey, newTheme);
      updateSettings({
        ...settings,
        theme: newTheme
      });
    }
  };
  const toggleMessagingOffcanvas = () => {
    setOffcanvasStates({
      ...offcanvasStates,
      showMessagingOffcanvas: !offcanvasStates.showMessagingOffcanvas
    });
  };
  const toggleMobileMenu = () => {
    setOffcanvasStates({
      ...offcanvasStates,
      showMobileMenu: !offcanvasStates.showMobileMenu
    });
  };
  const toggleStartOffcanvas = () => {
    setOffcanvasStates({
      ...offcanvasStates,
      showStartOffcanvas: !offcanvasStates.showStartOffcanvas
    });
  };
  const messagingOffcanvas = {
    open: offcanvasStates.showMessagingOffcanvas,
    toggle: toggleMessagingOffcanvas
  };
  const mobileMenu = {
    open: offcanvasStates.showMobileMenu,
    toggle: toggleMobileMenu
  };
  const startOffcanvas = {
    open: offcanvasStates.showStartOffcanvas,
    toggle: toggleStartOffcanvas
  };
  return <LayoutContext.Provider value={useMemo(() => ({
    ...settings,
    updateTheme,
    messagingOffcanvas,
    mobileMenu,
    startOffcanvas
  }), [settings, offcanvasStates])}>
      {children}
    </LayoutContext.Provider>;
};
export { LayoutProvider, useLayoutContext };