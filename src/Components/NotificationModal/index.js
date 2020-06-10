import React, { useEffect, useState } from 'react';
import './styles.scss';
import { FaTimes, FaWhatsapp } from 'react-icons/fa';
import { FiStar } from 'react-icons/fi';
import api from '../../services/api';
import { useCookies } from 'react-cookie';

export default function Modal({ notification, onClick }) {
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const [isfavorite, setIsfavorite] = useState(false);

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
          <span>#{notification._id}</span>
          <button onClick={handleCloseModal}>
            <FaTimes size={24} color="#444" />
          </button>
        </div>
        <div className="details">
          <div className="box-left">
            <img src={notification.thumbnail} alt="" srcset="" />
          </div>
          <div className="box-right">
            <h1>
              <strong>{notification.title}</strong>
            </h1>
            <span>{notification.recipient.name}</span>
          </div>
        </div>
        <div className="box-info">
          <div className="description">
            <h1>Descrição</h1>
            <span>{notification.description}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
