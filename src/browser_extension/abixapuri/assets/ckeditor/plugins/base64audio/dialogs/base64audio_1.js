/**
 * Created by Janne Cederberg, 04. Feb 2015, based on:
 * 
 * Created by ALL-INKL.COM - Neue Medien Muennich - 04. Feb 2014
 * Licensed under the terms of GPL, LGPL and MPL licenses.
 */
CKEDITOR.dialog.add("base64audioDialog", function(editor){
	
	var t = null, selectedAudio = null, audioPreviewElem = null;
	
	/* Check File Reader Support */
	function fileSupport() {
		var r = false, n = null;
		try {
			if(FileReader) {
				var n = document.createElement("input");
				if(n && "files" in n) r = true;
			}
		} catch(e) { r = false; }
		n = null;
		return r;
	}

	var fsupport = fileSupport();
	
	/* Load preview image */
	function audioPreviewLoad(s) {
		
		/* no preview */
		if(typeof(s) != "string" || !s) {
			audioPreviewElem.getElement().setHtml("");
			return;
		}
		
		/* Create audio */
		var au = new Audio();
		
		/* Display loading text in preview element */
		audioPreviewElem.getElement().setHtml("Loading...");
		
		/* When audio is loaded */
		au.addEventListener('loadeddata', function() {
			
			/* Remove preview */
			audioPreviewElem.getElement().setHtml("");
			this.id = editor.id+"previewaudio";
			this.controls = 'controls';

			/* Insert audio preview */
			try {
				var p = audioPreviewElem.getElement().$;
				if(p) p.appendChild(this);
			} catch(e) {}
		});
		
		/* Error Function */
		au.onerror = function(){ audioPreviewElem.getElement().setHtml(""); };
		au.onabort = function(){ audioPreviewElem.getElement().setHtml(""); };
		
		/* Load audio */
		au.src = s;
	}
	
	/* Change input values and preview image */
	function audioPreview(src) {
		
		/* Remove preview */
		audioPreviewElem.getElement().setHtml("");
			
		/* Read file and load preview */
		var fileI = t.getContentElement("tab-source", "file");
		var n = null;
		try { n = fileI.getInputElement().$; } catch(e) { n = null; }
		if(n && "files" in n && n.files && n.files.length > 0 && n.files[0]) {
			if("type" in n.files[0] && !n.files[0].type.match("audio.*")) return;
			if(!FileReader) return;
			audioPreviewElem.getElement().setHtml("Loading...");
			var fr = new FileReader();
			fr.onload = (function(f) { return function(e) {
				//audioPreviewElem.getElement().setHtml("");
				audioPreviewLoad(e.target.result);
			}; })(n.files[0]);
			fr.onerror = function(){ audioPreviewElem.getElement().setHtml(""); };
			fr.onabort = function(){ audioPreviewElem.getElement().setHtml(""); };
			fr.readAsDataURL(n.files[0]);
		}
	};

	if(fsupport) {
		
		/* Dialog with file and url image source */
		var sourceElements = [
			{
				type: "hbox",
				widths: ["70px"],
				children: [
					/*{
						type: "html",
						id: "filecheckbox",
						style: "margin-top:5px",
						label: editor.lang.common.upload+":"
					},*/
					{
						type: "file",
						id: "file",
						label: "Lataa äänitiedosto koneeltasi",
						onChange: function(){ audioPreview("file"); },
					}
				]
			},
			{
				type: "html",
				id: "preview",
				html: new CKEDITOR.template('<audio controls="controls"></audio>').output()
			}
		];
		
	}
	
	/* Dialog */
    return {
		title: 'Äänitiedoston lisäys', //editor.lang.common.image,
        minWidth: 450,
        minHeight: 180,
		onLoad: function(){
			alert('Tämä toiminto toimii tällä hetkellä oikein valitettavasti vain Chrome-selaimella!');
			
			if(fsupport) {
				
				/* Get checkboxes */
				//fileCB = this.getContentElement("tab-source", "filecheckbox");
				
				/* Checkbox Events */
				//fileCB.getInputElement().on("click", function(){ audioPreview("file"); });
				
			}
			
			/* Get audio preview element */
			audioPreviewElem = this.getContentElement("tab-source", "preview");

		},
		onShow: function(){

			t = this;
			
			/* Remove preview */
			audioPreviewElem.getElement().setHtml("");
			
			/* selected image or null */
			selectedAudio = editor.getSelection();
			if(selectedAudio) selectedAudio = selectedAudio.getSelectedElement();
			if(!selectedAudio || selectedAudio.getName() !== "audio") selectedAudio = null;
			
			/* Set input values */
			if(selectedAudio) {			
				if(typeof(selectedAudio.getAttribute("src")) == "string") {
					if(selectedAudio.getAttribute("src").indexOf("data:") === 0) {
						audioPreview("base64");
						audioPreviewLoad(selectedAudio.getAttribute("src"));
					}
				}
			}
			
		},
		onOk : function(){
			
			/* Get image source */
			var src = "";
			try { src = CKEDITOR.document.getById(editor.id+"previewaudio").$.src; } catch(e) { src = ""; }
			if(typeof(src) != "string" || src == null || src === "") return;
			
			/* selected audio or new audio */
			if(selectedAudio) var newAudio = selectedAudio; else var newAudio = editor.document.createElement("audio");
			newAudio.setAttribute("src", src);
			newAudio.setAttribute("controls", "controls");
			src = null;
			
			/* Insert new image */
			if(!selectedAudio) editor.insertElement(newAudio);

		},
		
		/* Dialog form */
        contents: [
            {
                id: "tab-source",
                label: editor.lang.common.generalTab,
                elements: sourceElements
            },
        ]
    };
});
