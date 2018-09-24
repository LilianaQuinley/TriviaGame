$(document).ready(function () {

  $("#results").hide()
  $("#doneBtn").hide()

  $("#startBtn").click(function () {  
    console.log("startBtn");
    number = 25;
    $("#time-left").html("Time Remaining: " + number);
    run();
    $("#question").hide();
    buildQuiz();
    $("#doneBtn").show()

    $("#doneBtn").click(function(){
      console.log("done")
      $("#doneBtn").hide()
      stop()
      showResults();

    });

  })
  
  var number = 25;
  //  Variable that will hold our interval ID when we execute
  //  the "run" function
  var intervalId;

  function run() {
    clearInterval(intervalId);
    intervalId = setInterval(decrement, 1000);
  }

  function decrement() {
    console.log("decrement")
    //  Decrease number by one.
    number--;
    //  Show the number in the #show-number tag.
    $("#time-left").html("Time Remaining: " + number);
    //  Once number hits zero...
    if (number === 0) {
    //  ...run the stop function.
      stop();
      //  Alert the user that time is up.
      showResults();
      $("#doneBtn").hide();
    }
  }

  //  The stop function
  function stop() {
    //  Clears our intervalId
    //  We just pass the name of the interval
    //  to the clearInterval function.
    clearInterval(intervalId);
  }



  var quizContainer = document.getElementById("quiz")
  var resultsContainer = document.getElementById("results")

  let currentSlide = 0;
  var myQuestions = [
    {
      question: "Translate.. White and Red",
      answers: {
        a: "Verde y Naranja",
        b: "Blanco y Amarillo",
        c: "Blanco y Azul",
        d: "Blanco y  Rojo"
      },
      correctAnswer: "d"
    },
    {
      question: "Translate.. Apples, Strawberries, Bananas",
      answers: {
        a: "Manzanas, Fresas, Bananos",
        b: "Peras, Uvas, Bananos",
        c: "Tomates, Peras, Bananos",
        d: "Manzanas, Cebollas, Bananos"
      },
      correctAnswer: "a"
    },
      {
        question: "Translate.. Hi, how are you?",
        answers: {
          a: "Hola, cual es tu nombre?",
          b: "Hola, como estas?",
          c: "Hola, es esta tu casa?",
          d: "Hola, donde vives?"
        },
        correctAnswer: "b"
      },
      {
        question: "Translate.. Bye, see you soon",
        answers: {
          a: "Adios, conduce con cuidado",
          b: "Adios, que tengas un buen dia",
          c: "Adios, nos vemos pronto",
          d: "Que tengas un buen dia"
        },
        correctAnswer: "c"
      },
      {
        question: "Translate... Te gusta bailar Salsa?",
        answers: {
          a: "Do you like Mexican Salsa?",
          b: "Do you like SoapOperas?",
          c: "Do you like dancing Salsa Music?",
          d: "Bailamos?"
        },
        correctAnswer: "c"
      }
    ];

  /////  
  function buildQuiz(){
    // we'll need a place to store the HTML output
    var output = [];

    // for each question...
    myQuestions.forEach(
      (currentQuestion, questionNumber) => {
          
      // we'll want to store the list of answer choices
      var answers = [];
  
      // and for each available answer...
      for(letter in currentQuestion.answers){

        // ...add an HTML radio button
        answers.push(
        `<label>
            <input type="radio" name="question${questionNumber}" value="${letter}">
            ${letter} :
            ${currentQuestion.answers[letter]}
        </label>`
        );
      }
    
        // add this question and its answers to the output
        output.push(
            `<div class="slide">
              <div class="question"> ${currentQuestion.question} </div>
              <div class="answers"> ${answers.join("")} </div>
            </div>`
          );
        
        }
    );
    
    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join('');
  }

  ////////

  function showResults(){

      // gather answer containers from our quiz
      var answerContainers = quizContainer.querySelectorAll('.answers');
    
      // keep track of user's answers
      let numCorrect = 0;
      let numIncorrect = 0;
      let numNoAnswer = 0;
    
      // for each question...
      myQuestions.forEach( (currentQuestion, questionNumber) => {
    
        // find selected answer
        var answerContainer = answerContainers[questionNumber];
        var selector = 'input[name=question'+questionNumber+']:checked';
        var userAnswer = (answerContainer.querySelector(selector) || {}).value;
        console.log("results beloew")
        console.log(userAnswer)
        // if answer is correct
        if(userAnswer===currentQuestion.correctAnswer){
          // add to the number of correct answers
          numCorrect++;
        }
        // if answer is  blank
        else if (userAnswer===undefined){
          numNoAnswer++;
        }
        // if answer is wrong
        else {
          // add to the number of wrong answers
          numIncorrect++;
        }
      });

      console.log("Results " + numIncorrect + " " + numNoAnswer + " " + numCorrect)
    
      // show number of correct answers out of total
      $("#quiz").hide();
      $("#correct").html(numCorrect);       
      $("#incorrect").html(numIncorrect);       
      $("#NoAnswer").html(numNoAnswer); 
      $("#results").show();
    
    }
  
      
    });
    