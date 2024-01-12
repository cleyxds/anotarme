import React from "react"
import ReactDOM from "react-dom/client"

import { App } from "./App.tsx"
import { DataRoot } from "./DataRoot.tsx"

import "./styles/index.css"
import "./styles/colors.css"
import "./styles/fonts.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <DataRoot>
      <App />
    </DataRoot>
  </React.StrictMode>
)
