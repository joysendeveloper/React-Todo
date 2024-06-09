import { useState } from "react";
import "./Todo.css";

export default function Todo() {
  const [todos, setTodos] = useState([
    {
      title: "First item",
      description: "Lorem ipsum dolor sit amet",
      completed: false,
    },
  ]);

  const [filterdTodos, setFilteredTodos] = useState(todos);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);


  function handleAdd() {
    let newTodos;
    if(!isUpdate){
        newTodos = [...todos, { title, description, completed: false }];
        setTodos(newTodos);
        
    }else{
        newTodos = todos.map((todo, i) =>
            i === currentIndex ? { title, description, completed: todo.completed } : todo
          );
        setTodos(newTodos)
        setIsUpdate(false);
        setCurrentIndex(0);
    }
    setTitle("");
    setDescription("");
    setFilteredTodos(newTodos);
  }
  function handleComplete(index){
    let newTodos = todos.map((todo, i) => i === index ? {...todo, completed: !todo.completed} : todo);
    setTodos(newTodos);
    setFilteredTodos(newTodos);
  }
  function handleEdit(index){
    setIsUpdate(true);
    setTitle(todos[index].title);
    setDescription(todos[index].description);    
    setCurrentIndex(index);
  }
  function handleDelete(index){
    let newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
    setFilteredTodos(newTodos);
  }

  function handleFilter(filter){
    if(filter === "all"){
        setFilteredTodos(todos);
    }else if(filter === "active"){
        setFilteredTodos(todos.filter((todo) => todo.completed === false));
    }else if(filter === "completed"){
        setFilteredTodos(todos.filter((todo) => todo.completed === true));
    }
  }

  return (
    <>
      <main>
        <div className="container">
          <div className="todo">
            <div className="row mt-5 input-group">
              <div className="col-12">
                <input
                  className="form-control my-2"
                  type="text"
                  placeholder="Add a task"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                ></input>
                <textarea
                  placeholder="Description"
                  className="form-control"
                  rows="3"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                <button className="btn btn-success w-100 mt-2" onClick={handleAdd}>{isUpdate ? "Update" : "Add"}</button>
              </div>
            </div>
            <div className="row my-3">
              <div className="col-12">
                <div className="filter">
                  <button className="btn btn-primary me-2" onClick={() => handleFilter("all")}>All</button>
                  <button className="btn btn-outline-primary me-2" onClick={() => handleFilter("active")}>Active</button>
                  <button className="btn btn-outline-primary" onClick={() => handleFilter("completed")}>Completed</button>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <ul className="list-group">
                  {/* TODO: Render todos */}
                  {filterdTodos.map((todo, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                      <div>
                        <div className="h5">{todo.title}</div>
                        <div className={todo.completed ? "text-decoration-line-through text-muted" : "text-muted"}>
                          {todo.description}
                        </div>
                      </div>
                      <div className="actions">
                        <button className={todo.completed ? "btn btn-success" : "btn btn-outline-success"}  onClick={()=> handleComplete(index)}>
                            <i className="fas fa-check"></i>
                        </button>
                        <button className="btn btn-primary mx-2" onClick={() => handleEdit(index)}>
                          <i className="fas fa-edit"></i>
                        </button>
                        <button className="btn btn-danger" onClick={() => handleDelete(index)}>
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
