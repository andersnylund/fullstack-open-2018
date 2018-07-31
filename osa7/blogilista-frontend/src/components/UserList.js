import React from 'react';

const UserList = ({ users }) => {

  const list = users.map(u => {
    return (
      <tr key={u.id}>
        <td>{u.name}</td><td>{u.blogs.length}</td>
      </tr>
    );
  });

  return (
    <div>
      <h3>Users</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th><th>Blogs added</th>
          </tr>
        </thead>
        <tbody style={{ textAlign: 'right' }}>
          {list}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;