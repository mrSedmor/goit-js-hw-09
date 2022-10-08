// This implementation is more accurate for the homework purposes

export default function convertMs(ms) {
  const MS_PER_SEC = 1000;
  const SEC_PER_MIN = 60;
  const SEC_PER_HOUR = SEC_PER_MIN * 60;
  const SEC_PER_DAY = SEC_PER_HOUR * 24;

  // Special ingredient :-)
  // The next line is needed to see the expiry message exactly when the timer displays 0:0:0:0.
  // Other way you have to wait another second.
  const sec = Math.ceil(ms / MS_PER_SEC);

  const days = Math.trunc(sec / SEC_PER_DAY);

  const hours = Math.trunc((sec % SEC_PER_DAY) / SEC_PER_HOUR);

  const minutes = Math.trunc((sec % SEC_PER_HOUR) / SEC_PER_MIN);

  const seconds = sec % SEC_PER_MIN;

  return { days, hours, minutes, seconds };
}
