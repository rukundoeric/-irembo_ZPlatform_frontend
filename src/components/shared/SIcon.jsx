/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';

export default function SIcon({
  elmId, styleClass, icon, title, link, elemRef, handleClick,
}) {
  return (
    <div
      ref={elemRef}
      id={elmId}
      title={title || ''}
      className={`${
        styleClass || 'icon'
      } d-flex justify-content-center align-items-center`}
      onClick={e => {
        e.preventDefault();
        handleClick(e, link);
        // if (link) {
        //   const win = window.open(link, '_self');
        //   win.focus();
        // }
      }}
    >
      <span>
        <i className={icon} />
      </span>
    </div>
  );
}
