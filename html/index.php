<html>

<head>
	<title>Course Planner</title>
	<meta charset="utf-8">

    <link rel="stylesheet" href="index.css" type = "text/css">
	<link rel="stylesheet" href="http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css">
	
	<script src="http://code.jquery.com/jquery-1.9.1.js"></script>
	<script src="http://code.jquery.com/ui/1.10.3/jquery-ui.js"></script>
	<script src="index.js"></script>
</head>

	<body>
		<div >
			<h1><img src="res/UofRshield.png" alt="shield" style="margin-top:20px;float:left;margin-left:35%;">
				<span class="border">UR Planner<br></span></h1>
			</div>
			<br>

			<div class="checker">

				<div>
					<div style="width:50%; float:left;">
						<label>Major(s): </label><br>
						<input id="majorChooser" type = "text"/>
						<button type="button" onClick="addMajor(document.getElementById('majorChooser').value)">Add</button>
					</div>

					<div id="majorList" style="width:50%; float:left;">
						<ul><li> .</li></ul>
					</div>
				</div>

				<br>

				<div>
					<div style="width:50%; float:left;">
						<label>Minor(s): </label><br>
						<input id="minorChooser" type = "text"/>
						<button type="button" onClick="addMinor(document.getElementById('minorChooser').value)">Add</button>
					</div>

					<div id="minorList" style="width:50%; float:left;">
						<ul><li>.</li></ul>
					</div>

				</div>

				<br><br><br>

				<button type="button" onClick="continueToNextPage()">Continue</button>

			</div>

		</body>
</html>
