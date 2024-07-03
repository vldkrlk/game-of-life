const setup = (mountNode) => {
  const canvasElement = createCanvas();
  mountNode.appendChild(canvasElement);
};

const createCanvas = () => {
  const canvas = document.createElement("canvas");
  canvas.innerText = "This page is not supported by your browser";
  return canvas;
};

(() => {
  setup(document.getElementById("app"));
})();
