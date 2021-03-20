// ==UserScript==
// @name         bili cdn change
// @version      0.2.1
// @description  切换bilivideo 镜像 cdn 为原生cdn
// @author       kuai
// @match        https://www.bilibili.com/*
// @grant        none
// ==/UserScript==

(function () {
	"use strict";
	XMLHttpRequest.prototype.origin_open = XMLHttpRequest.prototype.open;
	XMLHttpRequest.prototype.open = function (method, url, async, user, password) {
		let nurl = url;
		if (/^https:\/\/[a-z.-\d]*bilivideo.com/i.test(url)) {
			let node = url.match(/(?<=^https:\/\/)[a-z.-\d]*(?=.bilivideo.com)/i)[0];
			if (url.indexOf("upos-sz-mirrorkodo") !== -1) {
				console.log(`%c test go ${node}`, "background-color:#00ffff");
			} else if (url.indexOf("cn-sh-fx-bcache") === -1) {
				let nNode = "cn-sh-fx-bcache-" + String(Math.floor(Math.random() * 9 + 1)).padStart(2, "0");
				nurl = url.replace(/^https:\/\/[a-z.-\d]*bilivideo.com/i, "https://" + nNode + ".bilivideo.com");
				console.log(`%c replace ${node} to ${nNode}`, "background-color:yellow");
			} else {
				console.log(`%c go ${node}`, "background-color:#00ff00");
			}
		} else if (/^https:\/\/[a-z\d]*.cachenode.cn/i.test(url)) {
			let node = url.match(/(?<=^https:\/\/)[a-z\d]*\.cachenode.cn:\d*\/[a-z.-\d]*(?=.bilivideo.com)/i)[0];
			console.log(`%c unable to deal ${node}`, "background-color:#00ffff");
			//无法抓取到该链接
		}
		return this.origin_open(method, nurl, async === undefined ? true : async, user, password);
	};
	const setBufferTime = () => {
		if (window.dashPlayer) {
			dashPlayer.setStableBufferTime(300);
			console.log(`%c set buffer time`, "background-color:#ffff00");
		} else {
			setTimeout(setBufferTime, 1000);
		}
	};
	setBufferTime();

})();
