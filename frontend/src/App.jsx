import { AuthProvider } from "@core/context/authContext.jsx";
import AppRouter from "@core/routes/AppRouter.jsx";
function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}
export default App;
