function game(){

  this.year = 0;
  this.season = new season();
  this.tree = new tree();
  this.interval = null;

  this.start = function(){
    that = this;
    that.tree.updateTreeDOM(that);
    that.season.next_season();
    that.next_time_tick();
  };

  this.next_time_tick = function(){
    var intervalHandle = setInterval(function(){
      that.season.next_season();
      that.tree.update_tree(that);
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

function tree(season){
  this.age = 0;
  this.fruit = 0;
  this.alive = true;
  this.season = season;

  this.update_tree = function(game){
    if (game.season.name == "Spring"){
      this.age += 1
    }
    if (this.age >= 10){
      this.alive = false;
    }
    if (this.age > 3 && this.alive && game.season.name == "Spring"){
      this.fruit = Math.floor(Math.random()*11);
    }
    if (game.season.name == "Summer"){
      this.fruit = 0;
    }
    this.updateTreeDOM(game);
  };

  this.updateTreeDOM = function(game){
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

