import React from 'react';

const Posts = ({ posts, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <ul className='list-group mb-4'>
      {posts.map(post => (
        <li key={post.id} className='list-group-item'>
          <div style={{textAlign: 'left', color:'black'}}>{post.name} </div>
        <div style={{textAlign: 'right'}}> <img src={post.images[2].url} /></div>
          
         
        </li>
      ))}
    </ul>
  );
};

export default Posts;
