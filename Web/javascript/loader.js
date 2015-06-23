var Configuration = null;

var Loader =
{
	LoadedScriptsDatabase:null,
	loadScript:function(location, callback)
	{
		if(Loader.LoadedScriptsDatabase == null || Loader.LoadedScriptsDatabase == undefined)
		{
			Loader.LoadedScriptsDatabase = new Map();
		}

		if(this.LoadedScriptsDatabase.get(location) == undefined || this.LoadedScriptsDatabase.get(location) == false)
		{
			this.LoadedScriptsDatabase.set(location, true);
			$.getScript(location, callback);
		}
	}
}

$(document).ready(function()
{
	ajax.get("configuration.txt", function(x)
	{
		var Configuration = new ConfigurationParser();
		Configuration.setFile(x);
		Configuration.refresh();

		Loader.loadScript("javascript/Windows/window.js", function(data, status, httpreq)
		{
			winInit();
			var WelcomeWindow = new Window(new Size(640, 480), new Point(64, 0));
			WelcomeWindow.setTitle("Welcome!");
			ajax.get("hypertext/welcome.php", function(x)
			{
				WelcomeWindow.setText(x);
			});

			$("head").append('<link rel="stylesheet" type="text/css" href="css/main.css">');
		});

		Loader.loadScript("javascript/Launcher/launcher.js", function(data, status, httpreq)
		{
			Launcher.init();
			Launcher.open();
		});
	});
});
