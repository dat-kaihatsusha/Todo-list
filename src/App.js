import React, { Component } from "react";
import './App.css';
import TodoItem from './components/TodoItem';
import tick from './img/check-complete.svg';


class App extends Component {
  constructor() {
    super();
    this.state = {
      newItem: '',
      todoItems: [
        { title: "Di choi nhe", isComplete: true },
        { title: "Di da bong", isComplete: false },
        { title: "Di hoc code", isComplete: true },
      ]
    };
    this.onKeyUp = this.onKeyUp.bind(this);
    this.onChange = this.onChange.bind(this);
    // this.onItemClicked = this.onItemClicked.bind(this);
  }

  onItemClicked(item) {
    return (event) => {
      const { todoItems } = this.state;
      const isComplete = item.isComplete;
      const index = todoItems.indexOf(item);
      this.setState({
        todoItems: [
          ...todoItems.slice(0, index),
          {
            ...item,
            isComplete: !isComplete,
          },
          ...todoItems.slice(index + 1)
        ]
      });
    }
  }

  onKeyUp(event) {
    if (event.keyCode === 13) {
      let text = event.target.value;
      if (!text || text === '') {
        return;
      }
      text = text.trim();
      if (!text) {
        return;
      }
      this.setState(
        {
          newItem: '',
          todoItems: [
            { title: text, isComplete: false },
            ...this.state.todoItems,
          ]
        }
      );
      event.target.value = '';
    }
  }

  onChange(event){
    this.setState({
      newItem: event.target.value
    });
  }

  render() {
    const { todoItems, newItem } = this.state;
    if (todoItems.length) {
      return (
        <div className="App">
          <div className="Header">
            <img src={tick} />
            <input 
            type="text" 
            width={32} 
            height={32} 
            placeholder="Add a new item"
            value={newItem}
            onChange={this.onChange}
            onKeyUp={this.onKeyUp}></input>
          </div>
          {
            todoItems.length && todoItems.map((item, index) =>
              <TodoItem
                key={index}
                item={item}
                onClick={this.onItemClicked(item)} />
            )
          }
        </div>
      );
    } else {
      return <div className="App">Nothing here!</div>
    }
  }
}

export default App;