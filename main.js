window.addEventListener('load', init);

levels = {
    easy: 9,
    medium: 6,
    hard: 4,
}
let currentLevel = levels.easy;
let time = currentLevel + 1;
let score = 0;
let isPlaying;

words = [
    "abreact",
    "abreacted", "abreacting", "abreaction", "abreactions", "abreacts", "abreast", "abri", "abridge", "abridged", "abridgement", "abridgements", "abridger", "abridgers", "abridges", "abridging", "abridgment", "abridgments", "abris", "abroach", "abroad", "abrogable", "abrogate", "abrogated", "abrogates", "abrogating", "abrogation", "abrogations", "abrogator", "abrogators", "abrosia", "abrosias", "abrupt", "abrupter", "abruptest", "abruption", "abruptions", "abruptly", "abruptness", "abruptnesses", "abs", "abscess", "abscessed", "abscesses", "abscessing", "abscise", "abscised", "abscises", "abscisin", "abscising", "abscisins", "abscissa", "abscissae", "abscissas", "abscission", "abscissions", "abscond", "absconded", "absconder", "absconders", "absconding", "absconds", "abseil", "abseiled", "abseiling", "abseils", "absence", "absences", "absent", "absented", "absentee", "absenteeism", "absenteeisms", "absentees", "absenter", "absenters", "absenting", "absently", "absentminded", "absentmindedly", "absents", "absinth", "absinthe", "absinthes", "absinths", "absolute", "absolutely", "absoluteness", "absolutenesses", "absoluter", "absolutes", "absolutest", "absolution", "absolutions", "absolutism", "absolutisms", "absolutist", "absolutistic", "absolutists", "absolutive", "absolutize", "absolutized", "absolutizes", "absolutizing", "absolve", "absolved", "absolvent", "absolvents", "absolver", "absolvers", "absolves", "absolving", "absonant", "absorb", "absorbabilities", "absorbability", "absorbable", "absorbance", "absorbances", "absorbancies", "absorbancy", "absorbant", "absorbants", "absorbed", "absorbencies", "absorbency", "absorbent", "absorbents", "absorber", "absorbers", "absorbing", "absorbingly", "absorbs", "absorptance", "absorptances", "absorption", "absorptions", "absorptive", "absorptivities", "absorptivity", "abstain", "abstained", "abstainer", "abstainers", "abstaining", "abstains", "abstemious", "abstemiously", "abstemiousness", "abstention", "abstentions", "abstentious", "absterge", "absterged", "absterges", "absterging", "abstinence", "abstinences", "abstinent"
];

const level = document.querySelector('#level');
const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds');

level.addEventListener('change', getlevel);




function init() {
    getwords();
    showWord(words);
    wordInput.addEventListener('input', startMatch);
    setInterval(countdown, 1000);
    setInterval(checkStatus, 50)
}



function startMatch() {
    if (matchwords()) {
        isPlaying = true;
        time = currentLevel + 1;
        showWord(words);
        wordInput.value = '';
        score++;
    }
    if (score === -1) {
        scoreDisplay.innerHTML = 0;
    } else {
        scoreDisplay.innerHTML = score;

    }

}

function matchwords() {
    if (wordInput.value === currentWord.innerHTML) {
        message.innerHTML = 'Correct !!!';
        return true;
    } else {
        message.innerHTML = '';
        return false;
    }
}

function showWord(words) {
    const randIndex = Math.floor(Math.random() * words.length);
    currentWord.innerHTML = words[randIndex];
}

function countdown() {
    if (time > 0) {
        time--;
    } else if (time === 0) {
        isPlaying = false;

    }
    timeDisplay.innerHTML = time;
}


function checkStatus() {
    if (!isPlaying && time === 0) {
        message.innerHTML = 'Game Over !!!';
        score = -1;
    }
}

function getlevel() {
    if (level.value === 'easy') {
        currentLevel = levels.easy;
        seconds.innerHTML = currentLevel;
        init();
        return currentLevel = levels.easy;

    } else if (level.value === 'medium') {
        currentLevel = levels.medium;
        seconds.innerHTML = currentLevel;
        init();
        return currentLevel = levels.medium;


    } else {
        currentLevel = levels.hard;
        seconds.innerHTML = currentLevel;
        init();
        return currentLevel = levels.hard;

    }
}

function getwords() {
    fetch('words.txt')
        .then((res) => res.json())
        .then((data) =>
            words = data);
    return words;

}