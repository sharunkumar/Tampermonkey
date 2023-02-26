// ==UserScript==
// @name         Copy Job Description
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Adds a "Copy" button to amazon.jobs listing
// @author       sharunkumar
// @match        https://www.amazon.jobs/en/jobs/*/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=amazon.jobs
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    console.log("hello from tampermonkey")
    let apply_button = document.querySelector("#apply-button")

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
    copy_button.classList.remove("btn-primary")
    copy_button.classList.add("btn-secondary")
    copy_button.addEventListener('click', () => {
        let elements = [document.querySelector("#job-detail > div.apply-header > div > div > div > div.info-wrapper.col-12.col-md-7.col-xl-8 > div"), document.querySelector("#job-detail-body > div > div.col-12.col-md-7.col-lg-8.col-xl-9")]
        copyText(elements.map(x => x.innerText).join("\n\n"))
    })

    apply_button.parentElement.appendChild(copy_button)

    // Your code here...
})();