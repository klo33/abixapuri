// ==UserScript==
// @name        AbixApuri
// @name:se     AbixAssistenten
// @namespace   http://kauniaistenlukio.fi
// @description AbixApuri lisää toiminnallisuutta oma.abitti.fi-kokeenlaadintaan
// @description:se  AbixAssistenten erbjuder extra funktioner till oma.abitti.fi
// @author      Joni Lehtola, joni.lehtola@kauniaistenlukio.fi
// @include     https://oma.abitti.fi/school/exam/*
// @include     https://oma.abitti.fi/school/exams
// @include     https://oma.abitti.fi/school/grading
// @include     https://oma.abitti.fi/
// @version     0.1.0
// @grant       none
// @downloadUrl https://klo33.github.io/abixapuri/src/AbiApuri-skripti.user.js
// @updateUrl   https://klo33.github.io/abixapuri/src/AbiApuri-skripti.meta.js
// ==/UserScript==

/* AUTHOR Joni Lehtola, 2017
 * Lisätiedot https://klo33.github.io/abixapuri
 * Lisäosa on julkaistu GPLv3 lisenssillä. Lisänosan käyttö omalla vastuulla. 
 * Tällä lisäosalla tai sen kehittäjällä ei ole mitään tekemistä Ylioppilastutkintolautakunnan kanssa ja YTL ei vastaa mistään laajennuksen aiheuttamista 
 * haitoista tai vahingoista, kuten myöskään ei tekijä, vaikka lisäosa ei tarkoituksellisesti tee mitään vahingollista. 
 * 
 * AbixApuri - Lisäosa oma.abitti.fi-palveluun
    Copyright (C) 2017 Joni Lehtola

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
// to make things easier with TamperMonkey in Chrome
if (typeof unsafeWindow === 'undefined')
	unsafeWindow = window;

if (typeof APURI === "undefined") 
        var APURI ={
            aukkotehtscript: "<script sec=\"apuri\" type=\"application/javascript\" id=\"apuri_script\">if(\"undefined\"===typeof APURI)var APURI={};\"function\"!==typeof APURI.paivvast&&(APURI.paivvast=function(a,b,c,k,l){c=$(\"#\"+c);var d=c.val().split(\"\n\");d[k-1]=\"#\"+k+\":\"+b.value;c.val(d.join(\"\n\"));1==l&&9!=a.keyCode&&(b=jQuery.Event(\"keydown\"),b.which=a.which,c.trigger(b),b=jQuery.Event(\"keyup\"),b.which=a.which,c.trigger(b))});\"undefined\"===typeof APURI.kentta&&(APURI.kentta=[]);\"function\"!==typeof APURI.purku&&(APURI.purku=function(a){\"undefined\"===typeof APURI.kentta[APURI.count]&&(APURI.kentta[APURI.count]=0);var b;b=document.createElement(a.tagName);for(var c in a.attributes)b.setAttribute(c.name,a.attributes[c].value);a.hasChildNodes()&&a.childNodes.forEach(function(a,c){if(a.nodeType==Node.TEXT_NODE){for(var d=a.textContent.trim().split(\"[]\"),g=document.createElement(\"span\"),f=0;f<d.length;f++){if(0<f){APURI.kentta[APURI.count]++;var h=document.createElement(\"form\");h.style.display=\"inline\";var e=document.createElement(\"input\");e.setAttribute(\"type\",\"text\");e.setAttribute(\"length\",\"10\");e.setAttribute(\"onChange\",\"APURI.paivvast(event, this, 'apuri_vastk_\"+APURI.count+\"', \"+APURI.kentta[APURI.count]+\", false);\");e.setAttribute(\"onKeyup\",\"APURI.paivvast(event, this, 'apuri_vastk_\"+APURI.count+\"', \"+APURI.kentta[APURI.count]+\", true);\");h.appendChild(e);g.appendChild(h)}g.appendChild(document.createTextNode(d[f]))}b.appendChild(g)}else a.nodeType==Node.ELEMENT_NODE&&\"SCRIPT\"!=a.tagName&&(a.textContent.includes(\"[]\")?b.appendChild(APURI.purku(a)):b.appendChild(a.cloneNode(!0)))});return b});\"undefined\"===typeof APURI.count?APURI.count=1:APURI.count++;\"undefined\"===typeof APURI.pjono&&(APURI.pjono=[]);(function(){var a;(a=document.currentScript)||(a=document.getElementsByTagName(\"script\"),a=a[a.length-1]);\"BODY\"==a.parentNode.tagName&&(a=document.getElementById(\"apuri_script\"));for(a=a.parentNode;\"SPAN\"!==a.tagName.toUpperCase()&&\"text\"!==a.className.toLowerCase;)a=a.parentNode;APURI.pjono[APURI.count]=a;a.style.display=\"none\";var b=a.parentNode,c=a.parentNode.parentNode.querySelector(\"textarea.answerText\");c.id=\"apuri_vastk_\"+APURI.count;c.style.height=\"10px\";c.style.display=\"none\";c=APURI.purku(a);b.insertBefore(c,a.nextSibling)})();</script>",
            modal_background_style:  "position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-level: 5; background: #AAA url(images/ui-bg_flat_0_aaaaaa_40x100.png) 50% 50% repeat-x; opacity: .40; filter: Alpha(Opacity=40);",
            modal_foreground_style:  "position: fixed; overflow-y:auto; top: 60px; left: 20%; width: 60%; opacity: 1; height: 80%; z-level: 10; background: #FFF;",
            noop: function() {
				return false;
			},
            ytle: {  // YTL:n kokeen vakioita
                savedIndicator: "div.savedIndicator",
                emptyQuestionWarning: 'div.empty-question-warning'
            },
            util: {
                dateToString(datestr) {

                   var date = new Date(datestr);
                   var output = ""+date.getDate()+"."+(date.getMonth()+1)+"."+date.getFullYear();
				   return output;
                }
            },
            questionsort: { 
                'bufferOld': {}, 
                bufferOrder: [],
                changed: false,
                sortGetHandler: function(sortable) {
                    
                },
                sortSetHandler: function(sortable) {
                    
                }
            },
            replacedFields: {
                count: 0,
                list: [], // täydennä {field: , indicatorSaved: }
                contentLength: 0,
                calculateLength: function() {
                    var count =0;
                    //for (var i=0; i< APURI.replacedFields.list.length; i++) {
                    //    
                    //    count += APURI.replacedFields.list[i].field.value.length;
                    //}  BEFORE assoc array
                    for (var key in APURI.replacedFields.list) {
                        count += APURI.replacedFields.list[key].field.value.length;
                    }
                    APURI.replacedFields.contentLength = count;
                    if (count > APURI.postponedSaving.contentLimit) {
                        APURI.replacedFields.postponedSaving = true;
                    } else {
                        APURI.replacedFields.postponedSaving = false;
                    }
                    //console.log("PITKÄÄ "+count);
                    return count;
                },
                triggeringField: undefined,
                postponedSaving: false
            },
            postponedSaving: {
                isPostponed: function() {
                    if (!APURI.replacedFields.postponedSaving)
                        return false;
                    return (++APURI.postponedSaving.isPostponedCount > 1);
                }, // OLI boolean nyt function poistettu käytöstä
                isPostponedCount: 0, // 0 false, 2 true
                contentLimit: 150000,
                singleFieldLimit: 20000,
                triggeringField: undefined,
                allPostponedFields: [],
                postponeDelay: 30000,
                //postponeTimer: {},
                start: function(initelem) {
                    //console.log("Postcount:"+APURI.postponedSaving.isPostponedCount)
                    var name = initelem.attr("id") || initelem.attr("name") || "none"; 
                    if (typeof APURI.replacedFields.list[name] !== 'undefined') {
                        APURI.postponedSaving.allPostponedFields[name] = APURI.replacedFields.list[name];
                        if (typeof APURI.replacedFields.list[name].savedIndicator === 'undefined')
                            APURI.replacedFields.list[name].savedIndicator = APURI.replacedFields.list[name].field.parent.queryElement(APURI.ytle.savedIndicator);
                        if (typeof APURI.replacedFields.list[name].savedIndicator !== 'undefined')
                            APURI.replacedFields.list[name].savedIndicator.style.visibility = 'hidden';
                    }
                    //APURI.postponedSaving.allPostponedFields[name] = initelem;
                    //if (typeof APURI.replacedFields.list[name] !== 'undefined') {
                    //    APURI.replacedFields.list[name].savedIndicator.style.visibility = 'hidden';
                    //}
                    if (APURI.postponedSaving.isPostponedCount < 3) {
                       // console.log("START delayd");
                     // true;
                    if (typeof initelem !== 'undefined')
                        APURI.postponedSaving.triggeringField = initelem;
                    if (typeof APURI.postponedSaving.postponeTimer === 'undefined') {
                        APURI.postponedSaving.postponeTimer = unsafeWindow.setTimeout(APURI.postponedSaving.timetrigger, APURI.postponedSaving.postponeDelay);
                    }
                    APURI.ui.showDelaydsavingNotice();
                    }
                },
                timetrigger: function() {
                    //console.log("TIMETRIGGER delaydsaving");
                    APURI.postponedSaving.isPostponedCount = 0; // false;
                    APURI.postponedSaving.allPostponedFields = [];
                    APURI.paivkentTrigger(APURI.postponedSaving.triggeringField);                    
                    delete APURI.postponedSaving.postponeTimer;
                    APURI.ui.clearDelaydsavingNotice();
                },
                manualTrigger: function() {
                    //console.log("MANTRIGGER delaydsaving");
                    APURI.postponedSaving.isPostponedCount = 0; //false;
                    APURI.postponedSaving.allPostponedFields = [];
                    if (typeof APURI.postponedSaving.triggeringField !== 'undefined')
                        APURI.paivkentTrigger(APURI.postponedSaving.triggeringField);
                    else
                        APURI.paivkentTrigger($('textarea')[0]); // jollei tietoa, niin valitaan vain joku kenttä.
                    if (typeof APURI.postponedSaving.postponeTimer !== 'undefined') {
                        unsafeWindow.clearTimeout(APURI.postponedSaving.postponeTimer);
                        delete APURI.postponedSaving.postponeTimer;
                    }
                    APURI.ui.clearDelaydsavingNotice();
                }
            },
            ui: {
                showDelaydsavingNotice: function() {
                    // TODO KIRJOITA LOPPUUN
                                     //   console.log("Notice up");
                    var outer = $('<div />').attr('id', 'APURI_delayd').attr('class','comedown');
                    var message = $('<div />').attr('class','APURI_message').html('Suurten kuvien tai liitteiden vuoksi <strong>tallennusta ei vielä tehty!</strong>');
                    var button = document.createElement('button');
                    button.class = 'APURI tallennanappi'
                    button.onclick = APURI.postponedSaving.manualTrigger;
                    button.innerHTML = 'Tallenna';
                    outer.append(message).append(button);
                    document.body.appendChild(outer[0]);
                },
                clearDelaydsavingNotice: function() {
                    // TODO - varmista, että on olemassa. Tällä hetkellä kutsutaan pakkovarmistuksista, ja
                    // on mahdollista että ei olekaan ikkunaa
                                     //   console.log("Notice down");
                    $('#APURI_delayd').attr('class', 'clearup');
                    setTimeout(APURI.ui.deleteDelaydsavingNotice, 2000);
                    for (var key in APURI.postponedSaving.allPostponedFields) {
                        APURI.postponedSaving.allPostponedFields[key].savedIndicator.style.visibility = "visible";
                    }
                },
                deleteDelaydsavingNotice: function() {
                                               //             console.log("Notice del");
                    $('#APURI_delayd').remove();
                },
                showEmptyQuestionWarning: function(elem) {
                    if (typeof APURI.replacedFields.list[elem].emptyQuestionWarning === 'undefined') {
                        var emptyel = APURI.replacedFields.list[elem].field.parentNode.queryElement(APURI.ytle.emptyQuestionWarning);
                        APURI.replacedFields.list[elem].emptyQuestionWarning = emptyel;
                    }
                    if (typeof APURI.replacedFields.list[elem].emptyQuestionWarning !== 'undefined') {
                        APURI.replacedFields.list[elem].emptyQuestionWarning.style.visibility = "visible";
                    }                
                },
                hideEmptyQuestionWarning: function(elem) {
                    if (typeof APURI.replacedFields.list[elem].emptyQuestionWarning !== 'undefined') {
                        APURI.replacedFields.list[elem].emptyQuestionWarning.style.visibility = "hidden";
                    }                
                },
                showHttpLinkWarning: function(elem) {
                    // TODO
                },
                appendSupportNotice: function() {
                    $('<div />').attr('class', 'APURI_footer')
                                .html("Vihreät elementit ovat <a href='https://klo33.github.io/abixapuri/'>AbixApuri</a>-laajennuksen lisäämiä. Niiden toiminnasta ei YTL vastaa.")
                                .prependTo('#footer .content');
                    $('<div />').attr('class', 'APURI_footer_contact')
                                .html("<h5><a href='https://klo33.github.io/abixapuri'>AbixApuri</a></h5><p><a href='https://github.com/klo33/abixapuri/issues'>Virhetilanteet (GitHub)</a></p><p><a href='https://klo33.github.io/abixapuri'>Kotisivu</a>/<a href='https://www.facebook.com/groups/339542799419574/'>Facebook-ryhmä</a></p>")
                                .appendTo('#footer .footer-column:first');
                }
            }
        };

if (typeof APURI.paivkentTrigger !== 'function') {
	APURI.paivkentTrigger = function(va) {
		va.trigger("change");
		va.trigger("input");
		va.trigger("contentChanged");
                /*var e = jQuery.Event("keydown");
		e.which = 70;
		va.trigger(e);
		var eu = jQuery.Event("keyup");
		eu.which = 70;
		va.trigger(eu);*/
        }
    }
    

if (typeof APURI.paivkent !== 'function') {
	APURI.paivkent = function(elem, input) {
                
		var va = $('textarea[name='+elem+']');
                if (!(va.length >0)) { // jos ei elem ole nimi, niin sitten ilm. id
                    va = $('textarea[id='+elem+']');
                } 
                if (!APURI.replacedFields.postponedSaving && input.length > APURI.postponedSaving.singleFieldLimit) {
                    APURI.replacedFields.calculateLength();
                } 
                // DONE if input length is more than certain limit check total length
                // if still true activate postponation
                if (input.length === 0) {
                    APURI.ui.showEmptyQuestionWarning(elem);
                 
                } else {
                    APURI.ui.hideEmptyQuestionWarning(elem);
                }
                       // TODO jos matchaa regexpiin
                    // TULEVISSA VERSIOISSA
                    // joko rajoitus koon suhteen ja MYÖS, että ei tarkisteta joka kerta, vaan vain silloin tällöin
                    // koska regexp tarkistus aikaavievä, varsinkin jos on oikeasti base64-kuvia
            if (false) { // tämä käännetty toistaiseksi pois päältä
                    APURI.ui.showHttpLinkWarning(elem);
                }

		va.val(input);
		va[0].innerHTML=input;
		//va.trigger("change");
		//va.trigger("input");
		//va.trigger("contentChanged");
                // TODO check is postponationcondition true - temp turned off
                // if (!APURI.replacedFields.postponedSaving) {
                // DONE TEE OIKEASTI counter, joka pitää olla suurempi kuin 1, jotta postponed, nyt boolean
                if (!APURI.postponedSaving.isPostponed()) {
                    APURI.paivkentTrigger(va);
                } else {
                    APURI.postponedSaving.start(va);
                    // DONE
                    // spawn postponed saving which
                    // sets timer
                    // saves the field
                    // initiates the postponed timer visual flag timer too
                    // TODO -- EI VIELÄ TEHTY
                    // which check in intervals whether postponation is still valid
                }
	}
}

if (typeof APURI.examBuffer === "undefined") 
	APURI.examBuffer = [];
	
function printObject(o) {
  var out = '';
  for (var p in o) {
    out += p + ': ' + o[p] + '\n';
  }
  console.log(out);
}


APURI.testi = function() {
}

if (typeof APURI.examImportCurrent !== 'function') {
	APURI.examImportCurrent = function(callback) {
		var location = window.location.href.split(/[?#]/)[0]; 
		var currUuid = location.match(/^https:\/\/oma\.abitti\.fi\/school\/exam\/([^\/]+)\/?\#?\??.*$/)[1];
		//console.log("Current uuid="+currUuid);
		//console.log("..");

		$.getJSON("https://oma.abitti.fi/exam-api/exams/"+currUuid+"/exam", function(data) {

			//console.log("Success on JSON");
			
			callback(data);
			//returnval = data;
		});
		
	}
}
// https://oma.abitti.fi
if (typeof APURI.examSaveCurrent !== 'function') {
	APURI.examSaveCurrent = function(exam, reload = true) {
		$.ajax({
			type: "POST",
			url: "/exam-api/composing/"+exam.examUuid+"/exam-content",
			data: JSON.stringify(exam.content),
			accept: "application/json; text/javascript",
			contentType: "application/json; charset=UTF-8",
			dataType: "json",
			success: function(data){
                            //console.log("Saved successfully"); 
                            if (reload)
                                window.location.reload(true);
                        },
			failure: function(errMsg) {
				console.log("ERROR: "+errMsg);
				
			},
			complete: function(data){
                            //console.log("Save complited successfully");
                        }
		});
	}
}

// source: copied from ...
if (typeof APURI.shortenText !== 'function') {
	APURI.shortenText = function(text,maxLength,options) {
		if ( text.length <= maxLength ) {
			return text;
		}
		if ( !options ) options = {};
		var defaultOptions = {
			suffix: true,
			suffixString: " ...",
			preserveWordBoundaries: true,
			wordSeparator: " "
		};
		$.extend(options, defaultOptions);
		var suffix = "";
		if ( text.length > maxLength && options.suffix) {
			suffix = options.suffixString;
		}

		var maxTextLength = maxLength - suffix.length;
		var cutIndex;
		if ( options.preserveWordBoundaries ) {
			var lastWordSeparatorIndex = text.lastIndexOf(options.wordSeparator, maxTextLength+1);
			cutIndex = lastWordSeparatorIndex > 0 ? lastWordSeparatorIndex : maxTextLength;
		} else {
			cutIndex = maxTextLength;
		}

		var newText = text.substr(0,cutIndex);
		return newText + suffix;
	}
}


// MIKSI TÄMÄ ALLA OLEVA?? TODO tarkista ja poista!
if (typeof APURI.findLargestId !== 'function') {
	APURI.findLargestId = function(obj, largest) {
		var largestId = 0;
		if (largest > 0)
			largestId = largest;
		if (obj != null && typeof obj == 'object') {
			if (typeof obj.id !== 'undefined') {
				if (obj.id > largestId)
					largestId = obj.id;
			}
			for (var key in obj) {	
				if (typeof obj[key] == 'object') 
					largestId = APURI.findLargestId(obj[key], largestId);
			}
		}
		
		
		return largestId;
	}
}

if (typeof APURI.traverseSetId !== 'function') {
	APURI.traverseSetId = function(obj, initval) {
		var counter = 0;
		if (typeof initval == 'number' && initval > 0) 
			counter = initval;
		if (obj != null && typeof obj == 'object') {
			for (var key in obj) {
				if (key == 'id') {
					obj[key] = counter++;
					//console.log("id set to "+(counter-1));
				}
				if (typeof obj[key] == 'object') {
					counter = APURI.traverseSetId(obj[key], counter);
				}
			}
		}
		return counter;
	}
}

if (typeof APURI.traverseDisplayNumber !== 'function') {
	APURI.traverseDisplayNumber = function(obj, curr, clevel = 1) {
		var count = {level1: 0,
					 level2: 0,
					 level3: 0};
		if (typeof curr === 'number' && curr > 1) { 
			count.level1 = curr-1;
		} else if (typeof curr === 'object') {
			count = curr;
		}
                
                var countup = false;
				
		if (obj != null && typeof obj == 'object') {
			if (typeof obj.displayNumber !== 'undefined') {
                                if (typeof obj.level !== 'undefined')
                                    clevel = obj.level;
				var debug = "";
                                countup = true;
				if (clevel == 1) {
					debug = obj.displayNumber = ""+(++count.level1);
					count.level2 = 0;
					count.level3 = 0;
				} else if (clevel == 2) {
					debug = obj.displayNumber = ""+count.level1+"."+(++count.level2);
					count.level3 = 0;
				} else if (clevel == 3) {
					debug = obj.displayNumber = ""+ count.level1+"."+count.level2+"."+(++count.level3);
				}
				//console.log("Set Display:"+debug);
                                clevel++;
			}
			for (var key in obj) {
				if (typeof obj[key] == 'object') {
					count = APURI.traverseDisplayNumber(obj[key], count, clevel);
				}
			}
		}
		return count;
	}	
}

if (typeof APURI.examImportQuestion !== 'function') {
	APURI.examImportQuestion = function(event) {
		var questiontag = $(event.target);
		var examUuid = questiontag.attr('uuid');
		var questionId = questiontag.attr('quid');
		var examObj = APURI.examBuffer[examUuid];
		var question = {};
		var latestDisplay = "";
		
		if (typeof examObj !== 'undefined') {
			for (var i=0; i<examObj.content.sections.length; i++) {
				// sectionloop
				var section = examObj.content.sections[i];
				if (typeof section.questions !== 'undefined') {
					for(var j=0; j<section.questions.length; j++) {				
						if (section.questions[j].id == questionId) {
							//console.log("Found question");
							question = section.questions[j];							
							//break;
						}
					}
				}
			}
			if (typeof question.id !== 'undefined') {
				// Load current examObject
				//console.log("Trying loading current");
				APURI.examImportCurrent(function(current){
					if (typeof current !== 'undefined' && typeof current.examUuid !== 'undefined') {
						//console.log('Loaded successfully current');
						// Prepare question
						var largestId = APURI.findLargestId(current);
						//console.log("Largest id "+ largestId+" Next: set ids");
						APURI.traverseSetId(question, largestId+1);
                                                //TODO luottaa, että sections[0] olemassa
						current.content.sections[0].questions.push(question);
						// reorganize displaynumbers
						//console.log('DisplayNumber setting');
						APURI.traverseDisplayNumber(current, 1);
						//console.log('Trying saving');
						APURI.examSaveCurrent(current);
						//console.log('...');
					}
				});
				
			} else {
				console.log("Failed to find question");
			}
		}
		return false;
		
	}
}

if (typeof APURI.examImportExpand !== 'function') {
	APURI.examImportExpand = function(event) {
	//APURI.examImportExpand = function(event) {
        var kohdel = event.target;
        while (kohdel.getAttribute('uuid') === null)
            kohdel = kohdel.parentNode;
            
		var examUuid = $(kohdel).attr('uuid');
		//console.log("Event fired ("+examUuid+")"	);
		var upper_a = $(kohdel);
		var li = $('li[name=exam_'+examUuid+']');
		if (upper_a.attr('class') == 'unloaded') {
			//console.log("JSON "+li);
			//printObject(li);
                        upper_a.attr('class', 'loaded');
                        upper_a[0].onclick = APURI.noop;
			
			$.getJSON("https://oma.abitti.fi/exam-api/exams/"+examUuid+"/exam", function(data) {
					APURI.examBuffer[examUuid] = data;
					//console.log("Got loaded " +data.examUuid);
					var sisul = $('<ul />');
					//var buffer = "";
					for (var i=0; i<data.content.sections.length; i++) {
						// sectionloop
						var section = data.content.sections[i];
						if (typeof section.questions !== 'undefined') {
							for(var j=0; j<section.questions.length; j++) {				
								var question = section.questions[j];
								//console.log(".");
								var text = APURI.shortenText($("<div />").html(question.text).text(), 100);
								var sis = $('<li />').attr('name','exam_'+examUuid+"_q_"+question.id);
								var sisa = $('<a />').attr('href','#').attr('uuid',examUuid).attr('quid',question.id).html(question.displayNumber+": "+text);
								//(function(innerExamUuid){
								sisa[0].onclick = APURI.examImportQuestion;
								//})(value.examUuid);
								sisul.append(sis.append(sisa));

//								buffer += "<li name='exam_"+examUuid+"_q_"+question.id+"'><a href=\"#\" class='unloaded' onclick='APURI.examImportQuestion(\""+examUuid+"\","+question.id+")'>"+question.displayNumber+": "+question.text+"</a></li>";
							}
						}
					}
					//sisul.html(buffer);
					
					sisul.appendTo(li);
				});
		} else {
			console.log("Not loading "+upper_a.class);
			// only hidden
		}
		
		return false;
	}
}

if (typeof APURI.closeModal !== 'function') {
	APURI.closeModal = function() {
		$('#APURI_modal_back').remove();
		$('#APURI_modal_content').remove();
                if (APURI.questionsort.changed)
                    location.reload();
	}
}

APURI.sort = {
    
}

if (typeof APURI.showSortDialog !== 'function') {
    APURI.showSortDialog = function() {
        // TODO/melkein DONE jos postponed -- tallennus + viive 2s
        if (APURI.postponedSaving.isPostponed()) {
            APURI.postponedSaving.manualTrigger();
        }
        // TODO viive puuttuu !!!!!
        APURI.examImportCurrent(function(current){
                APURI.questionsort.bufferOld = $.extend(true, {}, current);
                APURI.questionsort.changed = false;
                if (typeof current !== 'undefined' && typeof current.examUuid !== 'undefined') {
                        var outdiv = $('<div />');
                        outdiv.attr("class", "APURI_modal_back");
                        outdiv.attr("id", "APURI_modal_back");
                        //outdiv.attr("style", APURI.modal_background_style);
                        var div = $('<div />');
                        div.attr("id", "APURI_modal_content");
                        //div.attr("style", APURI.modal_foreground_style);

                        var sectul = $('<ul />');
                        sectul.attr("id", "APURI_sort_section");
                                //var buffer = "";
                                for (var i=0; i<current.content.sections.length; i++) {
                                        // sectionloop
                                        var section = current.content.sections[i];
                                        var secli = $('<li />');
                                        sectul.append(secli);
                                        if (typeof section.questions !== 'undefined') {
                                                var qul = $('<ul />');
                                                qul.attr("id", "APURI_sort_question");
                                                secli.append(qul);
                                                for(var j=0; j<section.questions.length; j++) {				
                                                        var question = section.questions[j];
                                                       // console.log(".");
                                                        var text = APURI.shortenText($("<div />").html(question.text).text(), 100);
                                                        var sis = $('<li />').attr('name',"q_"+question.id)
                                                                .attr('class',"APURI_sortable_question").append($('<i class="fa fa-arrows hide_nothover" aria-hidden="true"></i>'))
                                                                .html(question.displayNumber+": "+text);
                                                        // jos monivalinta niin mahdollista kysymysten sorttaus
                                                        if (typeof question.type !== 'undefined' && 
                                                                question.type === 'choicegroup' &&
                                                                typeof question.choices !== 'undefined') {
                                                            var coul = $('<ul />');
                                                            coul.attr("id", "APURI_sort_choice"+i+"."+j);
                                                            sis.append(coul);
                                                            for (var k=0; k<question.choices.length; k++) {
                                                                var choice = question.choices[k];
                                                                var text = APURI.shortenText($("<div />").html(choice.text).text(), 100);
                                                                var cli = $('<li />').attr('name',"q_"+question.id+"_c_"+choice.id)
                                                                        .attr('class',"APURI_sortable_choice")
                                                                        .html(choice.displayNumber+": "+text);
                                                                coul.append(cli);
                                                            }
                                                        }
                                                        qul.append(sis);

                                                }
                                        }
                                }
                                //sisul.html(buffer);
                var closeButton = $('<button />');
                closeButton.html("Sulje");
                //closeButton.attr("style", "position: fixed; bottom: 10px; right: 10%;");
                closeButton.attr("class", "APURI APURI_modal_alaNappi");
                closeButton[0].onclick = APURI.closeModal;
                var closeButton2 = $('<button />');
                closeButton2.html("X");
                closeButton2.attr("class", "APURI APURI_modal_ylaX");
                //closeButton2.attr("style", "position: fixed; top: 60px; right: 16%; width: 30px !important;");
                closeButton2[0].onclick = APURI.closeModal;

                outdiv.appendTo('body');
                div.html("<h3>Järjestele koetehtävät</h3>")
                .append($('<p />').html("Raahaa koetehtävät haluaamaasi järjestykseen. Muutokset järjestyksessä tallentuvat automaattisesti."))
                .append(sectul).append(closeButton).append(closeButton2).appendTo('body');
                
                var sorted = document.getElementById("APURI_sort_question");
                Sortable.create(sorted, {
                    group: "questions",
                    store: {
                        get: function(sortable) {
                            var arrkey = sortable.toArray();
                            APURI.questionsort.bufferOrder[sortable.options.group.name] = [];
                            for (var i=0; i<arrkey.length; i++) {
                                // TODO: Tämä ei ole yleinen vaan olettaa, että on yksi sections
                                // TODO!!!: pitäisi tässä ottaa kopio?!
                                APURI.questionsort.bufferOrder[sortable.options.group.name][arrkey[i]] = current.content.sections[0].questions[i];
                            }
                            //console.log("Sortable.store.Get:"+sortable.options.group.name);
                        },
                        set: function(sortable) {
                            //console.log("Sortable.store.SET:"+sortable.options.group.name);
                            //console.log(sortable.toArray());
                            APURI.questionsort.bufferSaved = $.extend(true, {}, APURI.questionsort.bufferOld);
                            var arrkey = sortable.toArray();
                            for (var i=0; i<arrkey.length; i++) {
                                // TODO: Tämä ei ole yleinen vaan olettaa, että on yksi sections
                                APURI.questionsort.bufferSaved.content.sections[0].questions[i] = APURI.questionsort.bufferOrder[sortable.options.group.name][arrkey[i]];
                            }
                            APURI.questionsort.changed = true;
                            //TODO luottaa, että sections[0] olemassa
                            // reorganize displaynumbers
                            //console.log('DisplayNumber setting');
                            APURI.traverseSetId(APURI.questionsort.bufferSaved, 0)
                            APURI.traverseDisplayNumber(APURI.questionsort.bufferSaved, 1);
                            //console.log('Trying saving');
                            APURI.examSaveCurrent(APURI.questionsort.bufferSaved, false);
                            //console.log('...');

                        }
                    }
                });
                
                }
        });

    }
}



if (typeof APURI.showImportDialog !== 'function') {
        // TODO/melkein DONE jos postponed -- tallennus + viive 2s
        if (APURI.postponedSaving.isPostponed()) {
            APURI.postponedSaving.manualTrigger();
        }
        // TODO viive puuttuu !! - tässä ei niin kriittinen
	APURI.showImportDialog = function() {
	$.getJSON("https://oma.abitti.fi/kurko-api/exam/abitti-exam-events", function(data) {
			var outdiv = $('<div />');
			outdiv.attr("class", "APURImodal_back");
			outdiv.attr("id", "APURI_modal_back");
			//outdiv.attr("style", APURI.modal_background_style);
			var div = $('<div />');
			div.attr("id", "APURI_modal_content");
			//div.attr("style", APURI.modal_foreground_style);
			
			var ul = $('<ul />');//.html(buffer);
                        ul.attr('class', 'APURI_examlist');
			$.each(data.exams, function(index, value) {
						var sis = $('<li />').attr('name','exam_'+value.examUuid).attr('class','APURI_import_exam '+(index%2===0?'even':'odd'));
                                                var pvm = APURI.util.dateToString(value.creationDate);
						var sisa = $('<a />').attr('href','#').attr('uuid',value.examUuid).attr('class','unloaded').append($('<span />').attr('class','date').html(pvm)).append($('<span />').attr('class','title').html(value.title));

						sisa[0].onclick = APURI.examImportExpand;

						ul.append(sis.append(sisa));
						
						//html = "<li name='exam_"+value.examUuid+"'><a href=\"#\" class='unloaded' onclick='APURI.examImportExpand(\""+value.examUuid+"\");'>"+value.title+"</a></li>";
						//buffer += html;
				});
			var header = $('<h3 />');
			header.html("Lisää tehtävä toisesta kokeestasi");
			var closeButton = $('<button />');
			closeButton.html("Sulje lisäämättä tehtävää");
                        closeButton.attr("class", "APURI APURI_modal_alaNappi");
			//closeButton.attr("style", "position: fixed; bottom: 10px; right: 10%;");
			closeButton[0].onclick = APURI.closeModal;
			var closeButton2 = $('<button />');
			closeButton2.html("X");
                        closeButton2.attr("class", "APURI APURI_modal_ylaX");
			//closeButton2.attr("style", "position: fixed; top: 60px; right: 16%; width: 30px !important;");
			closeButton2[0].onclick = APURI.closeModal;
			outdiv.appendTo('body');
			div.html("<h3>Lisää tehtävä toisesta kokeestasi</h3>")
			.append($('<p />').html("Valitse ensin koe ja sitten tehtävä, joka lisätään viimeiseksi tehtäväksi kokeeseen."))
			.append(ul).append(closeButton).append(closeButton2).appendTo('body');
		});
	}
}



if (typeof APURI.replaceBoxes !== 'function') {
	APURI.replaceBoxes = function() {
            // FIXED BUG: järjestysongelma!!
		//console.log("CKEDITOR-rep-spawned");
                var heightVal ={'questionText': 320,
				'instructionInput': 120,
				'choiceInstruction': 120};
                var fieldNames = Object.keys(heightVal);
                var x = []; // all textarea elements
                for (var j=0; j<fieldNames.length; j++) {
                    x = x.concat(Array.prototype.slice.call(document.getElementsByClassName(fieldNames[j])));
                }
                var y = document.getElementById('instructionInput');
                y.setAttribute('class', 'instructionInput');
                x.push(y);
            
   /*		var x = (Array.prototype.slice.call(document.getElementsByClassName("questionText"))).concat(
                            Array.prototype.slice.call(document.getElementsByClassName("instructionInput")),
                            Array.prototype.slice.call(document.getElementsByClassName("choiceInstruction")));*/
       //	console.log("CKEDITOR-rep-spawned for "+x.length + " elements");
	    for (var i=0; i<x.length; i++) {
			if (!x[i].getAttribute("name")) {
				//console.log("CKEDITOR"+APURI.replacedFields.count+"!" );
                                var repname = "apuriK_"+APURI.replacedFields.count;
				x[i].setAttribute("name",repname);
                                var paivitystoken = x[i].parentNode.querySelector(APURI.ytle.savedIndicator);
                                var tyhjakysvar = x[i].parentNode.querySelector(APURI.ytle.emptyQuestionWarning);
                                var linkkivar = x[i].parentNode.appendChild(($('<div />').attr('class','http-link-warning').html("Varmista, ettei tehtävänannossa ole linkkiä verkkoon, joka ei toimisi kokeessa"))[0]);
                                linkkivar.style.visibility = 'hidden';
                                APURI.replacedFields.list[repname]={field:x[i], savedIndicator:paivitystoken, emptyQuestionWarning: tyhjakysvar, httpLinkWarning: linkkivar};
                                //console.log(".");
                                // TODO pitäisikö nimen paikalla olla itse elementti x[i] ??
				var elem = unsafeWindow.CKEDITOR.replace(x[i], {
				
					extraPlugins: 'base64image,mathjax,base64audio',
					mathJaxLib: 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js?config=TeX-AMS_HTML',
					height: heightVal[x[i].getAttribute('class')],
					fileBrowserUploadUrl: 'base64',
					extraAllowedContent: 'script[!sec]',
                                        toolbar: [
		{ name: 'clipboard', items: [ 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo' ] },
		{ name: 'links', items: [ 'Link', 'Unlink' ] },
		{ name: 'insert', items: [ 'base64image', 'Mathjax', 'Table', 'HorizontalRule', 'SpecialChar', 'base64audio' ] },
		{ name: 'tools', items: [ 'Maximize' ] },
		{ name: 'document', items: [ 'Source' ] },
		'/',
		{ name: 'basicstyles', items: [ 'Bold', 'Italic', 'Strike','-','Subscript','Superscript', '-', 'RemoveFormat' ] },
		{ name: 'paragraph', items: [ 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote' ] },
		{ name: 'styles', items: [ 'Styles', 'Format' ] },
		{ name: 'about', items: [ 'About' ] }
	]
                                        
				});
				(function(inner_elem){
					inner_elem.on('change',  function(src, event) {
										//console.log(typeof src + " " + typeof event);
										inner_elem.updateElement();
										APURI.paivkent(inner_elem.name, inner_elem.getData()); });
					inner_elem.on('keyup',  function(src, event) {
										//console.log(typeof src + " " + typeof event);
										inner_elem.updateElement();
										APURI.paivkent(inner_elem.name, inner_elem.getData()); });
										})(elem);
                                APURI.replacedFields.count++;
			}
	    }
		   
	}
}


if (typeof APURI.showUI !== 'function') {
	APURI.showUI = function() {
		//APURI.replaceBoxes();
		if (document.getElementsByClassName("questionButtons").length > 0) {
			//console.log("begin button");
			var button = document.createElement("button");
			button.innerHTML="Tuo koetehtävä toisesta kokeesta";
			button.onclick = APURI.showImportDialog;
			button.setAttribute("class", "addQuestion APURI importExam");
			var button2 = document.createElement("button");
			button2.innerHTML="Uudelleenjärjestä koetehtävät";
			button2.onclick = APURI.showSortDialog;
			button2.setAttribute("class", "addQuestion APURI sortExam");
			$('div.questionButtons').append(button);
			$('<div />').attr('class', 'questionButtons APURI').append(button2).insertAfter('div.questionButtons');
			//document.getElementsByClassName('questionButtons')[0].appendChild(button);
			//console.log("buttons created");
        		window.clearInterval(APURI.initUITimer);
        APURI.ui.appendSupportNotice();
    
            }
	}
}

if (typeof APURI.loadScriptDirect !== 'function') {
	APURI.loadScriptDirect = function(url, onload) {

            	var script = document.createElement("script");
                script.type = "text/javascript";
                script.src = url;
                console.log("Loading url "+url);
                if (typeof onload !== 'undefined') {
                    //console.log("For "+url+" found handler");
                    script.onload=onload;
                }
                document.body.appendChild(script);
        }
    }

APURI.ui.appendCSS = function(cssaddr) {
	var linkcss = document.createElement("LINK");
	linkcss.setAttribute("href", cssaddr);
	linkcss.setAttribute("rel", "stylesheet");
	linkcss.setAttribute("type", "text/css");
	document.head.appendChild(linkcss);

};

(function() {
    //APURI.examImportCurrent();
                if (document.body.getAttribute("class")!=='lapa') // varmista, että ollaan YTL:n kokeessa
                    return;
    //console.log("KOE-EDITORISSA OLLAAN");        
        // TODO tyylit pitäisi ladata css-tiedostosta
//$("head").append('<link href="https://raw.githubusercontent.com/klo33/abi-apuri/sorting/src/abiapuri.css" rel="stylesheet" type="text/css" />');
APURI.ui.appendCSS("https://klo33.github.io/abixapuri/src/abiapuri.css");
//var linkcss = document.createElement("LINK");
//linkcss.setAttribute("href", "https://klo33.github.io/abi-apuri/src/abiapuri.css");
//linkcss.setAttribute("rel", "stylesheet");
//linkcss.setAttribute("type", "text/css");
//document.head.appendChild(linkcss);
        //var style = document.createElement("STYLE");
	//style.innerHTML = "button.APURI {   background-color: #6dd200 !important;} div.banner-left::after {    font-weight: bold;   content: \" + Apuri\" !important;}#pagebanner {    background-color: #6dd200 !important;} .APURI_examlist li {    border: 1px appworkspace outset;    padding: 0.2 em;    margin: 0.2 em;    background-color: gainsboro;} #APURI_sort_section {    list-style:none;}#APURI_sort_question li.APURI_sortable_question {	 list-style:none;	  display: box;    border: 1px black outset;    padding: 0.1em;	  padding-left: 0.4em;    margin: 0.2em;    background-color: #fef;} #APURI_delayd {     z-index: 10;    position: fixed;    height: 30px;    background-color: #ffff99;    color: #cc0033;    border: 3px solid #cc0033;     width: 400px;    max-width: 90%;    min-width: 50%;} #APURI_delayd button {    right: 10%;    top: 5px;} @keyframes movedown {    0% {      top:-100px;    }    100% {        top:0px;    }}@keyframes moveup {    0% {        top:0px;    }    100% {        top:-100px;    }}#APURI_delayd.comedown {  animation: movedown 1s ease-out forwards;}#APURI_delayd.clearup {  animation: moveup 1s ease-in forwards;}";
	//document.head.appendChild(style);
	
        //APURI.loadScriptDirect('https://github.com/klo33/abi-apuri/tree/nightly-editor/src/ckeditor/ckeditor.js',
//	APURI.loadScriptDirect('https://cdn.ckeditor.com/4.6.2/standard-all/ckeditor.js',
       	APURI.loadScriptDirect('https://klo33.github.io/javascript/ckeditor/ckeditor.js',
            function() {
                unsafeWindow.CKEDITOR.editorConfig = function( config ) {
                    config.language = 'fi';
                    config.extraPlugins = 'base64image,mathjax';
                    config.uiColor = '#e4f3d3';
                    //config.fileBrowserUploadUrl = 'base64';
                    config.toolbar = [
		{ name: 'clipboard', items: [ 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo' ] },
		{ name: 'links', items: [ 'Link', 'Unlink' ] },
		{ name: 'insert', items: [ 'base64image', 'Mathjax', 'Table', 'HorizontalRule', 'SpecialChar' ] },
		{ name: 'tools', items: [ 'Maximize' ] },
		{ name: 'document', items: [ 'Source' ] },
		'/',
		{ name: 'basicstyles', items: [ 'Bold', 'Italic', 'Strike','-','Subscript','Superscript', '-', 'RemoveFormat' ] },
		{ name: 'paragraph', items: [ 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote' ] },
		{ name: 'styles', items: [ 'Styles', 'Format' ] },
		{ name: 'about', items: [ 'About' ] }
	];
                };
            }
        );
        APURI.loadScriptDirect('https://use.fontawesome.com/d06b9eb6a7.js');
      
unsafeWindow.requirejs.config({
    paths: {
        'Sortable': 'https://rubaxa.github.io/Sortable/Sortable'
    }
});

unsafeWindow.require(['Sortable'], function (Sortable){
		window.Sortable = Sortable; // exports
	});
    		
	
	
	if (typeof APURI.initUITimer === 'undefined')
                APURI.initUITimer = window.setInterval(APURI.showUI, 1000);
	if (typeof APURI.initBoxesTimer === 'undefined')
                APURI.initBoxesTimer = window.setInterval(APURI.replaceBoxes, 2000);
   	/*script.onload = function() {
            CKEDITOR.editorConfig = function( config ) {
                    config.language = 'fi';
                    //config.fileBrowserUploadUrl = 'base64';
            };
            //console.log("CKEDITOR-conf-spawned");
	};*/
})();

	APURI.makeCopyOfExam = function(origUuid) {
            //Lataa vanha, josta tehdään kopio
		$.getJSON("https://oma.abitti.fi/exam-api/exams/"+origUuid+"/exam", function(origData) {
			var uusikoe = {title: "Uusi koe"};
                        // Luo uusi koe
			$.ajax({
					type: "POST",
					url: "/kurko-api/exam/exam-event",
					data: JSON.stringify(uusikoe),
					accept: "application/json; text/javascript",
					contentType: "application/json; charset=UTF-8",
					dataType: "json",
					success: function(uusidata){
						var uudenUuid = uusidata.examUuid;
                                                // Onnistuessa muuta otsikkoa ja tallenna sisältö uuteen kokeeseen
						origData.content.title = origData.content.title + " (kopio)";
						$.ajax({
								type: "POST",
								url: ("/exam-api/composing/"+uudenUuid+"/exam-content"),
								data: JSON.stringify(origData.content),
								accept: "application/json; text/javascript",
								contentType: "application/json; charset=UTF-8",
								dataType: "json",
								success: function(data){
//									//console.log("Kopio tehty onnistuneesti"); 
                                                                        // Muutetaan osoite, jotta päästään suoraan editoimaan uutta koetta
									window.location.href = "https://oma.abitti.fi/school/exam/"+uudenUuid;
								},
								failure: function(errMsg) {
										console.log("ERROR kopion tallennuksessa: "+errMsg);

								}
						});
						
					},
					failure: function(errMsg) {
							console.log("ERROR uuden luomisessa: "+errMsg);

					}
			});

		});

	};

APURI.listCopyExamTrigger = function(event) {
    var tag = event.target;
    if (tag !== null) {
        examUuid = tag.getAttribute("uuid");
        //console.log("Trying to copy " + examUuid);
        APURI.makeCopyOfExam(examUuid);
    }
};

APURI.appendTableColumn = function() {
	var taulukko = document.getElementById("available-exams");
    if (taulukko !== null) {
        //console.log("Tehdään kopiolinkit");
        var rivit = taulukko.getElementsByTagName("tr")
        for (var i = 0; i < rivit.length; i++) {
            var uusisolu = $('<td />').attr('class', 'APURI');;
            var examUuid = rivit[i].getAttribute("data-exam-uuid");
            if (examUuid !== null) {
                // ollaan varsinaisella rivillä
                var span = $('<span />').attr('class', 'edit-exam');
                var link = $('<a />').attr('href','#').attr('uuid', examUuid).attr('class','edit-link').html("<i class='fa fa-files-o' aria-hidden='true'></i> &nbsp;Luo kopio");
                link[0].onclick = APURI.listCopyExamTrigger;
                span.append(link).appendTo(uusisolu);
            }
            uusisolu.appendTo(rivit[i]);
        }
        APURI.ui.appendSupportNotice();
        $('span.disabled-modify-exam-button-tooltip').html("Uudelleenkäyttääksesi koetta luo kopio \"Luo kopio\"-painikkeella");
        window.clearInterval(APURI.initUITimer);
    }
};

(function() {
   // console.log("..");
    var accept_addresses = /^https:\/\/oma.abitti.fi(?:\/?|\/school\/exams\/?|\/school\/grading\/?)$/;
    //console.log("...");
    if (window.location.href.match(accept_addresses) === null)
        return;
   // console.log("KOELISTAUKSESSA OLLAAN");
  APURI.ui.appendCSS("https://klo33.github.io/abixapuri/src/abiapuri.css");
        APURI.loadScriptDirect('https://use.fontawesome.com/d06b9eb6a7.js');
  if (typeof APURI.initUITimer === 'undefined') 
        APURI.initUITimer = window.setInterval(APURI.appendTableColumn, 1000);
})();