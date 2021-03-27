// ==UserScript==
// @name         bili cdn change
// @version      0.4.0
// @description  切换bilivideo 劣质cdn 为 优质cdn
// @author       kuai
// @match        https://www.bilibili.com/*
// @grant        none
// ==/UserScript==

(function () {
	"use strict";
	let requestedDomain = {
		bilivideoGoodNode: new Set(),
		bilivideoBadNode: new Set(),
		bilivideoSwitchedNode: new Set(),
		others: new Set(),
	};
	window.requestedDomain = requestedDomain;
	const goodCdn = [
		"upos-sz-mirrorkodo",
	];
	for (let i = 1; i <= 10; i++) {
		goodCdn.push("cn-sh-fx-bcache-" + String(i).padStart(2, "0"));
	}
	for (let i = 1; i <= 14; i++) {
		goodCdn.push("cn-sh-cc-bcache-" + String(i).padStart(2, "0"));
	}

	const setBuffer = async () => {
		if (window.dashPlayer) {
			if (window.dashPlayer.getStableBufferTime() !== 300) {
				window.dashPlayer.setStableBufferTime(300);
				console.log(`%c set buffer time`, "background-color:#ff0000");
			}
		}
	};

	const putRequestedDomain = async (domain, from, nNode) => {
		switch (from) {
			case "bilivideoGoodNode":
				console.log(`%c go ${domain}`, "background-color:#00ff00");
				break;
			case "bilivideoBadNode":
				console.log(`%c replace ${domain} to ${nNode}`, "background-color:yellow");
				requestedDomain.bilivideoSwitchedNode.add(nNode);
				break;
			case "others":
				let node = domain.match(/(?<=\/\/)[^\/]*(?=\/)/i);
				if (node) {
					domain = node[0];
				} else {
					console.log(domain);
				}
				break;
		}
		requestedDomain[from].add(domain);
	};

	XMLHttpRequest.prototype.origin_open = XMLHttpRequest.prototype.open;
	XMLHttpRequest.prototype.open = function (method, url, async, user, password) {
		let nUrl = url;
		if (/^https:\/\/[a-z.-\d]*bilivideo.com/i.test(url)) {
			let node = url.match(/(?<=^https:\/\/)[a-z.-\d]*(?=.bilivideo.com)/i)[0];
			if (goodCdn.includes(node)) {
				putRequestedDomain(node, "bilivideoGoodNode");
			} else {
				let nNode;
				if (requestedDomain.bilivideoGoodNode.size) {
					const goodNodeList = Array.from(requestedDomain.bilivideoGoodNode);
					nNode = goodNodeList[0];
					putRequestedDomain(nNode, "bilivideoGoodNode");
				} else {
					nNode = goodCdn[Math.floor(Math.random() * goodCdn.length)];
					putRequestedDomain(node, "bilivideoBadNode", nNode);
				}
				nUrl = url.replace(/^https:\/\/[a-z.-\d]*bilivideo.com/i, "https://" + nNode + ".bilivideo.com");
			}
			setBuffer();
		} else {
			putRequestedDomain(url, "others");
		}
		return this.origin_open(method, nUrl, async === undefined ? true : async, user, password);
	};

})();
