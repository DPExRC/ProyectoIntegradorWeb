let letters = [];
let flippedCards = [];
let matchedCards = [];
let moves = 0;
let timer = 0;
let score = 0;
let timerInterval;
let numRows = 4;
let numCols = 4;

function startTimer() {
    timerInterval = setInterval(() => {
        timer++;
        document.getElementById('timer').textContent = `Tiempo: ${timer} segundos`; 
    }, 1000);
}

function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function createCard(value) {
    const card = document.createElement('div');
    card.classList.add('card');
    const image = document.createElement('img');
    image.src = '../Proyecto/images.jpeg'; 
    image.style.width = '100px'; 
    image.style.height = '100px'; 
    card.appendChild(image);
    card.addEventListener('click', () => flipCard(card));
    card.dataset.value = value;
    return card;
}

function flipCard(card) {
    if (flippedCards.length < 2 && !flippedCards.includes(card)) {
        card.innerHTML = card.dataset.value;
        flippedCards.push(card);
        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 1000);
        }
    }
}

function updateSelectedCards() {
    const selectedCardsElement = document.getElementById('selectedCards');
    selectedCardsElement.innerHTML = `Cartas seleccionadas: ${flippedCards.map(card => card.dataset.value).join(', ')}`;
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    moves++;

    if (card1.textContent === card2.textContent) {
        setTimeout(() => {
            card1.remove(); 
            card2.remove(); 
        }, 1000);

        matchedCards.push(card1, card2);
        flippedCards = [];

        score += 10
        document.getElementById('score').textContent = `Puntaje: ${score}`;

        if (matchedCards.length === letters.length) {
            clearInterval(timerInterval);
            alert(`¡Has ganado! Movimientos: ${moves} - Tiempo: ${timer} segundos`);
        }

    } else {
        flippedCards.forEach(card => {
            card.textContent = ''; 
        });
        flippedCards = [];
    }
}

function initializeGame() {
    const shuffledLetters = shuffle(letters);
    const memoryBoard = document.getElementById('memoryBoard');
    shuffledLetters.forEach((value, index) => {
        const card = createCard(value);
        card.dataset.value = value;
        memoryBoard.appendChild(card);
    });
    startTimer();
    document.getElementById('timer').textContent = `Tiempo: ${timer} segundos`; 
    document.getElementById('score').textContent = `Puntaje: ${score}`;
}

function resetGame() {
    clearInterval(timerInterval);
    flippedCards = [];
    matchedCards = [];
    moves = 0;
    timer = 0;
    score = 0;
    initializeGame();
}

function generateNumbers(n) {
    let numbers = [];

    for (let i = 1; i <= n; i++) {
        numbers.push(i.toString(), i.toString());
    }

    return numbers;
}

function setDifficulty(level) {
    let n;
    switch (level) {
        case 'easy':
            n = 8;
            numRows = 4;
            numCols = 4;
            break;
        case 'medium':
            n = 18;
            numRows = 6;
            numCols = 6;
            break;
        case 'hard':
            n = 32;
            numRows = 8;
            numCols = 8;
            break;
    }

    letters = generateNumbers(n);

    const memoryBoard = document.getElementById('memoryBoard');
    memoryBoard.innerHTML = ''; 
    memoryBoard.style.gridTemplateRows = `repeat(${numRows}, 1fr)`;
    memoryBoard.style.gridTemplateColumns = `repeat(${numCols}, 1fr)`;
    initializeGame();
}


setDifficulty('easy');
