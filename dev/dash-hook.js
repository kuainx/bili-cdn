// ==UserScript==
// @name         DASH hook
// @version      0.1
// @description  hook dash media player
// @author       KUAI
// @match        https://www.bilibili.com/*
// @grant        none
// ==/UserScript==

(function () {
	"use strict";
	const setBuffer = async () => {
		if (window.dashPlayer) {
			console.log(window.dashPlayer);
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
