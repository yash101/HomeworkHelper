$(document).ready(function()
{
	$("head").append('<link rel="stylesheet" type="text/css" href="css/main.css">');
	$.getScript("javascript/framework.js", function(data, status, httpreq)
	{
	});
	$.getScript("javascript/Windows/window.js", function(data, status, httpreq)
	{
		winInit();
		var x = new Window(new Size(320, 240), new Point(100, 100));
	});
});