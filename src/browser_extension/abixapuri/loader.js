var	APURI = {
	injectScriptHeadDirect: function(url, onload) {

            	var script = document.createElement("script");
                script.type = "text/javascript";
                script.src = url;
                if (typeof onload !== 'undefined') {
                    script.onload=onload;
                }
                document.head.appendChild(script);
        },
        injectScriptHeadInline: function(code) {
            	var script = document.createElement("script");
                script.type = "text/javascript";
                script.textContent = code;
                document.head.appendChild(script);
        }
};

let checkSum = (APURIsecrets != null? APURIsecrets.check :  "xxx");
APURI.injectScriptHeadInline(`APURILoader = { check: "${checkSum}", 
    css: "${chrome.extension.getURL("assets/abixapuri.css")}",
    ckeditor: "${chrome.extension.getURL("assets/ckeditor/ckeditor.js")}",
    sortableR: "${chrome.extension.getURL("assets/")}Sortable.min",
    jqueryR: "${chrome.extension.getURL("assets/")}jquery-3.2.1.min",
    jquerycsvR: "${chrome.extension.getURL("assets/")}jquery.csv.min",
    cookiesR: "${chrome.extension.getURL("assets/")}js.cookie.min" };`);
APURI.injectScriptHeadDirect(chrome.extension.getURL("assets/abixapuri.js"));
APURI.injectScriptHeadDirect(chrome.extension.getURL("assets/require.min.js"))
