import React, { Component } from 'react';
import { users } from './mock';
import './App.css'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      status: "",
      datalist: users
    };
  }

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleCreate = () => {
    const { name, status, datalist } = this.state;
    const newUser = { id: datalist.length + 1, name, status };
    this.setState({ datalist: [...datalist, newUser], name: "", status: "" });
  };

  handleDelete = (id) => {
    const { datalist } = this.state;
    const updatedList = datalist.filter((user) => user.id !== id);
    this.setState({ datalist: updatedList });
  };

  handleEdit = (id) => {
    const { datalist } = this.state;
    const user = datalist.find((user) => user.id === id);
    if (user) {
      this.setState({ name: user.name, status: user.status });
    }
  };

  handleUpdate = (id) => {
    const { name, status, datalist } = this.state;
    const updatedList = datalist.map((user) => {
      if (user.id === id) {
        return { ...user, name, status };
      }
      return user;
    });
    this.setState({ datalist: updatedList, name: "", status: "" });
  };

  render() {
    const { name, status, datalist } = this.state;

    return (
      <div>
        <h1>User List</h1>
        <table border={1} width={600}> 
          <thead>
            <tr >
              <th>ID</th>
              <th>Name</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {datalist.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.status}</td>
                <td>
                  <button onClick={() => this.handleDelete(user.id)}>Delete</button>
                  <button onClick={() => this.handleEdit(user.id)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2>Add User</h2>
        <input
          type="text"
          name="name"
          value={name}
          onChange={this.handleInputChange}
          placeholder="Name"
        />
        <input
          type="text"
          name="status"
          value={status}
          onChange={this.handleInputChange}
          placeholder="Status"
        />
        <button onClick={this.handleCreate}>Create</button>
        <button onClick={() => this.handleUpdate(users.id)}>Update</button>
      </div>
    );
  }
}
