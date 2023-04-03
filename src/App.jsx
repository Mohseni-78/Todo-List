import { useEffect, useState } from "react";
// Imported Css
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      await fetch("https://dummyjson.com/todos")
        .then((res) => res.json())
        .then((d) => setData(d.todos));
    };
    fetchApi();
  }, []);

  const handlerCheckBox = (e, todo) => {
    const todoIndex = data.findIndex((t) => t.id === todo.id);

    
    data[todoIndex].completed = e.target.checked;
    setData((prev) => [...prev]);

    // OR =======>

    // setData((prev) => {
    //   const clone = [...prev];
    //   clone[todoIndex] = {
    //     ...clone[todoIndex],
    //     completed: e.target.checked,
    //   };
    //   return clone;
    // });
  };
  const logsHandler = (completed = "All") => {
    // لیستی از تودو های چک خورده و چک نخورده بدون در نظر گرفتن تمامی تودو ها
    // completed
    //   ? data.map((t) => t.completed && console.log(t))
    //   : data.map((t) => !t.completed && console.log(t));

    if (completed === "All") {
      console.log("Not Completed Todos =======>");
      data.map((t) => !t.completed && console.log(t));
      console.log("Completed Todos =======>");
      data.map((t) => t.completed && console.log(t));
    } else if (completed === "completed") {
      data.map((t) => t.completed && console.log(t));
    } else if (completed === "notCompleted") {
      data.map((t) => !t.completed && console.log(t));
    }
  };

  return (
    <div className="App">
      <form className="form">
        {data.map((item) => (
          <div className="formGroup" key={item.id}>
            <label htmlFor={`inputId-${item.id}`}>{item.todo}</label>
            <input
              checked={item.completed}
              type="checkbox"
              id={`inputId-${item.id}`}
              className="formControl"
              onChange={(e) => handlerCheckBox(e, item)}
            />
          </div>
        ))}
      </form>
      <div className="btnGroup">
        <button
          type="button"
          className="btn"
          onClick={() => logsHandler("completed")}
        >
          Click To Logs Complete Todo
        </button>
        <button
          type="button"
          className="btn"
          onClick={() => logsHandler("notCompleted")}
        >
          Click To Logs Not Complete Todos
        </button>
        <button type="button" className="btn" onClick={() => logsHandler()}>
          Click To Logs All Todos
        </button>
      </div>
    </div>
  );
}

export default App;
