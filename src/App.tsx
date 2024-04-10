import "./App.css";
import AppRouter from "./AppRouter";

function App() {
  return (
    <div className="flex flex-col min-h-screen min-w-screen dark:bg-gray-800">
      <AppRouter />
    </div>
  );
}

export default App;
