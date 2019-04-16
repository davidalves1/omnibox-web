import React, { Component } from 'react';
import api from '../../services/api';

import './style.css';

import logo from '../../assets/logo.svg';

class Home extends Component {
  state = {
    newBox: ''
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    const {
      newBox
    } = this.state;

    const response = await api.post('/boxes', {
      title: newBox
    });

    console.log(response.data);
  }

  handleInputChange = (e) => {
    this.setState({
      newBox: e.target.value
    });
  }

  render() {
    const {
      newBox
    } = this.state;

    return (
        <div id="main-container">
            <form onSubmit={this.handleSubmit}>
              <img src={logo} alt="Logo RocketBox"/>
              <input
                placeholder="Nome do box"
                value={newBox}
                onChange={this.handleInputChange}
              />
              <button type="submit">Criar</button>
            </form>
        </div>
    );
  }
}

export default Home;
