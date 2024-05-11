function showResults() {
    const data = localStorage.getItem('usersData');
    if (data) {
        let usersData = JSON.parse(data);
        
        // ترتيب المتسابقين بناءً على عدد الإجابات الصحيحة والوقت المستغرق
        usersData.sort((a, b) => b.correctAnswers - a.correctAnswers || a.time - b.time);

        const resultsDiv = document.getElementById('results');
        usersData.forEach((user, index) => {
            const p = document.createElement('p');
            p.innerText = `${index + 1}. الاسم: ${user.name}, الوقت المستغرق: ${user.time}, عدد الإجابات الصحيحة: ${user.correctAnswers}`;
            resultsDiv.appendChild(p);
        });
    }
}


document.getElementById('reset').addEventListener('click', function() {
    localStorage.removeItem('usersData');
    document.getElementById('results').innerHTML = '';
});

    