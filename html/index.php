<?php

require_once("common.php");

printHeader("Home", array("index.css", "http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css"));

?>

<div class="jumbotron text-center">
  <h1>UR Planner</h1>
  <p>Please select your desired majors and minors below.</p>
</div>

<div class="container">

  <div class="row">

    <div class="col-sm-6">
      <div class="panel panel-primary">
      
        <div class="panel-heading">
          <label for="majorChooser">Major(s)</label>
        </div>
        
        <div class="panel-body">
          <div class="form-group">
            <div class="input-group">
              <input type="text" class="form-control" id="majorChooser">
              <span class="input-group-btn">
                <button id="majorChooserAddBtn" class="btn btn-default" type="button"><span class="glyphicon glyphicon-plus"></span></button>
              </span>
            </div><!-- /input-group -->
          </div><!-- /form-group -->
        </div>
        
        <ul id="majorList" class="list-group">
        </ul>
      </div>
    </div>

    <div class="col-sm-6">
      <div class="panel panel-primary">
      
        <div class="panel-heading">
          <label for="minorChooser">Minor(s)</label>
        </div>
        
        <div class="panel-body">
          <div class="form-group">
            <div class="input-group">
              <input type="text" class="form-control" id="minorChooser">
              <span class="input-group-btn">
                <button id="minorChooserAddBtn" class="btn btn-default" type="button"><span class="glyphicon glyphicon-plus"></span></button>
              </span>
            </div><!-- /input-group -->
          </div><!-- /form-group -->
        </div>
        
        <ul id="minorList" class="list-group">
        </ul>
      </div>
    </div>
  </div>

  <div class="text-center">
      <button id="continueBtn" class="btn btn-success btn-lg" type="button">Continue</button>

  </div>

</div>

<?php

printFooter(array("http://code.jquery.com/ui/1.10.3/jquery-ui.js", "index.js"));

?>
