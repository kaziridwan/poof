import React, { useState } from 'react'
import ReactDOM from "react-dom";

function MyApp() {
  const [blacklist, updateBlacklist] = useState([{
    urlPattern: ''
  }]);

  return (
    <div>
      <h1>Block8/krasty</h1>

      {/* blacklist */}
      <div>
        Blacklist
        <div>
          block <input value={blacklist[0].urlPattern} placeholder="url" onChange={(e) => updateBlacklist([{urlPattern: e.target.value}])}/>
        </div>
      </div>
    </div>
  );
}

const container = document.getElementById('options-page-react-container');
const root = ReactDOM.createRoot(container);
root.render(<MyApp />);