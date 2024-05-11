let userName = '';
let startTime = null;
let correctAnswers = 0;
let incorrectAnswers = 0; // متغير جديد لتتبع الإجابات الخاطئة
let incorrectQuestions = []; // مصفوفة جديدة لتخزين الأسئلة التي أجاب عليها المستخدم بشكل خاطئ
let currentQuestion = 0;
let timerInterval = null;



function askName() {
    userName = prompt('الرجاء إدخال اسمك');
    document.getElementById('welcome').innerText = 'حياك الله ' + userName + '  , اختبر معلوماتك ' ;
}

function showQuestion() {
    const question = questions[currentQuestion];
    const quizDiv = document.getElementById('quiz');
    quizDiv.innerHTML = '';
    const questionText = document.createElement('h3');
    questionText.innerText = question.question;
    quizDiv.appendChild(questionText);
    question.options.forEach(function(option, index) {
        const button = document.createElement('button');
        button.innerText = option;
        button.style.borderColor = 'black';
        button.addEventListener('click', function() {
            if (index === question.answer) {
                correctAnswers++;
                this.style.borderColor = 'green';
            } else {
                incorrectAnswers++; // زيادة عدد الإجابات الخاطئة
                incorrectQuestions.push(question); // إضافة السؤال إلى الأسئلة التي أجاب عليها المستخدم بشكل خاطئ
                this.style.borderColor = 'red';
            }
            currentQuestion++;
            if (currentQuestion < questions.length) {
                showQuestion();
            } else {
                endQuiz();
            }
        });
        quizDiv.appendChild(button);
    });
}


function updateTimer() {
    const timeElapsed = Date.now() - startTime;
    document.getElementById('timer').innerText = 'الوقت المنقضي: ' + Math.floor(timeElapsed / 1000) + ' ثواني';
}




function endQuiz() {
    clearInterval(timerInterval);
    document.getElementById('quiz').style.display = 'none';
    document.getElementById('result').style.display = 'block';
   
    saveUserData(userName, Math.floor((Date.now() - startTime) / 1000), correctAnswers);
    
    window.location.href = 'results.html';
}







document.getElementById('start').addEventListener('click', function() {
    document.getElementById('start').style.display = 'none';
    document.getElementById('quiz').style.display = 'block';
    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 1000);  // Update the timer every second
    showQuestion();
});



function restartQuiz() {
    // حفظ بيانات المستخدم قبل إعادة تحميل الصفحة
    saveUserData(userName, Math.floor((Date.now() - startTime) / 1000), correctAnswers);

    // إعادة تعيين المتغيرات
    userName = '';
    startTime = null;
    correctAnswers = 0;
    incorrectAnswers = 0;
    currentQuestion = 0;

    // إعادة تعيين الواجهة الرسومية
    document.getElementById('quiz').style.display = 'none';
    document.getElementById('result').style.display = 'none';
    document.getElementById('start').style.display = 'block';
    document.getElementById('welcome').innerText = '';
    document.getElementById('timer').innerText = '';

    // إعادة تحميل الصفحة
    location.reload();
}




// تعريف متغير لتخزين بيانات المستخدمين
let usersData = [];

// دالة لحفظ بيانات المستخدم
function saveUserData(name, time, correctAnswers) {
    // استرجاع بيانات المستخدمين السابقين
    const data = localStorage.getItem('usersData');
    if (data) {
        usersData = JSON.parse(data);
    }

    // إضافة بيانات المستخدم الحالي
    usersData.push({
        name: name,
        time: time,
        correctAnswers: correctAnswers
    });

    // حفظ بيانات جميع المستخدمين
    localStorage.setItem('usersData', JSON.stringify(usersData));
}


// دالة لاسترجاع بيانات المستخدم
function getUserData() {
    // استرجاع بيانات المستخدم من LocalStorage
    const data = localStorage.getItem('usersData');

    if (data) {
        usersData = JSON.parse(data);
    }

    // فرز بيانات المستخدم بناءً على الأقل وقت وأكثر إجابات صحيحة
    usersData.sort((a, b) => a.time - b.time || b.correctAnswers - a.correctAnswers);

    // عرض بيانات المستخدم
    usersData.forEach(user => {
        console.log(`الاسم: ${user.name}, الوقت المستغرق: ${user.time}, عدد الإجابات الصحيحة: ${user.correctAnswers}`);
    });
}

document.getElementById('show-results').addEventListener('click', getUserData);

