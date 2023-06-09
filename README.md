# Coding Quiz Challenge

deployment: https://aldabagh.github.io/quiz-app/ 

## About
Timed coding quiz with multiple-choice questions. This app will run in the browser and will feature dynamically updated HTML and CSS powered by JavaScript. It will have a clean, polished, and responsive user interface.


## Homework Assignment Given Design

![Given Design](./assets/images/given.gif)

## Functionality
- Dynamically creates ```<li>``` tags from a supplied question and answer arrays, assigns ```id="correct"``` to the correct answer for to be read by JavaScript.
- Highscores are stored in the DOM local storage.
- Highscore Array is sorted (high to low) before storing so can be easily pushed into with new values at the correct index.
- JavaScript Timer Interval decrements by 5 seconds, if the incorrect answer is chosen. Final score derived from time.
- Dynamically displayed page and multiple functions make it easy to restart the game once a round is complete