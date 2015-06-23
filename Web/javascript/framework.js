//AJAX functions
var Ajax = function()
{
	this.asynchronous = true;
	this.timeout = 8000;
};

Ajax.prototype.get = function(location, callback)
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

	request.timeout = this.timeout;
	request.open("GET", location, this.asynchronous);
	request.send();
};

Ajax.prototype.post = function(location, data, callback)
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

	request.timeout = this.timeout;
	request.open("POST", location, this.asynchronous);
	request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	request.send(data);
};

var ajax = new Ajax();

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

	//****Reimplementation may occur in the future. Just leaving this here.

	// for(var i = 0; i < lines.length; i++)
	// {
	// 	lines[i].trim();
	// 	//Get rid of the comments
	// 	if(lines[i].indexOf('#') == 0) continue;
	// 	else lines[i] = lines[i].substring(0, lines[i].indexOf('#'));

	// 	var key = lines[i].substring(0, lines[i].indexOf(':') - 1);
	// 	var value = "";
	// 	if(!(lines[i].indexOf(':') < 0 || lines[i].indexOf(':') > lines[i].length))
	// 	{
	// 		value = lines[i].substring(indexOf(':') + 1, lines[i].length);
	// 	}

	// 	key.trim();
	// 	value.trim();
	// 	if(key[0] == '\"' && key[key.length] == '\"') key = key.substring(1, key.length - 1);
	// 	if(value[0] == '\"' && value[value.length] == '\"') value = value.substring(1, value.length - 1);

	// 	console.log("[" + key + "]->[" + value + "]");

	// 	mp.set(key, value);
	// }

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

ConfigurationParser.prototype.tryBool = function(key)
{
	var ans = this.map.get(key).toLowerCase();
	return ans == "1" || ans == "yes" || ans == "true" || ans == "y" || ans == "t";
}