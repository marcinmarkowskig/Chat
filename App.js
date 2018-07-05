import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';

import { Tasks } from '../api/tasks.js';

import Task from './Task.js';

// App component - represents the whole app
class App extends Component {
  handleSubmit(event) {
    event.preventDefault();
    console.log('tutaj')

    // Find the text field via the React ref
    const nick = ReactDOM.findDOMNode(this.refs.textInputNick).value.trim();
    const message = ReactDOM.findDOMNode(this.refs.textInputMessage).value.trim();

    Tasks.insert({
      nick,
      message,
      createdAt: new Date(), // current time
    });

    // Clear form
    ReactDOM.findDOMNode(this.refs.textInputNick).value = '';
    ReactDOM.findDOMNode(this.refs.textInputMessage).value = '';
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

          <form className="new-task" onSubmit={this.handleSubmit.bind(this)}>
            <input
              type="text"
              ref="textInputNick"
              placeholder="Type to add nick..."
            />
            <input
              type="text"
              ref="textInputMessage"
              placeholder="Type to add new message..."
            />
            <input
              type="submit"
            />
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

