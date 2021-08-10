// ==UserScript==
// @name         bili buffer
// @version      0.1.0
// @description  提升bili video buffer时长
// @author       kuai
// @match        https://www.bilibili.com/*
// @grant        none
// ==/UserScript==

(function () {
	"use strict";
	const setBuffer = async () => {
		if (window.dashPlayer) {
			if (window.dashPlayer.getStableBufferTime() !== 250) {
				window.dashPlayer.setStableBufferTime(250);
				console.log(`%c set buffer time`, "background-color:#ff0000");
			}
		}
	};

	XMLHttpRequest.prototype.origin_open = XMLHttpRequest.prototype.open;
	XMLHttpRequest.prototype.open = function (method, url, async, user, password) {
		let nUrl = url;
		if (/^https:\/\/[a-z.-\d]*bilivideo.com/i.test(url)) {
			setBuffer();
		}
		return this.origin_open(method, nUrl, async === undefined ? true : async, user, password);
	};

})();
