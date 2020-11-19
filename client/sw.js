window.addEventListener("load", () => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js");
  }
});

const worker = new worker(`data:text/javascript;,${encodeURIComponent(`(${myWorker.toString()})()`)}`)