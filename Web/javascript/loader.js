$(document).ready(function()
{
	$("head").append('<link rel="stylesheet" type="text/css" href="css/main.css">');
	$.getScript("javascript/framework.js", function(data, status, httpreq)
	{
	});
	$.getScript("javascript/Windows/window.js", function(data, status, httpreq)
	{
		winInit();
	});
});