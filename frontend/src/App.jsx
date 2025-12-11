import { AuthProvider } from "@core/hooks/context";
import AppRouter from "@core/routes/AppRouter.jsx";
function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}
export default App;
