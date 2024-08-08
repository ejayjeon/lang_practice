/* 변수 */
const wordInput = document.querySelector('.word-input');
const wordDisplay = document.querySelector('.word-display');
const scoreDisplay = document.querySelector('.score');
const timeDisplay = document.querySelector('.time');
const startButton = document.querySelector('.button');

const START_GAME = '게임 시작';
const GAME_TIME = 20;
let score = 0;
let time = GAME_TIME;
let isPlaying = false;
let timeInterval;
let checkInterval;
let words = [];


init();

function init() {
  buttonChange('게임 로딩중 ...');
  getWords();
  wordDisplay.innerText = words[0];
  wordInput.addEventListener('input', checkMatch);

}


/* 게임 실행 */
function run() {
  if (isPlaying) {
    return;
  }
  isPlaying = true;
  time = GAME_TIME;
  wordInput.focus();
  scoreDisplay.innerText = 0;
  timeInterval = setInterval(countDown, 1000);
  checkInterval = setInterval(checkStatus, 50);
  buttonChange('게임 중');
}

/* 생성할 단어 불러오기 */
function getWords() {
  axios.get('https://random-word-api.herokuapp.com/word?number=100')
    .then(function (res) {
      res.data.forEach((word) => {
        if (word.length < 10) {
          words.push(word);
        }
      })
      buttonChange(START_GAME);
    })
    .catch(function (err) {
      console.log(err);
    });
}

/* 상황 체크 */
function checkStatus() {
  if (!isPlaying && time === 0) {
    buttonChange(START_GAME);
    clearInterval(checkInterval);
  }
}

/* 생성된 단어와, 입력값이 맞는지 체크 */
function checkMatch() {
  // 단어 비교
  if (wordInput.value.toLowerCase() === wordDisplay.innerText.toLowerCase()) {
    wordInput.value = "";
    if (!isPlaying) {
      return;
    }
    score++;
    scoreDisplay.innerText = score;
    const rdIdx = Math.floor(Math.random() * words.length);
    wordDisplay.innerText = words[rdIdx];
  }
}





/* 타임 카운트다운 */
function countDown() {
  time > 0 ? time-- : isPlaying = false;
  timeDisplay.innerText = time;
  if (isPlaying === false) {
    clearInterval(timeInterval);
  }
}

buttonChange(START_GAME);

/* 버튼 이벤트 */
function buttonChange(text) {
  startButton.innerText = text;
  text === START_GAME ? startButton.classList.remove('loading') : startButton.classList.add('loading');
}

