import { getCurrentConfig } from "./content_scripts/lib/config";

const extensions = 'https://developer.chrome.com/docs/extensions'
const webstore = 'https://developer.chrome.com/docs/webstore'

chrome.action.onClicked.addListener(async (tab) => {
  if (tab.url.startsWith(extensions) || tab.url.startsWith(webstore)) {
    // Retrieve the action badge to check if the extension is 'ON' or 'OFF'
    const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
    // Next state will always be the opposite
    const nextState = prevState === 'ON' ? 'OFF' : 'ON'

    // Set the action badge to the next state
    await chrome.action.setBadgeText({
      tabId: tab.id,
      text: nextState,
    });
  }
})

// record sessions


// --- main service

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

init();

