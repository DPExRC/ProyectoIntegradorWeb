const letters = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];
let flippedCards = [];
let matchedCards = [];
let moves = 0;
let timer = 0;
let timerInterval;

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
    
    // Agregar imagen
    const image = document.createElement('img');
    image.src = '../Proyecto/images.jpeg'; // Ruta de la imagen
    image.style.width = '100px'; // Establecer un ancho fijo
    image.style.height = '100px'; // Establecer una altura fija
    card.appendChild(image);

    // Agregar evento de clic
    card.addEventListener('click', () => flipCard(card));

    // Agregar letra como data-value
    card.dataset.value = value;

    return card;
}

function flipCard(card) {
    if (flippedCards.length < 2 && !flippedCards.includes(card)) {
        // Mostrar letra al clickear
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
            card1.remove(); // Elimina la carta del DOM
            card2.remove(); // Elimina la carta del DOM
        }, 1000);

        matchedCards.push(card1, card2);
        flippedCards = [];

        if (matchedCards.length === letters.length) {
            clearInterval(timerInterval);
            alert(`¡Has ganado! Movimientos: ${moves} - Tiempo: ${timer} segundos`);
        }
    } else {
        flippedCards.forEach(card => {
            card.textContent = ''; // Voltea las cartas de nuevo
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
}


initializeGame();
