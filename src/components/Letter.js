import React from 'react';

const Letter = React.memo(function (props) {
  return (
    <span className={props.className}>
      {props.letter === ' ' ? (
        <React.Fragment>&nbsp;</React.Fragment>
      ) : (
        props.letter
      )}
    </span>
  );

  // return <span className={props.className}>{props.letter}</span>;
});

export default Letter;
