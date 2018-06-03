import React from 'react'

const Notification = ({ notification }) => {
  if (notification === null) {
    return null
  } else {
    return (
      <div className="notification">
        {notification.isError ? 
          <div id="error">{notification.message}</div> : 
          <div id="info">{notification.message}</div>}
      </div>
    )
  }
}

export default Notification