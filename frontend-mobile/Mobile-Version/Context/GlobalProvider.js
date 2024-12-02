import React from 'react';
import { AuthProvider } from './AuthContext';
import { NotificationProvider } from './NotificationsContext';
import { SettingsProvider } from './SettingsContext';

export const GlobalProvider = ({ children }) => {
  return (
    <AuthProvider>
      <NotificationProvider>
        <SettingsProvider>{children}</SettingsProvider>
      </NotificationProvider>
    </AuthProvider>
  );
};
