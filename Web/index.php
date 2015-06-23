<?php
//This is the main app homepage
?>

<!DOCTYPE html>
<html>
	<head>
		<title>HomeworkHelper | Homework Organization</title>

		<link rel="stylesheet" type="text/css" href="ext/jqueryui/jquery-ui.css">

		<script type="text/javascript" src="javascript/lib/jquery/jquery-1.11.3.js"></script>
		<script type="text/javascript" src="ext/jqueryui/jquery-ui.js"></script>
		<script type="text/javascript" src="javascript/framework.js"></script>
		<script type="text/javascript" src="javascript/loader.js"></script>
	</head>
	<body>
		<!--
			.WindowLocation (cheezy name, huh?) is where the Window Manager creates Windows.
		-->
		<div class="WindowLocation">

			<!--
				.Window is the default styling for windows.
				Window0 is a template window. When a new Window is requested, this is cloned into a new ID (
					Window1, Window2, ... ). This allows easier coding. Imagine having to code the entire Window in
					JavaScript! Ugh! Sounds like H*no somewhere where I'd not rather go.
			-->
			<div class="Window" id="Window0">
				<div class="titlebar">
					<div class="iIcon"></div>
					<div class="tLabel">Title</div>
					<div class="moveHandle"></div>
					<div class="mButton"></div>
					<div class="rButton"></div>
					<div class="xButton"></div>
				</div>
				<div class="content"></div>
				<div class="statusbar">
					<div class="resize"></div>
				</div>
			</div>
		</div>

		<div class="LaunchScreen">
			<div id="background"></div>
			<div id="window">
				<div id="toph">
					<div id="search"></div>
				</div>
			</div>
		</div>

		<div class="launcher">
			<div id="startButton" class="LauncherButton"></div>
		</div>

		<div class="Header">
		</div>

		<div class="MessageOverlay">
		</div>
	</body>
</html>