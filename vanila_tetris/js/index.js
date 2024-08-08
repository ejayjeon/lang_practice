
// DOM
const playground = document.querySelector('.playground>ul');
const gameText = document.querySelector('.game-text');
const gameStart = document.querySelector('.game-start');
const scoreDisplay = document.querySelector('.score');
const retryButton = document.querySelector('.retry');
const startButton = document.querySelector('.start');

// SETTINGS
const GAME_ROWS = 20;
const GAME_COLS = 10;


const BLOCKS = {
  tree: [
    // 모양 좌표값
    [ // ㅗ
      [0, 1], [1, 0], [1, 1], [2, 1],
    ],
    [ // ㅏ
      [0, 0], [0, 1], [0, 2], [1, 1],
    ],
    [ // ㅜ
      [1, 2], [0, 1], [2, 1], [1, 1],
    ],
    [ // ㅓ
      [1, 0], [0, 1], [1, 1], [1, 2],
    ],
  ],
  nemo: [
    [
      [0, 0], [0, 1], [1, 0], [1, 1],
    ],
    [
      [0, 0], [0, 1], [1, 0], [1, 1],
    ],
    [
      [0, 0], [0, 1], [1, 0], [1, 1],
    ],
    [
      [0, 0], [0, 1], [1, 0], [1, 1],
    ],
  ],
  bar: [
    [
      [1, 0], [2, 0], [3, 0], [4, 0],
    ],
    [
      [2, -1], [2, 0], [2, 1], [2, 2],
    ],
    [
      [1, 0], [2, 0], [3, 0], [4, 0],
    ],
    [
      [2, -1], [2, 0], [2, 1], [2, 2],
    ],
  ],
  zee: [
    [
      [0, 0], [1, 0], [1, 1], [2, 1],
    ],
    [
      [0, 1], [1, 0], [1, 1], [0, 2],
    ],
    [
      [0, 1], [1, 1], [1, 2], [2, 2],
    ],
    [
      [2, 0], [2, 1], [1, 1], [1, 2],
    ],
  ],
  elLeft: [
    [
      [0, 0], [0, 1], [1, 1], [2, 1],
    ],
    [
      [1, 0], [1, 1], [1, 2], [0, 2],
    ],
    [
      [0, 1], [1, 1], [2, 1], [2, 2],
    ],
    [
      [1, 0], [2, 0], [1, 1], [1, 2],
    ],
  ],
  elRight: [
    [
      [1, 0], [2, 0], [1, 1], [1, 2],
    ],
    [
      [0, 0], [0, 1], [1, 1], [2, 1],
    ],
    [
      [0, 1], [1, 1], [2, 1], [2, 2],
    ],
    [
      [1, 0], [1, 1], [1, 2], [0, 2],
    ],
  ],
};

// VARIABLES
let score = 0;
let duration = 500;
let downInterval;
let tempMovingItem;

const movingItem = {
  type: "",
  direction: 0,
  // 위치값을 변화
  top: 0,
  left: 3,
}

// 초기화
// init();

// FUNCTIONS
function init() {
  tempMovingItem = { ...movingItem };
  for (let i = 0; i < GAME_ROWS; i++) {
    gameLine();
  }
  generateNewBlock();
}

function gameLine() {
  // 매트릭스를 나열, 20줄의 li
  const li = document.createElement('li');
  const ul = document.createElement('ul');

  // 한 줄의 ul li 안의 작은 매트릭스들
  for (let j = 0; j < GAME_COLS; j++) {
    const matrix = document.createElement('li');

    // 한 줄의 기준이 될 ul 안에 matrix를 붙임
    ul.prepend(matrix);
  }
  li.prepend(ul);
  playground.prepend(li);
}

function renderBlocks(moveType = '') {
  const { type, direction, top, left } = tempMovingItem;
  // moving 이라는 클래스를 가진 것을 모두 찾아옴
  const movingBlocks = document.querySelectorAll('.moving');
  movingBlocks.forEach((e) => {
    e.classList.remove(type, "moving");
  });


  BLOCKS[type][direction].some(e => {
    const x = e[0] + left;
    const y = e[1] + top;
    // 
    const target = playground.childNodes[y] ? playground.childNodes[y].childNodes[0].childNodes[x] : null;
    const isAvailable = checkEmpty(target);
    // 만약에 가능한 상태일 때에만 움직이게,
    if (isAvailable) {
      target.classList.add(type, 'moving')
    } else {
      tempMovingItem = { ...movingItem };
      if (moveType === 'retry') {
        clearInterval(downInterval);
        showGameOverText();
      }
      // stack이 무한정으로 불리는 것을 방지하기 위해, setTimeout으로 EventStack에 넣어둠
      setTimeout(() => {
        renderBlocks('retry');
        if (moveType === 'top') {
          seizeBlock();
        }
      }, 0);
      return true;
    }
  });
  movingItem.left = left;
  movingItem.top = top;
  movingItem.direction = direction;
}

// 블럭이 바닥에 닿아서 멈췄을 때
function seizeBlock() {
  const movingBlocks = document.querySelectorAll('.moving');
  movingBlocks.forEach((e) => {
    e.classList.remove("moving");
    e.classList.add("seized");
  });
  // 완성이 되면 새로운 블럭 생성
  checkMatch();
}

// 블럭이 맞았는지 체크하는 부분
function checkMatch() {
  const childNodes = playground.childNodes;
  childNodes.forEach(child => {
    let matched = true;
    child.children[0].childNodes.forEach(li => {
      if (!li.classList.contains('seized')) {
        matched = false;
      }
    });
    if (matched) {
      child.remove();
      score += 10;
      scoreDisplay.innerHTML = score;
      gameLine();
    }
  });
  // 블럭 만들기 전에
  generateNewBlock();
}

// 새로운 블럭을 생성하는 코드
function generateNewBlock() {

  // 자동으로 내려오게끔 Interval 생성
  clearInterval(downInterval);
  downInterval = setInterval(() => {
    moveBlock('top', 1);
  }, duration);

  // 랜덤
  const blockArray = Object.entries(BLOCKS);
  const rdIdx = Math.floor(Math.random() * blockArray.length);
  // 랜덤한 이름이 나옴
  movingItem.type = blockArray[rdIdx][0];
  movingItem.top = 0;
  movingItem.left = 3;
  movingItem.direction = 0;
  tempMovingItem = { ...movingItem };
  renderBlocks();
};



// 빈공간 체크
function checkEmpty(target) {
  if (!target || target.classList.contains('seized')) {
    return false;
  }
  return true;
}

// 블록을 움직이는 함수
function moveBlock(moveType, amount) {
  tempMovingItem[moveType] += amount;
  renderBlocks(moveType);
}

// 방향바꾸기 (up key)
function changeDirection() {
  const d = tempMovingItem.direction;
  d === 3 ? tempMovingItem.direction = 0 : tempMovingItem.direction += 1;
  renderBlocks();

}

// 스페이스바 눌렀을 때
function dropBlock() {
  clearInterval(downInterval);
  downInterval = setInterval(() => {
    moveBlock('top', 1)
  }, 10);
}

// Event Handling (방향키를 움직이기)
// 각자 고유한 값이 keycode를 사용
document.addEventListener('keydown', e => {

  switch (e.keyCode) {
    case 32:
      dropBlock();
      break;
    case 37: // left
      moveBlock('left', -1);
      break;
    case 38: // up
      changeDirection();
      // moveBlock('top', -1);
      break;
    case 39: // right
      moveBlock('left', 1);
      break;
    case 40: // down
      moveBlock('top', 1);
    default:
      break;
  }
})
function showGameOverText() {
  gameText.style.display = 'flex';
};
retryButton.addEventListener('click', () => {
  playground.innerHTML = "";
  gameText.style.display = 'none  ';
  init();
});

startButton.addEventListener('click', () => {
  playground.innerHTML = "";
  gameStart.style.display = 'none  ';
  init();
})