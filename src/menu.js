const pauseBtn = document.getElementById("run-btn");
const clearBtn = document.getElementById("clear-btn");
const upsRange = document.getElementById("ups-range");
const upsLabel = document.getElementById("ups-label");

export function onPauseClick(callback) {
  pauseBtn.addEventListener("click", callback);
}

export function onClearClick(callback) {
  clearBtn.addEventListener("click", callback);
}

export function onUpsChange(callback) {
  upsRange.addEventListener("change", (e) => {
    upsLabel.innerText = "Updates per second:" + e.target.value;
    callback(e);
  });
}
