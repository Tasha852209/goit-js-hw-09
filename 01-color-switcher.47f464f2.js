!function(){var t=document.querySelector("body"),e=document.querySelector("button[data-start]"),n=document.querySelector("button[data-stop]"),a="";e.addEventListener("click",(function(){e.disabled=!0,n.disabled=!1,a=setInterval((function(){return t.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,0))}),1e3)})),n.addEventListener("click",(function(){n.disabled=!0,e.disabled=!1,clearInterval(a)}))}();
//# sourceMappingURL=01-color-switcher.47f464f2.js.map