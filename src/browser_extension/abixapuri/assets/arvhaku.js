var tableToExcel = (function () {
            var uri = 'data:application/vnd.ms-excel;charset=utf-8;base64,',
			template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
			base64 = function (s) { return window.btoa(unescape('%EF%BB%BF'+encodeURIComponent(s))) },
			format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) }
                return function (table, name) {
	$(".scorePoints").each(function() {$(this).replaceWith($(this).val());})					
                if (!table.nodeType) table = document.getElementById(table)
var	tableHTML = table.outerHTML.replace(/<span data-i18n=\"arpa\.points_suffix\">p<\/span>/g,"p");
	tableHTML = tableHTML.replace(/<td>/g,"<td style='mso-number-format:\"\@\"'>");
	tableHTML = tableHTML.replace(/<td id/g,"<td style='mso-number-format:\"0\"' id");
	tableHTML = tableHTML.replace(/<td class="mean/g,"<td style='mso-number-format:\"0\.00\"' class=\"mean");	
                var ctx = { worksheet: name || 'Worksheet', table: tableHTML };
                window.location.href = uri + base64(format(template, ctx));
				function odota() {location.reload(true);}
				setTimeout(odota, 10000);
            }		
        })()

$(document).ready(function() {	
	$( "#footer" ).before( '<p style="text-align: center;"><button class="upload-button medium-sa-button" onclick="tableToExcel(\'scoreTable\', \'Pisteet\')">Excel</button></p>' );
        });