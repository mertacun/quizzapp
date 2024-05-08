const start_btn = document.querySelector(".start-btn button");
const rules = document.querySelector(".rules");
const exit_btn = document.querySelector(".buttons .exit");
const continue_btn = document.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz-box");
const result = document.querySelector(".result");
const option_list = document.querySelector(".option-list");
const time_line = document.querySelector("header .time-line");
const timeText = document.querySelector(".timer .time-left-text");
const timeCount = document.querySelector(".timer .timer-sec");

start_btn.onclick = () => {
 rules.classList.add("activeInfo");
}

exit_btn.onclick = () => {
 rules.classList.remove("activeInfo");
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

shuffle(questions);

const limitedQuestions = questions.slice(0, 10);

continue_btn.onclick = () => {
 rules.classList.remove("activeInfo");
    quiz_box.classList.add("activeQuiz");
    startTimer(15);
    startTimerLine(0);
    shuffle(limitedQuestions);
    showQuestions(0);
    que_count = 0;
    que_numb = 1;
    queCounter(que_numb);
};

let timeValue = 15;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

const restart_quiz = result.querySelector(".buttons .restart");
restart_quiz.onclick = () => {
    quiz_box.classList.add("activeQuiz");
    result.classList.remove("activeResult");
    timeValue = 15;
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
    showQuestions(que_count);
    queCounter(que_numb);
    clearInterval(counter);
    clearInterval(counterLine);
    startTimer(timeValue);
    startTimerLine(widthValue);
    timeText.textContent = "Time Left";
    next_btn.classList.remove("show");
}

const quit_quiz = result.querySelector(".buttons .exit");
quit_quiz.onclick = () => {
    window.location.reload();
}

const next_btn = document.querySelector("footer .next-btn");
const bottom_ques_counter = document.querySelector("footer .total");

next_btn.onclick = () => {
    if (que_count < limitedQuestions.length - 1) {
        que_count++;
        que_numb++;
        showQuestions(que_count);
        queCounter(que_numb);
        clearInterval(counter);
        clearInterval(counterLine);
        startTimer(timeValue);
        startTimerLine(widthValue);
        timeText.textContent = "Time Left";
        next_btn.classList.remove("show");
    } else {
        clearInterval(counter);
        clearInterval(counterLine);
        showResult();
    }
}

function showQuestions(index) {
    const que_text = document.querySelector(".question-text");
    que_text.innerHTML = limitedQuestions[index].question;

    let option_tag = '';
    for (let key in limitedQuestions[index]) {
        if (key !== "question" && key !== "answer") {
            option_tag += `<div class="option" data-key="${key}" onclick="optionSelected(this)"><span>${limitedQuestions[index][key]}</span></div>`;
        }
    }
    option_list.innerHTML = option_tag;
}

let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

function optionSelected(answer) {
    clearInterval(counter);
    clearInterval(counterLine);
    const userAns = answer.getAttribute("data-key");
    const correctAns = questions[que_count].answer;

    if (userAns === correctAns) {
        userScore += 1;
        answer.classList.add("correct");
        answer.insertAdjacentHTML("beforeend", tickIconTag);
    } else {
        answer.classList.add("incorrect");
        answer.insertAdjacentHTML("beforeend", crossIconTag);
        const options = option_list.querySelectorAll(".option");
        options.forEach(option => {
            if (option.id === correctAns) {
                option.classList.add("correct");
                option.insertAdjacentHTML("beforeend", tickIconTag);
            }
        });
    }

    const allOptions = option_list.children.length;
    for (let i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled");
    }

    next_btn.classList.add("show");
}

function showResult() {
    rules.classList.remove("activeInfo");
    quiz_box.classList.remove("activeQuiz");
    result.classList.add("activeResult");
    const scoreText = result.querySelector(".score");
    if (userScore > 7) {
        let scoreTag = '<span>Congratulations! 🎉 You scored <p>'+ userScore +'</p> out of <p>'+ limitedQuestions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else if(userScore > 4) {
        let scoreTag = '<span>Not bad! 😎 You scored <p>'+ userScore +'</p> out of <p>'+ limitedQuestions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else {
        let scoreTag = '<span>Oops! 😐 You scored <p>'+ userScore +'</p> out of <p>'+ limitedQuestions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
}

function startTimer(time) {
    counter = setInterval(timer, 1000);
    function timer() {
        timeCount.textContent = time;
        time--;
        if(time < 9) {
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero;
        }
        if(time < 0) {
            clearInterval(counter);
            timeText.textContent = "Time Off";
            const allOptions = option_list.children.length;
            let correcAns = questions[que_count].answer;
            for(i = 0; i < allOptions; i++) {
                if(option_list.children[i].textContent == correcAns) {
                    option_list.children[i].setAttribute("class", "option correct");
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag);
                }
            }
            for(i = 0; i < allOptions; i++) {
                option_list.children[i].classList.add("disabled");
            }
            next_btn.classList.add("show");
        }
    }
}

function startTimerLine(time) {
    counterLine = setInterval(timer,20);
    function timer() {
        time += 0.123;
        time_line.style.width = time + "%";
        if(time > 99.8) {
            clearInterval(counterLine);
        }
    }
}

function queCounter(index) {
    let totalQueCounTag = '<span><p>'+ index +'</p> of <p>'+ limitedQuestions.length +'</p> Questions</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag;
}
