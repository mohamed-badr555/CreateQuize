/// <reference path="../typings/globals/jquery/index.d.ts" />
import { Quiz } from './Quiz.js';
export class Setting {
  constructor() {
    this.categoryInput = document.getElementById("category");
    this.difficultyInput = document.getElementsByName("difficulty");
    this.numberOfQuestionsInput = document.getElementById("numberOfQuestions");
    this.startBtn = document.getElementById("startBtn");
    this.startBtn.addEventListener("click", this.StartQuiz.bind(this));

    // console.log(this.difficultyInput);
  }
  async StartQuiz() {
    let category = this.categoryInput.value;
    let numberOfQuestions = this.numberOfQuestionsInput.value;
    let difficulty = Array.from(this.difficultyInput).filter(
      (el) => el.checked
    )[0].value;
if( numberOfQuestions !==''){
  $("#alert1").fadeOut(200);
  let Api = `https://opentdb.com/api.php?amount=${numberOfQuestions}&category=${category}&difficulty=${difficulty}`;
  // console.log(Api);
  let result = await this.fetchApi(Api);
  
  if (result.length > 0) {
      // console.log("Test");

    $("#setting").fadeOut(300, function () {
     $("#quiz").fadeIn(300)
    });
  }
  // console.log(result);
let quiz =new Quiz(result);
}else{
  $("#alert1").fadeIn(200);
}
   
  }
  async fetchApi(mo) {
    let response = await fetch(mo);
    let result = await response.json();
    // console.log(result);
    return result.results;
  }
}
