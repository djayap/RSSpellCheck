// Example jQuery code

var words = ["accident", "actual", "knowledge", "special", "surprise"];

var synth = window.speechSynthesis;

var randomWord = 'actual';

var worngMsg = '';
var righMsg = '';


$(document).ready(function() {
    // jQuery code to handle button click
    readFileAndStore();
     $('#btn').click(giveWord);
     $('#verifySpell').click(checkSpelling);
    /* $('#inputWord').keydown(function() {
        event.preventDefault();
        $('#verifySpell').prop('disabled', false);
        event.stopPropagation();
     });*/
   //  $('#verifySpell').prop('disabled', true);
});

function readFileAndStore() {
    var filePath = 'sample.txt';
    $.get(filePath, function(data) {
    words = data.split('\n');
     words = words.map(function(line) {
            return line.trim();
     }).filter(Boolean);
     // console.log("words Array:", words);
    })
    .fail(function() {
        alert('Failed to read the file.');
    });
}

function giveWord(event) {
        event.preventDefault();
        clear();
        console.log("words.length=="+words.length)
        var randomIndex = Math.floor(Math.random() * words.length);
  		randomWord = words[randomIndex];
        $("#inputWord").val("");
         enableButton();
  		var utterance = new SpeechSynthesisUtterance(randomWord);
  		synth.speak(utterance);
  		event.stopPropagation();
}

function checkSpelling(event) {
        event.preventDefault();
    	var resultElement = $("#result");
    	enableButton();
    	inputWord = $("#inputWord").val();
    	if (randomWord == inputWord) {
    	    var rightMsg = "Well done Ria, Spelling is correct!";
    		resultElement.text(rightMsg);
    		resultElement.css('color', 'green');
    		disableButton();
    		var utterance = new SpeechSynthesisUtterance(rightMsg);
    		synth.speak(utterance);
    	} else {
    	    var worngMsg = "Loose Ria,Spelling is incorrect. ";
    		resultElement.text(worngMsg);
       		resultElement.css('color', 'red');
    		var utterance = new SpeechSynthesisUtterance(worngMsg);
    		synth.speak(utterance);
    		enableButton();
    	}
    	event.stopPropagation();
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

