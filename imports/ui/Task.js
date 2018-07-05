import React, { Component } from 'react';

import { Tasks } from '../api/tasks.js';

// Task component - represents a single todo item
export default class Task extends Component {
  toggleChecked() {
    // Set the checked property to the opposite of its current value
    Tasks.update(this.props.task._id, {
      $set: { checked: !this.props.task.checked },
    });
  }

  deleteThisTask() {
    Tasks.remove(this.props.task._id);
  }

  render() {
    const taskClassName = this.props.task.checked ? 'checked' : '';

    return (
      <li className={taskClassName}>
      <React.Fragment>
        <button className="delete" onClick={this.deleteThisTask.bind(this)}>
          &times;
        </button>

        {this.props.task.nick}: {this.props.task.message}
        </React.Fragment>

        <span className="text">{this.props.task.text}</span>
      </li>
    );
  }
}
