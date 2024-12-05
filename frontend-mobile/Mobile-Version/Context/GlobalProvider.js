import React from 'react';
import { AuthProvider } from './useAuthContext';  // Import AuthContext
import { NotificationProvider } from './NotificationContext';
import { MessageProvider } from './MessageContext';
import { SettingsProvider } from './SettingsContext';
import { ReplyListProvider } from './ReplyListContext';
import { ChatProvider } from './useChatContext';
import { ProfileProvider } from './ProfileContext';
export const GlobalProvider = ({ children }) => {
  return (
    <AuthProvider>
      <ProfileProvider>
      <NotificationProvider>
        <ChatProvider>
          <MessageProvider>
            <SettingsProvider>
              <ReplyListProvider>
                  {children}
              </ReplyListProvider>
            </SettingsProvider>
          </MessageProvider>
        </ChatProvider>
      </NotificationProvider>
      </ProfileProvider>
    </AuthProvider>
  );
};
