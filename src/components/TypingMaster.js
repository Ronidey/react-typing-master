import React, { Component } from 'react';
import Modal from './Modal';
import stories from '../data/stories.json';
import Header from './Header';
import Story from './Story';
import PrevNext from './PrevNext';
import Footer from './Footer';

class TypingMaster extends Component {
  constructor(props) {
    super(props);

    this.resetGame = this.resetGame.bind(this);
    this.nextClickHandler = this.nextClickHandler.bind(this);
    this.prevClickHandler = this.prevClickHandler.bind(this);

    this.currentStoryCount = 0;

    this.state = {
      storyArr: stories[this.currentStoryCount].split(''),
      matchedLtrIndex: -1,
      mistypings: 0,
      seconds: 0,
      lps: null,
      typingOver: false
    };

    this.baseState = this.state;
  }

  componentDidMount() {
    // Setting keypress event
    window.addEventListener('keypress', (e) => {
      const { storyArr } = this.state;

      // As soon as user starts typing start the timer
      if (!this.timerID) {
        this.setTimer();
      }

      if (!this.state.typingOver) {
        const ltrToMatch = storyArr[this.state.matchedLtrIndex + 1]; //next letter to match
        const ltrCharCode = ltrToMatch.charCodeAt();

        // if keycode is same as next letter's char code
        if (ltrCharCode === e.keyCode) {
          this.setState(
            (prevState) => ({
              matchedLtrIndex: prevState.matchedLtrIndex + 1
            }),
            // callback function after setstate
            () => {
              // When all letters are matched
              if (this.state.matchedLtrIndex + 1 === storyArr.length) {
                const lps = storyArr.length / this.state.seconds;

                this.clearTimer();
                this.setState({ typingOver: true, lps: lps.toFixed(1) });
              }
            }
          );

          // If keycode is different than next letter's keycode
        } else {
          this.setState((prevState) => ({
            mistypings: prevState.mistypings + 1
          }));
        }
      }
    });
  }

  setTimer() {
    this.timerID = setInterval(() => {
      this.tick();
    }, 1000);
  }

  tick() {
    this.setState((prevState) => ({ seconds: prevState.seconds + 1 }));
  }

  clearTimer() {
    clearInterval(this.timerID);
    this.timerID = null;
  }

  resetGame() {
    const currentStory = stories[this.currentStoryCount];

    this.clearTimer();
    this.baseState.storyArr = currentStory.split('');
    this.setState(this.baseState);
  }

  nextClickHandler(e) {
    this.currentStoryCount++;
    this.resetGame();
    e.target.blur();
  }

  prevClickHandler(e) {
    this.currentStoryCount--;
    this.resetGame();
    e.target.blur();
  }

  render() {
    return (
      <div className="app-container">
        {this.state.typingOver && (
          <Modal
            mistypings={this.state.mistypings}
            lps={this.state.lps}
            resetGame={this.resetGame}
          />
        )}
        <Header />
        <Story
          story={this.state.storyArr.join('')}
          matchedLtrIndex={this.state.matchedLtrIndex}
          changeStoryHandler={this.changeStoryHandler}
        />
        <PrevNext
          currentStoryCount={this.currentStoryCount}
          totalStories={stories.length}
          prevClickHandler={this.prevClickHandler}
          nextClickHandler={this.nextClickHandler}
        />
        <Footer />
      </div>
    );
  }
}

export default TypingMaster;
