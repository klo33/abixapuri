// ==UserScript==
// @name        AbixApuri
// @name:fi     AbixApuri
// @name:sv     AbixAssistenten
// @namespace   http://klo33.github.io/abixapuri
// @description AbixApuri lisää toiminnallisuutta oma.abitti.fi-kokeenlaadintaan
// @description:fi AbixApuri lisää toiminnallisuutta oma.abitti.fi-kokeenlaadintaan
// @description:sv  AbixAssistenten erbjuder extra funktioner till oma.abitti.fi
// @author      Joni Lehtola, joni.lehtola@kauniaistenlukio.fi
// @include     https://oma.abitti.fi/school/exam/*
// @include     https://oma.abitti.fi/school/exams
// @include     https://oma.abitti.fi/school/grading
// @include     https://oma.abitti.fi/school/grading/*
// @include     https://oma.abitti.fi/school/review/*
// @include     https://oma.abitti.fi/
// @version     0.3.0
// @grant	none
// @downloadUrl https://github.com/klo33/abixapuri/raw/master/src/AbiApuri-skripti.user.js
// @updateUrl   https://github.com/klo33/abixapuri/raw/master/src/AbiApuri-skripti.meta.js
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


'use strict';
var APURI ={
            lang: {
              fi: {
                  postponed_saving_notice: 'Suurten kuvien tai liitteiden vuoksi <strong>tallennusta ei vielä tehty!</strong>',
                  save_button: 'Tallenna',
                  support_notice1: "Vihreät elementit ovat <a  target='_blank' href='https://klo33.github.io/abixapuri/'>AbixApuri</a>-laajennuksen lisäämiä. Niiden toiminnasta ei YTL vastaa.",
                  support_notice2: "<h5><a target='_blank' href='https://klo33.github.io/abixapuri'>AbixApuri</a></h5><p><a href='https://github.com/klo33/abixapuri/issues'>Virhetilanteet (GitHub)</a></p><p><a href='https://klo33.github.io/abixapuri'>Kotisivu</a>/<a href='https://www.facebook.com/groups/339542799419574/'>Facebook-ryhmä</a></p>",
                  bittiniilo_warning: "Käytät AbixApuria ja Bittiniiloa yhtäaikaa, mikä <strong>ei onnistu</strong>. <br/> <a href='https://klo33.github.io/abixapuri'>Ohjeet miten jompi kumpi kytketään pois toiminnasta</a>",
                  load_csv_link: '<i class="fa fa-download" aria-hidden="true"></i> &nbsp;Lataa pisteytykset taulukkolaskentaohjelmaan',
                  reorder_assignments_title: "<h3>Järjestele koetehtävät</h3>",
                  reorder_assignments_info: "Raahaa koetehtävät haluamaasi järjestykseen. Muutokset järjestyksessä tallentuvat automaattisesti.",
                  wordcount_suffix: '%d sanaa',
                  import_assignment_button: "Tuo koetehtävä toisesta kokeesta",
                  reorder_assignments_button: "Uudelleenjärjestä koetehtävät",
                  import_assignment_title: "<h3>Lisää tehtävä toisesta kokeestasi</h3>",
                  import_assignment_info: "Valitse ensin koe ja sitten tehtävä, joka lisätään viimeiseksi tehtäväksi kokeeseen.",
                  copy_exam_tooltip: "Uudelleenkäyttääksesi koetta luo kopio \"Luo kopio\"-painikkeella",
                  copy_exam_button: "<i class='fa fa-files-o' aria-hidden='true'></i> &nbsp;Luo kopio",
                  import_assignment_cancel: "Sulje lisäämättä tehtävää",
                  http_link_warning: "<i class='fa fa-exclamation-triangle' aria-hidden='true'></i><strong>Tehtävänannossasi vaikuttaa olevan linkki verkkomateriaaliin</strong> <br/>"
                    + "Verkkoon viittaavat linkit (esim. kuviin) eivät toimi suljetussa Abitti-kokeessa. <a target='_blank' href='https://github.com/klo33/abixapuri/wiki/Linkit-verkkomateriaaliin'>Lue lisää &gt;&gt;</a>",
                  close_button: "Sulje",
                  csv_filename: "tulokset.csv",
                  csv_name: "Nimi",
                  csv_email: "Sähköposti",
                  csv_sum: "Yhteensä",
                  csv_grade: "Arvosana",
                  loading_spinner: "latautuu...<br />odota hetkinen",
                  total_max_points: "maksimi yhteispistemäärä %d",
                  search_exams_info: "Hae kokeista...",
                  search_exams_clear: "Tyhjää haku",
                  lessthan_warning: "<i class='fa fa-exclamation-triangle' aria-hidden='true'></i>Kentässä vaikuttaa olevan &lt;-merkki. Ne rikkovat helposti kokeen. (<a target='_blank' href='https://github.com/klo33/abixapuri/wiki/Pienempi-kuin--merkki-teht%C3%A4v%C3%A4nannossa'>Lue lisää &gt;&gt;</a>) <br />Varmista tekstin toiminta esikatselusta.",
                  lessthan_fix_button: "Yritä korjata tehtävä",
                  lessthan_fix_done: "...",
                  firefox_greasemonkey_warning: "<strong>HUOM! AbixApurin Firefox-selainlaajennuksen tuki on muuttunut!</strong><p>Jos haluat AbixApurin toimivan Firefoxin uusimmassa versiossa 57 sinun on asennettava <a href='https://addons.mozilla.org/fi/firefox/addon/tampermonkey/' target='_blank'>TamperMonkey</a>-laajennus. <br/><a href='https://github.com/klo33/abixapuri/wiki/Miten-AbixApuri-toimii-uudessa-Firefoxissa' target='_blank'>Tarkemmat ohjeet &gt;&gt;</a>",
                  attachments_startcopying: "Kokeessa on liitteitä. Kopioidaan...",
                  attachments_download_status: "Ladataan %n <span class='progress'>0</span> %",
                  attachments_upload_status: "Kopioidaan %n <span class='progress'>0</span> %"
              }, 
              sv: {
                  postponed_saving_notice: '<strong>Ändringarna är inte sparade ännu</strong> på grund av stora bilder eller bilagor.',
                  save_button: 'Spara',
                  support_notice1: "De gröna elementen hör till <a target='_blank' href='https://klo33.github.io/abixapuri/'>AbixApuri</a>-tilläggsprogrammet. SEN ansvarar inte för de funktionerna.",
                  support_notice2: "<h5><a target='_blank' href='https://klo33.github.io/abixapuri'>AbixApuri</a></h5><p><a target='_blank' href='https://github.com/klo33/abixapuri/issues'>Problemsituationer (GitHub)</a></p><p><a href='https://klo33.github.io/abixapuri'>Hemsida</a>/<a href='https://www.facebook.com/groups/339542799419574/'>Facebook-grupp</a></p>",
                  bittiniilo_warning: "Du använder AbixApuri och Bittiniilo samtidigt, vilket <strong>inte lyckas</strong>. <br/> <a target='_blank' href='https://klo33.github.io/abixapuri'>Anvisningar till att stänga av någotdera programmet</a>",
                  load_csv_link: '<i class="fa fa-download" aria-hidden="true"></i> &nbsp;Ladda poängsättningarna i kalkylprogrammet',
                  reorder_assignments_title: "<h3>Organisera provuppgifterna</h3>",
                  reorder_assignments_info: "Dra provuppgifterna i den ordning du önskar. Ändringarna i ordningen sparas automatiskt.",
                  wordcount_suffix: '%d ord',
                  import_assignment_button: "Hämta en provuppgift från ett annat prov",
                  reorder_assignments_button: "Omorganisera provuppgifterna",
                  import_assignment_title: "<h3>Lägg till en uppgift från ett annat prov</h3>",
                  import_assignment_info: "Välj först provet och sedan uppgiften, som läggs till som sista uppgiften i provet.",
                  copy_exam_tooltip: "Skapa en kopia för att använda provet på nytt med \"Skapa en kopia\"-knappen",
                  copy_exam_button: "<i class='fa fa-files-o' aria-hidden='true'></i> &nbsp;Skapa en kopia",
                  import_assignment_cancel: "Stäng utan att lägga till en uppgift",
                  close_button: "Stäng",
                  csv_filename: "resultat.csv",
                  csv_name: "Namn",
                  csv_email: "Epost",
                  csv_sum: "Totalt",
                  csv_grade: "Vitsord",
                  loading_spinner: "laddar...<br />vänta en liten stund",
                  total_max_points: "totalt max poäng %d",
                  search_exams_info: "Sök i proven...",
                  search_exams_clear: "Töm sökningen",
                  http_link_warning: "<i class='fa fa-exclamation-triangle' aria-hidden='true'></i><strong>Det verkar finnas en länk till en webbkälla i din uppgiftsanvisning</strong> <br/>"
                    + "Webbreferenser (t.ex. till bilder på nätet) funkar inte i det slutna Abittiprovet. <a target='_blank' href='https://github.com/klo33/abixapuri/wiki/Linkit-verkkomateriaaliin'>Läs mera &gt;&gt;</a>",
                  lessthan_warning: "<i class='fa fa-exclamation-triangle' aria-hidden='true'></i>Kentässä vaikuttaa olevan &lt;-merkki. Ne rikkovat helposti kokeen. (<a target='_blank' href='https://github.com/klo33/abixapuri/wiki/Pienempi-kuin--merkki-teht%C3%A4v%C3%A4nannossa'>Lue lisää &gt;&gt;</a>) <br />Varmista tekstin toiminta esikatselusta.",
                  lessthan_fix_button: "Korjaa vaihtoehto",
                  lessthan_fix_done: "...",
                  firefox_greasemonkey_warning: "<strong>HUOM! AbixApurin Firefox-selainlaajennuksen tuki on muuttunut!</strong><p>Jos haluat AbixApurin toimivan Firefoxin uusimmassa versiossa 57 sinun on asennettava <a href='https://addons.mozilla.org/fi/firefox/addon/tampermonkey/' target='_blank'>TamperMonkey</a>-laajennus. <br/><a href='https://github.com/klo33/abixapuri/wiki/Miten-AbixApuri-toimii-uudessa-Firefoxissa' target='_blank'>Tarkemmat ohjeet &gt;&gt;</a>",
                  attachments_startcopying: "Provet har bilagar. Kopierar...",
                  attachments_download_status: "Laddar ner %n <span class='progress'>0</span> %",
                  attachments_upload_status: "Kopierar %n <span class='progress'>0</span> %"
              }  
            },
            text: null,
            settings: {
                fetchGetHeaders: {
                    'Accept': 'application/json, text/javascript, */*; q=0.01'                   
                },
                csv_separator: ";",
                csv_wrapping: "%s", //%s as replaced value
                link_map: /(?:<img\s([^>\/]+\s)??src=["'](?:http[s]?:)?\/\/[^"']+)|(?:<a\s([^>]+\s)??href=["'](?:http[s]?:)?\/\/[^"']+)/i,
//              lessgreater_map: /(?:<\/?[a-wA-W](?:(?:=\s?"[^"]*")|(?:=\s?'[^']*')|[^>])*>)|(<[<xyz\d])|(>)|(<)/g,
                lessthan_map: /(<(?!\/?[a-wA-W](?:(?:=\s?"[^"]*")|(?:=\s?'[^']*')|[^>])*>))/g
            },
            fetch: {
                /**
                 * GETs JSON data from URL, uses headers from settings + additionals
                 * @param {string} uri URI
                 * @param {object} additionalHeaders Additional headers object
                 * @returns {Promise} Promise which resolves for the JSON data
                 */
                getJson(uri, additionalHeaders = null) {
                    var myHeaders = APURI.settings.fetchGetHeaders;
                    if (additionalHeaders !== null) {
                        myHeaders = Object.assign({}, APURI.settings.fetchGetHeaders);
                        for (let key in additionalHeaders) 
                            if (additionalHeaders.hasOwnProperty(key)) {
                                myHeaders[key] = additionalHeaders[key];
                            }
                        
                    }
                    return fetch(uri,  {
                            credentials: 'include',
                            headers: myHeaders
                        }).then(function(response) {
                            var contentType = response.headers.get("content-type");
                            if(contentType && contentType.includes("application/json")) {
                              return response.json();
                            }
                            throw new TypeError("Virhe haettaessa "+uri);
                          });
                }
                
            },
            
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
                titleField: null,
                contentLength: 0,
                calculateLength: function() {
                    var count =0;
                    //for (var i=0; i< APURI.replacedFields.list.length; i++) {
                    //    
                    //    count += APURI.replacedFields.list[i].field.value.length;
                    //}  BEFORE assoc array
                    let list = APURI.replacedFields.list;
                    for (var key in list) 
                        if (list.hasOwnProperty(key)) {
                        count += list[key].field.value.length;
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
                /**
                 * Checks whether saving is postponed currentlys
                 * @returns {Boolean}
                 */
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
                        APURI.postponedSaving.postponeTimer = setTimeout(APURI.postponedSaving.timetrigger, APURI.postponedSaving.postponeDelay);
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
                        clearTimeout(APURI.postponedSaving.postponeTimer);
                        delete APURI.postponedSaving.postponeTimer;
                    }
                    APURI.ui.clearDelaydsavingNotice();
                }
            },
            ui: {
                showWarning: function(msg_text, button_text = 'OK', id_text = 'APURI_msg', actionHandler = null) {
                    var outer = $('<div />').attr('id', id_text).attr('class','comedown');
                    var message = $('<div />').attr('class','APURI_message').html(msg_text);
                    var button = document.createElement('button');
                    var action = actionHandler;
                    if (action === null) {
                        action = function () {
                          APURI.ui.clearWarning(id_text);  
                        };
                    }
                    button.class = 'APURI tallennanappi';
                    button.onclick = action;
                    button.innerHTML = button_text;
                    outer.append(message).append(button);
                    document.body.appendChild(outer[0]);                    
                },
                clearWarning: function(id_text = 'APURI_msg') {
                    $('#'+id_text).attr('class', 'clearup');
                    setTimeout(function () {
                        APURI.ui.deleteWarning(id_text);
                    }, 2000);
                },
                deleteWarning: function(id_text = 'APURI_msg') {
                    $('#'+id_text).remove();
                },
                showDelaydsavingNotice: function() {
                    // TODO KIRJOITA LOPPUUN
                                     //   console.log("Notice up");
                    var outer = $('<div />').attr('id', 'APURI_delayd').attr('class','comedown');
                    var message = $('<div />').attr('class','APURI_message').html(APURI.text.postponed_saving_notice);
                    var button = document.createElement('button');
                    button.class = 'APURI tallennanappi';
                    button.onclick = APURI.postponedSaving.manualTrigger;
                    button.innerHTML = APURI.text.save_button;
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
                    if (typeof APURI.replacedFields.list[elem] !== 'undefined' 
                            && typeof APURI.replacedFields.list[elem].emptyQuestionWarning !== 'undefined') {
                        var emptyel = APURI.replacedFields.list[elem].field.parentNode.queryElement(APURI.ytle.emptyQuestionWarning);
                        APURI.replacedFields.list[elem].emptyQuestionWarning = emptyel;
                    }
                    if (typeof APURI.replacedFields.list[elem] !== 'undefined' 
                            && typeof APURI.replacedFields.list[elem].emptyQuestionWarning !== 'undefined'
                            && APURI.replacedFields.list[elem].emptyQuestionWarning !== null) {
                        APURI.replacedFields.list[elem].emptyQuestionWarning.style.visibility = "visible";
                    }                
                },
                hideEmptyQuestionWarning: function(elem) {
                    if (typeof APURI.replacedFields.list[elem] !== 'undefined' 
                            && typeof APURI.replacedFields.list[elem].emptyQuestionWarning !== 'undefined'
                            && APURI.replacedFields.list[elem].emptyQuestionWarning !== null) {
                        APURI.replacedFields.list[elem].emptyQuestionWarning.style.visibility = "hidden";
                    }                
                },
                detectHttpLink(elem, input) {
                    if (APURI.util.linkDetector(input)) {
                        APURI.ui.showHttpLinkWarning(elem);
                    } else {
                        APURI.ui.hideHttpLinkWarning(elem);
                    }
                },
                showHttpLinkWarning: function(elem) {
                    $('div[apuri-warning-for="'+elem+'"]').show();
                },
                hideHttpLinkWarning(elem) {
                    $('div[apuri-warning-for="'+elem+'"]').hide();
                },
                showBittiniiloWarning: function() {
                    APURI.ui.showWarning(APURI.text.bittiniilo_warning, 
                            "OK", 'APURI_bittiniilo');
                },
                appendSupportNotice: function() {
                    $('<div />').attr('class', 'APURI_footer')
                                .html(APURI.text.support_notice1)
                                .prependTo('#footer .content');
                    $('<div />').attr('class', 'APURI_footer_contact')
                                .html(APURI.text.support_notice2)
                                .appendTo('#footer .footer-column:first');
                },
                downloadFile(content, filename='results.csv') {
                    var a = window.document.createElement('a');
                    a.href = window.URL.createObjectURL(new Blob([content], {type: 'text/csv'}));
                    a.download = filename;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                },
                showAttachmentCopy() {
                  $('#APURI_loading_download').show();  
                },
                clearAttachmentCopy() {
                  $('#APURI_loading_download').hide();  
                },
                showLoadingSpinner(param) {
                    let showDelay = 0;
                    if (typeof param === 'number') {
                        showDelay = param;
                    }
                    let el = $('<div />').attr('class', 'APURI_loading_overlay').html(`<i class="fa fa-spinner fa-pulse fa-5x fa-fw"></i><span class="sr-only">Loading...</span>`);
                    let textel = $('<h1 />').html(APURI.text.loading_spinner);
                    let downloadel = $('<div />').attr('id', 'APURI_loading_download').html(APURI.text.attachments_startcopying).append($('<ul />')).hide().appendTo(el);
                    let outerEl = $('<div />').attr('id','APURI_loading_spinner').append(textel).append(el);
                    document.body.appendChild(outerEl[0]);
                    if (showDelay > 0) {
                        setTimeout(APURI.ui.clearLoadingSpinner, showDelay);
                    }
                },
                clearLoadingSpinner() {
                    $('#APURI_loading_spinner').remove();
                },
                closeModalWindow() {
                    $('#APURI_modal_back').remove();
                    $('#APURI_modal_content').remove();
                    if (APURI.questionsort.changed)
                        location.reload();
                },
                /**
                 * Shows dialog window
                 * Example openModalWindow((div)=> { div.html().append(content); return div; }, "Paluu"); 
                 * @param {type} renderFkt Callback function to render the page which is called as renderFkt(div) where div is the jQuery element of modal window where content can be appended to. MUST return the element back!
                 * @param {type} buttonTitle
                 * @param {type} actionFkt
                 * @returns {undefined}
                 */
                openModalWindow(renderFkt, buttonTitle, actionFkt = null) {
                        if (typeof buttonTitle === 'undefined')
                            buttonTitle = APURI.text.close_button;
                        if (actionFkt === null)
                            actionFkt = APURI.ui.closeModalWindow;
                        var outdiv = $('<div />');
			outdiv.attr("class", "APURImodal_back");
			outdiv.attr("id", "APURI_modal_back");
			//outdiv.attr("style", APURI.modal_background_style);
			var div = $('<div />');
			div.attr("id", "APURI_modal_content");
                        div = renderFkt(div);
                        
                        
                        var closeButton = $('<button />');
                        closeButton.html(buttonTitle);
                        //closeButton.attr("style", "position: fixed; bottom: 10px; right: 10%;");
                        closeButton.attr("class", "APURI APURI_modal_alaNappi");
                        closeButton[0].onclick = actionFkt;
                        var closeButton2 = $('<button />');
                        closeButton2.html("X");
                        closeButton2.attr("class", "APURI APURI_modal_ylaX");
                        //closeButton2.attr("style", "position: fixed; top: 60px; right: 16%; width: 30px !important;");
                        closeButton2[0].onclick = APURI.ui.closeModalWindow;

                        outdiv.appendTo('body');
                        div.append(closeButton).append(closeButton2).appendTo('body');
                },
                showUploadStatus(filename = "noname") {
                    let el = $('<li />').attr('data-for-filename', filename).html(APURI.text.attachments_upload_status.replace("%n",filename));
                    $('#APURI_loading_download ul').append(el);
                },
                showDownloadStatus(filename = "noname") {
                    let el = $('<li />').attr('data-for-filename', filename).html(APURI.text.attachments_download_status.replace("%n",filename));
                    $('#APURI_loading_download ul').append(el);                    
                },
                updateCurrentUpload(filename, progress, e) {
                    $(`#APURI_loading_download li[data-for-filename='${filename}'] .progress`).html(Math.round(progress));
                },
                updateCurrentDownload(filename, progress, e) {
                    $(`#APURI_loading_download li[data-for-filename='${filename}'] .progress`).html(Math.round(progress));                    
                },
                hideUploadStatus(filename = "noname") {
                    $(`#APURI_loading_download li[data-for-filename='${filename}']`).remove();
                },
                hideDownloadStatus(filename = "noname") {
                    $(`#APURI_loading_download li[data-for-filename='${filename}']`).remove();                    
                }
            },
            util: {
                browserFirefoxDetect() {
                    
                    let pattern = /Firefox\/(\d\d)./g;
                    let res = pattern.exec(navigator.userAgent);
                    if (res !== null) {
                        if (parseInt(res[1]) < 57)
                            return true;
                    }
                    return false;
                    //return (navigator.userAgent.indexOf("Firefox/57") > -1?true:false);                    
                },

                linkDetector(content) {
                    APURI.settings.link_map.lastIndex = 0;
                    return APURI.settings.link_map.test(content);
                    
                },
                detectLessGreater(content) {
                    APURI.settings.lessthan_map.lastIndex = 0;
                    return APURI.settings.lessthan_map.test(content);
                },
                bittiniiloDetector: {
                    init: function() {
                        APURI.util.bittiniiloDetector.timer = window.setInterval(APURI.util.bittiniiloDetector.trigger, 2000);
                    },
                    counter: 10,
                    trigger: function() {
                        if (APURI.util.bittiniiloDetector.detectBittiniilo()) {
                            window.clearInterval(APURI.util.bittiniiloDetector.timer);
                            APURI.ui.showBittiniiloWarning();
                            return;
                        }
                        if (APURI.util.bittiniiloDetector.counter < 1) {
                            window.clearInterval(APURI.util.bittiniiloDetector.timer);
                            return;                            
                        }
                        APURI.util.bittiniiloDetector.counter--;
                    },
                    timer: {},
                    detectBittiniilo: function() {
                        
                    if ($('div.banner-left img[title="Bittiniilo"]').length)
                        return true;
                    else
                        return false;
                    }
                },
                /**
                 * Converts DateString to "D.M.YYYY"
                 * @param {string} datestr date in some 
                 * @returns {string} "D.M.YYYY" 
                 */
                dateToString(datestr) {

                   var date = new Date(datestr);
                   var output = ""+date.getDate()+"."+(date.getMonth()+1)+"."+date.getFullYear();
				   return output;
                },
                wordCount(text) {
                    return text.trim().split(/\s+/).length;
                },
                xhr : {
                    makeRequest(opt) {
                        return new Promise(function (resolve, reject) {
                            let xhr = new XMLHttpRequest();
                            xhr.open(opt.method, opt.uri, true);
                            xhr.onload = function(e) {
                                if (this.status >= 200 && this.status < 300) {
                                    resolve(this.response);
                                } else {
                                    reject({
                                        status: this.status,
                                        statusText: xhr.statusText,
                                        response: this.response
                                    });
                                }
                            };
                            xhr.onerror = function() {
                                reject({
                                    status: this.status,
                                    statusText: xhr.statusText
                                });
                            }
                        })
                    }
                },
                uploadBlob(uri, blob, param = null, progressHandler = null) {
                    return new Promise((resolve, reject) => {
                        if (param === null || typeof param.filename === 'undefined') {
                            reject();
                        }
                        let formdata = new FormData();
                        formdata.append('attachmentUpload', blob, param.filename);
                        let xhr = new XMLHttpRequest();
                        xhr.open('POST', uri, true);
                        xhr.onload = function(e) {
                            resolve(e);
                        };
                        if (progressHandler === null) {
                            progressHandler = function(e) {

                            };
                        }
                        xhr.upload.onprogress = progressHandler;
                        xhr.send(formdata);
                        
                    });
                },
                /**
                 * 
                 * @param {type} uri
                 * @returns {Promise} resolves to Blob 
                 */
                downloadBlob(uri, progressHandler = null) {
                    return new Promise((resolve, reject) => {
                        let xhr = new XMLHttpRequest();
                        xhr.open('GET', uri, true);
                        xhr.onload = function(e) {
                            if (this.status >= 200 && this.status < 300) {
                                let contentType = this.getResponseHeader('content-type');
                                resolve(new Blob([this.response], {type: contentType}));
                            } else {
                                reject({
                                    status: this.status,
                                    statusText: xhr.statusText,
                                    response: this.response
                                });
                            }
                        };
                        if (progressHandler === null) {
                            progressHandler = function(e) {

                            };
                        }
                        xhr.onprogress = progressHandler;
                        xhr.onerror = function() {
                            reject({
                                status: this.status,
                                statusText: xhr.statusText
                            });
                        };
                        xhr.send();
                    });
                    
                },

                
            },
            attachments: {
                /**
                 * Copies all attachments of an exam to new one
                 * @param {string} sourceId
                 * @param {string} targerId
                 * @returns {Promise}
                 */
                copyAttachments(sourceId, targetId) {
                    return new Promise((resolve, reject) => {
                        let sourceAttachmentUri = `/exam-api/exams/${sourceId}/attachments`;
                        APURI.fetch.getJson(sourceAttachmentUri)
                                .then(function(attachments) {
                                    let promiseStack = [];
                                    for (let attachment of attachments) {
                                        promiseStack.push(APURI.attachments.copyAttachment(sourceId, targetId, attachment));
                                    }
                                    Promise.all(promiseStack).then(values => {
                                        resolve(values);
                                    });
                        });                        
                    });
                },
                
                /**
                 * 
                 * @param {type} sourceExamId
                 * @param {type} targetExamId
                 * @param {type} attachment
                 * @returns {Promise}
                 */
                copyAttachment(sourceExamId, targetExamId, attachment) {
                    return new Promise((resolve, reject) => {
                        let sourceUri = `/exam-api/exams/${sourceExamId}/attachments/${attachment.displayName}`;
                        APURI.ui.showDownloadStatus(attachment.displayName);
                        APURI.util.downloadBlob(sourceUri, function(e) {
                            if (e.lengthComputable) {
                                APURI.ui.updateCurrentDownload(attachment.displayName, (e.loaded/e.total)*100);
                            }                            
                        })
                                .then(function(blob) {
                                    APURI.ui.hideDownloadStatus(attachment.displayName);
                                    APURI.ui.showUploadStatus(attachment.displayName);
                                    let targetUri = `/exam-api/exams/${targetExamId}/attachments/add`;
                                    APURI.util.uploadBlob(targetUri, blob, {filename: attachment.displayName, filetype: attachment.mimeType}, function(e) {
                                        if (e.lengthComputable) {
                                            APURI.ui.updateCurrentUpload(attachment.displayName, (e.loaded/e.total)*100);
                                        }
                                    }).then(function() {
                                        APURI.ui.updateCurrentUpload(attachment.displayName, 100);
                                        APURI.ui.hideUploadStatus(attachment.displayName);
                                        resolve(attachment.displayName);
                                    });
                        });                        
                    });
                }
            },
            grading: {
                gradesBuffer: null,
                
                initGradingCount() {
                  let currentUuid = APURI.exam.getCurrentLocationUuid();
                  this.loadGradingObject(currentUuid)
                          .then(function(result) {
                              APURI.grading.gradesBuffer = result;
                              APURI.initView(APURI.views.grading);
                  });
                },
                 /**
                 * Loads grading object
                 * @param {string} examId UUID for exam
                 * @returns {Promise} Promise which resolves for GradingObject  
                 */
                loadGradingObject(examId) {
                    return new Promise((resolve, reject) => {
                        let waitForUser = Promise.resolve(1);
                    
                        if (APURI.user.userdata === null) {
                            waitForUser = APURI.user.loadUserdata();
                        }
                        waitForUser.then(function() {
                            APURI.fetch.getJson(`https://oma.abitti.fi/exam-api/grading/${examId}/student-answers`)
                                    .then(function(data) {
                                        resolve(APURI.grading.sortGradingObject(data));
                            })
                                .catch(reject);                              
                        }).catch(()=> {
                            console.log("ERROR");
                            reject();
                        });
                 /*       $.getJSON(`https://oma.abitti.fi/exam-api/grading/${examId}/student-answers`, function(data) {
		})
                        .done(function(data) {
                            resolve(data);    
                })
                        .fail(function() {
                            reject();
                        });*/
                    });
                },
                sortGradingObject(gradingObj) {
                    return gradingObj.sort(function(a, b) {
                        var nameA = a.lastName.toUpperCase()+ ", " + a.firstNames.toUpperCase(); // ignore upper and lowercase
                        var nameB = b.lastName.toUpperCase()+ ", " + b.firstNames.toUpperCase(); // ignore upper and lowercase
                        if (nameA < nameB) {
                          return -1;
                        }
                        if (nameA > nameB) {
                          return 1;
                        }
                        // names must be equal
                        return 0;
                      });
                },
                /**
                 * 
                 * @param {type} exam
                 * @returns {Array|APURI.grading.constructTemplateObject.template}
                 */
                constructTitleObject(exam) {
                  let template = APURI.grading.constructTemplateObject(exam);
                  for (let key in template) 
                    if (template.hasOwnProperty(key)) {
                        template[key].value=APURI.getDisplayNumber(exam, template[key].id);
                    }
                  return template;                      
                },
                /**
                 * Constructs template for rendering
                 * @param {object} examObj Exam object
                 * @returns {Array} Array of {id: question_id, value: "" }
                 */
                constructTemplateObject(examObj) {
                    let template = new Array();
                    let sections = examObj.content.sections;
                    for (let s = 0; s < sections.length; s++) {
                        let questions = sections[s].questions;
                        for (let q = 0; q < questions.length; q++) {
                            console.log(".");
                            template[questions[q].id]={id: questions[q].id,
                                value: ""};
                        }
                    }
                    return template;
                },
                /**
                 * Converts template object to CSV text
                 * @param {Array|Templateobject} templateObj Array of templates
                 * @returns {String}
                 */
                extractCsvRow(templateObj) {
                    let result = "";
                    for (let col of templateObj) {
                        if (typeof col !== 'undefined') {
                            result += APURI.settings.csv_wrapping.replace("%s",
                                (typeof col.value !== 'undefined' && col.value !== null ? col.value : "")) + APURI.settings.csv_separator;
                        }
                    }
                    return result.substring(0, result.length-1) + "\n";
                },
                /**
                 * Extracts CSV from GradingObject
                 * @param {GradingObject} gradingObj grading
                 * @param {Object} examObj Exam object
                 * @return {string} CSV  
                 */
                extractCsv(gradingObj, examObj) {                                        
                    let result = "";
                    let template = this.constructTemplateObject(examObj);
                    let titlerow = this.constructTitleObject(examObj);
                    titlerow.unshift({value: APURI.text.csv_name}, {value: APURI.text.csv_email});
                    titlerow.push({value: APURI.text.csv_sum}, {value: APURI.text.csv_grade});
                    result += this.extractCsvRow(titlerow);
                    //template.unshift({id: null, value: ""}, {id: null, value: ""});
                    for (let i = 0; i < gradingObj.length; i++) {
                        let studentGrading = gradingObj[i];
                        //let studentRow = Object.assign({}, template);
                        let studentRow = template.slice();
                        let scoreSum = 0;
                        for(let j = 0; j < studentGrading.answers.length; j++) {
                            let studentAnswer = studentGrading.answers[j];
                            studentRow[studentAnswer.questionId] = {
                                    id: studentAnswer.questionId,
                                    value: studentAnswer.scoreValue
                                };
                            scoreSum += studentAnswer.scoreValue;
                        }
                        studentRow.unshift({
                            id: null,
                            value: studentGrading.lastName +" "+studentGrading.firstNames
                        }, {
                            id: null,
                            value: studentGrading.email
                        });
                        studentRow.push({
                            id: null,
                            value: scoreSum
                        }, {
                            id: null,
                            value: studentGrading.gradingText
                        });
                        result+= this.extractCsvRow(studentRow);
                    }
                    return result;
                },
                /**
                 * Returns CSV formatted string for the exam
                 * @param {string} examUuid Exam UUID
                 * @return {Promise} Promise which resolves for string 
                 */
                getCsvDataForExam(examUuid) {
                    return new Promise((resolve, reject) => {
                        Promise.all([
                            APURI.grading.loadGradingObject(examUuid),
                            APURI.exam.loadExam(examUuid)
                        ]).then(values => {
                            resolve(APURI.grading.extractCsv(values[0], values[1]));
                        }).catch(reject);
                    });
                },
                /**
                 * Returns CSV formatted string for the exam in current view
                 * @return {Promise} Promise which resolves for string 
                 */
                getCsvDataForCurrent() {
                    let uuid = APURI.exam.getCurrentLocationUuid();
                    return APURI.grading.getCsvDataForExam(uuid);
                },
                loadCsvTrigger(event) {
                    APURI.grading.getCsvDataForCurrent()
                            .then((result)=>{
                        APURI.ui.downloadFile(result);
                        console.log(result);
                        });
                    return false;
                }
            },
            user: {
                userdata: null,
                loadUserdata() {
                    return new Promise((resolve, reject) => {
                        APURI.fetch.getJson('https://oma.abitti.fi/kurko-api/user')
                            .then(function(data) {
                                APURI.user.userdata = data;
                                if (typeof data.roles !== 'undefined' &&
                                    typeof data.roles[0] !== 'undefined' &&
                                    typeof data.roles[0].schoolId !== 'undefined') {
                                        APURI.user.schoolId = data.roles[0].schoolId;
                                        APURI.settings.fetchGetHeaders['x-school-id'] = APURI.user.schoolId;
                                }
                                resolve();        
                            }).catch(reject);                    
                    });
                }
                
            },
            exam: {
                bufferLast: null,
                /**
                 * Returns exam UUID extracted from the location of current window
                 * @returns {string} current locations exam UUID or null if not recognized
                 */
                getCurrentLocationUuid() {
                    const patterns = [
                        /^https:\/\/oma\.abitti\.fi\/school\/exam\/([^\/]+)\/?\#?\??.*$/,
                        /^https:\/\/oma\.abitti\.fi\/school\/grading\/([^\/]+)\/?\#?\??.*$/,
                        /^https:\/\/oma\.abitti\.fi\/school\/review\/([^\/]+)\/?\#?\??.*$/
                    ];
                    
                    var location = window.location.href.split(/[?#]/)[0]; 
                    for (var key in patterns) {
                        let res = location.match(patterns[key]);
                        if (res !== null)
                            return res[1];
                    }
                    return null;
                },
                /**
                 * Loads exam JSON
                 * @param {string} examUuid UUID for exam
                 * @returns {Promise} Promise which resolves for ExamObject  
                 */
                loadExam(examUuid) {
                    return new Promise((resolve, reject) => {
                        // TODO varmista että onko tämä turha odottaa käyttäjää??
                        let waitForUser = Promise.resolve(1);
                    
                        if (APURI.user.userdata === null) {
                            waitForUser = APURI.user.loadUserdata();
                        }
                        waitForUser.then(function() {
                            APURI.fetch.getJson(`https://oma.abitti.fi/exam-api/exams/${examUuid}/exam`)
                                    .then(function(data) {
                                        APURI.exam.buffer = data;
                                        resolve(data);
                            })
                                .catch(reject);                              
                        }).catch(reject);
                    
                    });
                },
                /**
                 * Searches questionObject from examObject
                 * @param {.examObj} examObj ExamObject
                 * @param {integer} questionId QuestionId
                 * @returns {.examObj.content@arr;sections.questions}
                 */
                getQuestionObject(examObj, questionId) {
                    // INFO: Has assumptions of exam object structure
                    if (typeof questionId !== 'number')
                        questionId = parseInt(questionId);
                    for (let i=0; i<examObj.content.sections.length; i++) {
                            // sectionloop
                            let section = examObj.content.sections[i];
                            if (typeof section.questions !== 'undefined') {
                                    for(let j=0; j<section.questions.length; j++) {				
                                            if (section.questions[j].id === questionId) {
                                                    //console.log("Found question");
                                                    return section.questions[j];							
                                                    //break;
                                            }
                                    }
                            }
                    }
                    return null;
                },
                sumMaxScore(examObj) {
                    let maxScore = 0;
                    for (let i=0; i<examObj.content.sections.length; i++) {
                            // sectionloop
                            let section = examObj.content.sections[i];
                            if (typeof section.questions !== 'undefined') {
                                    for(let j=0; j<section.questions.length; j++) {				
                                        maxScore += section.questions[j].maxScore;
                                    }
                            }
                    }
                    return maxScore;
                }
            },
            examList : {
                sortByDate(examlist) {              
                    examlist.exams.sort(function(a, b) {
                        let dateA = a.creationDate;
                        let dateB = b.creationDate;
                        if (dateA < dateB) {
                          return 1;
                        }
                        if (dateA > dateB) {
                          return -1;
                        }
                        // names must be equal
                        return 0;
                      });
                    return examlist;
                }
            },
            /**
             * View-object structure used
             * initTimer - intervalTimerId
             * show() - function spawned
             */
            views: {
                gradingSummary: {
                    initTimer: null,
                    counter: 0,
                    show: function () {
                        let gradingInfo = $('#gradingInfo');
                                                this.counter++;
						if ($('#gradingInfo .APURI_download').length === 0) {
							let link = $('<a />').attr('href', '#').html(APURI.text.load_csv_link);
							link[0].onclick = APURI.grading.loadCsvTrigger;                        
							$('<div />').attr('class','printLinkWrapper APURI APURI_download').append(link).appendTo(gradingInfo);
						}
                                                if (this.counter > 10) {
                                                    clearInterval(this.initTimer);
                                                }
                    }
                },
                grading:{
                    initTimer: null,
                    show: function () {
                        clearInterval(this.initTimer);

                        /*
                        let answerElement = $('#answers');
                        if (typeof answerElement[0] !== 'undefined' && answerElement[0].innerHTML.length > 0
                                && typeof APURI.grading.gradesBuffer !== 'undefined' 
                                && APURI.grading.gradesBuffer !== null) {
                            // vastaukset ovat latautuneet
                            let grading = APURI.grading.gradesBuffer;
                            for (let u=0; u<grading.length; u++) {
                                let answers = grading[u].answers;
                                for (let a=0; a<answers.length; a++) {
                                    if (typeof answers[a].content.type ==='string' 
                                            && answers[a].content.type === 'text') {
                                        // kyseessä on tekstivastaus
                                        let wordCount = APURI.util.wordCount(answers[a].content.value);
                                        let answerTextElement = $(`div[data-answer-id=${answers[a].id}]`);
                                        let wordCountElem = $('<div />').attr('class','APURI APURI_wordcount').html(APURI.text.wordcount_suffix.replace("%d", wordCount)).insertAfter(`div[data-answer-id=${answers[a].id}] .answerText`);
                                        
                                    } else if (typeof answers[a].content.type ==='string' 
                                            && answers[a].content.type === 'richText') {
                                        // kyseessä on muotoiltu teksti mutta yritetään silti
                                        let tempElement = $('<div />').html(answers[a].content.value)[0];
                                        let textContent = tempElement.innerText || tempElement.textContent;
                                        let wordCount = APURI.util.wordCount(textContent);
                                        let answerTextElement = $(`div[data-answer-id=${answers[a].id}]`);
                                        let wordCountElem = $('<div />').attr('class','APURI APURI_wordcount').html(APURI.text.wordcount_suffix.replace("%d", wordCount)).insertAfter(`div[data-answer-id=${answers[a].id}] .answerText`);
									}		
                                }
                            }
                            clearInterval(this.initTimer);
                        }
                        */
                    }
                },
                extensionWarning:{
                    initTimer: null,
                    show: function () {
                        if (APURI.util.browserFirefoxDetect()) {
                            let div = jQuery('<div />').attr('id','APURI_extwarning').html(APURI.text.firefox_greasemonkey_warning);
                            div.insertBefore('div#page-content h1');
                        }
                        if (document.querySelector('div#page-content h1') !== null || document.querySelector('#APURI_extwarning') !== null)
                            clearInterval(this.initTimer);

                    }
                },
  
                examview: {
                    initTimer: null,
                    show: function() {
                        if (document.getElementsByClassName("questionButtons").length > 0) {
                                //console.log("begin button");
                                var button = document.createElement("button");
                                button.innerHTML= APURI.text.import_assignment_button;
                                button.onclick = APURI.showImportDialog;
                                button.setAttribute("class", "addQuestion APURI importExam");
                                var button2 = document.createElement("button");
                                button2.innerHTML=APURI.text.reorder_assignments_button;
                                button2.onclick = APURI.showSortDialog;
                                button2.setAttribute("class", "addQuestion APURI sortExam");
                                $('div.questionButtons').append(button);
                                $('<div />').attr('class', 'questionButtons APURI').append(button2).insertAfter('div.questionButtons');
                                //document.getElementsByClassName('questionButtons')[0].appendChild(button);
                                //console.log("buttons created");
                                window.clearInterval(this.initTimer);
                                APURI.ui.appendSupportNotice();

                        }                       
                    }
                },
                examviewBoxes: {
                    initTimer: null,
                    multichoiceFieldCounter: 0,
                    show: function() {
                        APURI.replaceBoxes();
                        this.multichoiceFieldInit();
                    },
                    multichoiceFieldInit() {
                        $('table.options .optionRow input.option:not([data-apuri-name])').each(
                            function(index, element) {
                                let el = $(element);
                                if (el.next().length === 0) {
                                    APURI.views.examviewBoxes.multichoiceFieldCounter++;
                                    let name = 'multifield-'+APURI.views.examviewBoxes.multichoiceFieldCounter;
                                    // HUOM! TODO tutki vielä jQuery.data propertia
                                    el.data('apuriName',name);
                                    el.attr('data-apuri-name', name);
                                    // ei ole vielä kenttää
                                    // TODO ei ole vielä tekstiä
                                    $('<div />').data('apuriWarningFor',name).attr('data-apuri-warning-for', name).attr('class','APURI http-link-warning').html(APURI.text.lessthan_warning).append(
                                                $('<a />').data('apuriSanitizeTarget', name).click(APURI.views.examviewBoxes.multichoiceSanitizeHandler).html(APURI.text.lessthan_fix_button)
                                                ).hide().insertAfter(element);
                                    el.on('input dbclick',APURI.views.examviewBoxes.multichoiceFieldTrigger);
                                    el.trigger('dbclick');
                                }
                            }
                        );
                    },
                    multichoiceFieldTrigger(event) {
                        console.log("Field change triggered on", event);
                        let name = $(event.target).data('apuriName');
                        if (name !== null && APURI.util.detectLessGreater(event.target.value)) {
                            $(`div[data-apuri-warning-for="${name}"]`).show();
                        } else {
                            $(`div[data-apuri-warning-for="${name}"]`).hide();                            
                        }
                    },
                    multichoiceSanitizeHandler(event) {
                        let targetFieldName = $(event.target).data("apuriSanitizeTarget");
                        let field = $(`input[data-apuri-name="${targetFieldName}"]`);
                        APURI.views.examviewBoxes.multichoiceFieldSanitize(field[0]);
                    },
                    multichoiceFieldSanitize(field) {
                        console.log("Sanitize request for FIELD", field);
                        APURI.settings.lessthan_map.lastIndex = 0;
                        field.value = field.value.replace(APURI.settings.lessthan_map, "&lt;");
                        APURI.paivkentTrigger($(field));
                    }
                },
                examlist: {
                    initTimer: null,
                    showFilterInput(tableid, inputid) {
                        let examsInput = document.getElementById(inputid);
                        let examTaulukko = document.getElementById(tableid);
                        if (examTaulukko !== null && examsInput === null) {
                            jQuery.expr[":"].Contains = jQuery.expr.createPseudo(function(arg) {
                                return function( elem ) {
                                    return jQuery(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
                                };
                            });
                            let wrapper = $('<div />').attr('class', 'APURI_filter_wrapper');
                            let elem = (function(inner_tableid, inner_inputid) {
                                return $('<input />')
                                    .attr('id', inner_inputid)
                                    .attr('class', 'APURI APURI_filter')
                                    .attr('placeholder', APURI.text.search_exams_info)
                                    .keyup(function() {
                                        $("#"+inner_tableid+" tbody").find("tr").hide();
                                        let inputs = this.value.split(" ");
                                        let jo = $("#"+inner_tableid+" tbody").find("tr.title-row");
                                        $.each(inputs, function(i, v) {
                                           jo = jo.filter("*:Contains('"+v+"')"); 
                                        });
                                        jo.show();
                                        jo.next().show();
                                    });
                                })(tableid, inputid);
                            let clearElem = (function(inner_inputid) {
                                return $('<span />')
                                    .html('<i class="fa fa-window-close" aria-hidden="true"></i>')
                                    .attr('id', inner_inputid+'_clear')
                                    .attr('class', 'APURI APURI_filter_clear')
                                    .attr('title', APURI.text.search_exams_clear)
                                    .click(function() {
                                        let input = $('#'+inner_inputid);
                                        input.val('');
                                        input.trigger('keyup');
                            });})(inputid);                             
                            wrapper.append(elem).append(clearElem);
                            $("#"+tableid+" thead tr th:first").next().append(wrapper);                        
                        }
                    },
                    show: function() {
                        var filterInput = document.getElementById("APURI_examfilter"); 
                        var taulukko = document.getElementById("available-exams");
                        let heldExamsInput = document.getElementById("APURI_heldfilter");
                        let heldTaulukko = document.getElementById("held-exams");
                        if (heldTaulukko !== null && heldExamsInput === null) {
                            jQuery.expr[":"].Contains = jQuery.expr.createPseudo(function(arg) {
                                return function( elem ) {
                                    return jQuery(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
                                };
                            });
                            let wrapper = $('<div />').attr('class', 'APURI_filter_wrapper');
                            let elem = $('<input />')
                                    .attr('id', 'APURI_heldfilter')
                                    .attr('class', 'APURI APURI_filter')
                                    .attr('placeholder', APURI.text.search_exams_info)
                                    .keyup(function() {
                                        $("#held-exams tbody").find("tr").hide();
                                        let inputs = this.value.split(" ");
                                        let jo = $("#held-exams tbody").find("tr");
                                        $.each(inputs, function(i, v) {
                                           jo = jo.filter("*:Contains('"+v+"')"); 
                                        });
                                        jo.show();
                                    });
                            let clearElem = $('<span />')
                                    .html('<i class="fa fa-window-close" aria-hidden="true"></i>')
                                    .attr('id', 'APURI_heldfilter_clear')
                                    .attr('class', 'APURI APURI_filter_clear')
                                    .attr('title', APURI.text.search_exams_clear)
                                    .click(function() {
                                        let input = $("#APURI_heldfilter");
                                        input.val('');
                                        input.trigger('keyup');
                            });
                            wrapper.append(elem).append(clearElem);
                            $("#held-exams thead tr th:first").next().append(wrapper);
                        }
                        if (taulukko !== null && filterInput === null) {
                            //TESTING REMOVE THE NEXY LINE
                            $('<div />').append($('<p />').html('KOPIOTESTI').click(APURI.testExamAttachmentCopyTrigger)).appendTo('#page-content');
                            $("#APURI_examfilter");
                            jQuery.expr[":"].Contains = jQuery.expr.createPseudo(function(arg) {
                                return function( elem ) {
                                    return jQuery(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
                                };
                            });
                            let wrapper = $('<div />').attr('class', 'APURI_filter_wrapper');
                            let elem = $('<input />')
                                    .attr('id', 'APURI_examfilter')
                                    .attr('class', 'APURI APURI_filter')
                                    .attr('placeholder', APURI.text.search_exams_info)
                                    .keyup(function() {
                                        $("#available-exams tbody").find("tr").hide();
                                        let inputs = this.value.split(" ");
                                        let jo = $("#available-exams tbody").find("tr.title-row");
                                        $.each(inputs, function(i, v) {
                                           jo = jo.filter("*:Contains('"+v+"')"); 
                                        });
                                        jo.show();
                                        jo.next().show();
                                    });
                            let clearElem = $('<span />')
                                    .html('<i class="fa fa-window-close" aria-hidden="true"></i>')
                                    .attr('id', 'APURI_examfilter_clear')
                                    .attr('class', 'APURI APURI_filter_clear')
                                    .attr('title', APURI.text.search_exams_clear)
                                    .click(function() {
                                        let input = $("#APURI_examfilter");
                                        input.val('');
                                        input.trigger('keyup');
                            });
                            wrapper.append(elem).append(clearElem);
                            $("#available-exams thead tr th:first").next().append(wrapper);
                                    
                        }
                        if (taulukko !== null) {
                            if (taulukko.getAttribute("apuri_mod") === null) {
                                //console.log("Tehdään kopiolinkit");
                                var rivit = taulukko.getElementsByTagName("tr");
                                for (var i = 0; i < rivit.length; i++) {
                                    var uusisolu = $('<td />').attr('class', 'APURI');
                                    var examUuid = rivit[i].getAttribute("data-exam-uuid");
                                    if (examUuid !== null) {
                                        // ollaan varsinaisella rivillä
                                        var span = $('<span />').attr('class', 'edit-exam');
                                        var link = $('<a />').attr('href','#').attr('uuid', examUuid).attr('class','edit-link').html(APURI.text.copy_exam_button);
                                        link[0].onclick = APURI.listCopyExamTrigger;
                                        span.append(link).appendTo(uusisolu);
                                    }
                                    uusisolu.appendTo(rivit[i]);
                                }
                                $('span.disabled-modify-exam-button-tooltip').html(APURI.text.copy_exam_tooltip);
                                taulukko.setAttribute("apuri_mod", "done");
                            }
                        }
                    }
                },
                footer: {
                    initTimer: null,
                    show: function () {
                        if (document.getElementsByClassName("footer-column").length > 0) {
                            APURI.ui.appendSupportNotice();
                            window.clearInterval(this.initTimer);        
                        }
                    }
                }
            },
            initView(viewObj, delayTiming = 1000) {
                viewObj.initTimer = window.setInterval(function() {viewObj.show();}, delayTiming);
            }
        };

	
APURI.text = APURI.lang.fi;
(function() {
    if (typeof navigator.language === 'string'
            && navigator.language.substring(0,2) === 'sv') {
        APURI.text = APURI.lang.sv;
    } else {
        APURI.text = APURI.lang.fi;
    }
})();
/**
 * Returns displaynumber of ID from exam object
 * @param {object} obj examObject
 * @param {integer} qid Question ID
 * @return {string} Display Number for the question  
 */
APURI.getDisplayNumber = function(obj, qid) {
    var result = null;
    if (obj !== null && typeof obj === 'object') {
            for (var key in obj) {
                    if (key === 'id') {
                            if (obj[key] === qid)
                                return obj.displayNumber;
                    }
                    if (typeof obj[key] === 'object') {
                            result = APURI.getDisplayNumber(obj[key], qid);
                            if (result !== null)
                                return result;
                    }
            }
    }
    return null;
};

if (typeof APURI.paivkentTrigger !== 'function') {
	APURI.paivkentTrigger = function(va) {
		va.trigger("change");
		va.trigger("input");
		va.trigger("contentChanged");
        };
    }
    

if (typeof APURI.paivkent !== 'function') {
	APURI.paivkent = function(elem, input) {
                
		var va = $('textarea[name='+elem+']');
                if (!(va.length >0)) { // jos ei elem ole nimi, niin sitten ilm. id
                    va = $('textarea[id='+elem+']');
                    let name = va.attr('name');
                    elem = name;
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
            APURI.ui.detectHttpLink(elem, input);

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
	};
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


APURI.ui.constructLoadCsv = function() {
    
};

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
		
	};
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
	};
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
	};
}


// MIKSI TÄMÄ ALLA OLEVA?? TODO tarkista ja poista!
if (typeof APURI.findLargestId !== 'function') {
	APURI.findLargestId = function(obj, largest) {
		var largestId = 0;
		if (largest > 0)
			largestId = largest;
		if (obj !== null && typeof obj === 'object') {
			if (typeof obj.id !== 'undefined') {
				if (obj.id > largestId)
					largestId = obj.id;
			}
			for (var key in obj) {	
				if (typeof obj[key] === 'object') 
					largestId = APURI.findLargestId(obj[key], largestId);
			}
		}
		
		
		return largestId;
	};
}

if (typeof APURI.traverseSetId !== 'function') {
	APURI.traverseSetId = function(obj, initval) {
		var counter = 0;
		if (typeof initval === 'number' && initval > 0) 
			counter = initval;
		if (obj !== null && typeof obj === 'object') {
			for (var key in obj) {
				if (key === 'id') {
					obj[key] = counter++;
					//console.log("id set to "+(counter-1));
				}
				if (typeof obj[key] === 'object') {
					counter = APURI.traverseSetId(obj[key], counter);
				}
			}
		}
		return counter;
	};
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
				
		if (obj !== null && typeof obj === 'object') {
			if (typeof obj.displayNumber !== 'undefined') {
                                if (typeof obj.level !== 'undefined')
                                    clevel = obj.level;
				var debug = "";
                                countup = true;
				if (clevel === 1) {
					debug = obj.displayNumber = ""+(++count.level1);
					count.level2 = 0;
					count.level3 = 0;
				} else if (clevel === 2) {
					debug = obj.displayNumber = ""+count.level1+"."+(++count.level2);
					count.level3 = 0;
				} else if (clevel === 3) {
					debug = obj.displayNumber = ""+ count.level1+"."+count.level2+"."+(++count.level3);
				}
				//console.log("Set Display:"+debug);
                                clevel++;
			}
			for (var key in obj) {
				if (typeof obj[key] === 'object') {
					count = APURI.traverseDisplayNumber(obj[key], count, clevel);
				}
			}
		}
		return count;
	};	
}


	APURI.examImportQuestion = function(event) {
		var questiontag = $(event.target);
		var examUuid = questiontag.attr('uuid');
		var questionId = parseInt(questiontag.attr('quid'));
		var examObj = APURI.examBuffer[examUuid];
		var question = {};
		var latestDisplay = "";
                APURI.ui.showLoadingSpinner();
		
		if (typeof examObj !== 'undefined') {

                    question = APURI.exam.getQuestionObject(examObj, questionId);

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
                                                if (typeof current.content.sections[0] === 'undefined') {
                                                    current.content.sections[0] = {
                                                        questions: []
                                                    };
                                                }
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
		
	};


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
		if (upper_a.attr('class') === 'unloaded') {
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
	};
}


APURI.sort = {
    
};

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
                    APURI.ui.openModalWindow((div)=> {
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
                                                        var texti = APURI.shortenText($("<div />").html(choice.text).text(), 100);
                                                        var cli = $('<li />').attr('name',"q_"+question.id+"_c_"+choice.id)
                                                                .attr('class',"APURI_sortable_choice")
                                                                .html(choice.displayNumber+": "+texti);
                                                        coul.append(cli);
                                                    }
                                                }
                                                qul.append(sis);

                                        }
                                }
                        }
                        div.html(APURI.text.reorder_assignments_title)
                          .append($('<p />').html(APURI.text.reorder_assignments_info))
                          .append(sectul);
                        return div;
                    });
                  
                
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
                            return APURI.questionsort.bufferOrder;
                        },
                        set: function(sortable) {
                            //console.log("Sortable.store.SET:"+sortable.options.group.name);
                            //console.log(sortable.toArray());
                            //while (APURI.questionsort.waitingSaving !== 'null')
                                ;// TODO KESKEN!!!!
                            //APURI.questionsort.waitingSaving = setInterval(APURI.questionsort.delayTrigger, 100);
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
                            APURI.traverseSetId(APURI.questionsort.bufferSaved, 0);
                            APURI.traverseDisplayNumber(APURI.questionsort.bufferSaved, 1);
                            //console.log('Trying saving');
                            APURI.examSaveCurrent(APURI.questionsort.bufferSaved, false);
                            //console.log('...');

                        }
                    }
                });
                
                }
        });

    };
}



if (typeof APURI.showImportDialog !== 'function') {
        // TODO/melkein DONE jos postponed -- tallennus + viive 2s
        if (APURI.postponedSaving.isPostponed()) {
            APURI.postponedSaving.manualTrigger();
        }
        // TODO viive puuttuu !! - tässä ei niin kriittinen
	APURI.showImportDialog = function() {
	$.getJSON("https://oma.abitti.fi/kurko-api/exam/abitti-exam-events", function(data) {
            
                        data = APURI.examList.sortByDate(data);
                        
                        APURI.ui.openModalWindow((div)=> {
                            jQuery.expr[":"].Contains = jQuery.expr.createPseudo(function(arg) {
                                return function( elem ) {
                                    return jQuery(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
                                };
                            });
                            let filterwrapper = $('<div />');
                            let filterinput = $('<input />')
                                    .attr('id', 'APURI_importfilter')
                                    .attr('class', 'APURI')
                                    .attr('placeholder', APURI.text.search_exams_info)
                                    .keyup(function() {
                                        $("#APURI_import-examlist").find("> li").hide();
                                        let inputs = this.value.split(" ");
                                        let jo = $("#APURI_import-examlist").find("> li");
                                        $.each(inputs, function(i, v) {
                                           jo = jo.filter("*:Contains('"+v+"')"); 
                                        });
                                        jo.show();
                                    });
                            let clearElem = $('<span />')
                                    .html('<i class="fa fa-window-close" aria-hidden="true"></i>')
                                    .attr('id', 'APURI_importfilter_clear')
                                    .attr('class', 'APURI APURI_filter_clear')
                                    .attr('title', APURI.text.search_exams_clear)
                                    .click(function() {
                                        let input = $("#APURI_importfilter");
                                        input.val('');
                                        input.trigger('keyup');
                            });
                            filterwrapper.append(filterinput, clearElem);
                            var ul = $('<ul />');//.html(buffer);
                            ul
                                    .attr('id', 'APURI_import-examlist')
                                    .attr('class', 'APURI_examlist');
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
                            header.html(APURI.text.import_assignment_title);
                            div.html(APURI.text.import_assignment_title)
                                .append($('<p />').html(APURI.text.import_assignment_info))
                                .append(filterwrapper)
                                .append(ul);
                            return div; 
                        }, APURI.text.import_assignment_cancel);

		});
	};
}

APURI.filterLinebreaks = function(input) {
    input = input.replace(/(?:<\/p>\n)/g, '</p>');
    input = input.replace(/(?:<\/ol>\n)/g, '</ol>');
    input = input.replace(/(?:<\/ul>\n)/g, '</ul>');
    input = input.replace(/(?:<\/li>\n)/g, '</li>');
    return input;
};

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
                if (typeof y !== 'undefined' && y !== null) {
                    y.setAttribute('class', 'instructionInput');
                    x.push(y);
                }
            
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
                                let linkkivar = $('<div />').attr('apuri-warning-for',repname).attr('class','APURI http-link-warning').html(APURI.text.http_link_warning).hide();
                                if (APURI.util.linkDetector(x[i].value)) {
                                    linkkivar.show();
                                }
                                linkkivar = x[i].parentNode.appendChild(linkkivar[0]);
                                //linkkivar.style.visibility = 'hidden';
                                APURI.replacedFields.list[repname]={field:x[i], savedIndicator:paivitystoken, emptyQuestionWarning: tyhjakysvar, httpLinkWarning: linkkivar};
                                //console.log(".");
                                // TODO pitäisikö nimen paikalla olla itse elementti x[i] ??
				var elem = CKEDITOR.replace(x[i], {
				
					extraPlugins: 'base64image,mathjax,base64audio,htmlwriter',
					mathJaxLib: 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js?config=TeX-AMS_HTML',
					height: heightVal[x[i].getAttribute('class')],
					fileBrowserUploadUrl: 'base64',
					extraAllowedContent: 'script[!sec *]; video[*] source[*];',
                                        entities_latin:false,
                                        entities_greek:false,
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
	],
                                        on: {
                                            instanceReady: function (ev) {
                                                this.dataProcessor.writer.setRules('p', {
                indent: false,
                breakBeforeOpen: false,
                breakAfterOpen: false,
                breakBeforeClose: false,
                breakAfterClose: false                                                    
                                                });
                                                this.dataProcessor.writer.setRules('li', {
                indent: false,
                breakBeforeOpen: false,
                breakAfterOpen: false,
                breakBeforeClose: false,
                breakAfterClose: false                                                    
                                                });
                                            }
                                        }
                                        
				});
				(function(inner_elem){
					inner_elem.on('change',  function(src, event) {
										//console.log(typeof src + " " + typeof event);
                                                                                
                                                                                let content = APURI.filterLinebreaks(inner_elem.getData());
                                                                                inner_elem.setData(content, {internal: true, noSnapshot:true});
                                                                                inner_elem.element.value = content;
                                                                                inner_elem.updateElement();
										APURI.paivkent(inner_elem.name, content); });
					inner_elem.on('keyup',  function(src, event) {
										//console.log(typeof src + " " + typeof event);
                                                                                console.log(inner_elem);
										inner_elem.updateElement();
										APURI.paivkent(inner_elem.name, inner_elem.getData()); });
										})(elem);
                                APURI.replacedFields.count++;
			}
	    }
		   
	};
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
        };
    }

APURI.ui.appendCSS = function(cssaddr) {
	var linkcss = document.createElement("LINK");
	linkcss.setAttribute("href", cssaddr);
	linkcss.setAttribute("rel", "stylesheet");
	linkcss.setAttribute("type", "text/css");
	document.head.appendChild(linkcss);

};

(function() {
                if (document.body.getAttribute("class")!=='lapa') // varmista, että ollaan YTL:n kokeessa
                    return;
        APURI.ui.appendCSS("https://klo33.github.io/abixapuri/src/abixapuri.css");
       	APURI.loadScriptDirect('https://klo33.github.io/javascript/ckeditor/ckeditor.js',
            function() {
                CKEDITOR.editorConfig = function( config ) {
                    config.language = 'fi';
                    config.extraPlugins = 'base64image,mathjax,htmlwriter';
                    config.uiColor = '#e4f3d3';
                    config.entities_latin = false;
                    config.entities_greek = false;
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
   
        requirejs.config({
            paths: {
                'Sortable': 'https://rubaxa.github.io/Sortable/Sortable'
            }
        });
        require(['Sortable'], function (Sortable){
                        window.Sortable = Sortable; // exports
                });
        APURI.initView(APURI.views.examview);
        APURI.initView(APURI.views.examviewBoxes, 2000);
        APURI.util.bittiniiloDetector.init();
})();

APURI.makeCopyOfExam = function(origUuid) {
            //Lataa vanha, josta tehdään kopio
            APURI.ui.showLoadingSpinner();
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
									console.log("Kopio tehty onnistuneesti"); 
									// Kopioidaan liitteet
                                                                        if (origData.attachments.length > 0) {
                                                                            console.log("Kokeessa on liitteitä -> yritetään kopioida");
                                                                            APURI.ui.showAttachmentCopy();
                                                                            APURI.attachments.copyAttachments(origUuid, uudenUuid)
                                                                                    .then(filenames => {
                                                                                console.log("Attachments copied", filenames);
                                                                                APURI.ui.clearAttachmentCopy();                                                                                        
                                                                                window.location.href = "https://oma.abitti.fi/school/exam/"+uudenUuid;
                                                                            });
                                                                        } else {
                                                                            // Muutetaan osoite, jotta päästään suoraan editoimaan uutta koetta
                                                                            window.location.href = "https://oma.abitti.fi/school/exam/"+uudenUuid;
                                                                        }
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
        let examUuid = tag.getAttribute("uuid");
        //console.log("Trying to copy " + examUuid);
        APURI.makeCopyOfExam(examUuid);
    }
    return false;
};

APURI.testExamAttachmentCopyTrigger = function() {
    console.log("Start copyprocess");
    APURI.ui.showLoadingSpinner();
    APURI.ui.showAttachmentCopy();
    APURI.attachments.copyAttachments('7949611d-d720-4197-8d9d-4606129dc9a5','25cea84c-a83e-413e-bfec-23376a701508')
            .then(function() {
                console.log("Finished copying");
    });
};

/*
 * Arviointinäkymässä
 */
(function() {
    var accept_addresses = /^https:\/\/oma.abitti.fi\/school\/grading\/......*$/;
    if (window.location.href.match(accept_addresses) === null)
        return;
    APURI.ui.appendCSS("https://klo33.github.io/abixapuri/src/abixapuri.css");
    APURI.loadScriptDirect('https://use.fontawesome.com/d06b9eb6a7.js');
//    APURI.grading.initGradingCount();
    APURI.initView(APURI.views.footer, 2000);
})();
/*
 * Arviointiyhteenvedossa
 */
(function() {
    var accept_addresses = /^https:\/\/oma.abitti.fi\/school\/review\/?.*$/;
    if (window.location.href.match(accept_addresses) === null)
        return;
    if (document.body.getAttribute("class")!=='arpa') 
        return;
    APURI.ui.appendCSS("https://klo33.github.io/abixapuri/src/abixapuri.css");
    APURI.loadScriptDirect('https://use.fontawesome.com/d06b9eb6a7.js');
    APURI.initView(APURI.views.gradingSummary);
    APURI.initView(APURI.views.footer, 2000);
})();
/*
 * Koelistassa
 */
(function() {
    var accept_addresses = /^https:\/\/oma.abitti.fi(?:\/?|\/school\/exams\/?|\/school\/grading\/?)$/;
    if (window.location.href.match(accept_addresses) === null)
        return;
    APURI.ui.appendCSS("https://klo33.github.io/abixapuri/src/abixapuri.css");
    APURI.loadScriptDirect('https://use.fontawesome.com/d06b9eb6a7.js');
    APURI.initView(APURI.views.extensionWarning);
    APURI.initView(APURI.views.examlist);
    APURI.initView(APURI.views.footer, 2000);
    APURI.util.bittiniiloDetector.init();
})();
