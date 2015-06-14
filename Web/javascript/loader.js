$(document).ready(function()
{
	$("head").append('<link rel="stylesheet" type="text/css" href="css/main.css">');
	$.getScript("javascript/Windows/window.js", function(data, status, httpreq)
	{
		winInit();
		var WelcomeWindow = new Window(new Size(640, 480), new Point(64, 0));
		WelcomeWindow.setTitle("Welcome!");
		ajax.get("hypertext/welcome.php", function(x)
		{
			WelcomeWindow.setText(x);
		});
	});
});