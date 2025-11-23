import AppRouter from "./AppRouter.jsx";
import { AuthProvider } from "./core/context/authContext.jsx";
function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  )
}
export default App;
