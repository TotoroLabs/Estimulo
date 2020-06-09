import React, {useState} from 'react'
import './styles.scss'
import Modal from '../Modal'
export default function Card({user, project}) {
  const [modalisopen, setModalisopen] = useState(false);
  function evoqueModal() {
    setModalisopen(true)
  }
  function handleCloseModal() {
    setModalisopen(false);
  }
return (
    <>
    { modalisopen ? <Modal project={project} user={user} onClick={handleCloseModal}/> : null }
    <div className="card" >
    <div className="card-header">
      <div className="title" onClick={() => evoqueModal()}>
        <h3>{project.name}</h3>
      </div>
      <div className="seller">
        <span>{project.owner.name}</span>
      </div>
    </div>
    <div className="card-img" onClick={() => evoqueModal()}>
      <img
        src={project.photo}
        alt=""
        srcset=""
      />
    </div>
    <div className="card-info">
      <div className="description">
        <p>
          {project.description}
        </p>
      </div>
      <div className="hashtags">
        <span>
          {project.hashtags.map((hashtag, index) => (
            <strong key={index}>#{hashtag} </strong>
          ))}
        </span>
      </div>
    </div>
    </div>
    </>
);
}
