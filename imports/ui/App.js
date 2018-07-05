import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';

import { Tasks } from '../api/tasks.js';

import Task from './Task.js';

// App component - represents the whole app
class App extends Component {
  constructor(props) {
      super(props);
      this.state = {nick: '', message: ''};

      this.handleChangeNick = this.handleChangeNick.bind(this);
      this.handleChangeMessage = this.handleChangeMessage.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeNick(event) {
      this.setState({nick: event.target.value});
    }

    handleChangeMessage(event) {
      this.setState({message: event.target.value});
    }

    handleSubmit(event) {
      Tasks.insert({
        nick: this.state.nick,
        message: this.state.message,
      });
      event.preventDefault();
    }

  renderTasks() {
    return this.props.tasks.map((task) => (
      <Task key={task._id} task={task} />
    ));
  }

  render() {
    return (
      <div className="container">
        <header>
          <h2>Chat</h2>

          <form onSubmit={this.handleSubmit}>
            <label>
              Nick:
              <input type="text" value={this.state.nick} onChange={this.handleChangeNick} />
            </label>
            <label>
              Message:
              <input type="text" value={this.state.message} onChange={this.handleChangeMessage} />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </header>

        <ul>
          {this.renderTasks()}
        </ul>
      </div>
    );
  }
}

export default withTracker(() => {
  return {
    tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
  };
})(App);
