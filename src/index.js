import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import registerServiceWorker from "./registerServiceWorker"
import { MuiThemeProvider, createMuiTheme } from "material-ui/styles"
import createPalette from "material-ui/styles/palette"
import createTypography from "material-ui/styles/typography"
import "typeface-arimo"

const oakland = {
  50: "#f1eee9",
  100: "#dbd4c8",
  200: "#c3b8a4",
  300: "#ab9c7f",
  400: "#b89f74",
  500: "#877148",
  600: "#7f6941",
  700: "#745e38",
  800: "#6a5430",
  900: "#574221",
  A100: "#0074b7",
  A200: "#0074b7",
  A400: "#0074b7",
  A700: "#0074b7",
  contrastDefaultColor: "light"
}

export const oaklandAccent = {
  50: "#e0eef6",
  100: "#b3d5e9",
  200: "#80badb",
  300: "#4d9ecd",
  400: "#2689c2",
  500: "#0074b7",
  600: "#006cb0",
  700: "#0061a7",
  800: "#00579f",
  900: "#004490",
  A100: "#bcd6ff",
  A200: "#89b8ff",
  A400: "#5699ff",
  A700: "#3c8aff",
  contrastDefaultColor: "light"
}

const palette = createPalette({
  type: "light",
  accent: oaklandAccent,
  primary: oakland
})

const theme = createMuiTheme({
  palette: palette,
  typography: createTypography(palette, {
    fontFamily: "Arimo"
  })
})

ReactDOM.render(
  <MuiThemeProvider theme={theme}><App theme={theme} /></MuiThemeProvider>,
  document.getElementById("root")
)
registerServiceWorker()
