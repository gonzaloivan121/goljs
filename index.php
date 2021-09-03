<?php
  require_once "database.php";
  $saves = getSaves();
?>

<!DOCTYPE html>
<html>
  <head>
    <!--<meta name="viewport" content="width=device-width, initial-scale=0.86, user-scalable=no">-->
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Play Conway's Game of Life in a new reimagined way!">
    <script src="./js/libraries/jquery-3.3.1.min.js"></script>
    <script src="./js/libraries/bootstrap.bundle.min.js"></script>
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/3.6.0/mdb.min.css" rel="stylesheet" />
    <link rel="stylesheet" href="./css/styles.css">
    <link rel="stylesheet" href="./css/libraries/bootstrap.min.css">
    <title>G.O.L.js</title>
  </head>
  <body>

    <!-- START NAVBAR -->
    <header class="header">
      <nav class="navbar navbar-expand-lg fixed-top py-3">
        <div class="container"><a href="#" class="navbar-brand text-uppercase font-weight-bold">Game Of Life.js</a>
          <button type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"
            class="navbar-toggler navbar-toggler-right">
            <span class="material-icons">menu</span>
          </button>
    
          <div id="navbarSupportedContent" class="collapse navbar-collapse">
            <ul class="navbar-nav ml-auto">
              <li class="nav-item active"><a href="#" class="nav-link text-uppercase font-weight-bold">Home <span
                    class="sr-only">(current)</span></a></li>
              <li class="nav-item"><a href="#" class="nav-link text-uppercase font-weight-bold">About</a></li>
              <li class="nav-item"><a href="#" class="nav-link text-uppercase font-weight-bold">Gallery</a></li>
              <li class="nav-item"><a href="#" class="nav-link text-uppercase font-weight-bold">Portfolio</a></li>
              <li class="nav-item"><a href="#" class="nav-link text-uppercase font-weight-bold">Contact</a></li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
    <!-- END NAVBAR -->

    <!-- START CONTAINER -->
    <div class="container">
      <!-- START HEADER -->
      <div class="pt-5 text-white header-background">
        <header class="py-5 mt-5 text-center" style="margin-top: 9rem !important;">
          <h1 class="display-4">Game of Life</h1>
          <br>
          <p class="lead mb-0">Conway's Game of Life, also known as the Game of Life or simply Life, is a cellular automaton devised by the British
          mathematician John Horton Conway in 1970. It is the best-known example of a cellular automaton.
          
          The "game" is actually a zero-player game, meaning that its evolution is determined by its initial state, needing no
          input from human players. One interacts with the Game of Life by creating an initial configuration and observing how it
          evolves.</p>
        </header>
      </div>
      <!-- END HEADER -->

      <!-- START RANGE SLIDERS -->
      <div class="d-flex justify-content-center my-4 range-sliders" style="margin-bottom: 0 !important; margin-top: 3rem !important; justify-content: space-evenly !important;">
        <div class="range-group">
          <span class="font-weight-bold indigo-text mr-2 mt-1" style="color:white;">1</span>
          <form class="range-field w-25" style="text-align: center;">
            <label class="form-label" for="ups-range" style="color:white;">Updates Per Second</label>
            <div class="range">
              <input class="form-range" id="ups-range" type="range" min="1" max="60" />
            </div>
          </form>
          <span class="font-weight-bold indigo-text ml-2 mt-1" style="color:white;">60</span>
        </div>
        <br>
        <div class="range-group">
          <span class="font-weight-bold indigo-text mr-2 mt-1" style="color:white;">10</span>
          <form class="range-field w-25" style="text-align: center;">
            <label class="form-label" for="tile-size-range" style="color:white;">Tile Size</label>
            <div class="range">
              <input class="form-range" id="tile-size-range" type="range" min="10" max="150" step="10" />
            </div>
          </form>
          <span class="font-weight-bold indigo-text ml-2 mt-1" style="color:white;">150</span>
        </div>
      </div>
      <!-- END RANGE SLIDERS -->

      <!-- START CANVAS -->
      <div class="py-4 d-flex justify-content-center">
        <canvas id="golCanvas" width="450" height="450"></canvas>
      </div>
      <!-- END CANVAS -->
      <p class="lead mb-5" style="text-align: center; color: white;">Generation: <label id="generation">0</label></p>
    </div>
    <!-- END CONTAINER -->

    <!-- START ACTION MENU -->
    <div class="fab-container">
      <div class="fab shadow">
        <div class="fab-content">
          <span class="material-icons">add</span>
        </div>
      </div>
      <div class="sub-button shadow">
        <a data-toggle="tooltip" title="Save State" onclick="saveGameState()">
          <span class="material-icons">save</span>
        </a>
      </div>
      <div class="sub-button shadow">
        <span data-toggle="modal" data-target="#designModal">
          <a data-toggle="tooltip" title="Open Designs">
            <span class="material-icons">collections</span>
          </a>
        </span>
      </div>
      <div class="sub-button shadow">
        <a id="play-button" data-toggle="tooltip" title="Start Game" onclick="pauseGame()">
          <span class="material-icons">play_arrow</span>
        </a>
      </div>
      <div class="sub-button shadow">
        <a data-toggle="tooltip" title="Reset Game" onclick="resetGame()">
          <span class="material-icons">replay</span>
        </a>
      </div>
    </div>
    <!-- END ACTION MENU -->

    <!-- START DESIGN MODAL -->
    <div class="modal fade" id="designModal" tabindex="-1" role="dialog" aria-labelledby="designModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered design-modal" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="designModalLabel">Designs</h5>
            <div class="float-right search-container">
              <div class="form-outline">
                <span class="material-icons trailing" style="color: #989898;">search</span>
                <input type="text" id="searchSaves" class="form-control" oninput="searchSaves(this.value.toLowerCase())" />
                <label class="form-label" for="searchSaves">Search</label>
              </div>
            </div><br>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <?php if (sizeof($saves) > 0) { ?>
              <?php foreach ($saves as $save) { ?>

                <div class="card" id="card-<?php echo $save["saves_id"]; ?>" data-id="<?php echo $save["saves_id"]; ?>" data-search-string="<?php echo strtolower($save["saves_name"]); ?>">
                  <img class="card-img-top" src="<?php echo $save["image_image"]; ?>" alt="<?php echo $save["saves_name"]; ?>" style="height: 50vh; object-fit: cover;" />
                  <div class="card-body">
                    <h5 class="card-title"><?php echo $save["saves_name"]; ?></h5>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <?php $save["saves_json"] = base64_encode($save["saves_json"]); ?>
                    <button type="button" class="btn btn-dark" onclick="loadGameState('<?php echo $save["saves_json"]; ?>')">Load</a>
                  </div>
                </div>

              <?php } ?>
            <?php } ?>

          </div>
        </div>
      </div>
    </div>
    <!-- END DESIGN MODAL -->

    <!-- START ALERT MODAL -->
    <div id="alert" class="alert alert-dismissible fade show" role="alert">
      <strong id="alert-title"></strong><span id="alert-message"></span>
      <button type="button" class="close" aria-label="Close" onclick="closeAlert()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <!-- END ALERT MODAL -->
    
    <!-- START SPINNER MODAL -->
    <div class="modal fade" id="spinnerModal" data-backdrop="static" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered justify-content-center" role="document">

        <div class="d-flex justify-content-center">
          <div class="spinner-border text-light" role="status"></div>
          <span class="sr-only">Saving...</span>
          <span class="font-weight-bold indigo-text mr-2 mt-1" style="color: white; margin-left: .5rem;">Saving...</span>
        </div>

      </div>
    </div>
    <!-- END SPINNER MODAL -->

    <!-- START SCRIPTS -->
    <script src="./js/navbar.js"></script>
    <script src="./js/game/vector.js"></script>
    <script src="./js/game/cell.js"></script>
    <script src="./js/game/history.js"></script>
    <script src="./js/index.js"></script>
    <script src="./js/game.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/3.6.0/mdb.min.js"></script>
    <!-- END SCRIPTS -->
  </body>
</html>