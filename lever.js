// ==UserScript==
// @name         Copy Job Description
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Adds a "Copy" button to lever.co listing
// @author       sharunkumar
// @match        https://jobs.lever.co/*/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=lever.co
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    console.log("hello from tampermonkey")

    let apply_button = document.querySelector("body > div.content-wrapper.posting-page > div > div.section-wrapper.accent-section.page-full-width > div > div.postings-btn-wrapper > a")

    let copy_button = apply_button.cloneNode(true)

    function copyText(text) {
        if (!text) {
            return
        }

        let ta = document.createElement("textarea")
        document.body.appendChild(ta)
        ta.value = text;
        ta.select();

        document.execCommand("copy")
        document.body.removeChild(ta)
    }

    copy_button.id = "copy-button"
    copy_button.text = "Copy"
    copy_button.href = "javascript:void(0)"
    copy_button.classList.remove("template-btn-submit")
    copy_button.classList.add("template-btn")
    copy_button.addEventListener('click', () => {
        let elements = [document.querySelector("body > div.content-wrapper.posting-page > div > div.section-wrapper.accent-section.page-full-width > div > div.posting-headline"), document.querySelector("body > div.content-wrapper.posting-page > div > div:nth-child(2) > div:nth-child(1)")]
        copyText(elements.map(x => x.innerText).join("\n\n"))
    })

    apply_button.parentElement.appendChild(copy_button)
})();