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

(function () {
    'use strict';

    console.log("hello from tampermonkey")

    setTimeout(() => {
        let apply_xpath = "/html/body/div[5]/div[3]/div/div[1]/div[1]/div/div[1]/div/div/div[3]/div/div/div[1]/button"
        let desc_xpaths = ["/html/body/div[5]/div[3]/div/div[1]/div[1]/div/div[1]/div/div/div[1]/h1", "/html/body/div[5]/div[3]/div/div[1]/div[1]/div/div[2]/article"]

        let apply_button = document.querySelector('#ember27') // document.evaluate(apply_xpath, document).iterateNext()

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
            // let elements = [document.evaluate("/html/body/div[5]/div[3]/div/div[1]/div[1]/div/div[1]/div/div/div[1]/h1", document).iterateNext(), document.evaluate("/html/body/div[5]/div[3]/div/div[1]/div[1]/div/div[2]/article", document).iterateNext()]
            let elements = desc_xpaths.map(item => document.evaluate(item, document).iterateNext())
            copyText(elements.map(x => x.innerText).join("\n\n"))
        })

        while (copy_button.firstChild) {
            copy_button.removeChild(copy_button.firstChild)
        }

        copy_button.appendChild(document.createTextNode("Copy"))

        apply_button.parentElement.appendChild(copy_button)
    }, 5000)
})();