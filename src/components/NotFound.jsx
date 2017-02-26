import React, { Component } from 'react'
import { Link } from 'react-router'

const style = {
  textAlign: 'center'
}

const NotFound = () => (
      <div style={style}>
        <h1>Страница не найдена. Вернуться на <Link to='/'>главную</Link>?</h1>
        <img src='/images/404.jpg'/>
      </div>
);

export default NotFound;
