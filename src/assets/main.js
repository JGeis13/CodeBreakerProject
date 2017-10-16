let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');
let msg = document.getElementById('message');
let results = document.getElementById('results');
let code = document.getElementById('code');

function guess() {
    let input = document.getElementById('user-guess');
    //add functionality to guess function here
    if(answer.value === '' || attempt === ''){
      setHiddenFields();
    }
    if(!validateInput(input.value)){
      return false;
    } else {
      attempt.value++;
    }
    if(getResults(input.value)){
      setMessage('You Win! :)');
      showAnswer(true);
      showReplay();
    } else if( attempt.value >= 10 ) {
      setMessage("You Lose! :(");
      showAnswer(false);
      showReplay();
    } else {
      setMessage("Incorrect, try again.");
    };
}

//implement new functions here

function setHiddenFields(){
  let rnd = Math.floor(Math.random()*10000);
  answer.value = String(rnd);
  while(answer.length < 4){
    answer.value = "0" + answer.value;
  }
  attempt.value = 0;
}

function setMessage(input){
  msg.innerHTML = input;
}

function validateInput(input){
  if(input.length === 4){
    return true;
  } else {
    setMessage("Guesses must be exactly 4 characters long.");
    return false;
  }
}

function getResults(input){
  let numCorrect = 0;
  let numInOrder = 0;
  let res = `<div class='row'><span class='col-md-6'>${input}</span>`;
  for(let i = 0; i < input.length; i++){
    if(input[i] === answer.value[i]){
      res += `<span class='glyphicon glyphicon-ok'></span>`;
      numCorrect++;
      numInOrder++;
    } else if( -1 !== answer.value.search(input[i])){
      res += `<span class="glyphicon glyphicon-transfer"></span>`;
      numCorrect++;
    } else {
      res += `<span class="glyphicon glyphicon-remove"></span>`;
    }
  }
  res += `</div>`;
  results.innerHTML += res;
  if(numCorrect === 4 && numInOrder === 4){
    return true;
  } else {
    return false;
  }
}

function showAnswer(bool){
  code.innerHTML = answer.value;
  if(bool){
    code.classList += ' success';
  } else {
    code.classList += ' failure';
  }
}

function showReplay(){
  let guess = document.getElementById('guessing-div');
  let replay = document.getElementById('replay-div');
  guess.style.display = 'none';
  replay.style.display = 'block';
}