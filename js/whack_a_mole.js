window.onload = function () {
  const holes = document.querySelectorAll('.hole');
  const moles = document.querySelectorAll('.mole');
  const startBtn = document.getElementById('start_btn');

  const holeNumber = holes.length;
  const gameTime = 10000;
  let timeHandle = false;
  let popHandle = false;
  let score = 0;
  let lastMolesStatus = new Array(holeNumber);
  let currentMolesStatus = new Array(holeNumber);

  startBtn.addEventListener('click', function() {
    showBtnAnimation();
    resetGame();
    startGame();
  }, false);

  function showBtnAnimation() {
    event.preventDefault();
    startBtn.classList.add('animate');
    setTimeout(() => {
      startBtn.classList.remove('animate');
      startBtn.classList.add('hide');
    }, 700);
  }


  function resetGame() {
    if (startBtn.innerHTML === 'Start!') {
        setInnerHTMLById('start_btn', 'Restart!');
      }
    if (document.getElementById('title').innerHTML != 'WHACK-A-MOLE!') {
      setInnerHTMLById('title', 'WHACK-A-MOLE!');
    }
    if (document.getElementById('score').innerHTML != '0') {
      setInnerHTMLById('score', '0');
      score = 0;
    }
    timeHandle = false;
    for (let i = 0; i < holeNumber; i++) {
      lastMolesStatus[i] = 0;
      currentMolesStatus[i] = 0;
    }
  }

  function setInnerHTMLById(element, string) {
    document.getElementById(element).innerHTML = string;
  }

  function startGame() {
    setTimeout(timeUp, gameTime);
  }

  function timeUp() {
    startBtn.classList.remove('hide');
    setInnerHTMLById('title', 'TIME UP!');
    return timeHandle = true;
  }

  function popUpMoles() {
    if (timeHandle) {
      clearInterval(popHandle);
    } else {
      let holeId = randomHole();
      popAndStayAWhile(holeId);
      lastMolesStatus = currentMolesStatus;
    }
  }

  function randomHole() {
    let holeId = Math.floor(Math.random() * totalholes);
    if (lastMolesStatus[holeId]) {
      return randomHole();
    } else {
      return holeId;
    }
  }

  function popAndStayAWhile(holeId) {
    holes[holeId].classList.add('up');
    currentMolesStatus[holeId] = 1;
    for (let i = 0; i < holeNumber; i++) {
      if (currentMolesStatus[i] === 1 && currentMolesStatus[i] != lastMolesStatus[i]) {
        setTimeout(function () {
          let currentId = i;
          holes[currentId].classList.remove('up');
          currentMolesStatus[currentId] = 0;
        }, 2000);
      }
    }
  }
}