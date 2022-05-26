/* eslint-disable no-unused-vars */
/* eslint-disable func-names */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';

function Time({ handleRedirect, start }) {
  const [time, setRTime] = useState(10);
  const countDown = setInterval(() => { setRTime(time - 1); }, 1000);
  if (time === 0) {
    clearInterval(countDown);
    // handleRedirect();
  }
  return (
    <span>{`${time}s`}</span>
  );
}

Time.defaultProps = {
  start: 30,
  countDown: true,
};

export default Time;
