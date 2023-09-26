const robot = document.getElementById('robot');
const directionSpan = document.getElementById('direction');
let direction = "Left Up";
const shot = document.getElementById('shot');
let hitCount = 0;
let monsterToShow = null;
let monsterInterval;
let gameStarted = false;


// Код для кнопки "Start/Stop"
const startStopButton = document.getElementById('start-stop');

startStopButton.addEventListener('click', function () {
    if (gameStarted) {
        // Якщо гра вже запущена, то зупиняємо гру
        endGame();
    } else {
        // Якщо гра не запущена, то запускаємо її
        startGame();
    }
    startStopButton.blur();
});






// Функція для запуску гри
function startGame() {
    startStopButton.textContent = 'Stop';
    startStopButton.classList.add('active');
    if (!gameStarted) {
        gameStarted = true; // Позначаємо, що гра почалася
        startTimer(); // Запускаємо таймер
        monsterInterval = setInterval(showRandomMonster, 3000); // Почати інтервал
    }
}

function resetGame() {
    gameStarted = false; // Скидаємо стан гри
    hitCount = 0; // Обнуляємо рахунок
    updateHitCount(); // Оновлюємо відображення рахунку
    startTimer(); // Оновлюємо таймер
}

// Викликати showRandomMonster() за допомогою клавіші "1"
document.addEventListener('keydown', (event) => {
    if (event.key === '1') {
        startGame(); // Запускаємо гру при натисканні "1"
    }
});

// Зупиняти показ монстрів за допомогою клавіші "2"
document.addEventListener('keydown', (event) => {
    if (event.key === '2') {
        endGame(); // Зупиняємо гру при натисканні "2"
    }
});


document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
        if (direction === "Left Up") {
            direction = "Left Up";
        } else if (direction === "Left Down") {
            direction = "Left Down";
        } else if (direction === "Right Down") {
            direction = "Left Down";
            robot.style.transform = 'scaleX(1)';

        } else if (direction === "Right Up") {
            direction = "Left Up";
            robot.style.transform = 'scaleX(1)';

        }
    } else if (event.key === 'ArrowRight') {
        if (direction === "Right Down") {
            direction = "Right Down";
        } else if (direction === "Right Up") {
            direction = "Right Up";
        } else if (direction === "Left Up") {
            direction = "Right Up";
            robot.style.transform = 'scaleX(-1)';
        } else if (direction === "Left Down") {
            direction = "Right Down";
            robot.style.transform = 'scaleX(-1)';
        }
    } else if (event.key === 'ArrowUp') {
        if (direction === "Right Down") {
            direction = "Right Up";
        } else if (direction === "Right Up") {
            direction = "Right Up";
        } else if (direction === "Left Up") {
            direction = "Left Up";
        } else if (direction === "Left Down") {
            direction = "Left Up";
        }
    } else if (event.key === 'ArrowDown') {
        if (direction === "Right Down") {
            direction = "Right Down";
        } else if (direction === "Right Up") {
            direction = "Right Down";
        } else if (direction === "Left Up") {
            direction = "Left Down";
        } else if (direction === "Left Down") {
            direction = "Left Down";
        }
    } else if (event.code === 'Space') {
        let laserWidth = 0;


        if (direction === "Right Down") {
            shot.style.transform = 'rotate(25deg) scaleX(1)';
            shot.style.bottom = '7px';
        } else if (direction === "Right Up") {
            shot.style.transform = 'rotate(-205deg) scaleX(-1)';
            shot.style.bottom = '3px';
        } else if (direction === "Left Up") {
            shot.style.transform = 'rotate(30deg) scaleX(-1)';
            shot.style.bottom = '10px';
        } else if (direction === "Left Down") {
            shot.style.transform = 'rotate(-25deg) scaleX(-1)';
            shot.style.bottom = '5px';
        }


        if (monsterToShow === zhuzha && direction === "Left Up") {
            hitCount++; // Збільшення лічильника влучань
            updateHitCount();
        }
        if (monsterToShow === kaka && direction === "Right Up") {
            hitCount++; // Збільшення лічильника влучань
            updateHitCount();
        }
        if (monsterToShow === myaka && direction === "Left Down") {
            hitCount++; // Збільшення лічильника влучань
            updateHitCount();
        }
        if (monsterToShow === byaka && direction === "Right Down") {
            hitCount++; // Збільшення лічильника влучань
            updateHitCount();
        }


        if (direction === "Right Down" || direction === "Right Up") {
            laserWidth = window.innerWidth - shot.getBoundingClientRect().left;
        } else if (direction === "Left Up" || direction === "Left Down") {
            laserWidth = shot.getBoundingClientRect().left;
        }
        shot.style.width = laserWidth + 'px';
        setTimeout(function () {
            shot.style.width = '0';
        }, 2000);
        setTimeout(function () {
            shot.style.transform = 'scaleX(0)';
        }, 100);

        document.getElementById('explosion').classList.add('active'); // Додайте клас під час пострілу
        setTimeout(function () {
            shot.style.transform = 'scaleX(0)';
            document.getElementById('explosion').classList.remove('active'); // Видаліть клас після анімації
        }, 2000);

    }


    directionSpan.textContent = direction;
    updateEyePositions();
});

const eye = document.querySelector('.eye');

function updateEyePositions() {
    const robotRect = robot.getBoundingClientRect();
    let eyeX, eyeY;

    if (direction === "Left Up" || direction === "Left Down") {
        eyeX = robotRect.left + 190;
        eyeY = robotRect.top - 150;
    } else if (direction === "Right Up" || direction === "Right Down") {
        eyeX = robotRect.left + 280;
        eyeY = robotRect.top - 150;
    }

    eye.style.left = eyeX + 'px';
    eye.style.top = eyeY + 'px';
}

const zhuzha = document.querySelector('.zhuzha');
const kaka = document.querySelector('.kaka');
const myaka = document.querySelector('.myaka');
const byaka = document.querySelector('.byaka');



function showRandomMonster() {
    if (!gameStarted) {
        gameStarted = true; // Позначаємо, що гра почалася
        startTimer(); // Запускаємо таймер
    }
    const monsters = [zhuzha, kaka, myaka, byaka];
    const randomIndex = Math.floor(Math.random() * monsters.length);
    monsterToShow = monsters[randomIndex];

    monsterToShow.style.display = 'inline';

    setTimeout(() => {
        monsterToShow.style.display = 'none';
    }, 2000); // Час в мілісекундах, через який монстр зникне
}



function endGame() {
    startStopButton.textContent = 'Start';
    startStopButton.classList.remove('active');
    clearInterval(monsterInterval); 
    gameStarted = false; 
    updateHitCount();
    timer = 30;
    alert(`Гра завершена! Загальна кількість влучань: ${hitCount}`);
    
}

let timerInterval; 
let timer = 30; 

function startTimer() {
    const timerElement = document.querySelector('.table p:nth-child(3)'); // Отримуємо елемент таймера

    // Функція для оновлення таймера
    function updateTimer() {
        const timerElement = document.querySelector('.table p:nth-child(3)'); // Отримуємо елемент таймера
        
        // Використовуємо тернарний оператор для визначення тексту таймера
        const timerText = gameStarted ? `Timer: ${timer} s` : 'Timer: 30 s';
    
        timerElement.textContent = timerText; // Відображаємо текст таймера
        if (timer <= 0 && gameStarted) {
            clearInterval(timerInterval); // Зупиняємо інтервал, якщо час вийшов
            endGame(); // Якщо час вийшов, закінчуємо гру
        } else if (gameStarted) {
            timer--; // Зменшуємо лічильник, якщо гра запущена
        }
    }

    // Зупиняємо попередній інтервал, якщо він існує
    if (timerInterval) {
        clearInterval(timerInterval);
    }

    // Запускаємо новий інтервал
    timerInterval = setInterval(updateTimer, 1000);

    // Початкове оновлення таймера
    updateTimer();
}


function updateHitCount() {
    const countElement = document.querySelector('.table p:nth-child(1)'); // Отримуємо елемент для відображення кількості
    countElement.textContent = `Count: ${gameStarted ? hitCount : 0}`; // Відображаємо рахунок або 0, якщо гра не запущена
}

updateHitCount();





// Функція для показу модального вікна з правилами гри
function showRulesModal() {
    const rulesModal = document.getElementById('rulesModal');
    rulesModal.style.display = 'flex'; // Показуємо модальне вікно
}

// Запускаємо функцію показу модального вікна при натисканні на кнопку "Rules"
const rulesButton = document.getElementById('rules');
rulesButton.addEventListener('click', showRulesModal);

// Закриття модального вікна при кліку на кнопку "Закрити"
const closeRulesModal = document.getElementById('closeRulesModal');
closeRulesModal.addEventListener('click', function () {
    const rulesModal = document.getElementById('rulesModal');
    rulesModal.style.display = 'none'; // Приховуємо модальне вікно при кліку
});

// Функція для показу модального вікна з клавішами керування
function showKeysModal() {
    const keysModal = document.getElementById('keysModal');
    keysModal.style.display = 'flex'; // Показуємо модальне вікно
}

// Запускаємо функцію показу модального вікна при натисканні на кнопку "Rules"
const keysButton = document.getElementById('keys');
keysButton.addEventListener('click', showKeysModal);

// Закриття модального вікна при кліку на кнопку "Закрити"
const closeKeysModal = document.getElementById('closeKeysModal');
closeKeysModal.addEventListener('click', function () {
    const keysModal = document.getElementById('keysModal');
    keysModal.style.display = 'none'; // Приховуємо модальне вікно при кліку
});

