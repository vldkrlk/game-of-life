export function onWheel(event) {
  this.zoomIndex -= event.deltaY / 100;
}
export function onMouseMove(event) {
  let cursorType = "default";
  if (event.altKey && event.buttons) {
    cursorType = "move";
    this.xOffset += event.movementX;
    this.yOffset += event.movementY;
  }
  document.body.style.cursor = cursorType;
}

export function onClick(event) {
  if (event.altKey) {
    return;
  }
  const x = Math.floor((event.x - this.xOffset) / this.zoomIndex);
  const y = Math.floor((event.y - this.yOffset) / this.zoomIndex);
  if (this.matrix[y][x]) {
    this.matrix[y][x] = 0;
    return;
  }
  this.matrix[y][x] = 1;
}
