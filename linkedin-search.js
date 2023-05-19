// ==UserScript==
// @name         Copy Job Description (Search)
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Adds a "Copy" button to LinkedIn search results page
// @author       sharunkumar
// @match        https://www.linkedin.com/jobs/search/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=linkedin.com
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

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

    let apply_selector = ".social-share__dropdown-trigger"

    waitForElm(apply_selector).then(apply_button => {

        let copy_button = apply_button.cloneNode(true)

        copy_button.id = "copy-button"
        copy_button.text = "Copy"
        copy_button.href = "javascript:void(0)"
        copy_button.classList.remove("ycdc-btn")
        copy_button.addEventListener('click', () => {
            let elements = [document.querySelector(".jobs-unified-top-card__content--two-pane"), document.querySelector(".jobs-description__content")]
            navigator.clipboard.writeText(elements.map(x => x.innerText).join("\n\n"))
        })

        while (copy_button.firstChild) {
            copy_button.removeChild(copy_button.firstChild)
        }

        copy_button.appendChild(document.createTextNode("Copy"))

        apply_button.parentElement.appendChild(copy_button)

    })

})();