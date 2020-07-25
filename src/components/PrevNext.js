import React from 'react';

const PrevNext = React.memo((props) => (
  <div className="prev-next-wrapper">
    <button
      disabled={props.currentStoryCount === 0}
      className="btn-change btn-change-prev"
      onClick={props.prevClickHandler}
    >
      &#8678; Prev
    </button>
    <button
      disabled={props.currentStoryCount + 1 === props.totalStories}
      className="btn-change btn-change-next"
      onClick={props.nextClickHandler}
    >
      Next &#8680;
    </button>
  </div>
));

export default PrevNext;
