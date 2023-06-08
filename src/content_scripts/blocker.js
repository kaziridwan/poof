// console.log('in the blocked pages')
let isBlockEnabled = true;
let initialInterval = 5;
const min = (count) => (count*60000);
function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}
const blockingModal = document.createElement("div");

const unpauseBtn = document.createElement('button')
unpauseBtn.classList.add("unpauseBtn");
unpauseBtn.style.display = "block";
unpauseBtn.style.position = "absolute";
unpauseBtn.style.top = `${randomIntFromInterval(1, 100)}%`;
unpauseBtn.style.left = `${randomIntFromInterval(1, 100)}%`;

unpauseBtn.innerText = 'unpause for 2 mins'
unpauseBtn.onclick = () => {
  initialInterval = initialInterval/1.6;
  unpauseBtn.style.top = `${randomIntFromInterval(1, 100)}%`;
  unpauseBtn.style.left = `${randomIntFromInterval(1, 100)}%`;
  blockingModal.classList.add('hide');
  setTimeout(() => {
    blockingModal.classList.remove('hide');
  }, min(initialInterval))
}

setTimeout(() => {
  blockingModal.appendChild(unpauseBtn)
  blockingModal.classList.add("blockmodal");
  document.body.appendChild(blockingModal);
}, min(initialInterval))


