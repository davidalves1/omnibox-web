import React, { Component } from 'react';
import api from '../../services/api';

import { Logo } from '../../components';

import './style.css';

class Home extends Component {
  state = {
    newBox: '',
    loading: false,
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    this.setState({ loading: true });

    const {
      newBox
    } = this.state;

    try {
      const response = await api.post('/boxes', {
        title: newBox
      });

      this.props
        .history
        .push(`/box/${response.data._id}`);
    } catch (err) {
      this.setState({ loading: false });
      console.error(err);
    }
  }

  handleInputChange = (e) => {
    this.setState({
      newBox: e.target.value
    });
  }

  render() {
    const {
      newBox,
      loading
    } = this.state;

    return (
        <div id="main-container">
            <form onSubmit={this.handleSubmit}>
              <Logo />
              <input
                placeholder="Nome do box"
                value={newBox}
                onChange={this.handleInputChange}
              />
              <button type="submit" disabled={loading}>Criar</button>
            </form>
        </div>
    );
  }
}

export default Home;
