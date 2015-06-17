var Launcher =
{
	isOpen:false,
	init:function()
	{
		$("head").append("<link rel=\"stylesheet\" type=\"text/css\" href=\"css/launcher.css\">");
		$(".launcher #startButton").click(function(e)
		{
			Launcher.isOpen = !Launcher.isOpen;
			if(Launcher.isOpen)
			{
				Launcher.open();
			}
			else
			{
				Launcher.close();
			}
		});
	},
	open:function()
	{
		Launcher.isOpen = true;
		document.querySelectorAll(".LaunchScreen")[0].style.top = "0px";
		document.querySelectorAll(".LaunchScreen")[0].style.bottom = "0px";
	},
	close:function()
	{
		Launcher.isOpen = false;
		document.querySelectorAll(".LaunchScreen")[0].style.top = "-100%";
		document.querySelectorAll(".LaunchScreen")[0].style.bottom = "100%";
	}
};
