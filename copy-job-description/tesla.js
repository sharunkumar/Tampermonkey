// ==UserScript==
// @name         Copy Job Description
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Adds a "Copy" button to Tesla job listing
// @author       sharunkumar
// @match        https://www.tesla.com/careers/search/job/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tesla.com
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    console.log("hello from tampermonkey")

    setTimeout(() => {
        let apply_button = document.evaluate("/html/body/div/div/div/div[1]/a", document).iterateNext()

        console.log({ apply_button })

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
        copy_button.removeAttribute("href")
        copy_button.removeAttribute("target")

        // copy_button.classList.remove("ycdc-btn")
        // copy_button.classList.add("apply-btn")
        copy_button.addEventListener('click', () => {
            let elements = [document.evaluate("/html/body/div/div/div", document).iterateNext()]
            copyText(elements.map(x => x.innerText).join("\n\n"))
        })

        apply_button.parentElement.appendChild(copy_button)
    }, 2000)


})();