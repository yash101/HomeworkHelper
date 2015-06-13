//AJAX functions
var ajax =
{
	asynchronous:true,
	timeout:8000,
	get:function(location, callback)
	{
		var request = new XMLHttpRequest();
		request.onreadystatechange = function()
		{
			if(request.readyState == 4)
			{
				if(callback != null && callback != undefined)
				{
					callback(request.responseText);
				}
			}
		};

		request.timeout = timeout;
		request.open("GET", location, asynchronous);
		request.send();
	},
	post:function(location, data, callback)
	{
		var request = new XMLHttpRequest();
		request.onreadystatechange = function()
		{
			if(request.readyState == 4)
			{
				if(callback != null && callback != undefined)
				{
					callback(request.responseText)
				}
			}
		};

		request.timeout = timeout;
		request.open("POST", location, asynchronous);
		request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		request.send(data);
	}
}

//Configuration file parser
var ConfigurationParser = function(data)
{
	this.file = data;
	if(this.file != undefined && this.file != null)
	{
		this.refresh();
	}
};

ConfigurationParser.prototype.setFile = function(data)
{
	this.file = data;
};

ConfigurationParser.prototype.getFile = function()
{
	return this.file;
};

ConfigurationParser.prototype.get = function(key)
{
	return this.map.get(key);
};

ConfigurationParser.prototype.set = function(key, value)
{
	this.map.set(key, value);
};

ConfigurationParser.prototype.refresh = function()
{
	var mp = new Map();
	var lines = this.file.split('\n');
	for(var i = 0; i < lines.length; i++)
	{
		lines[i] = lines[i].split('#')[0];
		lines[i].trim();
		var values = lines[i].split('=');
		if(values.length == 1)
		{
			mp.set(decodeURI(values[0]), "");
		}
		else
		{
			mp.set(decodeURI(values[0]), decodeURI(values[1]));
		}
	}
	this.map = mp;
};

ConfigurationParser.prototype.flush = function()
{
	var f = "";
	this.map.forEach(function(value, key)
	{
		f += encodeURI(key) + "=" + encodeURI(value) + "\n";
	});
	this.file = f;
};

ConfigurationParser.prototype.getMap = function()
{
	return this.map;
};

var Layout = function()
{	
}

Layout.prototype.showHeader = function()
{}

Layout.prototype.showSidebar = function()
{}

Layout.prototype.showContent = function()
{}

Layout.prototype.showFooter = function()
{}

Layout.prototype.showWindow = function()
{}
