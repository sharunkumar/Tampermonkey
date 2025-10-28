// ==UserScript==
// @name         Reddit Wide Screen
// @namespace    http://tampermonkey.net/
// @version      2025-10-27
// @description  Wide-Screen view of Reddit
// @author       sharunkumar
// @match        https://www.reddit.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=reddit.com
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const isDisabledPath = () => [
        /\/achievements/,
        /\/notifications/,
        /\/user\/\w+\/achievements/,
    ].some(regex => regex.test(window.location.pathname))

    const isFirefox = navigator.userAgent.includes('Firefox');
    const widthStyle = isFirefox ? '-moz-available' : '-webkit-fill-available';

    const observer = new MutationObserver(mutations => {
        for (const mutation of mutations) {
            if (mutation.addedNodes.length) {
                const subgridContainer = document.getElementById('subgrid-container');
                if (subgridContainer) {
                    subgridContainer.style.width = isDisabledPath() ? undefined : widthStyle;
                }

                const mainContainer = document.querySelector('.main-container');
                if (mainContainer) {
                    mainContainer.style.display = isDisabledPath() ? undefined : 'flex';
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