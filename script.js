const point1 = document.getElementById('point1');
const point2 = document.getElementById('point2');
const highlight = document.getElementById('highlight');
const leftPointer = document.getElementById('leftPointer');
const rightPointer = document.getElementById('rightPointer');
const percentage_vw = [20, 23, 28.4, 33.8, 39.2, 44.6, 50, 55.4, 60.8, 66.2, 71.6, 77, 80]; //vw
const num_labels = [-6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6]

var leftPointerValue = 0
var rightPointerValue = 0
var value = [0, 0]

let draggingPoint = null;

point1.addEventListener('mousedown', (e) => {
  draggingPoint = point1;
});

point2.addEventListener('mousedown', (e) => {
  draggingPoint = point2;
});

document.addEventListener('mousemove', (e) => {
  if (!draggingPoint) return;

  const positionPercent = (e.pageX / window.innerWidth) * 100;
  const closestTick = percentage_vw.reduce((a, b) => {
    return Math.abs(b - positionPercent) < Math.abs(a - positionPercent) ? b : a;
  });

  draggingPoint.style.left = ((closestTick - 20) / 0.6) + '%';
  highlight.style.left = Math.min(...[point1, point2].map(point => parseFloat(point.style.left))) + '%';
  highlight.style.width = Math.abs(parseFloat(point2.style.left) - parseFloat(point1.style.left)) + '%';

  var pointerValue = num_labels[percentage_vw.indexOf(closestTick)];
  console.log(pointerValue);

  if (draggingPoint === point1) {
    value[0] = pointerValue;
  } else if (draggingPoint === point2) {
    value[1] = pointerValue;
  }

  var ld = false; //Left Pointer Displayed
  if (Math.min(...value) < -5) {
    leftPointer.textContent = `Left Pointer: < -5`;
    ld = true;
  }

  var rd = false; //Left Pointer Displayed
  if (Math.max(...value) > 5) {
    rightPointer.textContent = `Right Pointer: > 5`;
    rd = true;
  }

  if (!ld) {
    leftPointer.textContent = `Left Pointer: ${Math.min(...value)}`;
  }
  if (!rd) {
    rightPointer.textContent = `Right Pointer: ${Math.max(...value)}`;
  }
});

document.addEventListener('mouseup', () => {
  draggingPoint = null;
});
