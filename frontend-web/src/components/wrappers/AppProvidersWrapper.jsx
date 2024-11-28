import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { DEFAULT_PAGE_TITLE } from "@/context/constants";
import { NotificationProvider } from "@/context/useNotificationContext";
import { ChatProvider } from "@/context/useChatContext";
import { LayoutProvider } from "@/context/useLayoutContext";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/context/useAuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ProfileProvider } from "@/context/useProfileContext";
import { SignUpPageProvider } from "@/context/useSignUpPageContext";

const AppProvidersWrapper = ({ children }) => {
  const handleChangeTitle = () => {
    if (document.visibilityState === "hidden")
      document.title = "Please come back 🥺";
    else document.title = DEFAULT_PAGE_TITLE;
  };
  useEffect(() => {
    if (document) {
      const e = document.querySelector("#__next_splash");
      if (e?.hasChildNodes()) {
        document.querySelector("#splash-screen")?.classList.add("remove");
      }
      e?.addEventListener("DOMNodeInserted", () => {
        document.querySelector("#splash-screen")?.classList.add("remove");
      });
    }
    document.addEventListener("visibilitychange", handleChangeTitle);
    return () => {
      document.removeEventListener("visibilitychange", handleChangeTitle);
    };
  }, []);
  return (
    <LayoutProvider>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <AuthProvider>
          <ProfileProvider>
            <HelmetProvider>
              <ChatProvider>
                <NotificationProvider>
                  <SignUpPageProvider>
                    {children}
                  </SignUpPageProvider>
                  <ToastContainer theme="colored" />
                </NotificationProvider>
              </ChatProvider>
            </HelmetProvider>
          </ProfileProvider>
        </AuthProvider>
      </GoogleOAuthProvider>
    </LayoutProvider>
  );
};
export default AppProvidersWrapper;
