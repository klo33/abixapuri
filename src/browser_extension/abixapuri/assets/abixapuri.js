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
// @version     0.6.0
// @grant	none
// @downloadUrl https://github.com/klo33/abixapuri/raw/master/src/AbiApuri-skripti.user.js
// @updateUrl   https://github.com/klo33/abixapuri/raw/master/src/AbiApuri-skripti.meta.js
// ==/UserScript==

/* AUTHOR Joni Lehtola, 2017-2018
 * Lisätiedot https://klo33.github.io/abixapuri
 * Lisäosa on julkaistu GPLv3 lisenssillä. Lisänosan käyttö omalla vastuulla. 
 * Tällä lisäosalla tai sen kehittäjällä ei ole mitään tekemistä Ylioppilastutkintolautakunnan kanssa ja YTL ei vastaa mistään laajennuksen aiheuttamista 
 * haitoista tai vahingoista, kuten myöskään ei tekijä, vaikka lisäosa ei tarkoituksellisesti tee mitään vahingollista. 
 * 
 * AbixApuri - Lisäosa oma.abitti.fi-palveluun
    Copyright (C) 2018 Joni Lehtola

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
                  csv_maxpoints: "Maksimipisteet",
                  loading_spinner: "latautuu...<br />odota hetkinen",
                  total_max_points: "maksimi yhteispistemäärä %d",
                  search_exams_info: "Hae kokeista...",
                  search_exams_clear: "Tyhjää haku",
                  lessthan_warning: "<i class='fa fa-exclamation-triangle' aria-hidden='true'></i>Kentässä vaikuttaa olevan &lt;-merkki. Ne rikkovat helposti kokeen. (<a target='_blank' href='https://github.com/klo33/abixapuri/wiki/Pienempi-kuin--merkki-teht%C3%A4v%C3%A4nannossa'>Lue lisää &gt;&gt;</a>) <br />Varmista tekstin toiminta esikatselusta.",
                  lessthan_fix_button: "Yritä korjata tehtävä",
                  lessthan_fix_done: "...",
                  firefox_greasemonkey_warning: "<strong>HUOM! AbixApurin Firefox-selainlaajennuksen tuki on muuttunut!</strong><p>Jos haluat AbixApurin toimivan Firefoxin uusimmassa versiossa 57 sinun on asennettava <a href='https://addons.mozilla.org/fi/firefox/addon/tampermonkey/' target='_blank'>TamperMonkey</a>-laajennus. <br/><a href='https://github.com/klo33/abixapuri/wiki/Miten-AbixApuri-toimii-uudessa-Firefoxissa' target='_blank'>Tarkemmat ohjeet &gt;&gt;</a>",
                  attachments_startcopying: "Kokeessa on liitteitä. Kopioidaan...<br />Kopiointi saattaa kestää jonkin aikaa",
                  attachments_download_status: "Ladataan %n <span class='progress'>0</span> %",
                  attachments_upload_status: "Kopioidaan %n <span class='progress'>0</span> %",
                  attachments_error: "<strong>Kopioinnissa tapahtui verkkovirhe. <a href='/school/exam/%uuid'>Mene uuteen kokeeseen ja lataa liitteet manuaalisesti.</a></strong>",
                  attachment_link_warning: "<i class='fa fa-exclamation-triangle' aria-hidden='true'></i><strong>Tehtävänannossasi vaikuttaa olevan linkki liitteeseen, jota ei löydy</strong>",
                  cke_abiximg_info: " koodinäkymässä. Liitetiedoston, kuten kuvan, videon tai äänen, saat tehtävään helpommin <img src='https://klo33.github.io/javascript/ckeditor/plugins/abittiimage/icons/abittiimg.png' style='height:16px; width:16px;' />-työkalulla.",
                  autograding_open_popup: "Avaa arvosanatyökalu",
                  autograding_maxscore_title: "Kokeen maksimipistemäärä",
                  autograding_maxscore_placeholder: "max %s p",
                  autograding_minscore_placeholder: "vakioarvo %s",
                  autograding_minscore_title: "Läpipääsyraja",
                  autograding_minscore_tooltip: "Voidaan antaa suhteellisena 50% tai absoluuttisena 30p",
                  autograding_minscore_autofill: "Anna minipistemäärä",
                  autograding_togglegrade: ["Näytä suhteellinen pistemäärä", "Näytä arvosanaehdotus"],
                  autograding_scoretable_header: ["Ehdotus&nbsp;","Suht.pisteet&nbsp;"],
                  autograding_minscorefield_negative: "Ei voi olla negatiivinen",
                  autograding_minscorefield_parseerror: "Pistemäärää ei osattu tulkita",
                  autograding_maxscorefield_parseerror: "Pistemäärää ei osattu tulkita",
                  autograding_minscorefield_toolarge: "Läpipääsypistemäärä ei voi ylittää maksimia %d",
                  autograding_maxscore_negative: "Ei voi olla negatiivinen",
                  autograding_maxscore_toolarge: "Ei voi olla yli teoreettisen maksimin %d",
                  autograding_gradingtable_open: "(Näytä arviontitaulukko)",
                  autograding_gradingtable_grade: "Arvosana&nbsp;",
                  autograding_gradingtable_limit: "Alaraja&nbsp;",
                  autograding_gradingtable_count: "Lukumäärä&nbsp;",
                  autograding_gradingtable_average: "Kokeen keskiarvo %average p (<span class='APURI_average_grade'>%grade</span>)",
                  autograding_commit: "Toimeenpane ehdotukset",
                  autograding_commit_checkbox: "Hyväksyn ehdotukset arvosanoiksi",
                  autograding_commit_warningexists: "Arvosanoja jo olemassa - niitä ei ylikirjoiteta",
                  importcsv_error_file: "Tiedostonlukuvirhe",
                  importcsv_error_format: "Tiedoston muotovirhe - ei osata tulkita",
                  importcsv_preview_info: '<p>Seuraavat arvostelutiedot ollaan tuomassa. </p><p>Punaisella merkatuilla riveillä on vanha arviointitieto, <strong>jota ei ylikirjoiteta</strong></p><p>Yliviivatuilla riveillä arviointitieto tyhjä tai ei ole muuttunut.</p>',
                  importcsv_preview_name: "Oppilaan nimi&nbsp;",
                  importcsv_preview_grade: "Tuotava arvosana&nbsp;",
                  importcsv_preview_oldgrade: "Vanha arvosana, joka jää voimaan&nbsp;",
                  importcsv_preview_nodata: "<p><strong>Ei tuotavia tietoja.</strong></p><p>Varmista, että yrität tuoda oikean kurssin arviointitiedoston</p>",
                  importcsv_preview_commit: "Tallenna muutokset arvosteluiksi",
                importcsv_open_popup: "Vie arviointitiedosto Abittiin",
                importcsv_popup_fileinfo: "",
                importcsv_popup_button: "Lataa"
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
                  csv_maxpoints: "Max poäng",
                  loading_spinner: "laddar...<br />vänta en liten stund",
                  total_max_points: "totalt max poäng %d",
                  search_exams_info: "Sök i proven...",
                  search_exams_clear: "Töm sökningen",
                  http_link_warning: "<i class='fa fa-exclamation-triangle' aria-hidden='true'></i><strong>Det verkar finnas en länk till en webbkälla i din uppgiftsanvisning</strong> <br/>"
                    + "Webbreferenser (t.ex. till bilder på nätet) funkar inte i det slutna Abittiprovet. <a target='_blank' href='https://github.com/klo33/abixapuri/wiki/Linkit-verkkomateriaaliin'>Läs mera &gt;&gt;</a>",
                  lessthan_warning: "<i class='fa fa-exclamation-triangle' aria-hidden='true'></i>Det värkar finnas en &lt;-tecke. Dom lätt söndrar provet. (<a target='_blank' href='https://github.com/klo33/abixapuri/wiki/Pienempi-kuin--merkki-teht%C3%A4v%C3%A4nannossa'>Lue lisää &gt;&gt;</a>) <br />Varmista tekstin toiminta esikatselusta.",
                  lessthan_fix_button: "Fixa svaret",
                  lessthan_fix_done: "...",
                  firefox_greasemonkey_warning: "<strong>HUOM! AbixApurin Firefox-selainlaajennuksen tuki on muuttunut!</strong><p>Jos haluat AbixApurin toimivan Firefoxin uusimmassa versiossa 57 sinun on asennettava <a href='https://addons.mozilla.org/fi/firefox/addon/tampermonkey/' target='_blank'>TamperMonkey</a>-laajennus. <br/><a href='https://github.com/klo33/abixapuri/wiki/Miten-AbixApuri-toimii-uudessa-Firefoxissa' target='_blank'>Tarkemmat ohjeet &gt;&gt;</a>",
                  attachments_startcopying: "Provet har bilagar. Kopierar...<br />Det tar en stund, vänligen vänta",
                  attachments_download_status: "Laddar ner %n <span class='progress'>0</span> %",
                  attachments_upload_status: "Kopierar %n <span class='progress'>0</span> %",
                  attachments_error: "<strong>Det var ett fel med kopiering. <a href='/school/exam/%uuid'>Gå till nya provet och ladda upp bilagar manuellt.</a></strong>",
                  attachment_link_warning: "<i class='fa fa-exclamation-triangle' aria-hidden='true'></i><strong>Det verkar finnas en länk till en bilaga som inte finns i din uppgiftsanvisning</strong>",
                  cke_abiximg_info: ". Du kan använda bilagan lätt i uppgiftanvisning med <img src='https://klo33.github.io/javascript/ckeditor/plugins/abittiimage/icons/abittiimg.png'  style='height:16px; width:16px;' />-värktygen." ,
                  autograding_open_popup: "Öppna vitsordsräknaren",
                  autograding_maxscore_title: "Provets maxpoäng",
                  autograding_maxscore_placeholder: "max %s p",
                  autograding_minscore_placeholder: "standardgräns %s",                  
                  autograding_minscore_title: "Gräns för godkänt",
                  autograding_minscore_tooltip: "Kan anges i procent eller i poäng (t.ex. 50% eller 30p)",
                  autograding_minscore_autofill: "Ange poänggräns för godkänt",
                  autograding_togglegrade: ["Visa resultatet i procent", "Visa vitsordsförslag"],
                  autograding_scoretable_header: ["Förslag vo.&nbsp;","Rel.vo.&nbsp;"],
                  autograding_minscorefield_negative: "Kan inte vara negativt",
                  autograding_maxscorefield_parseerror: "Ogiltigt värde",
                  autograding_minscorefield_parseerror: "Ogiltigt värde",
                  autograding_minscorefield_toolarge: "Gräns för godkänt kan inte vara högre än maxpoäng %d",
                  autograding_maxscore_negative: "Kan inte vara negativt",
                  autograding_maxscore_toolarge: "Kan inte vara över den teoretiska maxpoängen %d",
                  autograding_gradingtable_open: "(Visa poängskala)",
                  autograding_gradingtable_grade: "Vitsord&nbsp;",
                  autograding_gradingtable_limit: "Poäng&nbsp;",
                  autograding_gradingtable_count: "Antal&nbsp;",
                  autograding_gradingtable_average: "Provets medeltal %average p (<span class='APURI_average_grade'>%grade</span>)",
                  autograding_commit: "Spara förslaget som vitsord",
                  autograding_commit_checkbox: "Jag accepterar förslaget",
                  autograding_commit_warningexists: "Vitsord har redan angetts - dom ej överskrivs" ,
                  importcsv_error_file: "Problem med filläsningen",
                  importcsv_error_format: "Filen har fel format - kan inte öppnas",
                  importcsv_preview_info: '<p>Följande bedömningsinformation har laddats upp. </p><p>Rader angedda med rött har existerande vitsord, <strong>som inte överskrivs</strong>.</p><p>Överstrukna rader har inga vitsord eller har inte ändrats.</p>',
                  importcsv_preview_name: "Studerandes namn&nbsp;",
                  importcsv_preview_grade: "Vitsord på fil&nbsp;",
                  importcsv_preview_oldgrade: "Gammalt vitsord som blir kvar&nbsp;",
                  importcsv_preview_nodata: "<p><strong>Ingen bedömning fanns.</strong></p><p>Försäkra att du har laddat upp vitsord för rätt kurs</p>",
                  importcsv_preview_commit: "Spara som vitsord",
                importcsv_open_popup: "Ladda upp bedömningen till Abitti",
                importcsv_popup_fileinfo: "",
                importcsv_popup_button: "Ladda upp"
                  
              }  
            },
            text: null,
            settings: {
                fetchGetHeaders: {
                    'Accept': 'application/json, text/javascript, */*; q=0.01'                   
                },
                csv_idtitle: "vasttunniste",
                csv_separator: ";",
                csv_wrapping: "%s", //%s as replaced value
//                oldlink_map: /(?:<img\s([^>\/]+\s)??src=["'](?:http[s]?:)?\/\/[^"']+)|(?:<a\s([^>]+\s)??href=["'](?:http[s]?:)?\/\/[^"']+)/i,
                link_map: /(?:<(?:(?:img)|(?:audio)|(?:video)|(?:source))\s(?:[^>\/]+\s)??src=["'](?:http[s]?:)?\/\/[^"']+)|(?:<a\s(?:[^>]+\s)??href=["'](?:http[s]?:)?\/\/[^"']+)/i,
                attachment_map: /(?:<(?:(?:img)|(?:audio)|(?:video)|(?:source))\s(?:[^>\/]+\s)??src=["']\.?\/?attachments\/([^"']+))|(?:<a\s(?:[^>]+\s)??href=["']\.\/?attachments\/([^"']+))/ig,
                attachmenterror_map: /(?:<(?:(?:img)|(?:audio)|(?:video)|(?:source))\s(?:[^>\/]+\s)??src=["'](?:(?:http[s]?:)?\/\/[^\/"']+)?\/exam-api\/exams\/[\/"']+\/attachments\/([^"']+))|(?:<a\s(?:[^>]+\s)??href=["'](?:(?:http[s]?:)?\/\/[^\/"']+)?\/exam-api\/exams\[\/"']+\/attachments\/([^"']+))/i,
//              lessgreater_map: /(?:<\/?[a-wA-W](?:(?:=\s?"[^"]*")|(?:=\s?'[^']*')|[^>])*>)|(<[<xyz\d])|(>)|(<)/g,
                lessthan_map: /(<(?!\/?[a-wA-W](?:(?:=\s?"[^"]*")|(?:=\s?'[^']*')|[^>])*>))/g,
                grades: ['4', '5-', '5', '5+', '5½', '6-', '6', '6+', '6½', '7-', '7', '7+', '7½', '8-', '8', '8+', '8½', '9-', '9', '9+', '9½', '10-', '10'],
                local: {
                    enableReviewKeyboardShortcuts: false,
                    enableReviewShortcuts: true,
                    enableTotalMaxScore: true, // creates extra traffic by loading exam object on page load
                    autograding_defaultMinGrade: "30%"
                },
                api: {
                    student_answers: '/exam-api/grading/%uuid/student-answers',
                    attachments_list: '/exam-api/exams/%uuid/attachments',
                    exam_data: '/exam-api/exams/%uuid/exam',
                    heldexam_data: '/exam-api/exams/held-exam/%uuid/exam',
                    papergrading: '/exam-api/grading/gradingTexts/%paperid' 
                }
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
                emptyQuestionWarning: 'div.empty-question-warning',
                grading_answertext: '#answers answer-text-container answerText',
                grading_popup: 'answerText add-annotation-popup'
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
//                    button.innerHTML = button_text;
                    outer.append(message).append($(button).html(button_text));
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
                    //button.innerHTML = APURI.text.save_button;
                    outer.append(message).append($(button).html(APURI.text.save_button));
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
                detectNonExAttachmentLink(elem, input) {
                    if (APURI.util.nonExLinkDetector(input)) {
                        APURI.ui.showAttachmentLinkWarning(elem);
                    } else {
                        APURI.ui.hideAttachmentLinkWarning(elem);
                    }
                },
                showAttachmentLinkWarning: function(elem) {
                    $('div[apuri-attachment-warning-for="'+elem+'"]').show();
                },
                hideAttachmentLinkWarning(elem) {
                    $('div[apuri-attachment-warning-for="'+elem+'"]').hide();
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
                    for (let bodyCh of document.body.children) {
                        $(bodyCh).removeClass('APURI_blur');
                    }                            
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
                openModalWindow(renderFkt, buttonTitle, actionFkt = null, altOptions = null) {
                    let _ = APURI.ui;
                    var options = Object.assign({
                        closeOnBlur: false,
                        actionOnBlur: function() {},
                        backgroundclass: 'APURImodal_back',
                        diffuse: false,
                        _blurHandler: function() {
                            if (options.closeOnBlur) {
                                _.closeModalWindow();
                            }
                            actionOnBlur();
                        }
                    }, altOptions);
                    if (options.diffuse) {
                        for (let bodyCh of document.body.children) {
                            if (bodyCh.id !== 'APURI_modal_content') {
                                $(bodyCh).addClass('APURI_blur');
                            }
                        }                            
                    }
                        if (typeof buttonTitle === 'undefined' || buttonTitle === null)
                            buttonTitle = APURI.text.close_button;
                        if (actionFkt === null)
                            actionFkt = APURI.ui.closeModalWindow;
                    let outdiv = $('<div />')
			                        .attr("class", options.backgroundclass)
                                    .attr("id", "APURI_modal_back")
                                    .on('click', options._blurHandler);
			//outdiv.attr("style", APURI.modal_background_style);
			var div = $('<div />').attr("id", "APURI_modal_content");
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
                },
                showDownloadReject(targetUuid) {
                    $('<div />'.html(APURI.text.attachments_error.replace("%uuid", targetUuid))).appendTo('#APURI_loading_download');
                }
            },
            util: {
                checksum(param) {
                    // source: https://asecuritysite.com/sha1.js
                    /*
                     * A JavaScript implementation of the Secure Hash Algorithm, SHA-256, as defined
                     * in FIPS 180-2
                     * Version 2.2 Copyright Angel Marin, Paul Johnston 2000 - 2009.
                     * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
                     * Distributed under the BSD License
                     * See http://pajhome.org.uk/crypt/md5 for details.
                     * Also http://anmar.eu.org/projects/jssha2/
                     */

                    /*
                     * Configurable variables. You may need to tweak these to be compatible with
                     * the server-side, but the defaults work in most cases.
                     */
                    var hexcase = 0;  /* hex output format. 0 - lowercase; 1 - uppercase        */
                    var b64pad  = ""; /* base-64 pad character. "=" for strict RFC compliance   */

                    /*
                     * These are the functions you'll usually want to call
                     * They take string arguments and return either hex or base-64 encoded strings
                     */
                    function hex_sha256(s)    { return rstr2hex(rstr_sha256(str2rstr_utf8(s))); }
                    function b64_sha256(s)    { return rstr2b64(rstr_sha256(str2rstr_utf8(s))); }
                    function any_sha256(s, e) { return rstr2any(rstr_sha256(str2rstr_utf8(s)), e); }
                    function hex_hmac_sha256(k, d)
                      { return rstr2hex(rstr_hmac_sha256(str2rstr_utf8(k), str2rstr_utf8(d))); }
                    function b64_hmac_sha256(k, d)
                      { return rstr2b64(rstr_hmac_sha256(str2rstr_utf8(k), str2rstr_utf8(d))); }
                    function any_hmac_sha256(k, d, e)
                      { return rstr2any(rstr_hmac_sha256(str2rstr_utf8(k), str2rstr_utf8(d)), e); }

                    /*
                     * Perform a simple self-test to see if the VM is working
                     */
                    function sha256_vm_test()
                    {
                      return hex_sha256("abc").toLowerCase() ==
                                "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad";
                    }

                    /*
                     * Calculate the sha256 of a raw string
                     */
                    function rstr_sha256(s)
                    {
                      return binb2rstr(binb_sha256(rstr2binb(s), s.length * 8));
                    }

                    /*
                     * Calculate the HMAC-sha256 of a key and some data (raw strings)
                     */
                    function rstr_hmac_sha256(key, data)
                    {
                      var bkey = rstr2binb(key);
                      if(bkey.length > 16) bkey = binb_sha256(bkey, key.length * 8);

                      var ipad = Array(16), opad = Array(16);
                      for(var i = 0; i < 16; i++)
                      {
                        ipad[i] = bkey[i] ^ 0x36363636;
                        opad[i] = bkey[i] ^ 0x5C5C5C5C;
                      }

                      var hash = binb_sha256(ipad.concat(rstr2binb(data)), 512 + data.length * 8);
                      return binb2rstr(binb_sha256(opad.concat(hash), 512 + 256));
                    }

                    /*
                     * Convert a raw string to a hex string
                     */
                    function rstr2hex(input)
                    {
                      try { hexcase } catch(e) { hexcase=0; }
                      var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
                      var output = "";
                      var x;
                      for(var i = 0; i < input.length; i++)
                      {
                        x = input.charCodeAt(i);
                        output += hex_tab.charAt((x >>> 4) & 0x0F)
                               +  hex_tab.charAt( x        & 0x0F);
                      }
                      return output;
                    }

                    /*
                     * Convert a raw string to a base-64 string
                     */
                    function rstr2b64(input)
                    {
                      try { b64pad } catch(e) { b64pad=''; }
                      var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
                      var output = "";
                      var len = input.length;
                      for(var i = 0; i < len; i += 3)
                      {
                        var triplet = (input.charCodeAt(i) << 16)
                                    | (i + 1 < len ? input.charCodeAt(i+1) << 8 : 0)
                                    | (i + 2 < len ? input.charCodeAt(i+2)      : 0);
                        for(var j = 0; j < 4; j++)
                        {
                          if(i * 8 + j * 6 > input.length * 8) output += b64pad;
                          else output += tab.charAt((triplet >>> 6*(3-j)) & 0x3F);
                        }
                      }
                      return output;
                    }

                    /*
                     * Convert a raw string to an arbitrary string encoding
                     */
                    function rstr2any(input, encoding)
                    {
                      var divisor = encoding.length;
                      var remainders = Array();
                      var i, q, x, quotient;

                      /* Convert to an array of 16-bit big-endian values, forming the dividend */
                      var dividend = Array(Math.ceil(input.length / 2));
                      for(i = 0; i < dividend.length; i++)
                      {
                        dividend[i] = (input.charCodeAt(i * 2) << 8) | input.charCodeAt(i * 2 + 1);
                      }

                      /*
                       * Repeatedly perform a long division. The binary array forms the dividend,
                       * the length of the encoding is the divisor. Once computed, the quotient
                       * forms the dividend for the next step. We stop when the dividend is zero.
                       * All remainders are stored for later use.
                       */
                      while(dividend.length > 0)
                      {
                        quotient = Array();
                        x = 0;
                        for(i = 0; i < dividend.length; i++)
                        {
                          x = (x << 16) + dividend[i];
                          q = Math.floor(x / divisor);
                          x -= q * divisor;
                          if(quotient.length > 0 || q > 0)
                            quotient[quotient.length] = q;
                        }
                        remainders[remainders.length] = x;
                        dividend = quotient;
                      }

                      /* Convert the remainders to the output string */
                      var output = "";
                      for(i = remainders.length - 1; i >= 0; i--)
                        output += encoding.charAt(remainders[i]);

                      /* Append leading zero equivalents */
                      var full_length = Math.ceil(input.length * 8 /
                                                        (Math.log(encoding.length) / Math.log(2)))
                      for(i = output.length; i < full_length; i++)
                        output = encoding[0] + output;

                      return output;
                    }

                    /*
                     * Encode a string as utf-8.
                     * For efficiency, this assumes the input is valid utf-16.
                     */
                    function str2rstr_utf8(input)
                    {
                      var output = "";
                      var i = -1;
                      var x, y;

                      while(++i < input.length)
                      {
                        /* Decode utf-16 surrogate pairs */
                        x = input.charCodeAt(i);
                        y = i + 1 < input.length ? input.charCodeAt(i + 1) : 0;
                        if(0xD800 <= x && x <= 0xDBFF && 0xDC00 <= y && y <= 0xDFFF)
                        {
                          x = 0x10000 + ((x & 0x03FF) << 10) + (y & 0x03FF);
                          i++;
                        }

                        /* Encode output as utf-8 */
                        if(x <= 0x7F)
                          output += String.fromCharCode(x);
                        else if(x <= 0x7FF)
                          output += String.fromCharCode(0xC0 | ((x >>> 6 ) & 0x1F),
                                                        0x80 | ( x         & 0x3F));
                        else if(x <= 0xFFFF)
                          output += String.fromCharCode(0xE0 | ((x >>> 12) & 0x0F),
                                                        0x80 | ((x >>> 6 ) & 0x3F),
                                                        0x80 | ( x         & 0x3F));
                        else if(x <= 0x1FFFFF)
                          output += String.fromCharCode(0xF0 | ((x >>> 18) & 0x07),
                                                        0x80 | ((x >>> 12) & 0x3F),
                                                        0x80 | ((x >>> 6 ) & 0x3F),
                                                        0x80 | ( x         & 0x3F));
                      }
                      return output;
                    }

                    /*
                     * Encode a string as utf-16
                     */
                    function str2rstr_utf16le(input)
                    {
                      var output = "";
                      for(var i = 0; i < input.length; i++)
                        output += String.fromCharCode( input.charCodeAt(i)        & 0xFF,
                                                      (input.charCodeAt(i) >>> 8) & 0xFF);
                      return output;
                    }

                    function str2rstr_utf16be(input)
                    {
                      var output = "";
                      for(var i = 0; i < input.length; i++)
                        output += String.fromCharCode((input.charCodeAt(i) >>> 8) & 0xFF,
                                                       input.charCodeAt(i)        & 0xFF);
                      return output;
                    }

                    /*
                     * Convert a raw string to an array of big-endian words
                     * Characters >255 have their high-byte silently ignored.
                     */
                    function rstr2binb(input)
                    {
                      var output = Array(input.length >> 2);
                      for(var i = 0; i < output.length; i++)
                        output[i] = 0;
                      for(var i = 0; i < input.length * 8; i += 8)
                        output[i>>5] |= (input.charCodeAt(i / 8) & 0xFF) << (24 - i % 32);
                      return output;
                    }

                    /*
                     * Convert an array of big-endian words to a string
                     */
                    function binb2rstr(input)
                    {
                      var output = "";
                      for(var i = 0; i < input.length * 32; i += 8)
                        output += String.fromCharCode((input[i>>5] >>> (24 - i % 32)) & 0xFF);
                      return output;
                    }

                    /*
                     * Main sha256 function, with its support functions
                     */
                    function sha256_S (X, n) {return ( X >>> n ) | (X << (32 - n));}
                    function sha256_R (X, n) {return ( X >>> n );}
                    function sha256_Ch(x, y, z) {return ((x & y) ^ ((~x) & z));}
                    function sha256_Maj(x, y, z) {return ((x & y) ^ (x & z) ^ (y & z));}
                    function sha256_Sigma0256(x) {return (sha256_S(x, 2) ^ sha256_S(x, 13) ^ sha256_S(x, 22));}
                    function sha256_Sigma1256(x) {return (sha256_S(x, 6) ^ sha256_S(x, 11) ^ sha256_S(x, 25));}
                    function sha256_Gamma0256(x) {return (sha256_S(x, 7) ^ sha256_S(x, 18) ^ sha256_R(x, 3));}
                    function sha256_Gamma1256(x) {return (sha256_S(x, 17) ^ sha256_S(x, 19) ^ sha256_R(x, 10));}
                    function sha256_Sigma0512(x) {return (sha256_S(x, 28) ^ sha256_S(x, 34) ^ sha256_S(x, 39));}
                    function sha256_Sigma1512(x) {return (sha256_S(x, 14) ^ sha256_S(x, 18) ^ sha256_S(x, 41));}
                    function sha256_Gamma0512(x) {return (sha256_S(x, 1)  ^ sha256_S(x, 8) ^ sha256_R(x, 7));}
                    function sha256_Gamma1512(x) {return (sha256_S(x, 19) ^ sha256_S(x, 61) ^ sha256_R(x, 6));}

                    var sha256_K = new Array
                    (
                      1116352408, 1899447441, -1245643825, -373957723, 961987163, 1508970993,
                      -1841331548, -1424204075, -670586216, 310598401, 607225278, 1426881987,
                      1925078388, -2132889090, -1680079193, -1046744716, -459576895, -272742522,
                      264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986,
                      -1740746414, -1473132947, -1341970488, -1084653625, -958395405, -710438585,
                      113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291,
                      1695183700, 1986661051, -2117940946, -1838011259, -1564481375, -1474664885,
                      -1035236496, -949202525, -778901479, -694614492, -200395387, 275423344,
                      430227734, 506948616, 659060556, 883997877, 958139571, 1322822218,
                      1537002063, 1747873779, 1955562222, 2024104815, -2067236844, -1933114872,
                      -1866530822, -1538233109, -1090935817, -965641998
                    );

                    function binb_sha256(m, l)
                    {
                      var HASH = new Array(1779033703, -1150833019, 1013904242, -1521486534,
                                           1359893119, -1694144372, 528734635, 1541459225);
                      var W = new Array(64);
                      var a, b, c, d, e, f, g, h;
                      var i, j, T1, T2;

                      /* append padding */
                      m[l >> 5] |= 0x80 << (24 - l % 32);
                      m[((l + 64 >> 9) << 4) + 15] = l;

                      for(i = 0; i < m.length; i += 16)
                      {
                        a = HASH[0];
                        b = HASH[1];
                        c = HASH[2];
                        d = HASH[3];
                        e = HASH[4];
                        f = HASH[5];
                        g = HASH[6];
                        h = HASH[7];

                        for(j = 0; j < 64; j++)
                        {
                          if (j < 16) W[j] = m[j + i];
                          else W[j] = safe_add(safe_add(safe_add(sha256_Gamma1256(W[j - 2]), W[j - 7]),
                                                                sha256_Gamma0256(W[j - 15])), W[j - 16]);

                          T1 = safe_add(safe_add(safe_add(safe_add(h, sha256_Sigma1256(e)), sha256_Ch(e, f, g)),
                                                                              sha256_K[j]), W[j]);
                          T2 = safe_add(sha256_Sigma0256(a), sha256_Maj(a, b, c));
                          h = g;
                          g = f;
                          f = e;
                          e = safe_add(d, T1);
                          d = c;
                          c = b;
                          b = a;
                          a = safe_add(T1, T2);
                        }

                        HASH[0] = safe_add(a, HASH[0]);
                        HASH[1] = safe_add(b, HASH[1]);
                        HASH[2] = safe_add(c, HASH[2]);
                        HASH[3] = safe_add(d, HASH[3]);
                        HASH[4] = safe_add(e, HASH[4]);
                        HASH[5] = safe_add(f, HASH[5]);
                        HASH[6] = safe_add(g, HASH[6]);
                        HASH[7] = safe_add(h, HASH[7]);
                      }
                      return HASH;
                    }

                    function safe_add (x, y)
                    {
                      var lsw = (x & 0xFFFF) + (y & 0xFFFF);
                      var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
                      return (msw << 16) | (lsw & 0xFFFF);
                    }                   

                    return b64_sha256(param)
                },
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
                osBrowserDetect() {
                    let pattern = /(Windows NT)|(X11\/Linux)/g;
                    if (navigator.userAgent.search(pattern)>0) {
                        // supported os
                        APURI.settings.local.enableReviewKeyboardShortcuts = true;
                    }                   
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
                /*
                 * Returns all links to attachments in text
                 * @param {type} text
                 * @returns {Array|APURI.util.getLinksToAttachments.resultset}
                 */
                getLinksToAttachments(text) {
                    let resultset = [];
                    for (let res = APURI.settings.attachment_map.exec(text); 
                        res !== null; res = APURI.settings.attachment_map.exec(text)) {
                        
                        resultset.push(res[1]||res[2]);
                    }
                    APURI.settings.attachment_map.lastIndex = 0;
                    if (resultset.length > 0) {
                        return resultset;
                    } else {
                        return null;
                    }
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
                        xhr.responseType = 'blob';
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
                currentList: null,
                /**
                 * 
                 * @param {type} listFiles
                 * @param {type} listAttachments
                 * @returns {APURI.attachments.matchLists.result} {matched - list of matched files, nonmatched - list of nonmatched files}
                 */
                matchLists(listFiles, listAttachments) {
                    let result = {
                        matched: [],
                        nonmatched: []
                    };
                    let attachmentsMap = new Map();
                    for (let attachment of listAttachments) {
                        if (typeof attachment == 'string')
                            attachmentsMap.set(attachment, {displayName: attachment});
                        if (typeof attachment == 'object' && typeof attachment.displayName == 'string') {
                            attachmentsMap.set(attachment.displayName, attachment);
                        }
                    }
                    for (let file of listFiles) {
                        if (attachmentsMap.has(file)) {
                            result.matched.push(file);
                        } else {
                            result.nonmatched.push(file);
                        }
                    }
                    return result;
                    
                },
                loadAttachmentList() {
                    let uuid = APURI.exam.getCurrentLocationUuid();
                    return new Promise((resolve, reject) => {
                        let sourceAttachmentUri = `/exam-api/exams/${uuid}/attachments`;
                        APURI.fetch.getJson(sourceAttachmentUri)
                                .then(attachments => {
                                APURI.attachments.currentList = attachments;
                                resolve(attachents);
                        }).catch(function(e) {
                            console.log("Network error on loading attachments");
                        });
                    });
                },
                /**
                 * Copies all attachments of an exam to new one
                 * @param {string} sourceId
                 * @param {string} targerId
                 * @returns {Promise}
                 */
                copyAttachments(sourceId, targetId, listFiles = null) {
                    return new Promise((resolve, reject) => {
                        let sourceAttachmentUri = `/exam-api/exams/${sourceId}/attachments`;
                        var fetchList = {};
                        if (listFiles === null)
                            fetchList = APURI.fetch.getJson(sourceAttachmentUri);
                        else {
                            fetchList = new Promise((resolve, reject) => {
                                let fetched = [];
                                for (let file of listFiles) {
                                    fetched.push({displayName: file});
                                }
                                resolve(fetched);
                            });
                        }
                        fetchList
                                .then(function(attachments) {
                                    let promiseStack = [];
                                    for (let attachment of attachments) {
                                        promiseStack.push(APURI.attachments.copyAttachment(sourceId, targetId, attachment));
                                    }
                                    Promise.all(promiseStack).then(values => {
                                        resolve(values);
                                    }).catch(values => {
                                        APURI.ui.showDownloadReject(targetId);
                                        reject(values);
                                    });
                        }).catch(error => {
                            reject(error);
                        });                        
                    });
                },
                
                /**
                 * 
                 * @param {type} sourceExamId
                 * @param {type} targetExamId
                 * @param {type} attachment, pitää olla ominaisuudest displayName ja mimeType
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
                                    if (typeof attachment.mimeType === 'undefined') {
                                        attachment.mimeType = blob.type;
                                    }
                                    APURI.util.uploadBlob(targetUri, blob, {filename: attachment.displayName, filetype: attachment.mimeType}, function(e) {
                                        if (e.lengthComputable) {
                                            APURI.ui.updateCurrentUpload(attachment.displayName, (e.loaded/e.total)*100);
                                        }
                                    }).then(function() {
                                        APURI.ui.updateCurrentUpload(attachment.displayName, 100);
                                        APURI.ui.hideUploadStatus(attachment.displayName);
                                        resolve(attachment.displayName);
                                    }).catch(error => {
                                        reject(error);
                                    });
                        }).catch(error => {
                            reject(error);
                        });                        
                    });
                }
            },
            grading: {
                gradesBuffer: null,
                storeGradeElement(grade, $element) {
                    let paperId = parseInt($element.attr('data-answer-paper-id'));
                    let gradeObj = {gradingText: grade};
                    $.ajax({
                        type: "POST",
                        url: (APURI.settings.api.papergrading.replace("%paperid",paperId)),
                        data: JSON.stringify(gradeObj),
                        accept: "application/json; text/javascript",
                        contentType: "application/json; charset=UTF-8",
                        dataType: "json",
                        success: function(data){
                        },
                        failure: function(errMsg) {
                            console.log("Error storing grade", errMsg);
                        }                        
                    });
                },
                initGradingCount() {
                  let currentUuid = APURI.exam.getCurrentLocationUuid();
                  this.loadGradingObject(currentUuid)
                          .then(function(result) {
                              APURI.grading.gradesBuffer = result;
                              APURI.initView(APURI.views.grading);
                  });
                },
                
                getQuestionByAnswer(answerPapers, answerId) {
                    if (answerPapers === null)
                        return null;
                    for (let answerPaper of answerPapers) {
                        for (let answer of answerPaper.answers) {
                            if (answer.id == answerId)
                                return answer.questionId;
                        }
                    }
                    return null;
                },
                /**
                 * 
                 * @param {type} data
                 * @param {type} questionId
                 * @returns {comments} Map questionText -> count
                 */
                getAllComments(data, questionId = null) {
                    let comments = new Map();
                    for (let pupil of data) {
                        for (let answer of pupil.answers) {
                            if (answer.metadata !== null && (questionId === null || answer.questionId === questionId))
                                for (let annotation of answer.metadata.annotations) {
                                    let subannos = annotation.message.split(" / ");
                                    for (let subanno of subannos) {
                                        if (comments.has(subanno)) {
                                            let obj = comments.get(subanno);
                                            obj++;
                                            comments.set(subanno, obj);
                                        } else {
                                            comments.set(subanno, 1);
                                        }
                                    }
                                }
                        }
                    }
                    let retval = Array.from(comments, ([k, v]) => {
                        return {message: k, count:v};});
                    retval.sort((a, b) => {
                        if (a.count > b.count)
                            return -1;
                        else
                            return 1;
                    });
                    //let retval = Array.from(comments, [key, val] => {return {message: key, count: val}});
                    return retval;
                },
                 /**
                 * Loads grading object
                 * @param {string} examId UUID for exam
                 * @returns {Promise} Promise which resolves for GradingObject  
                 */
                loadGradingObject(examId, sortByName = true) {
                    return new Promise((resolve, reject) => {
                        let waitForUser = Promise.resolve(1);
                    
                        if (APURI.user.userdata === null) {
                            waitForUser = APURI.user.loadUserdata();
                        }
                        waitForUser.then(function() {
                            APURI.fetch.getJson(APURI.settings.api.student_answers.replace("%uuid",examId)) //    `https://oma.abitti.fi/exam-api/grading/${examId}/student-answers`
                                    .then(function(data) {
                                        if (sortByName)
                                            resolve(APURI.grading.sortGradingObject(data));
                                        else
                                            resolve(data);
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
                            template[questions[q].id]={id: questions[q].id,
                                value: "", displayNumber: questions[q].displayNumber, maxScore: questions[q].maxScore};
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
                 * Creates a line with maxscores and their titles.
                 * @param {type} examObj
                 * @returns {APURI.grading.constructMaxScores.template|Array} - .totalMaxScore for totalAmount
                 */
                constructMaxScores(examObj) {
                  //let retval = new Array();
                  let template = APURI.grading.constructTemplateObject(examObj);
                  let sumMax = 0;
                  for (let val of template) {
                      if (val) {
                          val.value = ""+val.maxScore;
                          sumMax += val.maxScore;
                      }
                  }
                  template.unshift({value: ''/*vastausid*/},{value: APURI.text.csv_maxpoints}, {value: "" /* email */ });
                  template.push({value: sumMax, totalMaxScore: sumMax});
                  return template;
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
                    titlerow.unshift({value: APURI.settings.csv_idtitle},{value: APURI.text.csv_name}, {value: APURI.text.csv_email});
                    titlerow.push({value: APURI.text.csv_sum}, {value: APURI.text.csv_grade});
                    result += this.extractCsvRow(titlerow);
                    result += this.extractCsvRow(this.constructMaxScores(examObj));
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
                            value: studentGrading.answerPaperId
                        },
                        {
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
                        //console.log(result);
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
                loadExam(examUuid, heldExam = false) {
                    return new Promise((resolve, reject) => {
                        // TODO varmista että onko tämä turha odottaa käyttäjää??
                        let waitForUser = Promise.resolve(1);
                    
                        if (APURI.user.userdata === null) {
                            waitForUser = APURI.user.loadUserdata();
                        }
                        waitForUser.then(function() {
                            let waitForUnheldExam = null; 
                            if (!heldExam) {
                                // try fetching unheld exam
                                waitForUnheldExam = APURI.fetch.getJson(`https://oma.abitti.fi/exam-api/exams/${examUuid}/exam`);
                            } else {
                                waitForUnheldExam = Promise.reject('Delibarate failure, no worries! (Abix)');
                            }
                            waitForUnheldExam.then(function(data) {
                                        APURI.exam.buffer = data;
                                        resolve(data);
                            })
                                .catch(function(result) {
                                    // Loading exam failed --> try held exam
                                    //console.log("Failed loading exam "+examUuid+", trying a held-one:",result);
                                    APURI.fetch.getJson(`https://oma.abitti.fi/exam-api/exams/held-exam/${examUuid}/exam`)
                                            .then(function(data) {
                                                APURI.exam.buffer = data;
                                                resolve(data);
                                            })
                                            .catch(reject);
                            });                              
                        }).catch(reject);
                    
                    });
                },
                getQuestionIds(examObj) {
                    let result = [];
                    for (let i=0; i<examObj.content.sections.length; i++) {
                            // sectionloop
                            let section = examObj.content.sections[i];
                            if (typeof section.questions !== 'undefined') {
                                    for(let j=0; j<section.questions.length; j++) {
                                            result.push(section.questions[j].id);
                                    }
                            }
                    }
                    return result;
                    
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
                },
                saveExam(exam, reload = true) {
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
                },
                traverseSetId(obj, initval = 0) {
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
                                            counter = APURI.exam.traverseSetId(obj[key], counter);
                                    }
                            }
                    }
                    return counter;
        	},
                traverseDisplayNumber(obj, curr, clevel = 1) {
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
                                            count = APURI.exam.traverseDisplayNumber(obj[key], count, clevel);
                                    }
                            }
                    }
                    return count;
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
                ckeAbiximageInfo: {
                    initTimer: null,
                    show: function () {
                        let instructionElement = $('p.attachment-instructions');
                        let ckeinfo = document.getElementById('abiximage-info');
                        if (instructionElement.length > 0 && ckeinfo ===null) {
                            instructionElement.append($('<span />').attr('id','abiximage-info').attr('class', 'APURI abiximage-info').html(APURI.text.cke_abiximg_info));
                            clearInterval(this.initTimer);                                 
                        }
                    }                    
                },
                attachmentsPoller: {
                    initTimer: null,
                    show: function () {
                        APURI.attachments.loadAttachmentList();                        
                    },
                    init: function() {
                        APURI.attachments.loadAttachmentList();
                    }
                },
                attachmentLinkReplace: {
                    initTimer: null,
                    currentUuid: null,
                    show: function () {
                        let attachmentlink = /^[\/]?attachments\/(.+)$/;
                        if (this.currentUuid === null) {
                            this.currentUuid = APURI.exam.getCurrentLocationUuid();
                        }
//                        console.log("ImgSrcReplace");
                        let absoluteAttachmentPath = '/exam-api/exams/%uuid/attachments/';
                        document.querySelectorAll('iframe').forEach( item => {
                            let allImg = item.contentWindow.document.body.querySelectorAll('img,video,audio,source');                  
                            for (let img of allImg) {
                                let src = img.getAttribute('src');
                                if (src !== null && attachmentlink.test(src)) {
                                    if (img.getAttribute('data-cke-saved-src') === null) {
                                        img.setAttribute('data-cke-saved-src',src);
                                    }
                                    let match = attachmentlink.exec(src);
                                    let newUri = absoluteAttachmentPath.replace("%uuid", this.currentUuid)+match[1];
                                    img.setAttribute('src', newUri);
                                }
                            }
                            });
                        
                    }
                },
                gradingSummary: {
                    initTimer: null,
                    counter: 0,
                    currentExam: null,
                    doNotClosePopup: false,
                    doNotCloseImportPopup: false,
                    showGrades: true,
                    currentExamUuid: null,
                    init: function() {
                        if (!APURI.settings.local.enableTotalMaxScore)
                            return;
                        let uuid = APURI.exam.getCurrentLocationUuid();
                        APURI.exam.loadExam(uuid).then(exam => {
                            this.currentExam = exam;
                        });                     
                    },
                    getCurrentUuid() {
                        let _ = APURI.views.gradingSummary;
                        if (_.currentExamUuid == null) {
                            _.currentExamUuid = APURI.exam.getCurrentLocationUuid();
                        } 
                        return _.currentExamUuid;
                    },
                    createScoringPopupHtml() {
                        let _ = APURI.views.gradingSummary;
                        let _t = APURI.text;
                        let currMaxScore = _.getTotalMaxScore()
                        let calcMaxScore = _.getCalculativeTotalMaxscore();
                        let currMinScore = _.getMinScore();
                        let currMinScoreStr = _.minScoreStr;
                        let el = $('<div />').attr('id','APURI_autograding_popup').attr('class','APURI-autograding APURI')
                                .append($('<span />').html(_t.autograding_maxscore_title))
                                .append($('<input />')
                                    .attr('id','APURI_autograding_maxscore')
                                    .attr('defaultValue',calcMaxScore)
                                    .attr('placeholder', _t.autograding_maxscore_placeholder.replace("%s",calcMaxScore)).val(currMaxScore)
                                    .on('change keyup',_.updateValuesAndView).val(currMaxScore?currMaxScore:""))
                                .append($('<span />').html(_t.autograding_minscore_title).attr('title',_t.autograding_minscore_tooltip))
                                .append($('<br />').attr('class','APURI_cr'))
                                .append($('<input />')
                                    .attr('id','APURI_autograding_minscore')
                                    .attr('defaultValue',APURI.settings.local.autograding_defaultMinGrade).attr('placeholder',_t.autograding_minscore_placeholder.replace("%s",APURI.settings.local.autograding_defaultMinGrade)).val(currMinScoreStr)
                                    .on('change keyup',_.updateValuesAndView))
                                .append($('<br />').attr('class','APURI_cr'))
                                .append($('<button />').attr('id','APURI_autograding_commit').attr('class','APURI APURI_autograding_commit disabled').html(_t.autograding_commit).on('click', _.commitAutograding))
                                .append($('<a />')
                                    .attr('class', 'APURI_cr')
                                    .attr('href', "#")
                                    .attr('id', 'APURI_autograding_togglegrade')
                                    .html(_t.autograding_togglegrade[_.showGrades?0:1])
                                    .on('click', _.toggleGrade))
                                .append($('<br />'))
                                .append($('<a />')
                                    .attr('href', "#")
                                    .attr('id', 'APURI_autograding_opentable')
                                    .html(_t.autograding_gradingtable_open)
                                    .on('click', _.openGradingTableModal).hide())
                                .append($('<div />')
                                    .attr('class', 'APURI_autograding_commitcheck_container')
                                    .append($('<input />')
                                        .attr('type','checkbox')
                                        .attr('id','APURI_autograding_commitcheck')
                                        .on('click', _.toggleAutogradingCommitcheck))
                                    .append($('<label />')
                                        .attr('for','APURI_autograding_commitcheck')
                                        .attr('class','APURI_autograding_commitcheck')
                                        .html(_t.autograding_commit_checkbox)))
                                .append($('<span />').attr('class','APURI APURI_popup_close').html('<i class="fa fa-times-circle" aria-hidden="true"></i>').on('click', _.closeScoringPopup))
                                .on('click',_.preventPopupClose).hide();
                        return el;
                    },
                    toggleAutogradingCommitcheck() {
                        let _ = APURI.views.gradingSummary;
                        let val = $('#APURI_autograding_commitcheck').is(':checked');
                        if (val) {
                            $('#APURI_autograding_commit').removeClass('disabled');
                        } else {
                            $('#APURI_autograding_commit').addClass('disabled');                            
                        }
                        _.updateValuesAndView();
                    },
                    commitAutograding() {
                        let check = $('#APURI_autograding_commitcheck').is(':checked'); 
                        if (!check) {
                            // interrupt is not checked
                            return;
                        }
                        $('#scoreTable td.proposalGrade').each((index, el) => {
                            let $el = $(el);
                            let grade = $el.html();
                            let inputField = $el.next().children('input.gradingText');
                            if (inputField.val() !== '')
                                return; // do not overwrite!
                            inputField.val(grade);
                            APURI.grading.storeGradeElement(grade, inputField);
                            inputField.trigger('input'); // save
                        });
                    },
                    toggleGrade() {
                        let _ = APURI.views.gradingSummary;
                        _.showGrades = !_.showGrades;
                        $('#APURI_autograding_togglegrade').html(APURI.text.autograding_togglegrade[_.showGrades?0:1]);
                        _.updateValuesAndView();
                        return false;
                    },
                    updateValuesAndView() {
                        let _ = APURI.views.gradingSummary;
                        _.setTotalMaxScore($('#APURI_autograding_maxscore').val());
                        _.setMinScore($('#APURI_autograding_minscore').val());

                        if ($('.APURI_proposal').length == 0) {
                            $('<th />').attr('class','APURI proposalHeader APURI_proposal').html(APURI.text.autograding_scoretable_header[_.showGrades?0:1])
                            .insertAfter('#scoreTable tr th.sumHeader');
                            $('#scoreTable tr td.totalScore').after($('<td />').attr('class','APURI proposalGrade APURI_proposal').html("-"));                            
                        }
                        $('.proposalHeader').html(APURI.text.autograding_scoretable_header[_.showGrades?0:1]);
                        if (_.showGrades) {
                            $('#APURI_autograding_opentable').show();
                            $('#APURI_autograding_commit').show();
                        } else {
                            $('#APURI_autograding_opentable').hide();
                            $('#APURI_autograding_commit').hide();
                        }
                        $('.proposalGrade').each((i,el) => {
                            let $el = $(el);
                            let score = parseInt($el.prev().html(), 10);
                            if (_.showGrades) {
                                $el.html(_.getGradeFromScore(score));
                            } else {
                                $el.html((score*100/_.totalMaxScore).toFixed(1)+" %");    
                            }
                        }); 
                    },
                    setTotalMaxScore(value) {
                        let _ = APURI.views.gradingSummary;
                        let _t = APURI.text;
                        let maxFieldError = function(syy) {
                            syy = syy || "";
                            $("#APURI_autograding_maxscore").addClass("APURIfielderror").attr('title', syy);
                        }
                        let maxFieldMinorError = function(syy) {
                            syy = syy || "";
                            $("#APURI_autograding_maxscore").addClass("APURIfieldminor").attr('title', syy);
                        }
                        let maxFieldOk = function() {
                            $("#APURI_autograding_maxscore").removeClass("APURIfielderror").removeClass("APURIfieldminor").attr('title', '');
                        }
                        let maxScore = parseInt(value,10);
                        if (isNaN(maxScore)) {
                            maxFieldError(_t.autograding_minscorefield_parseerror)
                            return;
                        }
                        if (maxScore < 1) {
                            maxFieldError(_t.autograding_maxscore_negative);
                            return;
                        }
                        if (typeof _.calcMaxScore !== 'undefined' && 
                            _.calcMaxScore > 0 &&
                            maxScore > _.calcMaxScore) {
                            maxFieldMinorError(_t.autograding_maxscore_toolarge.replace("%d", _.calcMaxScore));
                        }
                        maxFieldOk();
                        _.totalMaxScore = maxScore;
                        Cookies.set(_.getCurrentUuid()+'APURI_autograding_maxScore', _.totalMaxScore);
                    },
                    setMinScore(value = null) {
                        let _t = APURI.text;
                        let minFieldError = function(syy) {
                            syy = syy || "";
                            $("#APURI_autograding_minscore").addClass("APURIfielderror").attr('title', syy);
                        }
                        let minFieldMinorError = function(syy) {
                            syy = syy || "";
                            $("#APURI_autograding_minscore").addClass("APURIfieldminor").attr('title', syy);
                        }
                        let minFieldOk = function() {
                            $("#APURI_autograding_minscore").removeClass("APURIfielderror").removeClass("APURIfieldminor").attr('title', '');
                        }
                        let _ = APURI.views.gradingSummary;
                        if (value === '' || value === null || typeof value === 'undefined')
                            value = APURI.settings.local.autograding_defaultMinGrade;
                        let minscore = 0;
                        let minscoreStr = '';
                        if (typeof value === 'string') {
                            let percentStr = /^\s*(\d+(?:[,.]\d+)?)\s*%\s*/;
                            let pointStr = /^\s*(\d+(?:[,.]\d+)?)\s*p?\s*/;
                            let resultset = percentStr.exec(value);
                            if (resultset !== null && typeof resultset[1] !== 'undefined') {
                                // percent value
                                let max = _.totalMaxScore;
                                if (typeof max !== 'number' || isNaN(max)) {
                                    max = _.getCalculativeTotalMaxscore();
                                }
                                minscore = parseFloat(resultset[1])/100*max;
                                if (isNaN(minscore)) {
                                    minFieldError(_t.autograding_minscorefield_parseerror);                                    
                                    return;
                                }
                                minscoreStr = resultset[1]+"%";
                            } else {
                                resultset = pointStr.exec(value);
                              
                                if (resultset !== null && typeof resultset[1] !== 'undefined') {
                                    minscore = parseFloat(resultset[1]);
                                    if (isNaN(minscore)) {
                                        minFieldError(_t.autograding_minscorefield_parseerror);                                    
                                        return;
                                    }
                                    minscoreStr = minscore;
                                } else {
                                    minFieldError(_t.autograding_minscorefield_parseerror);
                                    return;
                                }
                            }
                        } else if (typeof value === 'number') {
                            minscore = value;
                        } else {
                            minFieldError(_t.autograding_minscorefield_parseerror);                            
                        }
                        if (minscore > _.totalMaxScore) {
                            minFieldError(_t.autograding_minscorefield_toolarge.replace("%d", _.totalMaxScore));
                            return;
                        }
                        if (minscore < 0) {
                            minFieldError(_t.autograding_minscorefield_negative);
                            minscore = 0;
                        }
                        minFieldOk();
                        _.minScore = minscore;
                        _.minScoreStr = minscoreStr;
                        Cookies.set(_.getCurrentUuid()+'APURI_autograding_minScore', _.minScoreStr);
                    },
                    openScoringPopup() {
                        let _ = APURI.views.gradingSummary;
                        $('body').on('click', _.closeScoringPopup);
                        $('#APURI_autograding_popup').show();
                        _.updateValuesAndView();
                        return false;
                    },
                    closeScoringPopup() {
                        let _ = APURI.views.gradingSummary;
                        if (!_.doNotClosePopup) {
                            $('#APURI_autograding_popup').hide();
                            $('body').off('click', _.closeScoringPopup);
                        }
                    },
                    preventPopupClose() {
                        let _ = APURI.views.gradingSummary;
                        _.doNotClosePopup = true;
                        setTimeout(x => {
                            _.doNotClosePopup = false;
                        },0);                        
                    },
                    getCalculativeTotalMaxscore() {
                        let _ = APURI.views.gradingSummary;
                        if (_.calcMaxScore) {
                            return _.calcMaxScore;
                        }                        
                        if (APURI.views.gradingSummary.currentExam) {
                            let last = APURI.grading.constructMaxScores(APURI.views.gradingSummary.currentExam).pop();
                            if (last) {
                                _.calcMaxScore = last.totalMaxScore;
                                return last.totalMaxScore;
                            } 
                        } 
                        return undefined;
                    },
                    getMinScore() {
                        let _ = APURI.views.gradingSummary;
                        if (_.minScore) {
                            return _.minScore;
                        } else {
                            _.setMinScore(Cookies.get(_.getCurrentUuid()+'APURI_autograding_minScore'));
                            return _.minScore;
                        }
                    },
                    getTotalMaxScore() {
                        let _ = APURI.views.gradingSummary;
                        if (_.totalMaxScore && !isNaN(_.totalMaxScore)) {
                            return _.totalMaxScore;
                        }
                        let gradingMaxScore = parseInt(Cookies.get(_.getCurrentUuid()+'APURI_autograding_maxScore'));
                        if (typeof gradingMaxScore !== 'undefined' || gradingMaxScore !== null || !isNaN(gradingMaxScore)) {
                            _.totalMaxScore = gradingMaxScore;
                            return gradingMaxScore
                        }  else {
                            let calc = APURI.views.gradingSummary.getCalculativeTotalMaxscore();
                            Cookies.set(_.getCurrentUuid()+'APURI_autograding_maxScore', calc);
                            return _.totalMaxScore = parseInt(calc, 10);
                        }
                    },
                    getGradeFromScore(score) {
                        let _ = APURI.views.gradingSummary;
                        let grades = APURI.settings.grades;
                        if (score < _.minScore)
                            return grades[0];
                        else if (score >= _.totalMaxScore)
                            return grades[grades.length-1];
                        // console.log("Testiarvosanaindeksi 1>", (score-_.minScore)/(_.totalMaxScore-_.minScore)*(grades.length-1)+1); 
                        return grades[Math.floor((score-_.minScore)/(_.totalMaxScore-_.minScore)*(grades.length-1)+1)];
                    },
                    createGradeTableArray() {
                        let _ = APURI.views.gradingSummary;
                        let lastGrade = APURI.settings.grades[0]; // ei oteta hylättyä huomioon
                        let result = new Array();
                        result.push({limit: 0, grade: APURI.settings.grades[0]}); // lisätään hylätty - jakaumaa varten
                        for (let i = Math.floor(_.minScore); i <= _.totalMaxScore; i++) {
                            let currentGrade = _.getGradeFromScore(i);
                            if (currentGrade !== lastGrade) {
                                lastGrade = currentGrade;
                                result.push({limit: i, grade: currentGrade});
                            }
                        }
                        return result;
                    },
                    addDistributionToGradetable(values) {
                        let elList = $('td.totalScore');
                        let sum = 0;
                        let count = elList.length;
                        elList.each((index, el) => {
                            let score = parseInt($(el).html()); 
                            sum += score;
                            let i=1;
                            for (; i<values.length; i++) {
                                if (score < values[i].limit) {
                                    if (typeof values[i-1].count === 'number') {
                                        values[i-1].count++;
                                    } else {
                                        values[i-1].count = 1;
                                    }
                                    break;
                                }
                            }
                            if (i===values.length) { // tapaus 10
                                if (typeof values[i-1].count === 'number') {
                                    values[i-1].count++;
                                } else {
                                    values[i-1].count = 1;
                                }
                            }
                        });
                        let average = sum / count;
                        return {
                            gradetable: values,
                            average: average
                        }

                    },
                    createGradeTableElement(values) {
                        let _ = APURI.views.gradingSummary;                        
                        let {average, gradetable} = _.addDistributionToGradetable(values);
                        let _t = APURI.text;
                        let el = $('<table />')
                                .append($('<tr />')
                                    .append(
                                        $('<th />').html(_t.autograding_gradingtable_grade), 
                                        $('<th />').html(_t.autograding_gradingtable_limit),
                                        $('<th />').html(_t.autograding_gradingtable_count)
                                    ));
                        for (let val of gradetable) {
                            let trEl = $('<tr />')
                            .append(
                                $('<td />').html(val.grade),
                                $('<td />').html(val.limit));
                            if (typeof val.count === 'number') 
                                trEl.append(
                                    $('<td />').html(val.count).attr('class','APURI_gradedistcount'));
                            val.count = val.count || 0;
                            for (let i = 0; i<val.count; i++) {
                                trEl.append($('<td />').attr('class', 'APURI_gradedistblock').html('x'));
                            }
                            el.append(trEl);                                
                        }
                        return $('<div />')
                                .append(el)
                                .append($('<div />').html(_t.autograding_gradingtable_average.replace('%average', average.toFixed(1)).replace('%grade', _.getGradeFromScore(average.toFixed(1)))));
                    },
                    openGradingTableModal() {
                        let _ = APURI.views.gradingSummary;                        
                        let grading = _.createGradeTableArray();
                        APURI.ui.openModalWindow((div)=> {
                            div.append(_.createGradeTableElement(grading));
                            return div;
                        }, null, null, {diffuse: true});
                        return false;
                    },
                    createImportFilePopupElement() {
                        let _ = APURI.views.gradingSummary;
                        let _t = APURI.text;
                        let el = $('<div />').attr('id', 'APURI_importcsv_popup')
                            .append($('<span />').html(_t.importcsv_popup_fileinfo))
                            .append($('<input />').attr('type', 'file').attr('accept','.csv').attr('id','APURI_importcsv_selector'))
                            .append($('<button />').attr('class', 'APURI APURI_sendcsv').html(_t.importcsv_popup_button).on('click', _.triggerImport))
                            .append($('<div />').attr('id', 'APURI_importcsv_error').hide())
                            .append($('<span />').attr('class','APURI APURI_popup_close').html('<i class="fa fa-times-circle" aria-hidden="true"></i>').on('click', _.closeImportFilePopup))
                            .on('click', _.preventImportFilePopupClose).hide();
                        return el;
                    },
                    openImportFilePopup() {
                        let _ = APURI.views.gradingSummary;
                        $('#APURI_importcsv_popup').show();
                        $('body').on('click', _.closeImportFilePopup);
                        return false;
                    },
                    closeImportFilePopup() {
                        let _ = APURI.views.gradingSummary;
                        if (!_.doNotCloseImportPopup) {
                            $('#APURI_importcsv_popup').hide();
                            $('body').off('click', _.closeImportFilePopup);
                        }
                    },
                    preventImportFilePopupClose() {
                        let _ = APURI.views.gradingSummary;
                        _.doNotCloseImportPopup = true;
                        setTimeout(x => {
                            _.doNotCloseImportPopup = false;
                        }, 5);
                    },
                    csvLoadError(msg = '') {
                        $('#APURI_importcsv_error').show().html(msg);
                    },
                    csvLoadOk() {
                        $('#APURI_importcsv_error').hide().html('');
                    },
                    triggerImport() {
                        let _ = APURI.views.gradingSummary;
                        let _t = APURI.text;
                        let fileselector = document.getElementById('APURI_importcsv_selector');
                        if (typeof fileselector === 'undefined' || fileselector === null || typeof fileselector.files === 'undefined')
                            return; // some kind of error
                        let file = fileselector.files[0];
                        var reader = new FileReader();
                        reader.readAsText(file);
                        reader.onload = function(event){
                            var csv = event.target.result;
                            let data = _.parseCsvToData(csv);
                            if (data == null) {
                                _.csvLoadError(_t.importcsv_error_format);
                            } else {
                                _.openImportPreviewModal(data);
                            }
                            _.csvLoadOk();
                            _.doNotCloseImportPopup = false;
                            _.closeImportFilePopup();
                        }
                        reader.onerror = function(){ _.csvLoadError(_t.importcsv_error_file); console.log('Unable to read ' + file.fileName); };
                    },
                    parseCsvToData(csv) {
                        let data = JqueryCsv.toArrays(csv, {separator:';'})
                        if (typeof data === 'undefined' || data === null) {
                            return null;
                        } else if (typeof data[0] === 'string') {
                            // not right separator
                            data = JqueryCsv.toArrays(csv, {separator:','})
                            if (typeof data === 'undefined' || data === null) {
                                return null;
                            }
                        }
                        let result = new Array();
                        const gradeCol = data[0].length-1;
                        const slackRows = 2; /* otsikkorivien + maksimipisterivien määrä */ 
                        const answerIdCol = 0;
                        const nameCol = 1;
                        const emailCol = 2;
                        for (let i=slackRows; i<data.length; i++) {
                            let row = data[i];
                            if (typeof row !== 'object') {
                                break; // something is very wrong
                            }
                            result.push({answerPaperId: parseInt(row[answerIdCol]),name: row[nameCol], email: row[emailCol], grade: row[gradeCol]});
                        }
                        return result;
                    },
                    generateImportData(data, reviewObj) {
                        let result = new Array();
                        for (let row of data) {
                            for (let student of reviewObj) {
                                let name = student.lastName + " "+student.firstNames;
                                if (name === row.name && ((student.email || "") === (row.email || "")) &&
                                    (row.answerPaperId != null?row.answerPaperId === student.answerPaperId:true)) {                                    
                                    row.studentUuid = student.studentUuid;
                                    row.answerPaperId = student.answerPaperId;
                                    if ((student.gradingText||"") !== "" && student.gradingText !== row.grade) {
                                        row.conflict = true;
                                        row.oldValue = student.gradingText;
                                    }
                                    if (student.gradingText === row.grade) {
                                        row.nochange = true;
                                    }                                    
                                    result.push(row)
                                    break;
                                } else {
                                }
                            }
                        }
                        return result;
                    },
                    commitImport(data) {
                        $('#scoreTable input.gradingText').each((index, el) => {
                            let $inputField = $(el);
                            let studentUuid = $inputField.attr('data-student-uuid');
                            let answerId = parseInt($inputField.attr('data-answer-paper-id'));
                            for (let row of data) {

                                if (row.answerPaperId === answerId && row.studentUuid === studentUuid) {
                                    if ((row.conflict == null || row.conflict === false) 
                                        && (row.nochange == null || row.nochange === false)) {// undefined tai FALSE 
                                            // Muutos JA ei konfliktia
                                            $inputField.val(row.grade);
                                            APURI.grading.storeGradeElement(row.grade, $inputField);
                                            $inputField.trigger('input');
                                    }
                                    
                                    break;
                                }                                
                            }
                        });
                    },
                    createCsvPreviewElement(importdata = null) {
                        let el = $('<div />');
                        let _t = APURI.text;
                        if (importdata !== null && importdata.length > 0) {
                            el = el.html(_t.importcsv_preview_info);
                            let tableEl = $('<table />')
                                            .append($('<tr />')
                                                .append($('<th />').html(_t.importcsv_preview_name))
                                                .append($('<th />').html(_t.importcsv_preview_grade))
                                                .append($('<th />').html(_t.importcsv_preview_oldgrade)));
                            for (let inputRow of importdata) {
                                let rowEl = $('<tr />')
                                    .append($('<td />').html(inputRow.name))
                                    .append($('<td />').html(inputRow.grade));
                                if (inputRow.conflict) {
                                    rowEl.append($('<td />').html(inputRow.oldValue)).addClass('APURI_import_conflictrow');
                                }
                                if (inputRow.nochange) {
                                    rowEl.addClass('APURI_importcsv_nochange');
                                }
                                tableEl.append(rowEl);    
                            }
                            el.append(tableEl);    
                        } else {
                            el = el.html(_t.importcsv_preview_nodata);
                        }
                        return el;
                    },
                    openImportPreviewModal(data) {
                        let _ = APURI.views.gradingSummary;
                        let _t = APURI.text;
                        let uuid = APURI.exam.getCurrentLocationUuid();
                        APURI.grading.loadGradingObject(uuid)
                            .then(function(grading) {
                                let importdata = _.generateImportData(data, grading);
                                APURI.ui.openModalWindow((div)=> {
                                    div.append(_.createCsvPreviewElement(importdata));
                                    return div;
                                }, (importdata !== null && importdata.length > 0?_t.importcsv_preview_commit:'OK'),
                                    function() {
                                        _.commitImport(importdata);
                                        APURI.ui.closeModalWindow();
                                    } 
                                , {closeOnBlur: true});
        
                            });                        
                        return false;
                    },
                    show: function () {

                        let _ = APURI.views.gradingSummary;
                        let _t = APURI.text;
                        let gradingInfo = $('#gradingInfo');
                                                this.counter++;
						if ($('#gradingInfo .APURI_download').length === 0) {
							let link = $('<a />').attr('href', '#').html(APURI.text.load_csv_link);
							link[0].onclick = APURI.grading.loadCsvTrigger;                        
                            $('<div />').attr('class','printLinkWrapper APURI APURI_download').append(link).appendTo(gradingInfo);
                            $('<div />').attr('class', 'printLinkWrapper APURI  APURI_importcsv_trigger').append(
                                $('<a />').attr('href', '#').html('<i class="fa fa-upload" aria-hidden="true"></i> '+ _t.importcsv_open_popup).on('click',_.openImportFilePopup),
                                _.createImportFilePopupElement())
                                .appendTo(gradingInfo);
                            $('<div />').attr('class', 'printLinkWrapper APURI  APURI_autograding_trigger').append(
                                $('<a />').attr('href', '#').html('<i class="fa fa-tachometer" aria-hidden="true"></i> '+APURI.text.autograding_open_popup).on('click',_.openScoringPopup),
                                _.createScoringPopupHtml())
                                .appendTo(gradingInfo);
						}
                                                let header = $('th.sumHeader');
                                                
                                                if (this.currentExam !== null && header.length > 0 && !header.attr('title')) {
                                                    let last = APURI.grading.constructMaxScores(this.currentExam).pop();
                                                    if (last) {
                                                        header.attr('title', APURI.text.total_max_points.replace("%d", last.totalMaxScore));
                                                    }
                                                }
                                                if (this.counter > 10) {
                                                    clearInterval(this.initTimer);
                                                }
                    }
                },
                grading:{
                    initTimer: null,
                    answers: null,
                    commentsAll: null,
                    /**
                     * Rakenne tälle Map[id] = {questionId, comments: []}
                     * @type type
                     */
                    commentsByQuestion: new Map(),

                    loadComments(questionId = null) {
                        return new Promise((resolve, reject) => {
                            let uuid = APURI.exam.getCurrentLocationUuid();
                            APURI.grading.loadGradingObject(uuid, true).then(function(answers) {
                                            APURI.views.grading.answers = answers;
                                            let comments = APURI.grading.getAllComments(answers);
                                            APURI.views.grading.commentsAll = comments;
                                            if (questionId !== null) {
                                                let qComments = APURI.grading.getAllComments(answers, id);
                                                APURI.views.grading.commentsByQuestion.set(questionId, {
                                                    questionId: questionId,
                                                    comments: qComments
                                                });
                                            }
                                            resolve(comments);
                                })
                                .catch((err)=>{
                                    console.log("ERROR", err);
                                    reject(err);
                                });
                            
                        });
                    },
                    init() {
                        APURI.util.osBrowserDetect();
                        let uuid = APURI.exam.getCurrentLocationUuid();
                        APURI.exam.loadExam(uuid).then(exam => {
                                let ids = APURI.exam.getQuestionIds(exam);
                                APURI.grading.loadGradingObject(uuid, true).then(function(answers) {
                                    APURI.views.grading.answers = answers;
                                    for (let id of ids) {
                                        let comments = APURI.grading.getAllComments(answers, id);
                                        APURI.views.grading.commentsByQuestion.set(id, {
                                                    questionId: id,
                                                    comments: comments
                                                });
                                    }
                                })
                                .catch((err)=>{
                                    console.log("ERROR", err);
                                    reject(err);
                                });                                
                        });
                        APURI.views.grading.loadComments().then(x => {
                            
                        });                        
   
                        // TODO kesken
                    },
                    show: function () {
//                        let answerBoxes = document.querySelectorAll(APURI.ytle.grading_answertext);
                        let answerBoxes = document.querySelectorAll(".answer-text-container .answerText");
                        if (answerBoxes !== null && answerBoxes.length > 0) {
                            let config = {attributes: false, childList: true};
                            let callback = function(mutationList) {
                                for (let mutation of mutationList) {
                                    if (mutation.type == 'childList') {
                                        for (let child of mutation.addedNodes) {
                                            if (child.className === "add-annotation-popup") {
                                                //$(child).attr('style','top: 98.5px !important;');
                                                // search for input field
                                                let inputNode = null;
                                                for (let subchild of child.children) {
                                                    if (subchild.className === 'add-annotation-text') {
                                                        inputNode = subchild;
                                                        break;
                                                    }
                                                }
                                                let questionId = $(child).closest('.answer').attr('data-question-id');
                                                questionId = parseInt(questionId);
                                                let el = $('<div />').attr('style','').attr('class','APURI_comment_container').appendTo(child);
                                                APURI.views.grading.loadComments().then(x => {

                                                    // set of showed comments
                                                    let commentSet = new Set();
                                                    let questionComments = APURI.views.grading.commentsByQuestion.get(questionId);
//                                                    console.log("Question comm", questionComments);
                                                    if (questionComments !== null && typeof questionComments !== 'undefined') {
                                                        for (let comm of questionComments.comments) {
                                                            if (commentSet.size > 6) break;
                                                            commentSet.add(comm.message);
                                                        }
                                                    }

                                                    // jos tilaa, niin lisää globaaleja
                                                    for (let comm of APURI.views.grading.commentsAll) {
                                                        if  (commentSet.size > 6)  break;
                                                        commentSet.add(comm.message);
                                                    }
          
                                                    let counter = 0;
                                                    let activeHandler = function(e) {
                                                        //console.log("DEBUG Keyact", e);
                                                        let allComm = $(".APURI_comment_container .APURI_comment");
                                                        let active = null;
                                                        switch(e.which) {
                                                                case 38: // up                                                                  
                                                                    active = $(".APURI_comment_active").removeClass("APURI_comment_active") 
                                                                            .prev(".APURI_comment"). addClass("APURI_comment_active");
                                                                    if (active.size() == 0)
                                                                        $(".APURI_comment_container .APURI_comment").last(). addClass("APURI_comment_active");
                                                                break;

                                                                case 40: // down
                                                                    active = $(".APURI_comment_active").removeClass("APURI_comment_active") 
                                                                            .next(".APURI_comment"). addClass("APURI_comment_active");
                                                                    if (active.size() == 0)
                                                                        $(".APURI_comment_container .APURI_comment").first(). addClass("APURI_comment_active");
                                                                break;
                                                                
                                                                case 13: // enter
                                                                active = $(".APURI_comment_active").trigger("mousedown").removeClass("APURI_comment_active");
                                                                if (active.size() > 0)
                                                                    e.stopImmediatePropagation();
                                                                
                                                                break;

                                                                case 27: // esc
                                                                    active = $(".APURI_comment_active").removeClass("APURI_comment_active");
                                                                    // e.preventDefault();
                                                                    if (active.size() > 0)
                                                                        e.stopImmediatePropagation();
                                                                   
                                                                break;

                                                                default: return; // exit this handler for other keys
                                                            }                                                    
                                                    };
                                                    $(inputNode).on("keyup", activeHandler);
                                                    for (let comm of commentSet) {
                                                        (function(inputField, text, num) {              
                                                            let clickHandler = function() {
  //                                                              console.log("Click", inputField, text);
                                                                if (inputNode.value === "") {
                                                                    inputNode.value = text;                                                                
                                                                } else {
                                                                    if (inputNode.value.endsWith(" / ")) {
                                                                        inputNode.value += text;
                                                                    } else {
                                                                        inputNode.value += ' / '+text;
                                                                    }
                                                                }
                                                                return false;
                                                            };
                                                            if (APURI.settings.local.enableReviewKeyboardShortcuts && counter < 8) {
                                                                $(inputNode).on("keydown", event => {
                                                                   if (event.altKey === true && event.shiftKey === false && event.ctrlKey ===false && event.which === 49+num) {
                                                                       clickHandler();
                                                                   }
                                                                });
                                                            }
                                                            let commEl = $('<div/>').attr('class','APURI_comment').html(APURI.shortenText(comm,50)).on('mousedown',clickHandler).appendTo(el);
                                                            if (comm.length > 50 || APURI.settings.local.enableReviewKeyboardShortcuts) {
                                                                //commEl.append($('<span />').attr('class', 'APURI_comment_tooltip').html((comm.length > 50?comm+" ":"")+(APURI.settings.local.enableReviewKeyboardShortcuts && counter < 7?"(Alt-"+(counter+1)+")":"")));
                                                                commEl.attr('title', (comm.length > 50?comm+" &#13;":"")+(APURI.settings.local.enableReviewKeyboardShortcuts && counter < 7?"(näppäinoikotie Alt-"+(counter+1)+")":""));
                                                            }
                                                        })(inputNode, comm, counter);
                                                        counter++;
                                                    }
                                                    let currTop = parseInt(child.style.top);
                                                    if (currTop-(25*commentSet.size) < -120) {
                                                        child.style.top = (currTop-(25*commentSet.size))+"px";
                                                    } else {
                                                        child.style.top = (currTop+75)+"px";
                                                    }                                                                                                  
                                                }).catch(err => {
                                                    console.log("ERROR on loading comments",err)
                                                });

                                            }
                                        }
                                    }
                                    //console.log("MUTATION", mutation);
                                }
                            }
                                                 
                            for (let box of answerBoxes) {
                                let wholeAnswer = $(box).closest('.answer');
                                let answerId = wholeAnswer.attr('data-answer-id');
                                let questionId = APURI.grading.getQuestionByAnswer(APURI.views.grading.answers ,answerId);
                                wholeAnswer.attr('data-question-id', questionId);
                                let obs = new MutationObserver(callback);
                                obs.observe(box, config);
                            }
                            
                         clearInterval(this.initTimer);
      //                   console.log("DEBUG Trigger clear");
                        }
                            


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
                        //console.log("Field change triggered on", event);
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
                        //console.log("Sanitize request for FIELD", field);
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
                                    .html('<i class="fa fa-times-circle" aria-hidden="true"></i>')
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
                                    .html('<i class="fa fa-times-circle" aria-hidden="true"></i>')
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
                            //TESTING REMOVE THE NEXT LINE
                            //$('<div />').append($('<p />').html('KOPIOTESTI').click(APURI.testExamAttachmentCopyTrigger)).appendTo('#page-content');
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
                                    .html('<i class="fa fa-times-circle" aria-hidden="true"></i>')
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
                if (typeof viewObj.init === 'function') {
                    viewObj.init();
                }
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

if (typeof APURILoader === 'undefined') {
    var APURILoader = {

            css: "https://klo33.github.io/abixapuri/src/abixapuri.css",
            ckeditor: "https://klo33.github.io/javascript/ckeditor/ckeditor.js",
            sortableR: "https://klo33.github.io/javascript/Sortable",
            jqueryR: "https://oma.abitti.fi/libs/jquery/dist/jquery.min",
            jquerycsvR: "https://klo33.github.io/javascript/jquery.csv.min",
            cookiesR: "https://klo33.github.io/javascript/js.cookie.min"
        };
} else {
    if (typeof APURILoader.check !== 'string' 
            || APURI.util.checksum(APURILoader.check)!=='cIFxnbWbRfbDzwwjKmwZOIpXe+SaTq64q2wEHEgXVVU') {
        APURILoader = {};
    }
}
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



	APURI.examImportQuestion = function(event) {
                var doImport = function(current, question) {
                    if (typeof current !== 'undefined' && typeof current.examUuid !== 'undefined') {
                        //console.log('Loaded successfully current');
                        // Prepare question
                        var largestId = APURI.findLargestId(current);
                        //console.log("Largest id "+ largestId+" Next: set ids");
                        APURI.exam.traverseSetId(question, largestId+1);
                        //TODO luottaa, että sections[0] olemassa
                        if (typeof current.content.sections[0] === 'undefined') {
                            current.content.sections[0] = {
                                questions: []
                            };
                        }
                        current.content.sections[0].questions.push(question);
                        // reorganize displaynumbers
                        //console.log('DisplayNumber setting');
                        APURI.exam.traverseDisplayNumber(current, 1);
                        //console.log('Trying saving');
                        APURI.examSaveCurrent(current);
                        //console.log('...');
                    }
                };
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
                        let links = APURI.util.getLinksToAttachments(JSON.stringify(question).replace(/\\"/g,'"').replace(/\\'/g, "'"));
                        if (typeof examObj.attachments !== 'undefined' && examObj.attachments.length > 0 
                                && typeof links === 'object' && links !== null && links.length > 0) {
                            let attachmentsProposed = APURI.attachments.matchLists(links, examObj.attachments);
                            APURI.examImportCurrent(function (currentExam) {

                                let attachmentsToImport = APURI.attachments.matchLists(attachmentsProposed.matched, currentExam.attachments);
                                // import ONLY the attachments NOT currently found
                                attachmentsToImport = attachmentsToImport.nonmatched;
                                APURI.attachments.copyAttachments(examObj.examUuid, currentExam.examUuid, attachmentsToImport)
                                        .then(function() {
                                            doImport(currentExam, question);
                                })
                                        .catch(function(err) {
//                                            console.log("Failed to import attachments", err);
//                                            console.log("Question import proceed anyway");
                                            doImport(currentExam, question);
                                });
                                
                                // TODO DO the actual import
                                // TODO do we need if check - and do the import only if list is non-empty??
                                // in other words does the Promise of empty resolve immediatly?
                            });
                        } else {
                            // No nothing to import
                            APURI.examImportCurrent(function(current){
                                doImport(current, question);
                            });
                        }
                    } else {
//                            console.log("Failed to find question");
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
//			console.log("Not loading "+upper_a.class);
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
                                if (section.title != null)
                                    secli.append($('<h2 />').html(section.title));
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
                            console.debug("SORTABLE GROUP:",sortable.options.group.name, sortable.options.group)
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
                            APURI.exam.traverseSetId(APURI.questionsort.bufferSaved, 0);
                            APURI.exam.traverseDisplayNumber(APURI.questionsort.bufferSaved, 1);
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
                                    .html('<i class="fa fa-times-circle" aria-hidden="true"></i>')
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
                                let atlinkkivar = $('<div />').attr('apuri-attachment-warning-for',repname).attr('class','APURI http-link-warning').html(APURI.text.attachment_link_warning).hide();
                                if (APURI.util.linkDetector(x[i].value)) {
                                    linkkivar.show();
                                }
                                linkkivar = x[i].parentNode.appendChild(linkkivar[0]);
                                atlinkkivar = x[i].parentNode.appendChild(atlinkkivar[0]);
                                //linkkivar.style.visibility = 'hidden';
                                APURI.replacedFields.list[repname]={field:x[i], savedIndicator:paivitystoken, emptyQuestionWarning: tyhjakysvar, httpLinkWarning: linkkivar, attachmentLinkWarning: atlinkkivar};
                                //console.log(".");
                                // TODO pitäisikö nimen paikalla olla itse elementti x[i] ??
				var elem = CKEDITOR.replace(x[i], {
				
					extraPlugins: 'base64image,mathjax,htmlwriter,abittiimage',
					mathJaxLib: 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js?config=TeX-AMS_HTML',
					height: heightVal[x[i].getAttribute('class')],
					fileBrowserUploadUrl: 'base64',
					extraAllowedContent: 'script[!sec *]; video[*] source[*];',
                                        allowedContent: true,
                                        entities_latin:false,
                                        entities_greek:false,
                                        toolbar: [
		{ name: 'clipboard', items: [ 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo' ] },
		{ name: 'links', items: [ 'Link', 'Unlink' ] },
		{ name: 'insert', items: [ 'base64image', 'Mathjax', 'Table', 'HorizontalRule', 'SpecialChar', 'abittiimg' ] },
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
//                                                                                console.log("Change->update", inner_elem);                                                                                
                                                                                let content = APURI.filterLinebreaks(inner_elem.getData());
                                                                                inner_elem.setData(content, {internal: true, noSnapshot:true});
                                                                                inner_elem.element.value = content;
                                                                                inner_elem.updateElement();
										APURI.paivkent(inner_elem.name, content); });
					inner_elem.on('keyup',  function(src, event) {
										//console.log(typeof src + " " + typeof event);
//                                                                                console.log("KeyUp->update", inner_elem);
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
APURI.settings.uris = APURILoader;
/**
 * Koetehtäväeditorinäkymä
 */
(function() {
                if (document.body.getAttribute("class")!=='lapa') // varmista, että ollaan YTL:n kokeessa
                    return;
        APURI.ui.appendCSS(APURI.settings.uris.css);
       	APURI.loadScriptDirect(APURI.settings.uris.ckeditor,
//       	APURI.loadScriptDirect('https://localhost/cke/ckeditor.js',
            function() {
                
            }
        );
//        APURI.loadScriptDirect(APURI.settings.uris.fontawesome);
        APURI.initView(APURI.views.attachmentsPoller, 30000);
        requirejs.config({
            paths: {
                'Sortable': APURI.settings.uris.sortableR
            }
        });
        require(['Sortable'], function (Sortable){
                        window.Sortable = Sortable; // exports
                });
        APURI.initView(APURI.views.examview);
        APURI.initView(APURI.views.ckeAbiximageInfo);
        APURI.initView(APURI.views.examviewBoxes, 2000);
        APURI.util.bittiniiloDetector.init();
        APURI.initView(APURI.views.attachmentLinkReplace, 1000);        
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
									// Kopioidaan liitteet
                                                                        if (origData.attachments.length > 0) {
//                                                                            console.log("Kokeessa on liitteitä -> yritetään kopioida");
                                                                            APURI.ui.showAttachmentCopy();
                                                                            APURI.attachments.copyAttachments(origUuid, uudenUuid)
                                                                                    .then(filenames => {
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
    APURI.ui.appendCSS(APURI.settings.uris.css);
//    APURI.loadScriptDirect(APURI.settings.uris.fontawesome);
//    APURI.grading.initGradingCount();
    APURI.initView(APURI.views.grading);
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
    APURI.ui.appendCSS(APURI.settings.uris.css);
//    APURI.loadScriptDirect(APURI.settings.uris.fontawesome);
    requirejs.config({
        paths: {
            'Cookies': APURI.settings.uris.cookiesR,
            'jquery': APURI.settings.uris.jqueryR,
            'jquery-csv': APURI.settings.uris.jquerycsvR
        },
        shim: {
            'jquery-csv': ['jquery']
        }
    });
    require(['Cookies', 'jquery', 'jquery-csv'], function (Cookies, $){
                    window.Cookies = Cookies; // exports
                    window.JqueryCsv = $.csv;
            });


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
    APURI.ui.appendCSS(APURI.settings.uris.css);
//    APURI.loadScriptDirect(APURI.settings.uris.fontawesome);
    APURI.initView(APURI.views.extensionWarning);
    APURI.initView(APURI.views.examlist);
    APURI.initView(APURI.views.footer, 2000);
    APURI.util.bittiniiloDetector.init();
})();