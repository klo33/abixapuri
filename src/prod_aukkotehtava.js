/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


<!-- Kopioi tämä teksti tehtävänantoon. Itse aukkoteksti laitetaan tehtävänantoon normaalisti, aukon kohdalle kirjoitetaan [] -->
<script type="text/javascript">
    /*%%%PROD_AUKKO%%% Koodi pois tekstistä */
    if (typeof APURI === "undefined") 
        var APURI ={};
    if (typeof APURI.paivvast !== 'function') {
        APURI.paivvast =  function(event, caller, elem, rnum, vaih) {
            var va = $("#"+elem); 
            var ri = va.val().split("\n");
            ri[rnum-1]="#"+rnum+":"+caller.value;
            va.val(ri.join("\n"));
			if (vaih == true) {
				var char = event.keyCode;
				if (char != 9) {
                                    var e = jQuery.Event("keydown");
                                    e.which = event.which;
                                    va.trigger(e); 
                                    var eu = jQuery.Event("keyup");
                                    eu.which = event.which;
                                    va.trigger(eu);
				}
			}
        }
    }
    if (typeof APURI.purku !== 'function') {
       APURI.purku = function(element) {
           var result;
           result = document.createElement(element.tagName);
           for (var attname in element.attributes) {
                result.setAttribute(attname, element.attributes[attname].value);
           }
           if (element.hasChildNodes()) {
               element.childNodes.forEach(function(subnode, key) {
                   if (subnode.nodeType == Node.TEXT_NODE) {
                       var text = subnode.textContent;
                       var res = text.trim().split("[]");
                        var juuri = document.createElement("span");
                        //juuri.className = omaNode.className;    
                        for (var i = 0; i<res.length; i++) { 
                            if (i>0) {		
                                var formNode = document.createElement("form");
                                formNode.style.display="inline";
                                var inputNode = document.createElement("input");
                                inputNode.setAttribute("type", "text");
                                inputNode.setAttribute("length", "10");
                                            inputNode.setAttribute("onChange", "APURI.paivvast(event, this, \'apuri_vastk_"+APURI.count+"\', "+(i)+", false);");
                                            inputNode.setAttribute("onKeyup", "APURI.paivvast(event, this, \'apuri_vastk_"+APURI.count+"\', "+(i)+", true);");
                                formNode.appendChild(inputNode);
                                juuri.appendChild(formNode);

                            }
                            juuri.appendChild(document.createTextNode(res[i]));
                        }
                       result.appendChild(juuri);
                   } else if (subnode.nodeType == Node.ELEMENT_NODE) {
                       if (subnode.tagName == "SCRIPT") {
                           // Jos scripti, ei tehdä mitään
                       }
                       else if (subnode.textContent.includes("[]")) {
                            result.appendChild(APURI.purku(subnode));
                       } else {
                            result.appendChild(subnode.cloneNode(true));
                       }
                   }
                   
                               if (typeof value === 'Text') {
                        
                    } else if (typeof value === ''
                        
                   });
           }
       }
    }
    
    if (typeof APURI.count === "undefined")
        APURI.count = 1;
    else 
        APURI.count++;
    if (typeof APURI.pjono === "undefined") {
        APURI.pjono = [];
    }
    
    if (typeof APURI.purkuprocessTrigger !== 'function') {
       APURI.purkuprocessTrigger = function() {
           while (pjono.lenght > 0) {
               var currentNode = pjono.pop();
                currentNode.style.display="none";
                var kysRootNode = currentNode.parentNode.parentNode;
                var tehtAntoRootNode = currentNode.parentNode;
                var vastRootNode = kysRootNode.querySelector("textarea.answerText");
                vastRootNode.id = "apuri_vastk_"+APURI.count;
                vastRootNode.style.height = "10px";
                vastRootNode.style.display="none";
                var uusiNode = APURI.purku(omaNode);
                tehtAntoRootNode.insertBefore(uusiNode, omaNode.nextSibling);
                APURI.count++;
           }
       }
    }

                                   
    (function() {
    
    scriptTag = document.currentScript;
    var omaNode = scriptTag.parentNode;
    while (!(omaNode.tagName.toUpperCase() === "SPAN") && !(omaNode.className.toLowerCase === "text")) {
        omaNode = omaNode.parentNode;
    }
    APURI.pjono.push(omaNode);
    //var teksti = omaNode.textContent;
    //var teksti = omaNode.innerHtml;
    //teksti = teksti.replace(/\s*\<script[^\>]*\>\s*\/\*\%\%\%[\s\S]*\%\%\%\*\/\s*\<\/script\>\s*/g, ""); 
  /*  
    var res = teksti.trim().split("[]");
    var juuri = document.createElement("span");
    juuri.className = omaNode.className;    
    
    for (var i = 0; i<res.length; i++) { 
        if (i>0) {		
            var formNode = document.createElement("form");
            formNode.style.display="inline";
            var inputNode = document.createElement("input");
            inputNode.setAttribute("type", "text");
            inputNode.setAttribute("length", "10");
			inputNode.setAttribute("onChange", "APURI.paivvast(event, this, \'apuri_vastk_"+APURI.count+"\', "+(i)+", false);");
			inputNode.setAttribute("onKeyup", "APURI.paivvast(event, this, \'apuri_vastk_"+APURI.count+"\', "+(i)+", true);");
            formNode.appendChild(inputNode);
            juuri.appendChild(formNode);
            			
        }
        juuri.appendChild(document.createTextNode(res[i]));
    }
    tehtAntoRootNode.insertBefore(juuri, omaNode.nextSibling);
    */
    })();
    /* Koodi loppuu tähän %%%*/
</script>

