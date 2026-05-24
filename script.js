const form = document.querySelector('#interestForm');
const note = document.querySelector('#formNote');
const emailInput = document.querySelector('#email');
const livePing = document.querySelector('#livePing');
const liveCopy = document.querySelector('#liveCopy');
const pingButtons = document.querySelectorAll('.ping-button');

const pingCopy = {
  'Miss you': 'A bright orange pulse appears on their phone and device.',
  'Call me': 'The device flashes twice so they know it is worth picking up.',
  'Home safe': 'A calm check-in lands without turning into a whole conversation.',
  'Need chaos': 'Your private joke button gets the loudest little pulse.'
};

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const email = emailInput.value.trim().toLowerCase();
  const list = JSON.parse(localStorage.getItem('buttonidea-interest') || '[]');

  if (!list.includes(email)) {
    list.push(email);
    localStorage.setItem('buttonidea-interest', JSON.stringify(list));
  }

  note.textContent = 'Saved. Prototype updates will land here soon.';
  form.reset();
});

pingButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const message = button.dataset.message;

    pingButtons.forEach((item) => item.classList.remove('is-active'));
    button.classList.add('is-active');
    livePing.textContent = message;
    liveCopy.textContent = pingCopy[message];
    note.textContent = `${message} ping previewed.`;
  });
});
