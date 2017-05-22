// ==UserScript==
// @name        AbixApuri-skripti
// @name:se     AbixHjälpare-skripten
// @namespace   http://kauniaistenlukio.fi
// @description AbixApuri lisää toiminnallisuutta oma.abitti.fi-kokeenlaadintaan
// @description:se  AbixHjälpare ger extra till oma.abitti.fi
// @include     https://oma.abitti.fi/school/exam/*
// @version     0.0.3
// @grant       none
// @downloadUrl https://github.com/klo33/abi-apuri/raw/master/src/AbiApuri-skripti.user.js
// @updateUrl   https://github.com/klo33/abi-apuri/raw/master/src/AbiApuri-skripti.meta.js
// ==/UserScript==

/* AUTHOR Joni Lehtola, 2017
 * Lisätiedot https://sites.google.com/view/abittiapuri/abittiapuri-skriptilaajennus
 * HUOM! Tämän lisäosan käyttö täysin omalla vastuulla. Lisäosa on vielä alkeellinen kehitysversio, jota ei ole juuri lainkaan testattu.
 * Tällä lisäosalla tai sen kehittäjällä ei ole mitään tekemistä Ylioppilastutkintolautakunnan kanssa ja YTL ei vastaa mistään laajennuksen aiheuttamista 
 * haitoista, kuten ei toistaiseksi myöskään tekijä. Suosittelen testaamista ERILLISELLÄ tunnuksella, ei varsinaisella opetunnuksella.
 */
if (typeof APURI === "undefined") 
        var APURI ={
            modal_background_style:  "position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-level: 5; background: #AAA url(images/ui-bg_flat_0_aaaaaa_40x100.png) 50% 50% repeat-x; opacity: .40; filter: Alpha(Opacity=40);",
            modal_foreground_style:  "position: fixed; overflow-y:auto; top: 60px; left: 20%; width: 60%; opacity: 1; height: 80%; z-level: 10; background: #FFF;",
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
                list: [], // täydennä {field: , indicator: }
                contentLength: 0,
                calculateLength: function() {
                    var count =0;
                    for (var i=0; i< APURI.replacedFields.list.length; i++) {
                        
                        count += APURI.replacedFields.list[i].field.value.length;
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
                postponeDelay: 30000,
                //postponeTimer: {},
                start: function(initelem) {
                    //console.log("Postcount:"+APURI.postponedSaving.isPostponedCount)
                    if (APURI.postponedSaving.isPostponedCount < 3) {
                        console.log("START delayd");
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
                    APURI.paivkentTrigger(APURI.postponedSaving.triggeringField);                    
                    delete APURI.postponedSaving.postponeTimer;
                    APURI.ui.clearDelaydsavingNotice();
                },
                manualTrigger: function() {
                    //console.log("MANTRIGGER delaydsaving");
                    APURI.postponedSaving.isPostponedCount = 0; //false;
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
                                        console.log("Notice up");
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
                                        console.log("Notice down");
                    $('#APURI_delayd').attr('class', 'clearup');
                    setTimeout(APURI.ui.deleteDelaydsavingNotice, 2000);
                },
                deleteDelaydsavingNotice: function() {
                                                            console.log("Notice del");
                    $('#APURI_delayd').remove();
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
                if (!APURI.replacedFields.postponedSaving && input.length > APURI.postponedSaving.singleFieldLimit) {
                    APURI.replacedFields.calculateLength();
                }
                // DONE if input length is more than certain limit check total length
                // if still true activate postponation
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
		console.log("Current uuid="+currUuid);
		console.log("..");

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
                            console.log("Save complited successfully");
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
	APURI.traverseDisplayNumber = function(obj, curr) {
		var count = {level1: 1,
					 level2: 1,
					 level3: 1};
		if (typeof curr == 'number' && curr > 1) { 
			count.level1 = curr;
		} else if (typeof curr == 'object') {
			count = curr;
		}
				
		if (obj != null && typeof obj == 'object') {
			if (typeof obj.displayNumber !== 'undefined' && typeof obj.level !== 'undefined') {
				var debug = "";
				if (obj.level == 1) {
					debug = obj.displayNumber = ""+(count.level1++);
					count.level2 = 1;
					count.level3 = 1;
				} else if (obj.level == 2) {
					debug = obj.displayNumber = ""+count.level1+"."+(count.level2++);
					count.level3 = 1;
				} else if (obj.level == 3) {
					debug = obj.displayNumber = ""+ count.level1+"."+count.level2+"."+(count.level3++);
				}
				//console.log("Set Display:"+debug);
			}
			for (var key in obj) {
				if (typeof obj[key] == 'object') {
					count = APURI.traverseDisplayNumber(obj[key], count);
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
		var examUuid = $(event.target).attr('uuid');
		//console.log("Event fired ("+examUuid+")"	);
		var upper_a = $(event.target);
		var li = $('li[name=exam_'+examUuid+']');
		if (upper_a.attr('class') == 'unloaded') {
			//console.log("JSON "+li);
			//printObject(li);
			
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
                        outdiv.attr("style", APURI.modal_background_style);
                        var div = $('<div />');
                        div.attr("id", "APURI_modal_content");
                        div.attr("style", APURI.modal_foreground_style);

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
                                                        console.log(".");
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
                closeButton.attr("style", "position: fixed; bottom: 10px; right: 10%;");
                closeButton[0].onclick = APURI.closeModal;
                var closeButton2 = $('<button />');
                closeButton2.html("X");
                closeButton2.attr("style", "position: fixed; top: 60px; right: 16%; width: 30px !important;");
                closeButton2[0].onclick = APURI.closeModal;

                outdiv.appendTo('body');
                div.html("<h3>Järjestele koetehtävät</h3>")
                .append($('<p />').html("Raahaa koetehtävät haluaamaasi järjestykseen"))
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
			outdiv.attr("style", APURI.modal_background_style);
			var div = $('<div />');
			div.attr("id", "APURI_modal_content");
			div.attr("style", APURI.modal_foreground_style);
			
			var ul = $('<ul />');//.html(buffer);
                        ul.attr('class', 'APURI_examlist');
			$.each(data.exams, function(index, value) {
						var sis = $('<li />').attr('name','exam_'+value.examUuid).attr('class','APURI_import_exam');
						var sisa = $('<a />').attr('href','#').attr('uuid',value.examUuid).attr('class','unloaded').html(value.title);

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
			closeButton.attr("style", "position: fixed; bottom: 10px; right: 10%;");
			closeButton[0].onclick = APURI.closeModal;
			var closeButton2 = $('<button />');
			closeButton2.html("X");
                        closeButton2.attr("class", "APURI APURI_modal_ylaX");
			closeButton2.attr("style", "position: fixed; top: 60px; right: 16%; width: 30px !important;");
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
                y.setAttribute('class', 'instuctionInput');
                x.push(y);
            
   /*		var x = (Array.prototype.slice.call(document.getElementsByClassName("questionText"))).concat(
                            Array.prototype.slice.call(document.getElementsByClassName("instructionInput")),
                            Array.prototype.slice.call(document.getElementsByClassName("choiceInstruction")));*/
       //	console.log("CKEDITOR-rep-spawned for "+x.length + " elements");
	    for (var i=0; i<x.length; i++) {
			if (!x[i].getAttribute("name")) {
				//console.log("CKEDITOR"+APURI.replacedFields.count+"!" );
				x[i].setAttribute("name","apuriK_"+APURI.replacedFields.count);
                                var paivitystoken = $(x[i]).next('div.savedIndicator')[0];
                                APURI.replacedFields.list.push({field:x[i], savedToken:paivitystoken});
				var elem = unsafeWindow.CKEDITOR.replace("apuriK_"+APURI.replacedFields.count, {
				
					extraPlugins: 'mathjax',
					mathJaxLib: 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js?config=TeX-AMS_HTML',
					height: heightVal[x[i].getAttribute('class')],
					fileBrowserUploadUrl: 'base64'
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
			button2.setAttribute("class", "addQuestion APURI importExam");
			$('div.questionButtons').append(button);
			$('<div />').attr('class', 'questionButtons').append(button2).insertAfter('div.questionButtons');
			//document.getElementsByClassName('questionButtons')[0].appendChild(button);
			//console.log("buttons created");
			window.clearInterval(APURI.initUITimer);
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


(function() {
    //APURI.examImportCurrent();
                if (document.body.getAttribute("class")!=='lapa') // varmista, että ollaan YTL:n kokeessa
                    return;
	console.log("*");
        
        // TODO tyylit pitäisi ladata css-tiedostosta
//$("head").append('<link href="https://raw.githubusercontent.com/klo33/abi-apuri/sorting/src/abiapuri.css" rel="stylesheet" type="text/css" />');
var linkcss = document.createElement("LINK");
linkcss.setAttribute("href", "https://klo33.github.io/css/abiapuri.css");
linkcss.setAttribute("rel", "stylesheet");
linkcss.setAttribute("type", "text/css");
document.head.appendChild(linkcss);
        //var style = document.createElement("STYLE");
	//style.innerHTML = "button.APURI {   background-color: #6dd200 !important;} div.banner-left::after {    font-weight: bold;   content: \" + Apuri\" !important;}#pagebanner {    background-color: #6dd200 !important;} .APURI_examlist li {    border: 1px appworkspace outset;    padding: 0.2 em;    margin: 0.2 em;    background-color: gainsboro;} #APURI_sort_section {    list-style:none;}#APURI_sort_question li.APURI_sortable_question {	 list-style:none;	  display: box;    border: 1px black outset;    padding: 0.1em;	  padding-left: 0.4em;    margin: 0.2em;    background-color: #fef;} #APURI_delayd {     z-index: 10;    position: fixed;    height: 30px;    background-color: #ffff99;    color: #cc0033;    border: 3px solid #cc0033;     width: 400px;    max-width: 90%;    min-width: 50%;} #APURI_delayd button {    right: 10%;    top: 5px;} @keyframes movedown {    0% {      top:-100px;    }    100% {        top:0px;    }}@keyframes moveup {    0% {        top:0px;    }    100% {        top:-100px;    }}#APURI_delayd.comedown {  animation: movedown 1s ease-out forwards;}#APURI_delayd.clearup {  animation: moveup 1s ease-in forwards;}";
	//document.head.appendChild(style);
			
        
	APURI.loadScriptDirect('https://cdn.ckeditor.com/4.6.2/standard-all/ckeditor.js',
            function() {
                unsafeWindow.CKEDITOR.editorConfig = function( config ) {
                    config.language = 'fi';
                    //config.fileBrowserUploadUrl = 'base64';
                };
            }
        );
        APURI.loadScriptDirect('https://use.fontawesome.com/d06b9eb6a7.js');
      
unsafeWindow.requirejs.config({
    paths: {
        'Sortable': 'https://rubaxa.github.io/Sortable/Sortable'
        // NOT WORKING with RequireJS 'CKEditor': 'https://cdn.ckeditor.com/4.6.2/standard-all/ckeditor'
    }
});

unsafeWindow.require(['Sortable'], function (Sortable){
		window.Sortable = Sortable; // exports
	});
    
        /* // NOT WORKING with 
require(['CKEditor'], function (CKEditor){
                console.log("CKEDITOR loaded and armed");
		window.CKEDITOR = CKEditor; // exports
                CKEDITOR.editorConfig = function( config ) {
			config.language = 'fi';
			//config.fileBrowserUploadUrl = 'base64';
		};
	});
	*/
	//document.body.appendChild(script);
	
	
	
	
	if (typeof APURI.initUITimer === 'undefined')
                APURI.initUITimer = window.setInterval(APURI.showUI, 1000);
	if (typeof APURI.initBoxesTimer === 'undefined')
                APURI.initBoxesTimer = window.setInterval(APURI.replaceBoxes, 2000);
   	/*script.onload = function() {
            CKEDITOR.editorConfig = function( config ) {
                    config.language = 'fi';
                    //config.fileBrowserUploadUrl = 'base64';
            };
            console.log("CKEDITOR-conf-spawned");
	};*/
})();
