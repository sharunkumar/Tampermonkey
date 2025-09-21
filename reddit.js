// ==UserScript==
// @name         Reddit
// @namespace    http://tampermonkey.net/
// @version      2025-09-21
// @description  try to take over the world!
// @author       You
// @match        https://www.reddit.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=reddit.com
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const observer = new MutationObserver(mutations => {
        for (const mutation of mutations) {
            if (mutation.addedNodes.length) {
                const subgridContainer = document.getElementById('subgrid-container');
                if (subgridContainer) {
                    subgridContainer.style.width = '-moz-available';
                    // The element has been found and modified, we can stop observing.
                    // observer.disconnect();
                    return;
                }
            }
        }
    });

    // Start observing the document body for new elements
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();