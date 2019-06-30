"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
window.HTMLMediaElement = {};
window.HTMLFrameSetElement = {};
window.HTMLBodyElement = {};
window.HTMLFrameElement = {};

// const $ = require("./jquery"); // requires jquery.js
const application = require("application");
const fs = require("uxp").storage.localFileSystem;
var scenegraph = require("scenegraph");


let panel;
//  lazy load the panel
function getPanel() {
    if (panel == null) {
        const HTML = `<link rel="stylesheet" type="text/css" href="main.css">`;

        //  create the panel
        panel = document.createElement("panel");

        let styles = document.createElement("header");
        styles.innerHTML = HTML;
        panel.appendChild(styles);
        
        let root = document.createElement("app-root");
		panel.appendChild(root);
    }

    return panel;

}

module.exports = {
    panels: {
        "samplePanel": {
            show(event) {
                //  attach the panel to the body and show it
                event.node.appendChild(getPanel());
                require("./src/polyfills");
                require("./src/runtime");
                require("./src/main");
            },
            hide(event) {
                if (event.node.firstChild) {
                    event.node.firstChild.remove();
                }
            },
            update() {  // optional
                console.log("Panel updated");
            }
        }
    }
};
