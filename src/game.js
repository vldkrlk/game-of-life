import { createMatrix } from "./utils";
import { onPauseClick, onClearClick, onUpsChange } from "./menu";

export function Game(canvas) {
  this.canvas = canvas;
  this.ctx = canvas.getContext("2d");
  this.settings = {
    gridWidth: 30,
    gridHeight: 30,
    pause: false,
    ups: 60,
  };
  this.zoomIndex = 60;
  this.matrix = null;
  this.zoomValue = 40;
  this.xOffset = 300;
  this.yOffset = 100;
  this.lastUpdate = null;
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
  self.ctx.fillStyle = "gray";

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

  for (let row = 0; row < self.settings.gridHeight; row++) {
    for (let col = 0; col < self.settings.gridWidth; col++) {
      self.ctx.font = `${self.zoomIndex / 2}px serif`;
      self.ctx.fillText(
        row + col,
        col * self.zoomIndex + self.xOffset,
        (row + 1) * self.zoomIndex + self.yOffset
      );
    }
  }

  for (let row = 0; row < self.settings.gridHeight; row++) {
    for (let col = 0; col < self.settings.gridWidth; col++) {
      if (self.matrix[row][col]) {
        self.ctx.fillRect(
          self.zoomIndex * col + self.xOffset,
          self.zoomIndex * row + self.yOffset,
          self.zoomIndex,
          self.zoomIndex
        );
      }
    }
  }
};

Game.prototype.onWheel = function (event) {
  this.zoomIndex -= event.deltaY / 100;
};

Game.prototype.onMouseMove = function (event) {
  let cursorType = "default";
  if (event.altKey && event.buttons) {
    cursorType = "move";
    this.xOffset += event.movementX;
    this.yOffset += event.movementY;
  }
  document.body.style.cursor = cursorType;
};

Game.prototype.onClick = function (event) {
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
};
