import { createMatrix } from "./utils";

export function Game(canvas) {
  this.canvas = canvas;
  this.ctx = canvas.getContext("2d");
  this.settings = {
    gridWidth: 100,
    gridHeight: 100,
    pause: false,
  };
  this.zoomIndex = 10;
  this.matrix = null;
  this.zoomValue = 40;
  this.xOffest = 0;
  this.yOffset = 0;
}

Game.prototype.Run = function () {
  this.matrix = createMatrix(this.settings.gridWidth, this.settings.gridHeight);
  requestAnimationFrame(() => this.loop(this));
};

Game.prototype.loop = function (self) {
  self.update(self);
  self.draw(self);
  requestAnimationFrame(() => self.loop(self));
};

Game.prototype.update = function (self) {};
Game.prototype.draw = function (self) {
  self.ctx.clearRect(0, 0, window.innerWidth, window.innerWidth);
  self.ctx.fillStyle = "gray";

  for (let i = 0; i <= self.settings.gridHeight; i++) {
    self.ctx.fillRect(
      self.xOffest,
      self.zoomIndex * i + self.yOffset,
      self.zoomIndex * self.settings.gridWidth,
      1
    );
  }

  for (let i = 0; i <= self.settings.gridWidth; i++) {
    self.ctx.fillRect(
      self.zoomIndex * i + self.xOffest,
      self.yOffset,
      1,
      self.zoomIndex * self.settings.gridHeight
    );
  }

  for (let row = 0; row < self.settings.gridHeight; row++) {
    for (let col = 0; col < self.settings.gridWidth; col++) {
      self.ctx.font = `${self.zoomIndex / 2}px serif`;
      self.ctx.fillText(
        row + col,
        col * self.zoomIndex + self.xOffest,
        (row + 1) * self.zoomIndex + self.yOffset
      );
    }
  }
};

Game.prototype.onWheel = function (event) {
  this.zoomIndex -= event.deltaY / 100;
};

Game.prototype.onMouseMove = function (event) {
  if (event.altKey && event.buttons) {
    document.body.style.cursor = "move";
    this.xOffest += event.movementX;
    this.yOffset += event.movementY;
  } else {
    document.body.style.cursor = "default";
  }
};
