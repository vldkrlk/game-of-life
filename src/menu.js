import { initialSettigns } from "./gameSettings";
import { subscribe } from "./eventEmitter";
const pauseBtn = document.getElementById("run-btn");
const clearBtn = document.getElementById("clear-btn");
const upsRange = document.getElementById("ups-range");
const upsLabel = document.getElementById("ups-label");
const statusTextElement = document.getElementById("status-text");
const STATUS_RUNNING = "running";
const STATUS_PAUSED = "paused";

subscribe("menu", onUpdate);
init();

function onUpdate(prop, value) {
  switch (prop) {
    case "pause":
      setPause(value);
  }
}

function init() {
  upsLabel.innerText = "Updates per second:" + initialSettigns.ups;
  upsRange.value = initialSettigns.ups;
  setPause(initialSettigns.pause);
}

function setPause(isPaused) {
  statusTextElement.innerText = (
    isPaused ? STATUS_PAUSED : STATUS_RUNNING
  ).toUpperCase();
}

export function onPauseClick(callback) {
  pauseBtn.addEventListener("click", callback);
}

export function onClearClick(callback) {
  clearBtn.addEventListener("click", callback);
}

export function onUpsChange(callback) {
  upsRange.addEventListener("input", (e) => {
    upsLabel.innerText = "Updates per second:" + e.target.value;
    callback(e);
  });
}
