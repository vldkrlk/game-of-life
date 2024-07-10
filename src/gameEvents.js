export function onWheel(event) {
  this.zoomIndex -= event.deltaY / 100;
}
export function onMouseMove(event) {
  let cursorType = "default";
  if (event.altKey && event.buttons) {
    cursorType = "move";
    this.xOffset += event.movementX;
    this.yOffset += event.movementY;
  } else if (event.buttons) {
    const x = Math.floor((event.x - this.xOffset) / this.zoomIndex);
    const y = Math.floor((event.y - this.yOffset) / this.zoomIndex);
    addCell.call(this, x, y);
  }
  document.body.style.cursor = cursorType;
}

export function onClick(event) {
  if (event.altKey) {
    return;
  }
  const x = Math.floor((event.x - this.xOffset) / this.zoomIndex);
  const y = Math.floor((event.y - this.yOffset) / this.zoomIndex);
  addCell.call(this, x, y);
}

export function onMouseDown() {
  this.isMouseDown = true;
}

export function onMouseUp() {
  this.isMouseDown = false;
}

function addCell(x, y) {
  if (this.matrix[y][x] && !this.isMouseDown) {
    this.matrix[y][x] = 0;
    return;
  }
  this.matrix[y][x] = 1;
}
