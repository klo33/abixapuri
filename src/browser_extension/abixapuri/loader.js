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
        injectMetaLoaderInfo: function(string) {
                var meta = document.createElement("meta");
                meta.setAttribute('name', 'APURI-loader');
                meta.setAttribute('content', string)
                document.head.appendChild(meta);

        }
};
const getAssetURL = (resourceName) => {
    if (typeof chrome?.runtime?.getURL == "function")
        return chrome.runtime.getURL(resourceName);
    else if (typeof chrome?.extension?.getURL == "function")
        return chrome.extension.getURL(resourceName);
    return "undefined";
}

APURI.injectMetaLoaderInfo(`{ 
    "css": "${getAssetURL("assets/abixapuri.css")}",
    "ckeditor": "${getAssetURL("assets/ckeditor/ckeditor.js")}",
    "sortableR": "${getAssetURL("assets/")}Sortable.min",
    "jqueryR": "${getAssetURL("assets/")}jquery-3.2.1.min",
    "jquerycsvR": "${getAssetURL("assets/")}jquery.csv.min",
    "cookiesR": "${getAssetURL("assets/")}js.cookie.min",
    "ace": "${getAssetURL("assets/ace/ace.js")}",
    "examXsd": "${getAssetURL("assets/exam.xsd")}",
    "schema": "${getAssetURL("assets/schema/")}" }`);
APURI.injectScriptHeadDirect(getAssetURL("assets/abixapuri.js"));
APURI.injectScriptHeadDirect(getAssetURL("assets/require.min.js"))

