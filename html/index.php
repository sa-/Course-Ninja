<?php

require_once("common.php");

printHeader("Home", array("css/flick/jquery-ui-1.10.4.custom.min.css", "css/index.css"));
printJumbotron('Pick your majors and minors below to <span class="nobr">get started.</span>');

?>

<div class="container js-fade-on-reset-home">

  <div class="row">

    <div class="col-sm-6">
      <div class="panel panel-default">
      
        <div class="panel-heading">
          <label for="majorChooser">Majors</label>
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
      <div class="panel panel-default">
      
        <div class="panel-heading">
          <label for="minorChooser">Minors</label>
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
  
  <div class="row">
    <div class="col-sm-4 col-sm-offset-4 col-xs-8 col-xs-offset-2">
      <div class="well">
          <button id="continueBtn" class="btn btn-primary btn-lg btn-block" type="button">Continue</button>
          <button id="resetBtn" class="btn btn-default btn-lg btn-block" type="button">Reset</button>
      </div>
    </div>
  </div>

</div>

<div id="modalNothingSelected" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
        <h4 class="modal-title" id="myModalLabel">Uh oh!</h4>
      </div>
      <div class="modal-body">
        You haven't picked anything! Please select at least one major or minor.
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" data-dismiss="modal">Got it!</button>
      </div>
    </div>
  </div>
</div>

<?php

printFooter(array("js/jquery-ui-1.10.4.custom.min.js", "js/index.js"));

?>
