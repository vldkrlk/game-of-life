import { Game } from "./game";

const setup = (mountNode) => {
  const canvasElement = createCanvas();
  canvasElement.width = window.innerWidth;
  canvasElement.height = window.innerHeight;
  mountNode.appendChild(canvasElement);
  const game = new Game(canvasElement);
  setListeners(canvasElement, game);
  game.Run();
};

const createCanvas = () => {
  const canvas = document.createElement("canvas");
  canvas.innerText = "This page is not supported by your browser";
  return canvas;
};

const setListeners = (canvas, game) => {
  canvas.addEventListener("wheel", (e) => game.onWheel(e));
  canvas.addEventListener("mousemove", (e) => game.onMouseMove(e));
  canvas.addEventListener("click", (e) => game.onClick(e));
};

(() => {
  setup(document.getElementById("app"));
})();
