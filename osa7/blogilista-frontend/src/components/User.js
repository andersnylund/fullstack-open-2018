import React from 'react';

const User = ({ user }) => {
  console.log({user});
  return user ?
    <div>
      <h2>{user.name}</h2>
      <h3>Added blogs</h3>
      <ul>
        {user.blogs.map(b => <li key={b._id}>{`${b.title} by ${b.author}`}</li>)}
      </ul>
    </div> :
    null;
};


export default User;