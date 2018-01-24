CKEDITOR.dialog.add('abittiimgDialog', function(editor) {
	CKAPURI = {
		attachmentsPath: "/exam-api/exams/%sourceId/attachments",
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
					},
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
					}
	};
	return {
		title: 'Linkki liitetiedostoon',
		minWidth: 400,
		minHeight: 200,
		contents: [{
			id: 'tab-basic',
			label: 'Liitetiedoston valinta',
			elements: [
			{
				type: 'html',
				id: 'info',
				html: '<p>Valitse liitetiedosto listasta hiirellä. Tarvittaessa nimeä linkki ja paina ok</p>'
			},
			{
					type: 'html',
					id: 'fileselection',
					html: '<div><div id="APURI_attachments"><a href="">Testi</a> Ladataan liitetiedostoja...</div></div>',
					onShow: function( a ) {
						// simulate loading a JSON
						var currentUuid = CKAPURI.getCurrentLocationUuid();
						var attachmentPath = CKAPURI.attachmentsPath.replace("%sourceId",currentUuid);	
						var container = this;
						/* // FOR TESTING PURPOSES static info
						var content = [{"storageKey":"attachment_53d38371-da11-4eba-bbba-541842a688f9_kuvaaja-y_x.png","displayName":"kuvaaja-y_x.png","mimeType":"image/png","size":15997}, {"storageKey":"attachment_53d38371-da11-4eba-bbba-541842a688f9_kuvaaja-y_x.png","displayName":"kuvaaja-video.mp4","mimeType":"video/mp4","size":15997}];
						*/
						// Fetch with AJAX the real attachments-info
						CKAPURI.getJson(attachmentPath).then(
							function(content) {
						//window.setTimeout(function() {
						console.log("Content", content);
							let inner = "<p><ul>";
							for (let i=0; i<content.length; i++) {
								inner += `<li style='cursor: pointer; padding-bottom:0.5em !important;'><a style='cursor:pointer !important' href='#' onclick='return false' data-filename='${content[i].displayName}' data-mime='${content[i].mimeType}'>${content[i].displayName}</a></li>`;
							}
							inner += '</ul></p>';
							let element = CKEDITOR.document.getById(container.domId);
							element.setHtml(inner);
							let res = element.getElementsByTag('a');
							console.log("result", res);
							for (let i=0; i<res.count(); i++) {
								res.getItem(i).on('click', function(e) {
								console.log("innertrigger",e);
								var dialog = container.getDialog();
								dialog.setValueOf('tab-basic','filename',e.sender.getAttribute("data-filename"));
								dialog.setValueOf('tab-basic','mime',e.sender.getAttribute("data-mime"));
								//var dialog = this.getDialog();
								//dialog.hide();
								//dialog._.editor.insertHtml( this.html );
								}, container );
							}
							
						});	
						//},2000); 
						console.log("onLoad");
						console.log(a);
						console.log(this);
						console.log(CKEDITOR.document.getById('fileselection'));
						//CKEDITOR.document.getById(this.domId).on('click', function(e) {
							//console.log(e);
							//var dialog = this.getDialog();
							//dialog.hide();
							//dialog._.editor.insertHtml( this.html );
						//}, this );
					}
					
				},
				{
					type: 'text',
					id: 'alttext',
					label: 'Linkin teksti'
				},{
					type: 'text',
					id: 'filename',
					label: 'Liitetiedoston nimi',
					validate: CKEDITOR.dialog.validate.notEmpty("Linkki ei voi olla tyhjä")
				},{
					type: 'text',
					id: 'mime',
					label: 'MimeType'
				}
				
			]
		}],
		onOk: function() {
			var dialog = this;
			var mimeType = dialog.getValueOf('tab-basic', 'mime');
			var linkAddress = '/attachments/'+dialog.getValueOf('tab-basic', 'filename');
			var altText = dialog.getValueOf('tab-basic', 'alttext');
			var tag;
			if (mimeType.startsWith("image/")) {
				tag = editor.document.createElement('img');
				tag.setAttribute('src', linkAddress);
				tag.setAttribute('alt', altText);				
			} else if (mimeType.startsWith("video/")) {
				tag = editor.document.createElement('video');
				tag.setAttribute('controls','true');
				let sourcetag = editor.document.createElement('source');
				sourcetag.setAttribute('src', linkAddress);
				sourcetag.setAttribute('type', mimeType);
				sourcetag.appendTo(tag);
			} else if (mimeType.startsWith("audio/")) {
				tag = editor.document.createElement('audio');
				tag.setAttribute('controls','true');
				let sourcetag = editor.document.createElement('source');
				sourcetag.setAttribute('src', linkAddress);
				sourcetag.setAttribute('type', mimeType);
				sourcetag.appendTo(tag);
			} else {
				tag = editor.document.createElement('a');
				tag.setAttribute('href', linkAddress);
				tag.appendText(altText);
			}
			editor.insertElement(tag);
		}
	}
});