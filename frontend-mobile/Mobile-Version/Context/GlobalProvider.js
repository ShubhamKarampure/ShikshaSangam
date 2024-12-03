import React from 'react';
import { AuthProvider } from './useAuthContext';  // Import AuthContext
import { NotificationProvider } from './NotificationContext';
import { MessageProvider } from './MessageContext';
import { SettingsProvider } from './SettingsContext';

export const GlobalProvider = ({ children }) => {
  return (
    <AuthProvider>
      <NotificationProvider>
        <MessageProvider>
          <SettingsProvider>
            {children}
          </SettingsProvider>
        </MessageProvider>
      </NotificationProvider>
    </AuthProvider>
  );
};
