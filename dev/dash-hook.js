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
  const DashHook = async () => {
    if (window.DashPlayer) {
      console.log("DASH hook", window.DashPlayer);
      const origin_Dash = {}
      for (const key in window.DashPlayer.prototype) {
        const element = window.DashPlayer.prototype[key];
        origin_Dash[key] = element;
        window.DashPlayer.prototype[key] = function () {
          console.log('DASH HOOK', key);
          return origin_Dash[key].apply(this, arguments);
        }
        console.log("DASH proto", key);
      }
    } else {
      setTimeout(DashHook, 1000)
    }
  };
  DashHook()
})();
