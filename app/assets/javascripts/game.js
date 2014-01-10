function game(){

  this.year = 0;
  this.season = new season();
  this.tree = new tree("Summer");
  this.interval = null;

  this.start = function(){
    var that = this;
    that.tree.updateTreeDOM(that);
    that.season.next_season();
    that.next_time_tick(that);
  };

  this.next_time_tick = function(game){
    var game = game;
    var intervalHandle = setInterval(function(){
      game.season.next_season();
      game.tree.update_tree(game);
    }, 1000);
    this.interval = intervalHandle;
  }
}

function season(){
  this.name = "Spring";

  this.next_season = function(){
      switch(this.name){
        case "Spring": this.name = "Summer"; break;
        case "Summer": this.name = "Fall"; break;
        case "Fall": this.name = "Winter"; break;
        case "Winter": this.name = "Spring"; break;
      }
      this.update_season();
  };

  this.update_season = function(){
    switch (this.name){
      case "Spring": $("#season").html("Spring"); break;
      case "Summer": $("#season").html("Summer"); break;
      case "Fall": $("#season").html("Fall"); break;
      case "Winter": $("#season").html("Winter"); break;
      default: $("#season").html("Error"); break;
    };
  };
}

function tree(fruit_season){
  this.age = 0;
  this.fruit = 0;
  this.alive = true;
  this.season = fruit_season;
  this.seasons = ["Summer", "Fall", "Winter", "Spring"];

  this.update_tree = function(game){
    this.age_tree(game);
    this.check_if_tree_died();
    this.handle_fruit(game);
    this.updateTreeDOM(game);
  };

  this.age_tree = function(game){
    if (game.season.name == "Spring"){
      this.age += 1
    }
  };

  this.check_if_tree_died = function(){
    if (this.age >= 10){
      this.alive = false;
    }
  };

  this.handle_fruit = function(game){
    if (this.age > 3 && this.alive && game.season.name == this.season){
      this.fruit = Math.floor(Math.random()*11);
    }
    if (game.season.name == "Summer"){
      this.fruit = 0;
    }
  };

  this.updateTreeDOM = function(game){
    var game = game
    if(this.alive != true){
      $("#tree ul").append('<li style-"color: red">DEAD</li>');
      clearInterval(game.interval);
    }
    $('#fruit_amount').html(this.fruit);
    $('#age').html(this.age);
  };
}


$(document).ready(function(){ 
  current_game = new game()
  current_game.start();
})

