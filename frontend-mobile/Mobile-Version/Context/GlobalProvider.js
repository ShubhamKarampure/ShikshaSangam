import React from 'react';
import { AuthProvider } from './useAuthContext';  // Import AuthContext
import { NotificationProvider } from './NotificationContext';
import { MessageProvider } from './MessageContext';
import { SettingsProvider } from './SettingsContext';
import { ReplyListProvider } from './ReplyListContext';

export const GlobalProvider = ({ children }) => {
  return (
    <AuthProvider>
      <NotificationProvider>
        <MessageProvider>
          <SettingsProvider>
            <ReplyListProvider>
              {children}
            </ReplyListProvider>
          </SettingsProvider>
        </MessageProvider>
      </NotificationProvider>
    </AuthProvider>
  );
};
