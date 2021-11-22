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

let checkSum = (APURIsecrets != null? APURIsecrets.check : "537bde28-1473-4220-9a1d-5c23770f0c2b");
APURI.injectScriptHeadInline(`APURILoader = { check: "${checkSum}", 
    css: "${chrome.extension.getURL("assets/abixapuri.css")}",
    ckeditor: "${chrome.extension.getURL("assets/ckeditor/ckeditor.js")}",
    sortableR: "${chrome.extension.getURL("assets/")}Sortable.min",
    jqueryR: "${chrome.extension.getURL("assets/")}jquery-3.2.1.min",
    jquerycsvR: "${chrome.extension.getURL("assets/")}jquery.csv.min",
    cookiesR: "${chrome.extension.getURL("assets/")}js.cookie.min",
    jqueryUiR: "${chrome.extension.getURL("assets/")}jquery-ui.min",
    jqueryUi: "${chrome.extension.getURL("assets/jquery-ui.min.js")}",
    jqueryUiCss: "${chrome.extension.getURL("assets/jquery-ui.min.css")}",
    xmlEditor: "${chrome.extension.getURL("assets/jquery.xml-editor.js")}",
    xmlEditorCss: "${chrome.extension.getURL("assets/jquery.xml-editor.css")}",
    xsd2json: "${chrome.extension.getURL("assets/xsd2json.js")}",
    ace: "${chrome.extension.getURL("assets/ace/ace.js")}",
    examXsd: "${chrome.extension.getURL("assets/exam.xsd")}",
    schema: "${chrome.extension.getURL("assets/schema/")}" };`);
APURI.injectScriptHeadDirect(chrome.extension.getURL("assets/abixapuri.js"));
APURI.injectScriptHeadDirect(chrome.extension.getURL("assets/require.min.js"))
//APURI.injectScriptHeadDirect(chrome.extension.getURL("assets/jquery-ui.min.js"))
