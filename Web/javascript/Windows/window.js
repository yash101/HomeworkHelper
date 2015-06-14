var winInit = function()
{
	WindowServer.init();
	$("head").append('<link rel="stylesheet" type="text/css" href="css/Windows/window.css">');
};

var Size = function(x, y)
{
	if(x == null || y == null || x == undefined || y == undefined)
	{
		this.x = 0;
		this.y = 0;
	}
	else
	{
		this.x = x;
		this.y = y;
	}
};

Size.prototype.getWidth = function()
{
	return this.x;
};

Size.prototype.getHeight = function()
{
	return this.y;
};

Size.prototype.setWidth = function(width)
{
	this.x = width;
};

Size.prototype.setHeight = function(height)
{
	this.y = height;
};

var Point = function(x, y)
{
	if(x == null || y == null || x == undefined || y == undefined)
	{
		this.x = 0;
		this.y = 0;
	}
	else
	{
		this.x = x;
		this.y = y;
	}
};

Point.prototype.getX = function()
{
	return this.x;
};

Point.prototype.getY = function()
{
	return this.y;
};

Point.prototype.setX = function(x)
{
	this.x = x;
};

Point.prototype.setY = function(y)
{
	this.y = y;
};

var Window = function(size, position)
{
	if(size == null || position == null || size == undefined || position == undefined)
	{
		this.size = new Size(0, 0);
		this.position = new Point(0, 0);
	}
	else
	{
		this.size = size;
		this.position = position;
	}

	this.windowNum = WindowServer.CurrentWindow;
	WindowServer.CurrentWindow++;

	this.windowFrame = $(".WindowLocation #Window0").clone().prop(
	{
		id: "Window" + this.windowNum
	});
	this.windowFrame.appendTo(".WindowLocation");

	document.querySelectorAll(".WindowLocation #Window" + this.windowNum)[0].style.display = "block";

	document.querySelectorAll(".WindowLocation #Window" + this.windowNum)[0].style.width = this.size.getWidth() + 8 + "px";
	document.querySelectorAll(".WindowLocation #Window" + this.windowNum)[0].style.height = this.size.getHeight() + 8 + 24 + 16 + "px";
	document.querySelectorAll(".WindowLocation #Window" + this.windowNum)[0].style.top = this.position.getY() + "px";
	document.querySelectorAll(".WindowLocation #Window" + this.windowNum)[0].style.left = this.position.getX() + "px";

	WindowServer.OpenWindows.set(this.windowNum, this);

	this.mouseDown = false;
	this.lastPoint = new Point(0, 0);
	// this.pos = new Point(0, 0);
	// this.startPos = new Point(0, 0);

	//Drag and drop of the window
	$(".WindowLocation #Window" + this.windowNum + " .titlebar .moveHandle").on("mousedown", {arg1: this.windowNum}, function(x)
	{
		WindowServer.OpenWindows.get(x.data.arg1).mouseDown = true;
		WindowServer.OpenWindows.get(x.data.arg1).lastPoint = new Point(x.pageX, x.pageY);
	}).on("mouseup", {arg1: this.windowNum}, function(x)
	{
		WindowServer.OpenWindows.get(x.data.arg1).mouseDown = false;
	}).on("mousemove", {arg1: this.windowNum}, function(x)
	{
		if(WindowServer.OpenWindows.get(x.data.arg1).mouseDown)
		{
			var win = WindowServer.OpenWindows.get(x.data.arg1);
			//Find the distance the mouse was moved
			var transmat = new Point(x.pageX - WindowServer.OpenWindows.get(x.data.arg1).lastPoint.getX(), x.pageY - WindowServer.OpenWindows.get(x.data.arg1).lastPoint.getY());
			WindowServer.OpenWindows.get(x.data.arg1).lastPoint = new Point(x.pageX, x.pageY);
			WindowServer.OpenWindows.get(x.data.arg1).setPosition(new Point(win.getPosition().getX() + transmat.getX(), win.getPosition().getY() + transmat.getY()));
		}
	}).on("mouseleave", {arg1: this.windowNum}, function(x)
	{
		WindowServer.OpenWindows.get(x.data.arg1).mouseDown = false;
	});

	//Closing the window
	$(".WindowLocation #Window" + this.windowNum + " .titlebar .xButton").on("click", {arg1: this.windowNum}, function(x)
	{
		$(".WindowLocation #Window" + x.data.arg1).remove();
		WindowServer.OpenWindows.remove(x.data.arg1);
	});

	//Resizing the window
	$(".WindowLocation #Window" + this.windowNum).resizable();
};

Window.prototype.setPosition = function(pos)
{
	this.position = pos;
	document.querySelectorAll(".WindowLocation #Window" + this.windowNum)[0].style.top = this.position.getY() + "px";
	document.querySelectorAll(".WindowLocation #Window" + this.windowNum)[0].style.left = this.position.getX() + "px";
};

Window.prototype.setSize = function(sz)
{
	this.size = sz;
	document.querySelectorAll(".WindowLocation #Window" + this.windowNum)[0].style.width = this.size.getWidth() + "px";
	document.querySelectorAll(".WindowLocation #Window" + this.windowNum)[0].style.height = this.size.getHeight() + "px";
};

Window.prototype.getPosition = function()
{
	return this.position;
};

Window.prototype.getSize = function()
{
	return this.size;
};

Window.prototype.setTitle = function(title)
{
	document.querySelectorAll(".WindowLocation #Window" + this.windowNum + " .titlebar .tLabel")[0].innerHTML = title;
};

Window.prototype.setIcon = function(css)
{
	document.querySelectorAll(".WindowLocation #Window" + this.windowNum + " .titlebar .iIcon")[0].style.backgroundImage = css;
};

Window.prototype.setText = function(text)
{
	document.querySelectorAll(".WindowLocation #Window" + this.windowNum + " .content")[0].innerHTML = text;
};

var WindowServer =
{
	OpenWindows:null,
	CurrentWindow:1,
	DefaultWindowSize:null,
	DefaultWindowPosition:null,
	init:function()
	{
		WindowServer.OpenWindows = new Map();
		WindowServer.CurrentWindow = 1;
		WindowServer.DefaultWindowSize = new Size(100, 100);
		WindowServer.DefaultWindowPosition = new Point(0, 0);
	}
};