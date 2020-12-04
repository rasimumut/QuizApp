function Question(text,choices,answer) {
    this.text = text;
    this.choices = choices;
    this.answer= answer;
}

Question.prototype.checkAnswer = function(answer){
    return this.answer===answer;
}

function Quiz(question) {
    this.question = question;
    this.score = 0;
    this.qIndex = 0;
}

Quiz.prototype.getQuestion = function () {
    return this.question[this.qIndex];
}

Quiz.prototype.isFinish = function () {
    return this.question.length === this.qIndex;
}

Quiz.prototype.guess = function(answer) {
    var question;
    question = this.getQuestion();
    if (question.checkAnswer(answer)){
        this.score++;
    }
    this.qIndex++;
}

var q1 = new Question("Which one is a Turkish singer ?",
    ["James Hetfield","Kenan Doğulu","Dave Grohl"],"Kenan Doğulu");

var q2 = new Question("Which one is a Turkish artist ?",
    ["Beren Saat","Johnny Depp","Vanessa Paradis"],"Beren Saat");

var q3 = new Question("Which one is a Turkish politican ?",
    ["Ekrem İmamoğlu","Joe Biden","Vladimir Putin"],"Ekrem İmamoğlu");

var question =[q1,q2,q3];

//Start Quiz
var quiz = new Quiz(question);

loadQuestion();

function loadQuestion() {

    if (quiz.isFinish()){
        showScore();
    }
    else {
        var question = quiz.getQuestion();
        document.querySelector("#question").textContent = question.text;
        var choices = question.choices;
        for(var i=0; i<choices.length;i++){
            var element = document.querySelector('#choice'+i);
            element.innerHTML = choices[i];
            guess('btn'+i,choices[i]);
        }
        showProgress();
    }

}
function guess(id,guess){
    var btn = document.getElementById(id);
    btn.onclick = function(){
        quiz.guess(guess);
        loadQuestion();
    }
}

function showScore(){
    var html = `<h2>Score</h2><h4>${quiz.score}</h4>`;

    document.querySelector('.card-body').innerHTML = html;
}

function showProgress(){
    var totalQuestion = quiz.questions.length;
    var questionNumber = quiz.questionIndex+1;
    var html = 'Question '+ questionNumber + ' of ' + totalQuestion;

    if(totalQuestion === questionNumber){
        document.querySelector('#progress').innerHTML = "Quiz is Ended";
    }else{
        document.querySelector('#progress').innerHTML = html;
    }


}

showScore()







