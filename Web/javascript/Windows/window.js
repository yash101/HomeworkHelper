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

	document.querySelectorAll(".WindowLocation #Window" + this.windowNum)[0].style.width = this.size.getWidth() + 8 + "px";
	document.querySelectorAll(".WindowLocation #Window" + this.windowNum)[0].style.height = this.size.getHeight() + 8 + 24 + 16 + "px";
	document.querySelectorAll(".WindowLocation #Window" + this.windowNum)[0].style.top = this.position.getY() + "px";
	document.querySelectorAll(".WindowLocation #Window" + this.windowNum)[0].style.left = this.position.getX() + "px";

	WindowServer.OpenWindows.set(this.windowNum, this);

	var startP = this.position;
	this.mouseDown = false;

	$(".WindowLocation #Window" + this.windowNum + " .titlebar .moveHandle").on("mousedown", {arg1: this.windowNum}, function(x)
	{
		var win = WindowServer.OpenWindows.get(x.data.arg1);
		WindowServer.OpenWindows.get(x.data.arg1).mouseDown = true;
		var startX = WindowServer.OpenWindows.get(x.data.arg1).startX - x.pageX;
		var startY = WindowServer.OpenWindows.get(x.data.arg1).startY - x.pageY;
	}).on("mouseup", {arg1: this.windowNum}, function(x)
	{
		WindowServer.OpenWindows.get(x.data.arg1).mouseDown = false;
	}).on("mousemove", {arg1: this.windowNum}, function(x)
	{
		if(WindowServer.OpenWindows.get(x.data.arg1).mouseDown)
		{
			var pt = new Point(x.pageX - WindowServer.OpenWindows.get(x.data.arg1).startX, x.pageY - WindowServer.OpenWindows.get(x.data.arg1).startY);
			var newpos = new Point(WindowServer.OpenWindows.get(x.data.arg1).position.getX() + pt.getX(), WindowServer.OpenWindows.get(x.data.arg1).position.getY() + pt.getY());
			WindowServer.OpenWindows.get(x.data.arg1).position = newpos;
			document.querySelectorAll(".WindowLocation #Window" + WindowServer.OpenWindows.get(x.data.arg1).windowNum)[0].style.top = WindowServer.OpenWindows.get(x.data.arg1).position.getY() + "px";
			document.querySelectorAll(".WindowLocation #Window" + WindowServer.OpenWindows.get(x.data.arg1).windowNum)[0].style.left = WindowServer.OpenWindows.get(x.data.arg1).position.getX() + "px";
		}
	});
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
	document.querySelectorAll(".WindowLocation #Window" + this.windowNum)[0].style.width = this.size.getWidth() + 8 + "px";
	document.querySelectorAll(".WindowLocation #Window" + this.windowNum)[0].style.height = this.size.getHeight() + 8 + 24 + 16 + "px";
}

Window.prototype.getPosition = function()
{
	return this.position;
}

Window.prototype.getSize = function()
{
	return this.size;
}

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