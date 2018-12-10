window.onload = function () {
  const holes = document.querySelectorAll('.hole');
  const moles = document.querySelectorAll('.mole');
  const startBtn = document.getElementById('start_btn');

  const holeNumber = holes.length;
  const gameTime = 10000;
  let timeHandle = false;
  let popHandle = false;
  let score = 0;
  let molesStatus = new Array(holeNumber);

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
      molesStatus[i] = 0;
      moles[i].addEventListener('click', () => {clickMole(i)});
    }
  }

  function setInnerHTMLById(element, string) {
    document.getElementById(element).innerHTML = string;
  }

  function clickMole(holeId) {
    count();
    setInnerHTMLById('score', score);
    changeMoleStatus(holeId, 'down');
  }

  function count() {
    return score++;
  }

  function changeMoleStatus(holeId, status) {
    if (status === 'up') {
      holes[holeId].classList.add('up');
      molesStatus[holeId] = 1;
    } else {
      holes[holeId].classList.remove('up');
      molesStatus[holeId] = 0;
    }
  }

  function startGame() {
    setTimeout(timeUp, gameTime);
    popHandle = setInterval(popUpMoles, 500);
  }

  function timeUp() {
    startBtn.classList.remove('hide');
    setInnerHTMLById('title', 'TIME UP!');
    for (let i = 0; i < holeNumber; i++) {
      changeMoleStatus(i, 'down');
    }
    return timeHandle = true;
  }

  function popUpMoles() {
    let holeId = 0;
    if (timeHandle) {
      clearInterval(popHandle);
    } else {
      holeId = trampoline(randomHole());
      popAndStayAWhile(holeId);
    }
  }

  function trampoline(fun) {
    while (fun && fun instanceof Function) {
      fun = fun();
    }
    return fun;
  }

  function randomHole() {
    let holeId = randomNumber(holeNumber);
    if (molesStatus[holeId]) {
      return randomHole.bind(null);
    }
    return holeId;
  }

  function randomNumber(upperLimit) {
    return Math.floor(Math.random() * upperLimit);
  }

  function popAndStayAWhile(holeId) {
    changeMoleStatus(holeId, 'up');
    setTimeout(function () {
      let popedId = holeId;
      changeMoleStatus(popedId, 'down');
    }, 1000);
  }


}