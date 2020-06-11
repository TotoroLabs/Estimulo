import React, {useState} from 'react'
import './styles.scss'
export default function Card({project}) {
    function handleClick() {
        alert('ok')
    }
return (
    <>
    <div className="card"  onClick={handleClick}>
    <div className="card-header">
      <div className="title">
        <h3>{project.name}</h3>
      </div>
      <div className="seller">
        <span>{project.owner.name}</span>
      </div>
    </div>
    <div className="card-img">
      <img
        src={project.thumbnail}
        alt=""
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
