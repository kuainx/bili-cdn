// ==UserScript==
// @name         bili buffer v3
// @version      0.2.0
// @description  提升bili video buffer时长(player v3)
// @author       KUAI
// @match        https://www.bilibili.com/*
// @grant        none
// ==/UserScript==

(function () {
  "use strict";
  const DashHook = async () => {
    if (window.DashPlayer) {
      window.DashPlayer.prototype.o_fire=window.DashPlayer.prototype.fire
      window.DashPlayer.prototype.fire = function () {
        if (this.getStableBufferTime() !== 250) {
          this.setStableBufferTime(250);
          console.log(`%c set buffer time`, "background-color:#ff0000");
        }
        return window.DashPlayer.prototype.o_fire.apply(this, arguments);
      }
      console.log(`%c DASH hook success`, "background-color:#00ff00");
    } else {
      setTimeout(DashHook, 1000)
    }
  };
  DashHook()
})();
