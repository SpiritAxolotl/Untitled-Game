const pc = document.createElement("div");
pc.id = "pc";
document.body.appendChild(pc);

let start;
let lastTime = 0;

let gravity = 0.01;

let timeSincePlayerLeftGround = 0;

const position = {
  x: 0,
  y: 0
};
const velocity = {
  x: 0,
  y: 0
};
const acceleration = {
  x: 0,
  y: 0
};
const stripPx = (value="") => {
  //return +value.match(/(\d+(?:\.\d+)?)px/)[1];
  if (value.substring(value.length-2, value.length) === "px")
    return value.substring(0, value.length-2);
  return 0;
};

const clamp = (min, value, max) => {
  return Math.min(max, Math.max(value, min));
};

const step = (timestamp) => {
  let delta = timestamp - lastTime;
  if (start === undefined) {
    start = timestamp;
    delta = 0;
  }
  lastTime = timestamp;
  //
  const playerSize = {
    x: stripPx(getComputedStyle(pc).width),
    y: stripPx(getComputedStyle(pc).height)
  };
  //const elapsed = timestamp - start;
  /*acceleration.y = gravity;
  if (position.y >= window.innerHeight - playerHeight) {
    acceleration.y = 0;
    velocity.y = 0;
  }
  velocity.y += acceleration.y*delta;
  position.y = clamp(0, position.y + velocity.y, window.innerHeight - playerHeight);*/
  if (buttons.w !== buttons.s) {
    if (buttons.w)
      velocity.y = -1;
    else if (buttons.s)
      velocity.y = 1;
  } else
    velocity.y = 0;
  if (buttons.a !== buttons.d) {
    if (buttons.a)
      velocity.x = -1;
    else if (buttons.d)
      velocity.x = 1;
  } else
    velocity.x = 0;
  position.x += velocity.x * (buttons.shift ? 2 : 1);
  position.y += velocity.y * (buttons.shift ? 2 : 1);
  if (position.x <= 0) {
    velocity.x = Math.max(velocity.x, 0);
    position.x = 0;
  }
  if (position.x >= window.innerWidth - playerSize.x) {
    velocity.x = Math.min(velocity.x, window.innerWidth - playerSize.x);
    position.x = window.innerWidth - playerSize.x;
  }
  if (position.y <= 0) {
    velocity.y = Math.max(velocity.y, 0);
    position.y = 0;
  }
  if (position.y >= window.innerHeight - playerSize.y) {
    velocity.y = Math.max(velocity.y, window.innerHeight - playerSize.y);
    position.y = window.innerHeight - playerSize.y;
  }
  pc.style.transform = `translateX(${position.x}px) translateY(${position.y}px)`;
  requestAnimationFrame(step);
};

const buttons = {
  w: false,
  a: false,
  s: false,
  d: false,
  shift: false
};

document.addEventListener("keydown", (event) => {
  switch (event.key.toLowerCase()) {
    case "w":
      buttons.w = true;
      break;
    case "a":
      buttons.a = true;
      break;
    case "s":
      buttons.s = true;
      break;
    case "d":
      buttons.d = true;
      break;
  }
  buttons.shift = event.shiftKey;
});
document.addEventListener("keyup", (event) => {
  switch (event.key.toLowerCase()) {
    case "w":
      buttons.w = false;
      break;
    case "a":
      buttons.a = false;
      break;
    case "s":
      buttons.s = false;
      break;
    case "d":
      buttons.d = false;
      break;
  }
  buttons.shift = event.shiftKey;
});

requestAnimationFrame(step);