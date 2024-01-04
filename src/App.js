import "./App.css";
import Column from "./components/Column";

function App() {
  const columns = ["Todo", "In Progress", "Done"];

  return (
    <>
      <h2 style={{ textAlign: "center" }}>Kanban Todo</h2>
      <div className="container">
        {columns.map((col) => (
          <Column key={col} name={col} />
        ))}
      </div>
    </>
  );
}

export default App;
