<html>
  <head>
    <title>SERVER</title>
  </head>
  <body>
    <p>SERVER</p>
    <p><?php print_r($_SERVER["REQUEST_METHOD"]);?></p>
    <p>KEY = <?php if(isset($_POST["key"])) { print_r($_POST["key"]); }else{ print_r("NULL");} ?></p>
    <p>KEY = <?php if(isset($_POST["name"])) { print_r($_POST["name"]); }else{ print_r("NULL");} ?></p>
  </body>
</html>
