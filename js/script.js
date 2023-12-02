// Example jQuery code

var words = ["accident", "actual", "knowledge", "special", "surprise"];

var synth = window.speechSynthesis;

var randomWord = 'actual';
var isCorrectWord = true;
var savedResults = ["earth#4#5"];


$(document).ready(function(event) {
    readFileAndStore();
    preventDefault();
    setTabIndex();
     $('#btn').click(giveWord);
     $('#verifySpell').click(checkSpelling);
    // $('performanceResult').click(PerformanceReport);
});

function preventDefault() {
       $(document).on('click', function(event) {
             event.preventDefault();
        });

        $(document).on('submit', 'form', function(event) {
          event.preventDefault();
        });
}

function setTabIndex() {
         // Get all focusable elements with tabindex attribute
            var focusableElements = document.querySelectorAll('[tabindex]');
            var focusableArray = Array.from(focusableElements);
            document.addEventListener('keydown', function (event) {
                if (event.key === 'Tab') {
                    event.preventDefault(); // Prevent default tab behavior
                    var currentElement = document.activeElement;
                    var currentIndex = focusableArray.indexOf(currentElement);
                    var nextIndex = (currentIndex + 1) % focusableArray.length;
                    focusableArray[nextIndex].focus();
                }
            });
}

function readFileAndStore() {
    var filePath = 'sample.txt';
    $.get(filePath, function(data) {
    words = data.split('\n');
     words = words.map(function(line) {
            return line.trim();
     }).filter(Boolean);
    })
    .fail(function() {
        alert('Failed to read the file.');
    });
}

function giveWord(event) {
       clear();
        if (isCorrectWord == true) {
            randomWord = generateRandomWord();
            isCorrectWord = false;
            changeBtnRepeat();
         }
        speakUtterance(randomWord);
        $("#inputWord").val("");
}

function generateRandomWord() {
            var randomIndex = Math.floor(Math.random() * words.length);
      		randomWord = words[randomIndex];
      		return randomWord;
}

function checkSpelling(event) {
    	var resultElement = $("#result");
    	inputWord = $("#inputWord").val();
    	if (randomWord == inputWord) {
    	    var rightMsg = "Well done Rhea, Spelling is correct!";
            setAction(rightMsg, true);
       	} else {
    	    var worngMsg = "Rhea, Spelling is incorrect. It is not "+inputWord +".";
    	    setAction(worngMsg, false);
    	}
    //	updateData(isCorrectWord);
    	changeBtnRepeat();
}

function setAction(msg,isWordRight) {
        isCorrectWord = isWordRight;
        var resultElement = $("#result");
    	resultElement.text(msg);
    	if (isCorrectWord) {
    	    resultElement.css('color', 'green');
    	} else {
    	    resultElement.css('color', 'red');
    	}
        disableButton();
        speakUtterance(msg);
}

function updateData(isCorrectWord) {
  if(dataexist(randomWord) > 0) {
        console.log("HEREH IS TE DATA")
  } else {

    // Your JSON entry (a string)
            jsonEntry = {};
            jsonEntry["name"] = randomWord;
            jsonEntry["correct"] =  (isCorrectWord) ?  1: 0;
            jsonEntry["incorrect"] = 0;

            // Parse the JSON string into a JavaScript object
            var parsedData = JSON.stringify(jsonEntry);
  }
}

function changeBtnRepeat() {
    if (isCorrectWord == false) {
       $('#btn').text("Repeat word");
    } else {
        $('#btn').text("Give a word");
    }
}

function enableButton() {
  $('#verifySpell').prop('disabled', false);
  $('#btn').prop('disabled', true);
}

function disableButton() {
  $('#verifySpell').prop('disabled', false);
  $('#btn').prop('disabled', false);
}

function clear() {
   $("#inputWord").val();
   $("#result").text("");
}

function speakUtterance(msg) {
    var utterance = new SpeechSynthesisUtterance(msg);
    utterance.lang = "en-GB";
    synth.speak(utterance);
}





