import "./App.css";
import Column from "./components/Column";

function App() {
  const columns = ["Todo", "In Progress", "Done"];

  return (
    <div className="app">
      <h2>Kanban Todo</h2>
      <div className="container">
        {columns.map((col) => (
          <Column key={col} name={col} />
        ))}
      </div>
    </div>
  );
}

export default App;
