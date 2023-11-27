// Example jQuery code

var words = ["accident", "actual", "knowledge", "special", "surprise"];

var synth = window.speechSynthesis;

var randomWord = 'actual';
var isCorrectWord = true;


$(document).ready(function() {
    readFileAndStore();
     $('#btn').click(giveWord);
     $('#verifySpell').click(checkSpelling);
});

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
        event.preventDefault();
        clear();
        if (isCorrectWord == true) {
            randomWord = generateRandomWord();
            isCorrectWord = false;
            changeBtnRepea();
         }
        speakUtterance(randomWord);
        $("#inputWord").val("");
   		event.stopPropagation();
}

function generateRandomWord() {
            var randomIndex = Math.floor(Math.random() * words.length);
      		randomWord = words[randomIndex];
      		return randomWord;
}

function checkSpelling(event) {
        event.preventDefault();
    	var resultElement = $("#result");
    	inputWord = $("#inputWord").val();
    	if (randomWord == inputWord) {
    	    var rightMsg = "Well done Rhea, Spelling is correct!";
    		resultElement.text(rightMsg);
    		resultElement.css('color', 'green');
    		disableButton();
            speakUtterance(rightMsg);
            isCorrectWord = true;
       	} else {
    	    var worngMsg = "Rhea, Spelling is incorrect. ";
    		resultElement.text(worngMsg);
       		resultElement.css('color', 'red');
            speakUtterance(worngMsg);
    		isCorrectWord = false;
    	}
    	changeBtnRepea();
    	event.stopPropagation();
}

function changeBtnRepea() {
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