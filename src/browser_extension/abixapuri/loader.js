var	APURI = {
	injectScriptHeadDirect: function(url, onload) {

            	var script = document.createElement("script");
                script.type = "text/javascript";
                script.src = url;
                console.log("Loading url "+url);
                if (typeof onload !== 'undefined') {
                    //console.log("For "+url+" found handler");
                    script.onload=onload;
                }
                document.head.appendChild(script);
        },
        injectScriptHeadInline: function(code) {
            	var script = document.createElement("script");
                script.type = "text/javascript";
                script.innerHTML = code;
                document.head.appendChild(script);
        }
};

  console.log("url", browser.extension.getURL("assets/abixapuri.js"));
        APURI.injectScriptHeadInline(`APURILoader = { css: "${chrome.extension.getURL("assets/abixapuri.css")}",
    ckeditor: "${chrome.extension.getURL("assets/ckeditor/ckeditor.js")}",
    sortableR: "${chrome.extension.getURL("assets/")}Sortable.min",
    jqueryR: "${chrome.extension.getURL("assets/")}jquery-3.2.1.min",
    fontawesome: "https://use.fontawesome.com/d06b9eb6a7.js",
    jquerycsvR: "${chrome.extension.getURL("assets/")}jquery.csv.min",
    cookiesR: "${chrome.extension.getURL("assets/")}js.cookie.min" };`);


  console.log("After inline-insertion");
	APURI.injectScriptHeadDirect(chrome.extension.getURL("assets/abixapuri.js"));
        
APURILoader =  {
    css: chrome.extension.getURL("assets/abixapuri.css"),
    ckeditor: chrome.extension.getURL("assets/ckeditor/"),
    sortableR: chrome.extension.getURL("assets/")+"Sortable.min",
    jqueryR: chrome.extension.getURL("assets/")+"jquery-3.2.1.min",
    fontawesome: "https://use.fontawesome.com/d06b9eb6a7.js",
    jquerycsvR: chrome.extension.getURL("assets/")+"jquery.csv.min",
    cookieR: chrome.extension.getURL("assets/")+"js.cookie.min"
};

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.sendMessage(tabs[0].id, APURILoader, function(response) {
    console.log(response.farewell);
  });
});