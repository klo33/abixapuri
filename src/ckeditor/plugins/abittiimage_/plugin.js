CKEDITOR.plugins.add( 'abittiimage', {
    icons: 'abittiimg16',
    init: function( editor ) {
        //Plugin logic goes here.
		editor.addCommand('abittiimg', new CKEDITOR.dialogCommand('abittiimgDialog'));
		editor.ui.addButton('Kuva liitteist&auml;', {
			label: 'Lis&auml;&auml; kuva kokeen liitetiedostoista',
			command: 'abittiimg',
			toolbar: 'insert'
		});
		CKEDITOR.dialog.add('abittiimgDialog', this.path + 'dialogs/abittiimg.js');
    }
});