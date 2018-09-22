$(document).ready(function () {

    
    // $(".btn-primary btn-lg").click(function () {  
    //     resultado.hide(1000);
    // })
    // pagination
    var previousButton = document.getElementById("previous") 
    var nextButton = document.getElementById("next")

    var quizContainer = document.getElementById("quiz")
    var resultsContainer = document.getElementById("results")
    var submitButton = document.getElementById("submit")
    let currentSlide = 0;
    var myQuestions = [
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
    function showSlide(n) {
        console.log("Printing out my slides")
        console.log(slides)
        console.log("Done printing out my slides")
        slides[currentSlide].classList.remove('active-slide');
        slides[n].classList.add('active-slide');
        currentSlide = n;
        if(currentSlide===0){
          previousButton.style.display = 'none';
        }
        else{
          previousButton.style.display = 'inline-block';
        }
        if(currentSlide===slides.length-1){
          nextButton.style.display = 'none';
          submitButton.style.display = 'inline-block';
        }
        else{
          nextButton.style.display = 'inline-block';
          submitButton.style.display = 'none';
        }
      }
      buildQuiz();
      var slides = document.querySelectorAll(".slide");
      showSlide(0);
    ///////

    function showNextSlide() {
        showSlide(currentSlide + 1);
      }
      
      function showPreviousSlide() {
        showSlide(currentSlide - 1);
      }
      
      previousButton.addEventListener("click", showPreviousSlide);
      nextButton.addEventListener("click", showNextSlide);

      //////

    
  
      // on submit, show results
      $("#submitButton").click(showResults);
      
    
      function buildQuiz(){
        // we'll need a place to store the HTML output
        var output = [];
        console.log("Build quiz is happening " + currentSlide)
        console.log(myQuestions)
        console.log("Done with myquestions")
        
        // for each question...
        myQuestions.forEach(
            (currentQuestion, questionNumber) => {
                console.log("Question: " + currentQuestion + " --> " + questionNumber)
        
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
      
        // for each question...
        myQuestions.forEach( (currentQuestion, questionNumber) => {
      
          // find selected answer
          var answerContainer = answerContainers[questionNumber];
          var selector = 'input[name=question'+questionNumber+']:checked';
          var userAnswer = (answerContainer.querySelector(selector) || {}).value;
      
          // if answer is correct
          if(userAnswer===currentQuestion.correctAnswer){
            // add to the number of correct answers
            numCorrect++;
      
            // color the answers green
            answerContainers[questionNumber].style.color = 'lightgreen';
          }
          // if answer is wrong or blank
          else{
            // color the answers red
            answerContainers[questionNumber].style.color = 'red';
          }
        });
      
        // show number of correct answers out of total
        resultsContainer.innerHTML = numCorrect + ' out of ' + myQuestions.length;
      }
    
        
    });
    