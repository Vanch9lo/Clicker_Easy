let clickCount = 0;
let clickMultiplier = 1;

const clickCountElement = document.getElementById('clickCount');
const clickButton = document.getElementById('clickButton');
const shopButtons = document.querySelectorAll('.upgrade');
const randomEventButton = document.getElementById('randomEvent');
const clickSound = document.getElementById('clickSound');
const eventSound = document.getElementById('eventSound');

// Обновление счетчика кликов
function updateClickCount() {
  clickCountElement.textContent = clickCount;
}

// Функция клика
clickButton.addEventListener('click', () => {
  clickCount += clickMultiplier;
  updateClickCount();
  clickSound.play();
});

// Покупка улучшений
shopButtons.forEach(button => {
  button.addEventListener('click', () => {
    const cost = parseInt(button.getAttribute('data-cost'));
    const multiplier = parseInt(button.getAttribute('data-multiplier'));

    if (clickCount >= cost) {
      clickCount -= cost;
      clickMultiplier *= multiplier;
      button.disabled = true;
      button.style.backgroundColor = '#ccc';
      updateClickCount();
    } else {
      alert('Недостаточно кликов!');
    }
  });
});

// Случайное событие
randomEventButton.addEventListener('click', () => {
  const events = [
    { message: 'Ты получил +100 кликов!', reward: 100 },
    { message: 'Ой! Ты потерял 500 кликов.', reward: -500 },
    { message: 'Бонус х2 на 10 секунд!', reward: 0, effect: () => temporaryBoost(2, 10000) },
    { message: 'Ничего не произошло...', reward: 0 }
  ];

  const randomEvent = events[Math.floor(Math.random() * events.length)];
  alert(randomEvent.message);

  if (randomEvent.reward) {
    clickCount += randomEvent.reward;
    updateClickCount();
  }

  if (randomEvent.effect) {
    randomEvent.effect();
  }

  eventSound.play();
});

// Временный бонус
function temporaryBoost(multiplier, duration) {
  const originalMultiplier = clickMultiplier;
  clickMultiplier *= multiplier;

  setTimeout(() => {
    clickMultiplier = originalMultiplier;
    alert('Бонус закончился!');
  }, duration);
}

// Инициализация
updateClickCount();