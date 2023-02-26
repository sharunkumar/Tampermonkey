// ==UserScript==
// @name         Copy Job Description
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Adds a "Copy" button to greenhouse.io listing
// @author       sharunkumar
// @match        https://boards.greenhouse.io/*/jobs/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=greenhouse.io
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    console.log("hello from tampermonkey");

    let apply_button = document.querySelector('#apply_button');
    apply_button.style.position = "unset"



    let div = document.createElement("div")
    div.style.display = "flex"
    div.style.columnGap = "10px"

    function copyText(html) {
        if (!html) {
            return
        }

        let ta = document.createElement("textarea")
        div.appendChild(ta)
        let element = html.innerText;
        ta.value = element;
        ta.select();

        document.execCommand("copy")
        div.removeChild(ta)
    }

    let copy_button = apply_button.cloneNode(false)
    copy_button.innerText = "Copy"
    copy_button.id = "copy-text"
    copy_button.href = "javascript:void(0)"
    copy_button.addEventListener("click", () => copyText(document.querySelector("#content")));
    copy_button.style.backgroundColor = "#2975CA";
    copy_button.style.fontWeight = "normal";
    copy_button.style.padding = "12px 20px 14px 20px";
    copy_button.style.fontSize = "14px";
    copy_button.style.lineHeight = "17px";
    copy_button.style.borderRadius = "3px";

    apply_button.parentElement.appendChild(div)
    div.appendChild(apply_button)
    div.appendChild(copy_button)

})();