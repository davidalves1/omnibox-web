import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class NotFound extends Component {
  render() {
    return (
      <div style={{textAlign: 'center', marginTop: '40vh'}}>
        <h1 style={{fontSize: '36px', fontWeight: 'bold'}}>Página não encontrada :(</h1>
        <h2 style={{marginTop: '2rem', fontSize: '18px'}}>
          <Link to="/">Ir para a Home...</Link>
        </h2>
      </div>
    );
  }
}
