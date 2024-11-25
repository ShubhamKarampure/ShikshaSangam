import AppProvidersWrapper from "./components/wrappers/AppProvidersWrapper";
import configureFakeBackend from "./helpers/fake-backend";
import AppRouter from "./routes/router";

import '@/assets/scss/style.scss';
configureFakeBackend();
function App() {
  return <AppProvidersWrapper>
      <AppRouter />
    </AppProvidersWrapper>;
}
export default App;