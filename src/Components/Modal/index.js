import React, { useEffect, useState } from 'react';
import './styles.scss';
import { FaTimes, FaWhatsapp } from 'react-icons/fa';
import { FiStar } from 'react-icons/fi';
import api from '../../services/api';
import { useCookies } from 'react-cookie';

export default function Modal({ user, project, onClick }) {
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const [isfavorite, setIsfavorite] = useState(false);

  async function handleFavorite() {
    if (!isfavorite) {
      console.log('recebi a ordem de adicionar');
      await api
        .put(`/favorites/${project._id}`, null, {
          headers: { Authorization: `Bearer ${cookies.token}` },
        })
        .then(() => {
          if (isfavorite) {
            setIsfavorite(false);
          } else {
            setIsfavorite(true);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log('recebi a ordem de deletar');
      await api
        .delete(`/favorites/${project._id}`, {
          headers: { Authorization: `Bearer ${cookies.token}` },
        })
        .then(() => {
          if (isfavorite) {
            setIsfavorite(false);
          } else {
            setIsfavorite(true);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  useEffect(() => {
    if (user.favorites.find((favitem) => favitem._id === project._id)) {
      setIsfavorite(true);
    }
  }, [user.favorites, project]);
  function popupWPP() {
    window.open(`https://wa.me/55${project.owner.phone}`, '_top');
  }
  async function handleCloseModal() {
    await onClick({});
  }
  useEffect(() => {
    const listener = (e) => {
      if (e.key === 'Escape') {
        handleCloseModal();
      }
    };
    window.addEventListener('keydown', listener);

    return () => {
      window.removeEventListener('keydown', listener);
    };
  }, [handleCloseModal]);
  return (
    <div className="modal">
      <div className="content">
        <div className="close-button">
          <span>#{project._id}</span>
          <button onClick={handleCloseModal}>
            <FaTimes size={24} color="#444" />
          </button>
        </div>
        <div className="details">
          <div className="box-left">
            <img src={project.photo} alt="" srcset="" />
          </div>
          <div className="box-right">
            <h1>
              <strong>{project.name}</strong>
            </h1>
            <span>{project.owner.name}</span>
            <div className="contact" onClick={popupWPP}>
              <FaWhatsapp size={24} color="#fff" style={{ marginRight: 5 }} />
              <span>Entre em contato</span>
            </div>
            <div className="favorites" onClick={handleFavorite}>
              <FiStar size={24} color="#666" />
              {!isfavorite ? (
                <span>Adicionar a sua lista de desejos</span>
              ) : (
                <span>Remover da sua lista de desejos</span>
              )}
            </div>
          </div>
        </div>
        <div className="box-info">
          <div className="description">
            <h1>Descrição</h1>
            <span>{project.description}</span>
          </div>
          <div className="hashtags">
            <h3>Categorias</h3>
            <span>{project.hashtags}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
