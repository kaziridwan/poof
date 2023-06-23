import React, { useState } from 'react'
import ReactDOM from "react-dom";

function MyApp() {
  const [blacklist, updateBlacklist] = useState([{
    urlPattern: ''
  }]);

  return (
    <div>
      <h1>Block8/krasty</h1>
    </div>
  );
}

const container = document.getElementById('options-page-react-container');
const root = ReactDOM.createRoot(container);
root.render(<MyApp />);