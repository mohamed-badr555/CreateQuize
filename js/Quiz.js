/// <reference path="../typings/globals/jquery/index.d.ts" />
export class Quiz{
constructor(params) {
    this.Response=params;
    this.NumberQues=params.length;
    this.CurrentQues=0;
    this.nextBtn=document.getElementById('next');
    this.answerElememt=document.getElementsByName("answer");

    this.score=0;
    // console.log(this.Response);
    this.ShowQuestion()
    this.nextBtn.addEventListener('click', this.nextQuestion.bind(this))

}

ShowQuestion(){
document.getElementById('question').innerHTML=this.Response[this.CurrentQues].question;
document.getElementById('currentQuestion').innerHTML=this.CurrentQues+1;
document.getElementById('totalNumberOfQuestions').innerHTML=this.NumberQues;

let answers=[this.Response[this.CurrentQues].correct_answer,...this.Response[this.CurrentQues].incorrect_answers]
// console.log(answers);
function shuffle(answers) {
    var tmp, current, top = answers.length;
    if(top) while(--top) {
      current = Math.floor(Math.random() * (top + 1));
      tmp = answers[current];
      answers[current] = answers[top];
      answers[top] = tmp;
    }
    return answers;
  }

let answersArr=shuffle(answers);
// console.log(answersArr);
let temp=``;
for (let i = 0; i < answersArr.length; i++) {
   temp +=`
   <div class="form-check">
                <label class="form-check-label">
                    <input type="radio" class="form-check-input" name="answer" value="${answersArr[i]}" >
                   ${answersArr[i]}
                </label>
               </div>   
   `;
    
}
document.getElementById('rowAnswer').innerHTML=temp;
}

nextQuestion() {
    let ansLength=[...this.answerElememt].filter(el => el.checked);
    if(ansLength.length ==1)
        {
            $('#alert').fadeOut(200)
            this.checkAnswe()
            this.CurrentQues++;
            if(this.CurrentQues === this.NumberQues)
                {
                    $("#quiz").fadeOut(200,function(){
                        $("#finish").fadeIn(200)
                    })
                    /// Finish Screen
                    document.getElementById("score").innerHTML=`${this.score} / ${this.NumberQues} `;
                    $('#tryBtn').click(function(){
                        $("#finish").fadeOut(200,function(){
                            $("#setting").fadeIn(200);
                        })
                    })
                }else{
        
                    // console.log(this.CurrentQues);
                    // console.log("hello");
                    this.ShowQuestion()
                }
        }else
        {
            $('#alert').fadeIn(200)
        }

}
checkAnswe(){
    // console.log("hello");
    let userAnswer=[...this.answerElememt].filter(el => el.checked)[0].value;
    let correctAnswer=this.Response[this.CurrentQues].correct_answer;
    if(userAnswer === correctAnswer ){
        this.score++;
        $("#Correct").fadeIn(300,function(){
            $("#Correct").fadeOut(300);
        })
    }else{
        $("#inCorrect").fadeIn(200,function(){
            $("#inCorrect").fadeOut(200);
        })
    }
        // console.log(userAnswer);
}
}