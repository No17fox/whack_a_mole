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
    popUpMoles();
  }

  function timeUp() {
    startBtn.classList.remove('hide');
    setInnerHTMLById('title', 'TIME UP!');
    return timeHandle = true;
  }



}