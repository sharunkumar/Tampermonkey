// ==UserScript==
// @name         Copy Job Description
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Adds a "Copy" button to ycombinator job listing
// @author       sharunkumar
// @match        https://www.ycombinator.com/companies/stackshine/jobs/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=ycombinator.com
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    console.log("hello from tampermonkey")

    let apply_button = document.evaluate("/html/body/div/div[2]/section/div/div[1]/div[2]/div[3]/div/div[1]/a", document).iterateNext()

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
    copy_button.classList.remove("ycdc-btn")
    // copy_button.classList.add("apply-btn")
    copy_button.addEventListener('click', () => {
        let elements = [document.evaluate("/html/body/div[1]/div[2]/section/div/div[1]", document).iterateNext()]
        copyText(elements.map(x => x.innerText).join("\n\n").replace("Apply to role ›Copy", ""))
    })

    apply_button.parentElement.appendChild(copy_button)
})();