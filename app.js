
var version = 'test';
var questions = [];
var congratulationsText;

var counter;


function init() {

  counter = 0;

  // Load version JSON file.
  $.getJSON('versions/' + version + '.json', (data) => {

    // Load questions into variable and shuffle.
    questions = shuffle(data['questions']);

    if (questions.length == 16) {

      // Add questions to HTML.
      shuffle($('.game-tile > .center > p')).each(function(i) {
        $(this).html(questions[i]['answer']);
      });

      // Load first question.
      $('#question').html(questions[counter]['question']);

      // Load prompt text.
      $("#header h1").html(data['prompt']);

      // Set congratulationsText (used later).
      congratulationsText = data['congratulations'];

    } else {
      alert('Error! There must be 16 questions exactly in the version file.');
    }

  });

  // Add event listeners.
  initEventListeners();
}

function initEventListeners() {
  $(".game-tile").on("click", function(event) {

    let answer = $(this).find('p').html();

    // If answer is correct.
    if (answer == questions[counter]['answer']) {

      // Highlight correct answer.
      $(this).addClass('correct');

      // Perform actions after delay.
      setTimeout(function() {

        // Remove tile.
        $('.correct').css('visibility', 'hidden');
        $('.correct').removeClass('correct');

        // Check if removing the last tile.
        if (counter == questions.length - 1) {

          // End the game.
          endGame();
        } else {

          // Next question...
          counter++;
          $('#question').html(questions[counter]['question']);
        }
      }, 400);

    } else { // Wrong answer.

      $(this).addClass('wrong');
      setTimeout(function() {
        console.log('removing class');
        $('.wrong').removeClass('wrong');
      }, 800);
    }

  });
}

function endGame() {
  $('#header h1').html(congratulationsText);
  $('#header p').css('display', 'none');
  $('#header button').css('display', 'inline-block');
}

function restart() {
  location.reload();
}

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}
