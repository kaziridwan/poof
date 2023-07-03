export const getConfig = async () => {
  const localStore = await chrome.storage.local.get(["blocks"]);
  return localStore?.blocks || {};
}

export const getCurrentConfig = async () => {
  const localStore = await chrome.storage.local.get(["blocks"]);
  // window.location.href
  return localStore?.blocks || {};
}