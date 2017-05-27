/*
 * Base64Audio Plugin for CKEditor (http://github.com/nmmf/base64image)
 * Created by ALL-INKL.COM - Neue Medien M�nnich - 04. Feb 2014
 * Licensed under the terms of GPL, LGPL and MPL licenses.
 */
CKEDITOR.plugins.add("base64audio", {
	lang 	: 	["af","ar","bg","bn","bs","ca","cs","cy","da","de","el","en","en-au","en-ca","en-gb","eo","es","et","eu","fa","fi","fo","fr","fr-ca","gl","gu","he","hi","hr","hu","id","is","it","ja","ka","km","ko","ku","lt","lv","mk","mn","ms","nb","nl","no","pl","pt","pt-br","ro","ru","si","sk","sl","sq","sr","sr-latn","sv","th","tr","ug","uk","vi","zh","zh-cn"],
	requires: 	"dialog",
	icons	:	"base64audio",
	hidpi	:	true,
    init	: 	function(editor){
					var pluginName = 'base64audioDialog';
					
					editor.ui.addButton("base64audio", {
						label: "Äänitiedosto", //editor.lang.common.sound,
						command: pluginName,
						toolbar: "insert"
					});
					CKEDITOR.dialog.add(pluginName, this.path+"dialogs/base64audio.js");
					
					var allowed = 'audio[controls,!src]',
						required = 'audio[controls,src]';
					
					editor.addCommand( pluginName, new CKEDITOR.dialogCommand( pluginName, {
						allowedContent: allowed,
						requiredContent: required,
						/*contentTransformations: [
							[ 'img{width}: sizeToStyle', 'img[width]: sizeToAttribute' ],
							[ 'img{float}: alignmentToStyle', 'img[align]: alignmentToAttribute' ]
						]*/
					} ) );
					editor.on("doubleclick", function(evt){
						if(evt.data.element && !evt.data.element.isReadOnly() && evt.data.element.getName() === "audio") {
							evt.data.dialog = pluginName;
							editor.getSelection().selectElement(evt.data.element);
						}
					});
					if(editor.addMenuItem) {
						editor.addMenuGroup("base64audioGroup");
						editor.addMenuItem("base64audioItem", {
							label: "Äänitiedosto", //editor.lang.common.image,
							icon: this.path+"icons/base64audio.png",
							command: pluginName,
							group: "base64audioGroup"
						});
					}
					if(editor.contextMenu) {
						editor.contextMenu.addListener(function(element, selection) {
							console.log(element);
							if(element && element.getName() === "audio") {
								editor.getSelection().selectElement(element);
								return { base64imageItem: CKEDITOR.TRISTATE_ON };
							}
							return null;
						});
					}
				}
});
