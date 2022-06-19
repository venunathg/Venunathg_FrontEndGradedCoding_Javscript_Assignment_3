// define the time limit
let TIME_LIMIT = 60;
 
// define quotes to be used
let dummy_text_quotes = [
  "He's a hard nut to crack.",
  "Mary found knitting a hard nut to crack.",
  "Jeff: This is indeed a hard nut to crack.",
  "This is really a hard nut to crack.",
  "Where some people a hard nut to crack.",
  "It is a hard nut to crack.",
  "This problem is a hard nut to crack. ",
  "He is a hard nut to crack.",
  "My boss a hard nut to crack.",
  "That's a hard nut to crack.",
  "It was then a hard nut to crack.",
  "They say that she is a hard nut to crack.",
  "The third question in the examination is a hard nut to crack.",
  "This problem is going to be a hard nut to crack.",
  "How to tackle the non-performing asset is a hard nut to crack for bank industry all over the world.",
  "Crikey, is he a hard nut to crack. I don't think he watches MLS.",
  "When I meet a hard nut to crack, it will help me.",
  "The difficult terrain of the Pennines will be a hard nut to crack.",
  "I asked them for the money, but they were a hard nut to crack."
];
 
// selecting required elements
let timer_text = document.querySelector(".curr_time");
let accuracy_text = document.querySelector(".curr_accuracy");
let error_text = document.querySelector(".curr_errors");
let cpm_text = document.querySelector(".curr_cpm");
let wpm_text = document.querySelector(".curr_wpm");
let quote_text = document.querySelector(".quote");
let input_area = document.querySelector(".input_area");
let restart_btn = document.querySelector(".restart_btn");
let cpm_group = document.querySelector(".cpm");
let wpm_group = document.querySelector(".wpm");
let error_group = document.querySelector(".errors");
let accuracy_group = document.querySelector(".accuracy");
 
let timeLeft = TIME_LIMIT;
let timeElapsed = 0;
let total_errors = 0;
let errors = 0;
let accuracy = 0;
let characterTyped = 0;
let current_quote = "";
let quoteNo = 0;
let timer = null;

function nextQuote() {
    quote_text.textContent = null;
    current_quote = dummy_text_quotes[quoteNo];
   
    // separate each character and make an element
    // out of each of them to individually style them
    current_quote.split('').forEach(char => {
      const charSpan = document.createElement('span')
      charSpan.innerText = char
      quote_text.appendChild(charSpan)
    })
   
    // roll over to the first quote
    if (quoteNo < dummy_text_quotes.length - 1)
      quoteNo++;
    else
      quoteNo = 0;
  }

  function analyseInputText() {
 
    // get current input text and split it
    curr_input = input_area.value;
    curr_input_array = curr_input.split('');
   
    // increment total characters typed
    characterTyped++;
   
    errors = 0;
   
    quoteSpanArray = quote_text.querySelectorAll('span');
    quoteSpanArray.forEach((char, index) => {
      let typedChar = curr_input_array[index]
   
      // character not currently typed
      if (typedChar == null) {
        char.classList.remove('correct_char');
        char.classList.remove('incorrect_char');
   
        // correct character
      } else if (typedChar === char.innerText) {
        char.classList.add('correct_char');
        char.classList.remove('incorrect_char');
   
        // incorrect character
      } else {
        char.classList.add('incorrect_char');
        char.classList.remove('correct_char');
   
        // increment number of errors
        errors++;
      }
    });
   
    // display the number of errors
    error_text.textContent = total_errors + errors;
   
    // update accuracy text
    let correctCharacters = (characterTyped - (total_errors + errors));
    let accuracyVal = ((correctCharacters / characterTyped) * 100);
    accuracy_text.textContent = Math.round(accuracyVal);
   
    // if current text is completely typed
    // irrespective of errors
    if (curr_input.length == current_quote.length) {
      nextQuote();
   
      // update total errors
      total_errors += errors;
   
      // clear the input area
      input_area.value = "";
    }
  }
  function startTest() {
 
    resetTest();
    nextQuote();
   
    // clear old and start a new timer
    clearInterval(timer);
    timer = setInterval(updateTimer, 1000);
  }
   
  function resetTest() {
    timeLeft = TIME_LIMIT;
    timeElapsed = 0;
    errors = 0;
    total_errors = 0;
    accuracy = 0;
    characterTyped = 0;
    quoteNo = 0;
    input_area.disabled = false;
   
    input_area.value = "";
    quote_text.textContent = 'Click on the area below to start the game.';
    accuracy_text.textContent = 100;
    timer_text.textContent = timeLeft + 's';
    error_text.textContent = 0;
    restart_btn.style.display = "none";
    cpm_group.style.display = "none";
    wpm_group.style.display = "none";
  }

  function updateTimer() {
    if (timeLeft > 0) {
      // decrease the current time left
      timeLeft--;
   
      // increase the time elapsed
      timeElapsed++;
   
      // update the timer text
      timer_text.textContent = timeLeft + "s";
    }
    else {
      // finish the game
      finishGame();
    }
  }

  function finishGame() {
    // stop the timer
    clearInterval(timer);
   
    // disable the input area
    input_area.disabled = true;
   
    // show finishing text
    quote_text.textContent = "Click on restart to start a new game.";
   
    // display restart button
    restart_btn.style.display = "block";
   
    // calculate cpm and wpm
    cpm = Math.round(((characterTyped / timeElapsed) * 60));
    wpm = Math.round((((characterTyped / 5) / timeElapsed) * 60));
   
    // update cpm and wpm text
    cpm_text.textContent = cpm;
    wpm_text.textContent = wpm;
   
    // display the cpm and wpm
    cpm_group.style.display = "block";
    wpm_group.style.display = "block";
  }