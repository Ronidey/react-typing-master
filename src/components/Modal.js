import React from 'react';

const Modal = (props) => {
  return (
    <div className="modal">
      <div className="modal_content">
        <h1 className="modal_heading">Stats</h1>
        <p className="modal_copy">Typing Speed: {props.lps} lps</p>
        <p className="modal_copy">Mistypings: {props.mistypings}</p>
        <button className="modal-btn" onClick={props.resetGame}>
          OK
        </button>
      </div>
    </div>
  );
};

export default Modal;
