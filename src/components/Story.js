import React from 'react';
import Letter from './Letter';

/*

1. Here i'm getting a "props.story" (strings)
2. Then i'm spilitting it by spaces and getting an array of words
3. Then spilitting each word by characters so that i could add "is-matched" class.

// ----- When to add "is-matched" class ----------
  1. Here i'm getting "props.matchedLtrIndex"
  2. "matchedLtrIndex" contains a number of how many letters have been matched (from start)
  3. If "matchedLtrIndex" is 3 that means
      --first four (0-3) letters of the story have been matched
      --i need to add class "is-matched" to first four letters
  4. That's why i have this "tracker" variable which helps in tracking letter count
  5. Here i'm nesting spans so that words don't break- each parent span contains a word 
  and each child span contains a character.
*/

const Story = React.memo(function (props) {
  let tracker = -1;

  // Spilitting story by spaces but storing spaces as well.
  const result = props.story.split(/(\s+)/).map((word, index) => {
    return (
      <span key={index}>
        {word.split('').map((ltr, index2) => {
          tracker++;

          if (props.matchedLtrIndex >= tracker) {
            return (
              <Letter
                key={`${index}_${index2}`}
                letter={ltr}
                className="is-matched"
              />
            );
          }
          return <Letter key={`${index}_${index2}`} letter={ltr} />;
        })}
      </span>
    );
  });

  return (
    <main className="main">
      <p className="story">{result}</p>
    </main>
  );
});

export default Story;
