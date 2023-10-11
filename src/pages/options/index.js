import React, { useState, useEffect } from 'react'
import ReactDOM from "react-dom";

import AutogrowInput from '../../components/AutogrowInput'
import SimpleSelectInput from '../../components/SimpleSelectInput'

function focusNext() {
  const inputs = Array.prototype.slice.call(
    document.querySelectorAll('input')
  );
  const currInput = document.activeElement;
  const currInputIndex = inputs.indexOf(currInput);
  const nextinputIndex =
    (currInputIndex + 1) % inputs.length;
  const input = inputs[nextinputIndex];
  input.focus();
}

function MyApp() {
  const [newEntry, updateNewEntry] = useState({
    urlPattern: '',
    entryFor: 'blocking',
    customLimits: {
      usageLimit: "10",
      usageUnit: "minutes",
      limitSpan: 'day', // weekly, bi-weekly
      sessionLimited: 'renew tally',
      sessionLimit: "2",
      sessionLimitUnit: "minutes",
      blockageType: 'show-block-page', //
    },
    selectivePassEnabled: false,
    selectivePasses: {
      "0": {
        type: 'CSS selector',
        key: "",
        values: [""]
      }
    }
  });

  const createNewEntry = async () => {
    const localStore = await chrome.storage.local.get(["blocks"]);
    console.log('got entries', localStore.blocks);
    const updatedData = {
      ...localStore?.blocks,
      entries: [
        ...(localStore?.blocks?.entries || []),
        newEntry
      ]
    }
    await chrome.storage.local.set({ blocks: updatedData })
  }

  const logStuff = async () => {
    const localStore = await chrome.storage.local.get(["blocks"]);
    console.log('log blocks', localStore.blocks);
    console.log('log sessions', localStore.sessions);
  }

  const clean = async () => {
    await chrome.storage.local.set({ blocks: {} })
  }

  useEffect(()=> {
    console.log('newEntry is ', newEntry)
  }, [newEntry])

  return (
    <div className="w-full h-screen bg-zinc-100 absolute">
      <div className="w-1/2 m-auto bg-zinc-200 p-8 mt-8 rounded-xl">
        <h1>Block8/krasty</h1>
        {/* blacklist */}
        <div className="flex flex-col my-4">
          {/* first field */}
          <div className="flex flex-row flex-wrap">
            <div className="text-xl">
              Add
            </div>
            <div className="inline-grid [place-items:center_start] border-b-2 border-zinc-800 border-dotted ml-4">
              <input className="[grid-area:1/1/2/2] h-full bg-transparent text-lg appearance-none bg-none border-none min-w-[1rem] resize-none w-full" size={newEntry.urlPattern.length > 0 ? "1" : "7"} value={newEntry.urlPattern} onChange={(e) => updateNewEntry({...newEntry, urlPattern: e.target.value})} placeholder="facebook.com"/>
              <span className="text-lg [visibility:hidden] [grid-area:1/1/2/2]">{newEntry.urlPattern}</span>
            </div>
            <div className="text-xl ml-4 cursor-pointer">
              for
            </div>
            <SimpleSelectInput className="ml-8" value={newEntry.entryFor} options={['blocking', 'limited usage',]} onChange={val => updateNewEntry({...newEntry, entryFor: val})}/>
          </div>
          {/* time limits */}
          {newEntry.entryFor === 'limited usage' && (
            <div className="flex flex-row flex-wrap mt-8">
              <div className="text-xl">
                to
              </div>
              <AutogrowInput className="text-center text-lg" value={newEntry.customLimits.usageLimit} onChange={(e) => updateNewEntry({...newEntry, customLimits: {...newEntry.customLimits, usageLimit: e.target.value}})} placeholder="10"/>
              <SimpleSelectInput className="ml-8" value={newEntry.customLimits.usageUnit} options={['minutes', 'hours']} onChange={val => updateNewEntry({...newEntry, customLimits: {...newEntry.customLimits, usageUnit: val}})}/>
              <div className="text-xl ml-8">
                every
              </div>
              <SimpleSelectInput className="ml-8" value={newEntry.customLimits.limitSpan} options={['day', 'week', '2 weeks', '3 weeks', 'month']} onChange={val => updateNewEntry({...newEntry, customLimits: {...newEntry.customLimits, limitSpan: val}})}/>
              <div className="text-xl ml-8">
                and
              </div>
              <SimpleSelectInput className="ml-8" value={newEntry.customLimits.sessionLimited} options={['renew tally', 'limit each session',]} onChange={val => updateNewEntry({...newEntry, customLimits: {...newEntry.customLimits, sessionLimited: val}})}/>
            </div>
          )}
          {newEntry.entryFor === 'limited usage' && newEntry.customLimits.sessionLimited ===  'limit each session' && (
            <div className="flex flex-row flex-wrap mt-8">
              <div className="text-xl">
                to
              </div>
              <AutogrowInput className="text-center text-lg" value={newEntry.customLimits.sessionLimit} onChange={(e) => updateNewEntry({...newEntry, customLimits: {...newEntry.customLimits, sessionLimit: e.target.value}})} placeholder="2"/>
              <SimpleSelectInput className="ml-8" value={newEntry.customLimits.sessionLimitUnit} options={['minutes', 'hours']} onChange={val => updateNewEntry({...newEntry, customLimits: {...newEntry.customLimits, sessionLimitUnit: val}})}/>
              <div className="text-xl ml-8">
                each, then
              </div>
              <SimpleSelectInput className="ml-8" value={newEntry.customLimits.blockageType} options={['only let emergency use', 'train to unlearn and re-route', 're-route to workflows', 're-route to playflows', 'track usage pattern']} onChange={val => updateNewEntry({...newEntry, customLimits: {...newEntry.customLimits, blockageType: val}})}/>
            </div>
          )}
          {newEntry.entryFor === 'limited usage' &&
            <div className="flex mt-8">
              <div className={`text-xl flex items-center px-3 pt-1 pb-[6px] ${newEntry.selectivePassEnabled ? 'bg-black text-zinc-200' : 'bg-zinc-400'} rounded-xl w-max cursor-pointer [transition:background-color_1s_ease,color_1s_ease]`} onClick={() => updateNewEntry({...newEntry, selectivePassEnabled: !newEntry.selectivePassEnabled})}>
                selective pass<span className={`bg-green-500 text-sm italic inline-block ${!newEntry.selectivePassEnabled ? 'p-0 m-0' : 'px-1 ml-2'}`}>{ newEntry.selectivePassEnabled && 'enabled'}</span>
              </div>
            </div>
          }
          {newEntry.selectivePassEnabled &&
            <div>
              {Object.keys(newEntry.selectivePasses).map(index => (
                <div key={"selective-pass-new-entry"+index}>
                  <div className="flex flex-row flex-wrap mt-8">
                    <div className="text-xl">
                      Identify by
                    </div>
                    <SimpleSelectInput className="ml-8" value={newEntry.selectivePasses[index].type} options={['CSS selector', 'URL param', 'URL regex']} onChange={val => updateNewEntry({...newEntry, selectivePasses: {...newEntry.selectivePasses, [index]: {...newEntry.selectivePasses[index], type: val}}})}/>
                  </div>
                  <div className="flex flex-row flex-wrap mt-4">
                    <div className="text-xl">
                      with key
                    </div>
                    <AutogrowInput className="text-center text-lg" value={newEntry.selectivePasses[index].key} onChange={e => updateNewEntry({...newEntry, selectivePasses: {...newEntry.selectivePasses, [index]: {...newEntry.selectivePasses[index], key: e.target.value}}})} placeholder="div.class>p"/>
                    <div className="text-xl ml-4">
                      and allow
                    </div>
                    {newEntry.selectivePasses[index].values.length && newEntry.selectivePasses[index].values.map((_v, spvIndex) => (
                      <AutogrowInput className="text-center text-lg" value={_v} 
                        onChange={e => {
                          if(e.target.value.split(',').length > 1) {
                            const firstPart = newEntry.selectivePasses[index].values.slice(0, spvIndex);
                            const secondPart = newEntry.selectivePasses[index].values.slice(spvIndex + 1);
                            const newValueAddition = [...firstPart, e.target.value.split(',')[0], ...secondPart];
                            newValueAddition.splice(spvIndex+1, 0, e.target.value.split(',')[1])
                            setTimeout(()=> focusNext())
                            console.log('new',{
                              firstPart,
                              secondPart,
                              newValueAddition
                            })
                            updateNewEntry({...newEntry, selectivePasses: {...newEntry.selectivePasses, [index]: {...newEntry.selectivePasses[index], values: [...newValueAddition]}}})
                          } else {
                            const newValues = newEntry.selectivePasses[index].values;
                            newValues[spvIndex] = e.target.value;
                            updateNewEntry({...newEntry, selectivePasses: {...newEntry.selectivePasses, [index]: {...newEntry.selectivePasses[index], values: [...newValues]}}})
                          }
                        }}
                        onBlur={e => {
                          if(e.target.value === ''){
                            const newValueAdditionA = [...newEntry.selectivePasses[index].values];
                            newValueAdditionA.splice(spvIndex, 1)
                            updateNewEntry({...newEntry, selectivePasses: {...newEntry.selectivePasses, [index]: {...newEntry.selectivePasses[index], values: [...newValueAdditionA]}}})
                          }
                        }} 
                      placeholder="a,b,c"/>

                    ))}
                  </div>
                </div>
              ))}
              <div className="flex mt-8">
                <div className="flex items-center text-sm italic px-3 pt-1 pb-[6px] bg-green-500 text-zinc-200 rounded-lg w-max cursor-pointer">
                  add more
                </div>
              </div>
            </div>
          }
          {newEntry.urlPattern !== '' &&
            <div className="flex justify-end" onClick={createNewEntry}>
              <div className="flex items-center text-base px-3 pt-1 pb-[6px] bg-teal-900 text-zinc-200 rounded-lg w-max cursor-pointer">
                confirm
              </div>
            </div>
          }
          <div className="flex justify-end mt-4" onClick={logStuff}>
            <div className="flex items-center text-base px-3 pt-1 pb-[6px] bg-teal-900 text-zinc-200 rounded-lg w-max cursor-pointer">
              log stuff
            </div>
          </div>
          <div className="flex justify-end mt-4" onClick={clean}>
            <div className="flex items-center text-base px-3 pt-1 pb-[6px] bg-teal-900 text-zinc-200 rounded-lg w-max cursor-pointer">
              clean
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const container = document.getElementById('options-page-react-container');
const root = ReactDOM.createRoot(container);
root.render(<MyApp />);