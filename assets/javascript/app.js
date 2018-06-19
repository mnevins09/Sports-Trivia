// begin document.ready function
$(document).ready(function() {

    
    
    // Define the questions variables + objects of the variables to put the variables into an Array later
    // Questions, Answers, and Index of the correct answer inside the answer array
    var question0 = {
        question: "How many players are on the ice for each hocket team during even-strength?",
        answers: ["5", "6", "4", "7"],
        correctAnswer: 1,
    }
    
    var question1 = {
        question: "In American Football (NFL), how many points does a team receive for a touchdown?",
        answers: ["7", "8", "6", "3"],
        correctAnswer: 2,
    }
    
    var question2 = {
        question: "Who is the NBA's all-time leading scorer in the playoffs?",
        answers: ["Michael Jordan", "Kareem Abdul-Jabbar", "Kobe Bryant", "Lebron James"],
        correctAnswer: 3,
    }
    
    var question3 = {
        question: "What country has won the most World Cup soccer tournaments?",
        answers: ["Brazil", "USA", "Germany", "France"],
        correctAnswer: 0,
    }
    
    var question4 = {
        question: "Which of the following is not an event in the decathlon at the Olympics?",
        answers: ["Discus Throw", "Shot Put", "Triple Jump", "400 Meter Race"],
        correctAnswer: 2,
    }
    
    var question5 = {
        question: "What pitcher holds the record for most complete games in an MLB career?",
        answers: ["Greg Maddux", "Cy Young", "Nolan Ryan", "Pedro Martinez"],
        correctAnswer: 1,
    }
    
    var question6 = {
        question: "Who is the most decorated Olympian of all time?",
        answers: ["Carl Lewis", "Mary Lou Retton", "Paavo Nurmi", "Michael Phelps"],
        correctAnswer: 3,
    }
    
    var question7 = {
        question: "What team has the most Super Bowl wins in NFL history?",
        answers: ["Pittsburgh Steelers", "Dallas Cowboys", "San Francisco 49ers", "New England Patriots"],
        correctAnswer: 0,
    }
    
    //Array of the question variables above
    var questionsArray = [question0, question1, question2, question3, question4, question5, question6, question7];
    
    // Game variable objects to use later to display in finalResults
    var gameVariables = {
        answeredCorrectly: 0,
        answeredIncorrectly: 0,
        unanswered: 0,
        currentQuestion: 0
    }
    
   
    
    // function to reset game variable totals to zero
    function resetVariables() {
        gameVariables.answeredCorrectly = 0;
        gameVariables.answeredIncorrectly = 0;
        gameVariables.unanswered = 0;
        gameVariables.currentQuestion = 0;
    }
    
    // playGame function that controls flow of game
    function displayQuestion() {
    
        // Setting the startButton, startOverButton, and answer divs to hide
        $("#startButton").hide();
        $("#startOverButton").hide();
        $("#answer").hide();
    
        // Check to see if all questions have been asked.  
        //If they have been, go to the finalResults function towards the end of this code
        if (gameVariables.currentQuestion > questionsArray.length-1) {
            finalResults();
        
        // If they haven't all been asked, move to next question 
        } else if (gameVariables.currentQuestion <= questionsArray.length) {
    
            // Display timer and start it up
            $("#timerDiv").show();
            
            //startTimer function towards the end of this code
            startTimer();
    
            // set up questionAsked div and show it
            $("#questionAsked").show();
            
            // populate theQuestion div with the question
            $("#theQuestion").html("<h3>" + questionsArray[gameVariables.currentQuestion].question + "</h3>");
            
            // populate the text of the four buttons for possible answers
            $("#button0").text(questionsArray[gameVariables.currentQuestion].answers[0]);
            $("#button1").text(questionsArray[gameVariables.currentQuestion].answers[1]);
            $("#button2").text(questionsArray[gameVariables.currentQuestion].answers[2]);
            $("#button3").text(questionsArray[gameVariables.currentQuestion].answers[3]);
        }
    }

    // function that is run when user has selected the right answer
    function correctAnswer() {
        console.log("correctAnswer function reached");
    
        // hide the questionAsked Board and display the answer board
        $("#questionAsked").hide();
        $("#answer").show();
    
        // increment answeredCorrectly which holds running tally of correct
        // guesses, and then display the results
        gameVariables.answeredCorrectly++;
        $("#answer").html("<h2><p>Correct!</p></h2>");
    
        //Wait 3 seconds then display next question
        gameVariables.currentQuestion++;
        setTimeout (function() {
            displayQuestion();
        }, 3000);
    }

    // function that is run when user has selected the wrong answer
    function incorrectAnswer() {
    
        // hide the questionAsked Board and display the answer board
        $("#questionAsked").hide();
        $("#answer").show();
    
        //Add 1 to answeredIncorrectly
        gameVariables.answeredIncorrectly++;
        $("#answer").html("<h2><p>Incorrect!</p><p>Correct answer was: " + questionsArray[gameVariables.currentQuestion].answers[questionsArray[gameVariables.currentQuestion].correctAnswer]);
    
        //Wait 3 seconds then display next question
        gameVariables.currentQuestion++;
        setTimeout (function() {
            displayQuestion();
        }, 3000);
    }
    
    // function to run when player selects an answer
    function answerSelection() {
        
        // hide the questionAsked div and stop the timer
        $("#questionAsked").hide();
        clearInterval(counter);
        $("#timerDiv").html("&nbsp;");
    
        // if answer was right
        if (userGuess.data("value") == questionsArray[gameVariables.currentQuestion].correctAnswer) {
            // run the correctAnswer function
            correctAnswer();
        }
        //If answer was wrong
        else {
            // run the incorrectAnswer function
            incorrectAnswer();
        }
    
    }
    
    // Function that runs when timer runs out
    function timesUp() {
        
        // hide the questionAsked div and display the answer div
        $("#questionAsked").hide();
        $("#answer").show();
    
        // increment unanswered questions then display the results
        gameVariables.unanswered++;
        $("#answer").html("<h2><p>Time's up!</p><p>Correct answer was: " + questionsArray[gameVariables.currentQuestion].answers[questionsArray[gameVariables.currentQuestion].correctAnswer]);
    
        //Wait 3 seconds then display next question
        gameVariables.currentQuestion++;
        setTimeout (function() {
            displayQuestion();
        }, 3000);
    }

    // function that runs a timer countdown
    function startTimer() {
        var timeout = 10;
        
        //run function to set the interval to decrease by 1 second
        function run() {
            counter = setInterval(decrement, 1000);
        }
        //decrement function to actual tell it to decrease the timer. (++ would add time to it)
        function decrement() {
            timeout--;
            $("#timerDiv").html("<h2>Time Remaining: " + timeout + "</h2>");
    
            //If timer hits 0, timer stops, display "Time's Up"
            if (timeout === 0) {
                // if time runs out, stop the timer, display time's up
                $("#timerDiv").html("&nbsp;");
                clearInterval(counter);
                //run the timesUp function
                timesUp();
            }
        }
        run();
    }
    
    //finalResults function
    function finalResults() {
    
        // show the answer div for results, show startOverButton, hide timerDiv
        $("#timerDiv").hide();
        $("#answer").show();
        $("#startOverButton").show();
    
        // populate results in answer div
        $("#answer").html("<h2><p>All done! Here's how you did!</p><p>Correct: " + gameVariables.answeredCorrectly + "</p><p>Incorrect: " + gameVariables.answeredIncorrectly + "</p><p>Unanswered: " + gameVariables.unanswered + "</p></h2>");
    }
    
        //======STARTING THE TRIVIA GAME======//

        // Begin by resetting variables to zero from the variables in the resetVariables function at the top
        resetVariables();
        
        //On click to reset variables after the starButton is clicked, and display the question
        $("#startButton").on("click", function() {
            resetVariables();
            displayQuestion();
        });
        
        //On click to reset variables after the starOverButton is clicked, and display the question
        $("#startOverButton").on("click", function() {
            resetVariables();
            displayQuestion();
        });
        
        //On click for the buttons to answer the question
        $(".options").on("click", function() {
            userGuess = $(this);
            answerSelection();
        });
    
//End document ready function
});