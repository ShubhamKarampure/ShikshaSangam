import React from 'react';
import { AuthProvider } from './useAuthContext';  // Import AuthContext
import { NotificationProvider } from './NotificationContext';
import { MessageProvider } from './MessageContext';
import { SettingsProvider } from './SettingsContext';
import { ReplyListProvider } from './ReplyListContext';
import { ChatProvider } from './useChatContext';
import { ProfileProvider } from './ProfileContext';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "tomato",
    secondary: "yellow",
  },
};

export const GlobalProvider = ({ children }) => {
  return (
    <AuthProvider>
      <ProfileProvider>
        <NotificationProvider>
          <ChatProvider>
            <MessageProvider>
              <SettingsProvider>
                <ReplyListProvider>
                  <PaperProvider theme={theme}>
                    {children}
                  </PaperProvider>
                </ReplyListProvider>
              </SettingsProvider>
            </MessageProvider>
          </ChatProvider>
        </NotificationProvider>
      </ProfileProvider>
    </AuthProvider>
  );
};
