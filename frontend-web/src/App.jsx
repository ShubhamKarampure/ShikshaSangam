import AppProvidersWrapper from "./components/wrappers/AppProvidersWrapper";
import configureFakeBackend from "./helpers/fake-backend";
import AppRouter from "./routes/router";
import '@/assets/scss/style.scss';
import React from "react";
import ChatbotWrapper from "./components/ChatbotWrapper";

function App() {
  return (
    <AppProvidersWrapper>
      <AppRouter />
      {/* Include the ChatbotWrapper */}
      <ChatbotWrapper />
    </AppProvidersWrapper>
  );
}

export default App;
