export function convertRemToPixels(rem) {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

export function getCookie(name) {
  let value = "; " + document.cookie;
  let parts = value.split("; " + name + "=");
  if (parts.length === 2) return parts.pop().split(";").shift();
  return undefined;
}

export function setCookie(name, value, ms) {
  let expires = "";
  if (ms) {
    let date = new Date();
    date.setTime(date.getTime() + ms);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function random(min, max) {
  return Math.random() * (max - min) + min;
}

export function easeInCubic(x) {
  return x * x * x;
}