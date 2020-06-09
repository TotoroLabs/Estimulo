import React, { useState } from 'react';
import './styles.scss';
import { Link } from 'react-router-dom';
import { FaSearch, FaUser } from 'react-icons/fa';
import { useCookies } from 'react-cookie';

export default function Litenav({ onSubmit, user, history }) {
  const [cookies, setCookie, removeCookie] = useCookies(['token']);

  const [boxactions, setBoxactions] = useState(false);
  const [inputfield, setInputfield] = useState();
  function handleLogout() {
    removeCookie('token', { path: '/' });
    history.push('/BUZZ');
  }
  async function handleSubmit(e) {
    e.preventDefault();
    console.log('o valor que eu estou jogando é:' + inputfield);
    await onSubmit({
      inputfield,
    });
    setInputfield('');
  }

  function handleActiveBoxActions() {
    console.log('ta desativado');

    setBoxactions(true);
  }
  function handleDisableBoxActions() {
    console.log('ta desativado');
    setBoxactions(false);
  }
  return (
    <div className="lite-nav">
      <Link to="/">
        <div className="box-logo">
          <h3>Estímulo IFRN</h3>
        </div>
      </Link>
      <div className="box-search">
        <FaSearch
          size={14}
          color="#888"
          style={{ margin: 'auto 0 auto 10px' }}
        />
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="search"
            placeholder="Busque por categorias"
            value={inputfield}
            onChange={(e) => setInputfield(e.target.value)}
          />
        </form>
      </div>
      <div className="box-actions" onMouseLeave={handleDisableBoxActions}>
        <button onClick={handleActiveBoxActions}>
          <span>Olá {user ? user.name : 'visitante'}</span>
        </button>
        <div className="icon-user">
          {user ? (
            <img src={user.thumbnail} />
          ) : (
            <FaUser size={25} color="#888" />
          )}
        </div>
        <div
          className={boxactions ? 'actions active' : 'actions disable'}
          onMouseOver={handleActiveBoxActions}
          onMouseOut={handleDisableBoxActions}
        >
          <Link to="/BUZZ/profile">
            <div className="action-item">Minha Conta</div>
          </Link>
          <Link to="/BUZZ/profile/favorites">
            <div className="action-item">Favoritos</div>
          </Link>
          <div className="action-item">
            <a href="#">Vender</a>
          </div>
          <div className="action-item" onClick={handleLogout}>
            <a href="#">Sair</a>
          </div>
        </div>
      </div>
    </div>
  );
}
