var	APURI = {
	injectScriptHeadDirect: function(url, onload) {

            	var script = document.createElement("script");
                script.type = "text/javascript";
                script.src = url;
                if (typeof onload !== 'undefined') {
                    //console.log("For "+url+" found handler");
                    script.onload=onload;
                }
                document.head.appendChild(script);
        },
        injectScriptHeadInline: function(code) {
            	var script = document.createElement("script");
//                console.log("AbixApuri loading local resources");
                script.type = "text/javascript";
                script.textContent = code;
                document.head.appendChild(script);
        }
};

APURI.injectScriptHeadDirect(chrome.extension.getURL("assets/jquery-3.2.1.min.js"));
APURI.injectScriptHeadDirect(chrome.extension.getURL("assets/arvhaku.js"));