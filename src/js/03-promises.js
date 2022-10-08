import Notiflix from 'notiflix';

const formElem = document.querySelector('.form');

formElem.addEventListener('submit', onFormSubmit);

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      }

      reject({ position, delay });
    }, delay);
  });
}

function createPromises({ delay, step, amount }) {
  for (let i = 1, iDelay = delay; i <= amount; i += 1, iDelay += step) {
    createPromise(i, iDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
}

function onFormSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);
  const data = {
    delay: Number(formData.get('delay')),
    step: Number(formData.get('step')),
    amount: Number(formData.get('amount')),
  };

  createPromises(data);
}
