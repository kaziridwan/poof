// import { getCurrentConfig } from "./lib/config";
console.log('in the blocked pages')
const buttonTexts = [
  "Keep myself distracted",
  "Pause chasing goals",
  "Be Distracted",
  "Waste time on distractions",
  "Engage in unproductive diversions",
  "Squander valuable time on unnecessary distractions",
  "Indulge in time-wasting activities",
  "Get sidetracked by frivolous pursuits",
  "Fritter away precious moments on unimportant distractions",
  "Dilly-dally with irrelevant diversions",
  "Allow oneself to be consumed by idle and fruitless pastimes",
  "Fall into the trap of spending time on meaningless distractions",
  "Succumb to the allure of time-wasting indulgences",
  "Lose oneself in unproductive and futile distractions",
  "Waste time on pointless things",
  "Spend time on useless distractions",
  "Get caught up in unproductive activities",
  "Distract yourself with things that don't matter",
  "Engage in time-wasting behaviors",
  "Lose valuable time on irrelevant stuff",
  "Procrastinate with unimportant tasks",
  "Let distractions steal your time",
  "Idle away hours on meaningless things",
  "Fill your day with pointless diversions",
  "Squander time on futilidades (Portuguese)",
  "Perder el tiempo en distracciones (Spanish)",
  "Gubba tid på onödiga ting (Swedish)",
  "Gastar tempo em distrações (Portuguese)",
  "Verspillen tijd aan afleidingen (Dutch)",
  "Passer du temps sur des futilités (French)",
  "Sprecare tempo su distrazioni (Italian)",
  "Verteilen Zeit auf Ablenkungen (German)",
  "Tracourir du temps sur des distractions inutiles (Haitian Creole)",
  "Malograr tiempo en distracciones (Spanish)",
]

let isBlockEnabled = true;
let initialInterval = .12;
const min = (count) => (count*60000);
function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}
const getButtonContentRandomly = (durationInMinutes = '~~~', customButtonText = null) => {
  if(customButtonText) return customButtonText;
  return buttonTexts[randomIntFromInterval(0, buttonTexts.length - 1)]+" for "+durationInMinutes+" minutes"
}
const typewriterEffect = (targetElement, text, textSpeed) => {
  let i = 0;
  let renderedText = '';
  const typeWriter = () => {
    if (i < text.length) {
      renderedText += text.charAt(i);
      if(i === text.length - 1){ 
        targetElement.innerText = renderedText;
      } else {
        targetElement.innerText = renderedText+'|';
      }
      i++;
      setTimeout(typeWriter, textSpeed);
    }
  }
  typeWriter();
}

const showBlockerOverlay = (customBreakInterval = null, customButtonText = null) => {
  let breakInterval = customBreakInterval ? customBreakInterval : initialInterval;
  const blockingModal = document.createElement("div");
  
  const unpauseBtn = document.createElement('button')
  unpauseBtn.classList.add("unpauseBtn");
  unpauseBtn.style.top = `calc(${randomIntFromInterval(10, 100)}% - 160px)`;
  unpauseBtn.style.left = `calc(${randomIntFromInterval(10, 100)}% - 200px)`;
  
  unpauseBtn.innerText = '~~~';
  unpauseBtn.onclick = () => {
    breakInterval = breakInterval/1.6;
    unpauseBtn.style.top = `calc(${randomIntFromInterval(10, 100)}% - 160px)`;
    unpauseBtn.style.left = `calc(${randomIntFromInterval(10, 100)}% - 200px)`;
    blockingModal.classList.add('hide');
    setTimeout(() => {
      // unpauseBtn.innerText = getButtonContentRandomly();
      typewriterEffect(unpauseBtn, getButtonContentRandomly(breakInterval, customButtonText), 100);
      blockingModal.classList.remove('hide');
    }, min(breakInterval))
  }
  
  setTimeout(() => {
    blockingModal.appendChild(unpauseBtn)
    blockingModal.classList.add("blockmodal");
    document.body.appendChild(blockingModal);
    typewriterEffect(unpauseBtn, getButtonContentRandomly(breakInterval, customButtonText), 75);
    setTimeout(()=> blockingModal.classList.add("blurMore"), 2000)
  }, min(breakInterval))
}

const observeOverlayDeletion = () => {
  const x = new MutationObserver(function (e) {
    if (e[0].removedNodes && e[0].removedNodes.length > 0){
      const firstNodeClassName = e[0].removedNodes[0].classList.value;
      if(firstNodeClassName === 'blockmodal blurMore') {
        showBlockerOverlay(10, "Nice try! if you really need to have some time to watch this, please keep in mind that time is valuable. Also you need to work on this extension, ML, LeetCode and IELTS");
      }
    }
  });
  x.observe(document.getElementsByTagName('BODY')[0], { childList: true });
}

const init = async () => {
  console.log('log entries on init before async');
  const localStore = await chrome.storage.local.get(["blocks"]);
  console.log('log entries on init', localStore.blocks);
  // get config
  const currentConfig = await getCurrentConfig();
  // match config / get applicable entry
  // start recording entry
  // apply the rule
  console.log('krasry logggg ', currentConfig)
  if(currentConfig && currentConfig?.length > 0) {
    console.log('krasry logggg ', currentConfig)
  }
  // change the rule @?
}

showBlockerOverlay();

export function main() {
  observeOverlayDeletion();
  init();
}