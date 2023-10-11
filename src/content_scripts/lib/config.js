import { match, minimatch } from 'minimatch'

export const getConfig = async () => {
  const localStore = await chrome.storage.local.get(["blocks"]);
  return localStore?.blocks || {};
}

export const doesEntryMatch = (reference, match) => {
  
}

const sanitizeURLPattern = url => {
  if(!url.startsWith('http') && !url.startsWith('*')) {
    return '*'+url
  }
  return url
}

export const getCurrentConfig = async () => {
  const localStore = await chrome.storage.local.get(["blocks"]);
  const config = localStore?.blocks?.entries || [];
  // window.location.href
  console.log('krasty location is ', window.location.href);
  console.log('krasty config is', config);
  const matchedEntry = config.filter(entry => {
    if(minimatch(window.location.href, sanitizeURLPattern(entry.urlPattern))) { // matches
      return true;
    }
    return false
  })
  return matchedEntry || null;
}

export const getSessionStats = async () => {
  const localStore = await chrome.storage.local.get(["sessions"]);
  const sessions = localStore?.sessions?.entries || [];
  // clean older stats
  const matchedEntry = config.filter(entry => {
    if(minimatch(window.location.href, sanitizeURLPattern(entry.urlPattern))) { // matches
      return true;
    }
    return false
  })
  return matchedEntry || null;
}

export const recordSessionStart = async (startTimeAsKey) => {
  const localStore = await chrome.storage.local.get(["sessions"]);
  const sessions = localStore?.sessions || {};
  const entries = localStore?.sessions.entries || [];

  const matchedUrlPatterns = entries.filter(entry => {
    if(minimatch(window.location.href, sanitizeURLPattern(entry.urlPattern))) { // matches
      return true;
    }
    return false
  }).map(entryObj => entryObj.urlPattern);

  for (const urlPattern of matchedUrlPatterns ) {
    entries[urlPattern].sessions = [
      ...(entries[urlPattern].sessions || []),
      {
        start: startTimeAsKey
      }
    ]
  }

  await chrome.storage.local.set({ sessions: {
    ...sessions,
    entries
  }})
}

export const recordSessionEnd = async (startTimeAsKey) => {
  const timenow = Date.now();
  
  const localStore = await chrome.storage.local.get(["sessions"]);
  const sessions = localStore?.sessions || {};
  const entries = localStore?.sessions.entries || [];

  const matchedUrlPatterns = entries.filter(entry => {
    if(minimatch(window.location.href, sanitizeURLPattern(entry.urlPattern))) { // matches
      return true;
    }
    return false
  }).map(entryObj => entryObj.urlPattern);


  for (const urlPattern of matchedUrlPatterns ) {
    const currentSessionIndex = entries[urlPattern].sessions.findIndex(o => o.start === startTimeAsKey)
    // if more than one ?
    entries[urlPattern].sessions[currentSessionIndex] = {
      ...entries[urlPattern].sessions[currentSessionIndex],
        end: timenow
      }
  }

  await chrome.storage.local.set({ sessions: {
    ...sessions,
    entries
  }})
}