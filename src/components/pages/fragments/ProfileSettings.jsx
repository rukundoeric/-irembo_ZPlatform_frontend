/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import React, { useState } from 'react';
import { Toggle } from '../../shared/Input';

export default function ProfileSettings() {
  const [mfAuth, setmfAuth] = useState(false);
  const [notification, setNotification] = useState(false);
  const handleMFAuthentication = e => {
    const value = e?.target?.value;
    console.log(value);
  };
  const handleNotification = () => {
    setNotification(!notification);
  };

  return (
    <div className="d-flex w-100 settings p-4">
      <div className="d-flex w-100 flex-column">
        <div className="d-flex setting-item p-4">
          <div className="d-flex flex-column flex-grow-1 py-1">
            <h4>Multi-factor authentication</h4>
            <p>Multi-factor authentication is an electronic authentication method in which a user is granted access to a website or application only after successfully presenting two or more pieces of evidence to an authentication mechanism. Having said, that, by turning on this, you will be confirming that, before the sysytem logs you in, you will also have to provide a one-time-password that will be be shared to you via Email.</p>
          </div>
          <div className="d-flex">
            <Toggle handleOnChange={handleMFAuthentication} value={mfAuth} />
          </div>
        </div>
        <div className="d-flex setting-item p-4">
          <div className="d-flex flex-column flex-grow-1 py-1">
            <h4>Notifications</h4>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum architecto, voluptates temporibus fugit reiciendis quae modi atque blanditiis eius vel consequuntur nemo ipsum ex assumenda, praesentium dolorem incidunt a ab?</p>
          </div>
          <div className="d-flex">
            <Toggle handleOnChange={handleNotification} value={notification} />
          </div>
        </div>
      </div>
    </div>
  );
}
