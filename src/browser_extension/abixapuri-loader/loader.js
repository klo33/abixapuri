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
        }
};
  
	APURI.injectScriptHeadDirect("https://klo33.github.io/abixapuri/src/AbiApuri-skripti.user.js");
	