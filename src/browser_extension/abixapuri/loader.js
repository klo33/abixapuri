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



 chrome.tabs.query({}, function(tabs) {
    var message = {foo: bar};
    for (var i=0; i<tabs.length; ++i) {
        chrome.tabs.sendMessage(tabs[i].id, message);
    }
});

let checkSum = (APURIsecrets != null? APURIsecrets.check : "537bde28-1473-4220-9a1d-5c23770f0c2b");
APURI.injectScriptHeadInline(`APURILoader = { check: "${checkSum}", 
    css: "${chrome.runtime.getURL("assets/abixapuri.css")}",
    ckeditor: "${chrome.runtime.getURL("assets/ckeditor/ckeditor.js")}",
    sortableR: "${chrome.runtime.getURL("assets/")}Sortable.min",
    jqueryR: "${chrome.runtime.getURL("assets/")}jquery-3.2.1.min",
    jquerycsvR: "${chrome.runtime.getURL("assets/")}jquery.csv.min",
    cookiesR: "${chrome.runtime.getURL("assets/")}js.cookie.min",
    jqueryUiR: "${chrome.runtime.getURL("assets/")}jquery-ui.min",
    jqueryUi: "${chrome.runtime.getURL("assets/jquery-ui.min.js")}",
    jqueryUiCss: "${chrome.runtime.getURL("assets/jquery-ui.min.css")}",
    xmlEditor: "${chrome.runtime.getURL("assets/jquery.xml-editor.js")}",
    xmlEditorCss: "${chrome.runtime.getURL("assets/jquery.xml-editor.css")}",
    xsd2json: "${chrome.runtime.getURL("assets/xsd2json.js")}",
    ace: "${chrome.runtime.getURL("assets/ace/ace.js")}",
    examXsd: "${chrome.runtime.getURL("assets/exam.xsd")}",
    schema: "${chrome.runtime.getURL("assets/schema/")}" };`);
APURI.injectScriptHeadDirect(chrome.runtime.getURL("assets/abixapuri.js"));
APURI.injectScriptHeadDirect(chrome.runtime.getURL("assets/require.min.js"))
//APURI.injectScriptHeadDirect(chrome.runtime.getURL("assets/jquery-ui.min.js"))
