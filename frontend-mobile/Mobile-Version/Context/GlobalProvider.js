import React from 'react';
import { AuthProvider } from './useAuthContext';  // Import AuthContext
import { NotificationProvider } from './NotificationContext';
import { MessageProvider } from './MessageContext';
import { SettingsProvider } from './SettingsContext';
import { ChatProvider } from './useChatContext';

export const GlobalProvider = ({ children }) => {
  return (
    <AuthProvider>
      <NotificationProvider>
        <ChatProvider>
        <MessageProvider>
          <SettingsProvider>
            {children}
          </SettingsProvider>
        </MessageProvider>
        </ChatProvider>
      </NotificationProvider>
    </AuthProvider>
  );
};
