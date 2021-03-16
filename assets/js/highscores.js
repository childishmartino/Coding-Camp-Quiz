var clearBtn = document.getElementById('clear');

function prtHighScores() {
    let highscores = JSON.parse(localStorage.getItem('highscores')) || [];

    highscores.sort(function(a, b) {return b.score - a.score});

    highscores.forEach(score => {
        let liTag = document.createElement("li");
        liTag.textContent = score.initials + " - " + score.highscore;

        let olEl = document.getElementById('highscores');
        olEl.appendChild(liTag);
    });
};

function clearHighScores() {
    localStorage.removeItem('highscores');
    location.reload();
};

prtHighScores();

clearBtn.onclick = clearHighScores;