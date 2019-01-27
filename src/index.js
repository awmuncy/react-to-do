import React from "react";
import ReactDOM from "react-dom";



class TodoList extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      todos: []
    };

    this.addNewToDo = this.addNewToDo.bind(this);
    this.toggle = this.toggle.bind(this);
    this.deleteToDo = this.deleteToDo.bind(this);
  }

  componentDidMount() {
    this.setState({
      todos: localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : []
    });
  }

  componentDidUpdate() {
    localStorage.setItem('todos', JSON.stringify(this.state.todos));
    itemCountSpan.innerText = this.state.todos.length;
    uncheckedCountSpan.innerText = this.state.todos.filter((todo)=>{return (!todo.complete)} ).length;
  }

  addNewToDo(key) {
    var currentList = [...this.state.todos];
    currentList.push({
      title: prompt("Please enter todo title", ""),
      complete: false
    });
    this.setState({
      todos: currentList
    });
  }

  deleteToDo(index) {
    var list = this.state.todos;

    list.splice(index, 1);

    this.setState({
      todos: list
    });
  }

  toggle(index) {
    var list = this.state.todos;
    list[index].complete = list[index].complete ? false : true;
    this.setState({
      todos: list
    });
  }

  render(){
    return (
      <div className="todo-list">
        {
          this.state.todos.map((todo, key)=>{
            return <ToDoItem 
              title={todo.title} 
              complete={todo.complete} 
              toggle={this.toggle} 
              delete={this.deleteToDo}
              index={key} 
              key={key} />
          })
        }
      </div>  
    )
  };
}


const ToDoItem = (props) => {

  function toggleToDo() {
    props.toggle(props.index);
  }

  function deleteToDo() {
    props.delete(props.index);
  }

  return (
    <div className={classNames.TODO_ITEM}>
      <input type="checkbox" defaultChecked={props.complete} onClick={toggleToDo} className={classNames.TODO_CHECKBOX} />
      {props.title}
      <span className={classNames.TODO_DELETE} onClick={deleteToDo} >Delete</span>
    </div>
  );
}


window.todoapp = ReactDOM.render(
  <TodoList />,
  document.getElementById("todo-list")
);