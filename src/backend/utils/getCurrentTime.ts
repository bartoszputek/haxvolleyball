export default function getCurrentTime() {
  const today = new Date();

  const leadingZero = (num:Number) => `0${num}`.slice(-2);

  const formatTime = [today.getHours(), today.getMinutes(), today.getSeconds()]
    .map(leadingZero)
    .join(':');

  return formatTime;
}
