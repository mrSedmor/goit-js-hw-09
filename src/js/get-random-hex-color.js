export default function getRandomHexColor() {
  return `#${Math.trunc(Math.random() * 0xffffff)
    .toString(16)
    .padStart(6, 0)}`;
}
