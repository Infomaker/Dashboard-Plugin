/*
|--------------------------------------------------------------------------
| Main.js - The starting point for your plugin
|--------------------------------------------------------------------------
|
| main.js is responsible for importing all plugin core resources.
|
*/

import "./plugin/index.jsx"
import "./plugin/style.css"

if (module.hot && typeof module.hot.accept === 'function') {
    module.hot.accept()
}