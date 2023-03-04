// ==UserScript==
// @name         Copy Job Description
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Adds a "Copy" button to ycombinator job listing
// @author       sharunkumar
// @match        https://*.symplicity.com/students/app/jobs/detail/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=symplicity.com
// @grant        none
// ==/UserScript==

function waitForElement(xpath, callback) {
    var interval = setInterval(function () {
        var element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (element) {
            clearInterval(interval);
            callback(element);
        }
    }, 100);
}

const addCopyButton = elem => {
    let desc_xpaths = ["/html/body/my-app/main-layout/div[2]/div/div[3]/main/div[3]/div/div/jobs-detail/div[2]/div/div", "/html/body/my-app/main-layout/div[2]/div/div[3]/main/div[3]/div/div/jobs-detail/div[1]/div/div[1]/div[2]"]

    let apply_button = elem // document.querySelector(apply_selector) // document.evaluate(apply_xpath, document).iterateNext()

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

}

(function () {
    'use strict';

    waitForElement('//*[@id="content-view"]/div[3]/div/div/jobs-detail/div[1]/div/div[1]/div[2]/div[2]/div[2]/button[1]', addCopyButton)
})();