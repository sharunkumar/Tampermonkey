// ==UserScript==
// @name         Hide ads
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Hide ads on coolors.co
// @author       sharunkumar
// @match        https://coolors.co/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=coolors.co
// @grant        none
// ==/UserScript==

function yeet(xpath) {
    let yeeted = document.evaluate(xpath, document).iterateNext()

    if (!yeeted) return;

    console.log({ yeeted })

    yeeted.parentElement.removeChild(yeeted)
}

(function () {
    'use strict';

    console.log("hello from tampermonkey!");

    setInterval(() => {
        yeet("/html/body/div[3]/div[3]/div[6]")
        yeet("/html/body/a")
    }, 1000);
})();