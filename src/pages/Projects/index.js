import React, { useState, useEffect } from 'react';
import LiteNavSearch from '../../Components/LiteNavSearch';
import Card from '../../Components/Card';
import mongodb from '../../services/mongodb';
import { useCookies } from 'react-cookie';
import { CircularProgress, makeStyles } from '@material-ui/core';
import './styles.scss';
export default function Projects({ history }) {
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const [city, setCity] = useState('');
  const [user, setUser] = useState(null);
  const [isloading, setIsloading] = useState(true);
  const [vouchers, setVouchers] = useState([]);
  const [filter, setFilter] = useState('');
  async function getCords() {
    if (!city) {
      const apigeolocation = await fetch(
        'https://location.services.mozilla.com/v1/geolocate?key=test'
      ).then((el) => el.json());
      const apicity = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${apigeolocation.location.lat}&longitude=${apigeolocation.location.lng}&localityLanguage=en`
      ).then((el) => el.json());
      setCity(apicity.locality);
      const response = await api.get(`/vouchers/cidade/${apicity.locality}`);
      setVouchers(response.data);
      setIsloading(false);
    } else {
      const response = await api.get(`/vouchers/cidade/${city}`);
      setVouchers(response.data);
      setFilter('');
      setIsloading(false);
    }
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      () => {
        getCords();
      },
      (err) => {
        console.log(err);
        if (err.code === 2) {
          getCords();
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
      }
    );
  }, [getCords]);

  useEffect(() => {
    async function getUserData() {
      await mongodb
        .get('/user', {
          headers: { Authorization: `Bearer ${cookies.token}` },
        })
        .then((response) => {
          setUser(response.data);
          console.log(response.data.favorites);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    if (cookies.token) {
      getUserData();
    } else {
      history.push('/login');
    }
  }, [cookies.token, history]);
  async function handleInputField(data) {
    const response = await api.get(
      `/vouchers/cidade/${city}/filtro/${data.inputfield}`
    );
    setVouchers(response.data);
    setFilter(data.inputfield);
    window.scrollTo(0, 0);
  }
  return (
    <section id="projects">
      <Litenav onSubmit={handleInputField} user={user} history={history} />
      {isloading ? <CircularProgress color="inherit" /> : null}

      <div className="content">
        {isloading ? <CircularProgress color="inherit" /> : null}

        <div className="box-info-results">
          <div className="info-results">
            <span>{filter ? `Resultados da categoria: ${filter}` : null}</span>
          </div>
          <div className="box-revert" onClick={getCords}>
            <span>{filter ? `Remover filtros de pesquisa` : null}</span>
          </div>
        </div>
        {vouchers.length === 0 && !isloading ? (
          <h1 style={{ marginTop: 20 }}>
            Desculpe, não encontramos nada em sua região :(
          </h1>
        ) : null}
        {vouchers.map((voucher) => (
          <Card key={voucher._id} voucher={voucher} user={user} />
        ))}
      </div>
    </section>
  );
}
