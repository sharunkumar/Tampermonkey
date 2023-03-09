// ==UserScript==
// @name         Copy Job Description
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Adds a "Copy" button to ycombinator job listing
// @author       sharunkumar
// @match        https://www.linkedin.com/jobs/view/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=linkedin.com
// @grant        none
// ==/UserScript==

function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

(function () {
    'use strict';

    console.log("hello from tampermonkey")
    let apply_selector = "#ember27"

    waitForElm(apply_selector).then(apply_button => {
        let elements = [document.querySelector(".jobs-unified-top-card__job-title").closest(".p5"), document.querySelector(".jobs-description-content__text")]

        let copy_button = apply_button.cloneNode(true)

        copy_button.id = "copy-button"
        copy_button.text = "Copy"
        copy_button.href = "javascript:void(0)"
        copy_button.classList.remove("ycdc-btn")
        copy_button.addEventListener('click', () => {
            navigator.clipboard.writeText(elements.map(x => x.innerText).join("\n\n"))
        })

        while (copy_button.firstChild) {
            copy_button.removeChild(copy_button.firstChild)
        }

        copy_button.appendChild(document.createTextNode("Copy"))

        apply_button.parentElement.appendChild(copy_button)

    })
})();