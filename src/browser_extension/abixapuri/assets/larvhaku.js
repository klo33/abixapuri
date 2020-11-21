var tableToExcel = (function () {
            var uri = 'data:application/vnd.ms-excel;charset=utf-8;base64,',
			template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
			base64 = function (s) { return window.btoa(unescape('%EF%BB%BF'+encodeURIComponent(s))) },
			format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) }
                return function (table, name) {
	$(".gradingText").each(function() {$(this).replaceWith($(this).val());})
$('a[class="answerPaperLink"]').contents().unwrap();
                if (!table.nodeType) table = document.getElementById(table)
var	tableHTML = table.outerHTML.replace(/<td/g,"<td style='mso-number-format:\"\@\"'");	
                var ctx = { worksheet: name || 'Worksheet', table: tableHTML };
                window.location.href = uri + base64(format(template, ctx));
				function odota() {location.reload(true);}
				setTimeout(odota, 10000);
            }		
        })()

$(document).ready(function() {	
	$( "#scoreScroller" ).before( '<button class="upload-button medium-sa-button" onclick="tableToExcel(\'scoreTable\', \'Arvosanat\')">Excel</button>' );
        });