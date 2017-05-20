<!-- Kopioi tämä teksti tehtävänantoon. Itse aukkoteksti laitetaan tehtävänantoon normaalisti, aukon kohdalle kirjoitetaan [] -->
 <script type="text/javascript">
/*%%% Koodi pois tekstistä */
if (typeof APURI === "undefined")
    var APURI = {};
if (typeof APURI.paivvast !== 'function') {
    APURI.paivvast = function (event, caller, elem, rnum, vaih) {
        var va = $("#" + elem);
        var ri = va.val().split("\n");
        ri[rnum - 1] = "#" + rnum + ":" + caller.value;
        va.val(ri.join("\n"));
        if (vaih === true) {
		va.trigger("change");
		va.trigger("input");
		va.trigger("contentChanged");
            var char = event.keyCode;
            if (char !== 9) {
                var e = jQuery.Event("keydown");
                e.which = event.which;
                va.trigger(e);
                var eu = jQuery.Event("keyup");
                eu.which = event.which;
                va.trigger(eu);
            }
        }
    };
}
if (typeof APURI.purku !== 'function') {
    APURI.purku = function (element) {
        var result;
        console.log("element purku: "+element.tagName);
        result = document.createElement(element.tagName);
        for (var attname in element.attributes) {
            //console.log("-- attname:"+attname+":"+element.attributes[attname].value);
            if (typeof element.attributes[attname].value !== 'undefined')
                result.setAttribute(element.attributes[attname].name, element.attributes[attname].value);
        }
        console.log("+");
        if (element.hasChildNodes()) {
            element.childNodes.forEach(function (subnode, key) {
                if (subnode.nodeType == Node.TEXT_NODE) {
                    var text = subnode.textContent;
                    var res = text.trim().split("[]");
                    var juuri = document.createElement("span");
                    console.log("*");
                    //juuri.className = omaNode.className;    
                    for (var i = 0; i < res.length; i++) {
                        if (i > 0) {
                            var formNode = document.createElement("form");
                            formNode.style.display = "inline";
                          /*  formNode.innerHTML = "<input type='text' length='10' onChange=\"APURI.paivvast(event, this, \'apuri_vastk_" + APURI.count + "\', " + (i) + ", false);\" "+
                                        " onKeyup=\"APURI.paivvast(event, this, \'apuri_vastk_" + APURI.count + "\', " + (i) + ", true);\" />";*/
                           var inputNode = document.createElement("input");
                            
                            inputNode.setAttribute("type", "text");
                            inputNode.setAttribute("length", "10");
                            inputNode.setAttribute("onChange", "APURI.paivvast(event, this, \'apuri_vastk_" + APURI.count + "\', " + (i) + ", false);");
                            inputNode.setAttribute("onKeyup", "APURI.paivvast(event, this, \'apuri_vastk_" + APURI.count + "\', " + (i) + ", true);");
                            formNode.appendChild(inputNode);
                            juuri.appendChild(formNode);
                        }
                        juuri.appendChild(document.createTextNode(res[i]));
                    }
                    result.appendChild(juuri);
                } else if (subnode.nodeType == Node.ELEMENT_NODE) {
                    if (subnode.tagName == "SCRIPT") {
                        // Jos scripti, ei tehdä mitään
                    } else if (subnode.textContent.includes("[]")) {
                        result.appendChild(APURI.purku(subnode));
                    } else {
                        result.appendChild(subnode.cloneNode(true));
                    }
                }
                /*
                 if (typeof value === 'Text') {
                 
                 } else if (typeof value === ''*/

            });
        }
        console.log(result);
        return result;
    };
}

if (typeof APURI.count === "undefined")
    APURI.count = 1;

if (typeof APURI.pjono === "undefined") {
    APURI.pjono = [];
}

if (typeof APURI.purkuprocessTrigger !== 'function') {
    APURI.purkuprocessTrigger = function () {
        console.log("LENGTH: " + APURI.pjono.length);
        while (APURI.pjono.length > 0) {
            var currentNode = APURI.pjono.pop();
            console.log(currentNode);
            
            var kysRootNode = currentNode.parentNode.parentNode;
            var tehtAntoRootNode = currentNode.parentNode;
            var vastRootNode = kysRootNode.querySelector("textarea.answerText");
            if (vastRootNode !== null) {
                vastRootNode.id = "apuri_vastk_" + APURI.count;
                vastRootNode.style.height = "10px";
                vastRootNode.style.display = "none";
                var uusiNode = APURI.purku(currentNode);
                currentNode.style.display = "none";

                tehtAntoRootNode.insertBefore(uusiNode, currentNode.nextSibling);
                
                APURI.count++;
                }
                else {
                console.log("VASTROOTnode null");
                console.log(kysRootNode);
                }
        }
    };
}


(function () {

    var scriptTag = document.currentScript || (function () {
        var scripts = document.getElementsByTagName('script');
        return scripts[scripts.length - 1];
    })();

    var omaNode = scriptTag.parentNode;
    while (!(omaNode.tagName.toUpperCase() === "SPAN") && !(omaNode.className.toLowerCase() === "text")) {
        omaNode = omaNode.parentNode;
    }


    APURI.pjono.push(omaNode);
    APURI.purkuprocessTrigger();

})();
/* Koodi loppuu tähän %%%*/
</script>

