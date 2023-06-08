import React from 'react'
import ReactDOM from "react-dom";

function MyApp() {
  return (
    <h2>
      asdfasdfasdfsd
    </h2>
  );
}

const container = document.getElementById('options-page-react-container');
const root = ReactDOM.createRoot(container);
root.render(<MyApp />);