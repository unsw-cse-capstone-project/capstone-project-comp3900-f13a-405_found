import React from "react";
import SubscribeButton from "../SubscribeButton";
const Podcasts = ({ podcasts, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <ul className='list-group mb-4'>
      {podcasts.map((podcasts) => (
        <li key={podcasts.id} className='list-group-item'>
          <div style={{ textAlign: "left", color: "black" }}>
            {podcasts.name}{" "}
          </div>
          <div style={{ textAlign: "right", color: "black" }}>
            <img height='60px' width='60px' src={podcasts.images[0].url} />
          </div>
          <SubscribeButton id={podcasts.id} />
        </li>
      ))}
    </ul>
  );
};

export default Podcasts;
