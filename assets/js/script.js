//container
    var containerQuestionEl = document.getElementById("question-container");
    var containerStartEl = document.getElementById("starter-container");
    var containerEndEl = document.getElementById("end-container")
    var containerScoreEl = document.getElementById("score-banner")
    var containerHighScoresEl = document.getElementById("high-score-container")
    
    var formInitials = document.getElementById("initials-form")
    
    var ViewHighScoreEl = document.getElementById("high-scores")
    var listHighScoreEl = document.getElementById("high-score-list")
    
//questions
    var correctEl = document.getElementById("correct")
    var wrongEl = document.getElementById("wrong")

//buttons
    var btnStartEl = document.querySelector("#start-game");
    var btnGoBackEl = document.querySelector("#go-back")
    var btnClearScoresEl = document.querySelector("#clear-high-scores")


    var questionEl = document.getElementById("question")
    var answerbuttonsEl = document.getElementById("answer-buttons")

//timer start
    var setTime = function () {
        timeleft = 60;

    var timercheck = setInterval(function() {
        timerEl.innerText = timeleft
        timeleft--
       
        if (gameover) {
            clearInterval(timercheck)
        }

        if (timeleft < 0) {
            showScore ()
            timerEl.innerText = 0
            clearInterval(timercheck)
        }
        }, 1000)
    }

    var timerEl = document.querySelector("#timer")
    var score = 0
    var timeleft;
    var gameover
    timerEl.innerText = 0
//timer end

    var HighScores = []

    var arrayShuffledQuestions
    var QuestionIndex = 0


    btnStartEl.addEventListener("click", startGame)

// Question options
    var questions = [
        {   que: "How do you write a comment in JavaScript?",
            options: [{choice: '1.<!-- this -->'},{choice: '2.// this'}, {choice:' 3./* this */'},{choice: '3. "this"'}],
            a: '2.// this'
        },
        {   que: "Inside which HTML element do we put JavaScript?",
            options: [{choice:'1. <script>'}, {choice:' 2. <js>'}, {choice: '3. <javascript>'}, {choice: '4. <head>'}],
            a: '1. <script>'
        },
        {
            que: "Where is the correct place insert a JavaScript?",
            options: [{choice:'1.  The <head> section'}, {choice:'2. Both the <head> section and the <body> section are correct'}, {choice: '3. The <body> section'}, {choice: '4. The <footer> section'}],
            a: '2. Both the <head> section and the <body> section are correct'
        },
        {   que: "How do you write 'hello world' in an alert box?",
            options: [{choice:'1.alert("hello world")'}, {choice:' 2. msgBox("hello world")'}, {choice: '3. alertBox("hello world")'}, {choice: '4. msg("hello world")'}],
            a: '1.alert("hello world")' 
        },
        {   que: "Which event occurs when the user clicks on an HTML element?",
            options: [{choice:'1. onchange'}, {choice:' 2. onmouseover'}, {choice: '3. click'}, {choice: '4. onclick'}],
            a: '4. onclick' 
        },
        {   que:"Which operator is used to assign a value to a variable?",
            options:[{choice:'1. x'}, {choice:' 2. *'}, {choice: '3. ='}, {choice: '4. -'}],
            a: '3. ='
        },
        {
            que:"What is the correct way to write a JavaScript array?",
            options:[{choice:'1. var colors = 1 = ("red"), 2 = ("green"), 3 = ("blue")'}, {choice:'2. var colors = ["red", "green", "blue"]'}, {choice: '3. var colors = (1:"red", 2:"green", 3:"blue")'}, {choice: '4. var colors = "red", "green", "blue"'}],
            a:'2. var colors = ["red", "green", "blue"]'
        }
    ];

    var StartPage = function () {
        containerHighScoresEl.classList.add("hidden")
        containerHighScoresEl.classList.remove ("visible")
        containerStartEl.classList.remove("hidden")
        containerStartEl.classList.add("visible")
        containerScoreEl.removeChild(containerScoreEl.lastChild)
        QuestionIndex = 0
        gameover = ""
        timerEl.textContent = 0
        score = 0

        if (correctEl.className = "visible") {
            correctEl.classList.remove("visible");
            correctEl.classList.add("hidden");
        }
        if (wrongEl.className = "visible") {
            wrongEl.classList.remove("visible");
            wrongEl.classList.add("hidden");
        }
    }

    var resetAnswers = function () {
        while (answerbuttonsEl.firstChild) {
            answerbuttonsEl.removeChild(answerbuttonsEl.firstChild)
        };
    };

    var displayQuestion = function(index) {
        questionEl.innerText = index.que
        for (var i = 0; i < index.options.length; i++) {
            var answerbutton = document.createElement('button')
            answerbutton.innerText = index.options[i].choice 
            answerbutton.classList.add('btn')
            answerbutton.classList.add('answerbtn')
            answerbutton.addEventListener("click", answerCheck)
            answerbuttonsEl.appendChild(answerbutton)
        }
    };

    var answerCorrect = function () {
        if (correctEl.className = "hidden") {
            correctEl.classList.remove("hidden")
            correctEl.classList.add("banner")
            wrongEl.classList.remove("banner")
            wrongEl.classList.add("hidden")
        }
    }
    var answerWrong = function () {
        if (wrongEl.className = "hidden"){
            wrongEl.classList.remove("hidden")
            wrongEl.classList.add("banner")
            correctEl.classList.remove("banner")
            correctEl.classList.add("hidden")
        }
    }

    var answerCheck = function(event) {
        var selectedanswer = event.target
            if (arrayShuffledQuestions[QuestionIndex].a === selectedanswer.innerText) {
                answerCorrect()
                score = score + 7
        }
            else {
                answerWrong()
                score = score - 1;
                timeleft = timeleft - 3
        };
        
        QuestionIndex++
            if (arrayShuffledQuestions.length > QuestionIndex + 1) {
            setQuestion()
        }
            else {
                gameover = "true";
                showScore ();
            }
    }

    var showScore = function () {
        containerQuestionEl.classList.add("hidden");
        containerEndEl.classList.remove("hidden");
        containerEndEl.classList.add("visible");

        var scoreDisplay = document.createElement("p");
        scoreDisplay.innerText = ("Your final score is " +score + ".");
        containerScoreEl.appendChild(scoreDisplay);
    }
    
    var createScore = function(event) {
        event.preventDefault()
        var initials = document.querySelector("#initials-form").value;
        if (!initials) {
            alert("Enter your initials!");
        }
        
        var HighScore = {
            initials: initials,
            score: score
        }

    while (listHighScoreEl.firstChild) {
        listHighScoreEl.removeChild(listHighScoreEl.firstChild)
    }
    for (var i = 0; i < HighScore.length; i++) {
        var highscoreEl = document.createElement("li");
        highscoreEl.className = "high-score";
        highscoreEl.innerHTML = HighScores[i].initials + " - " + HighScores[i].score;
        listHighScoreEl.appendChild(highscoreEl);
    }

        keepHighScore();
        displayHighScores();
    }

    var loadHighScore = function () {
        var LoadedScores = localStorage.getItem("HighScores")
            if (!LoadedScores) {
                return false;
            }

            for (var i = 0; i < LoadedScores.length; i++) {
                var highscoreEl = document.createElement("li");
                highscoreEl.ClassName = "high-score";
                highscoreEl.innerText = LoadedScores[i].initials + " - " + LoadedHighScores[i].score;
                listHighScoreEl.appendChild(highscoreEl);

                HighScores.push(LoadedScores[i]);

            }
    }
    var startGame = function () {
        containerStartEl.classList.add('hidden');
        containerStartEl.classList.remove('visible');
        containerQuestionEl.classList.remove('hidden');
        containerQuestionEl.classList.add('visible');
        arrayShuffledQuestions = questions.sort(() => Math.random() - 0.5)
        setTime()
        setQuestion()
    }
    btnGoBackEl.addEventListener("click", StartPage)


    var setQuestion = function() {
        resetAnswers()
        displayQuestion(arrayShuffledQuestions[QuestionIndex])
    }
    var keepHighScore = function () {
        localStorage.setItem("HighScores", JSON.stringify(HighScores))
    }

    var displayHighScores = function() {

        containerHighScoresEl.classList.remove("hidden");
        containerHighScoresEl.classList.add("visible");
        gameover = "true"

        if(containerEndEl.className = "visible"){
            containerEndEl.classList.remove("visible");
            containerEndEl.classList.add("hidden");
        }
        if (containerStartEl.className = "visivle") {
            containerStartEl.classList.remove("visible");
            containerStartEl.classList.add("hidden");
        }
        if (containerQuestionEl.className = "visible") {
            containerQuestionEl.classList.remove("visible");
            containerQuestionEl.classList.add("hidden")
        }
        if (correctEl.className = "visible") {
            correctEl.classList.remove("visible");
            correctEl.classList.add("hidden");
        }
        if (wrongEl.className = "visible") {
            wrongEl.classList.remove("show");
            wrongEl.classList.add("hidden");
        }
    }

    var clear = function () {
        HighScores = [];

        while (listHighScoreEl.firstChild) {
            listHighScoreEl.removeChild(listHighScoreEl.firstChild);
        }

        localStorage.clear(HighScores);
    }

    btnStartEl.addEventListener("click", startGame)
    formInitials.addEventListener("submit", createScore)
    btnClearHighScoresEl.addEventListener("click", clear)
    HighScores.addEventListener("click", displayHighScores)