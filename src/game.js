import { createMatrix } from "./utils";
import { onPauseClick, onClearClick, onUpsChange } from "./menu";
import { gameSettingsState } from "./gameSettings";
import * as gameEvents from "./gameEvents";

export function Game(canvas) {
  this.canvas = canvas;
  this.ctx = canvas.getContext("2d");
  this.settings = gameSettingsState;
  this.zoomIndex = 60;
  this.matrix = null;
  this.zoomValue = 40;
  this.xOffset = 300;
  this.yOffset = 100;
  this.lastUpdate = null;
  this.isMouseDown = false;
}

Game.prototype.Run = function () {
  this.matrix = createMatrix(this.settings.gridWidth, this.settings.gridHeight);

  onPauseClick(() => {
    this.settings.pause = !this.settings.pause;
  });

  onClearClick(() => {
    this.matrix = createMatrix(
      this.settings.gridWidth,
      this.settings.gridHeight
    );
  });

  onUpsChange((event) => {
    this.settings.ups = event.target.value;
  });

  requestAnimationFrame(() => this.loop(this));
};

Game.prototype.loop = function (self) {
  self.update(self);
  self.draw(self);
  requestAnimationFrame(() => self.loop(self));
};

Game.prototype.update = function (self) {
  if (self.settings.pause) {
    return;
  }
  if (
    self.lastUpdate != null &&
    Date.now() - self.lastUpdate < 1000 / self.settings.ups
  ) {
    return;
  }
  const h = self.settings.gridHeight;
  const w = self.settings.gridWidth;
  const newMatrix = createMatrix(h, w);
  for (let row = 0; row < h; row++) {
    for (let col = 0; col < w; col++) {
      const neighbors =
        (row + 1 < h ? self.matrix[row + 1][col] : 0) +
        (row > 0 ? self.matrix[row - 1][col] : 0) +
        (col + 1 < w ? self.matrix[row][col + 1] : 0) +
        (col > 0 ? self.matrix[row][col - 1] : 0) +
        (row + 1 < h && col + 1 < w ? self.matrix[row + 1][col + 1] : 0) +
        (row + 1 < h && col > 0 ? self.matrix[row + 1][col - 1] : 0) +
        (row > 0 && col + 1 < w ? self.matrix[row - 1][col + 1] : 0) +
        (row > 0 && col > 0 ? self.matrix[row - 1][col - 1] : 0);

      if (neighbors == 0 && self.matrix[row][col] == 0) {
        continue;
      }

      if (self.matrix[row][col] && neighbors < 2) {
        newMatrix[row][col] = 0;
        continue;
      }

      if (self.matrix[row][col] && neighbors > 3) {
        newMatrix[row][col] = 0;
        continue;
      }

      if (self.matrix[row][col]) {
        newMatrix[row][col] = 1;
        continue;
      }

      if (!self.matrix[row][col] && neighbors == 3) {
        newMatrix[row][col] = 1;
        continue;
      }
    }
  }
  self.matrix = newMatrix;
  self.lastUpdate = Date.now();
};
Game.prototype.draw = function (self) {
  self.ctx.clearRect(0, 0, window.innerWidth, window.innerWidth);
  self.ctx.fillStyle = "#444444";

  for (let i = 0; i <= self.settings.gridHeight; i++) {
    self.ctx.fillRect(
      self.xOffset,
      self.zoomIndex * i + self.yOffset,
      self.zoomIndex * self.settings.gridWidth,
      1
    );
  }

  for (let i = 0; i <= self.settings.gridWidth; i++) {
    self.ctx.fillRect(
      self.zoomIndex * i + self.xOffset,
      self.yOffset,
      1,
      self.zoomIndex * self.settings.gridHeight
    );
  }
  self.ctx.fillStyle = "#6b2ac7";
  for (let row = 0; row < self.settings.gridHeight; row++) {
    for (let col = 0; col < self.settings.gridWidth; col++) {
      if (self.matrix[row][col]) {
        self.ctx.fillRect(
          self.zoomIndex * col + self.xOffset + 1,
          self.zoomIndex * row + self.yOffset + 1,
          self.zoomIndex - 1,
          self.zoomIndex - 1
        );
      }
    }
  }
};

Game.prototype.onWheel = gameEvents.onWheel;
Game.prototype.onMouseMove = gameEvents.onMouseMove;
Game.prototype.onClick = gameEvents.onClick;
Game.prototype.onMouseDown = gameEvents.onMouseDown;
Game.prototype.onMouseUp = gameEvents.onMouseUp;
