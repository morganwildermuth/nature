function game() {

  this.year = 0;
  this.season = new season();
  this.tree = new tree();

  this.start = function(){
    this.season.next_season();
    this.tree.update_tree(this.season);
    that = this;
    setTimeout(function(){that.season.next_season()}, 2000);
  };
}

function season(){
  this.stage = 1;

  this.next_season = function(){
      that = this;
      if (this.stage != 4){
        this.stage += 1
      } else{
        this.stage = 1
      };
      this.update_season();
  };

  this.update_season = function(){
    switch (this.stage){
      case 1: $("#season").html("Spring"); break;
      case 2: $("#season").html("Summer"); break;
      case 3: $("#season").html("Fall"); break;
      case 4: $("#season").html("Winter"); break;
      default: $("#season").html("Error"); break;
    };
  };
}

function tree(){
  this.age = 0
  this.fruit = [];
  this.alive = true;

  this.update_tree = function(season){
    this.age += 1;
    if (this.age >= 10){
      tree.alive = false;
    }
    if (this.age > 3 && tree.alive && season.stage == 1){
      this.fruit << 'fruit';
    }
    if (season.stage == 1){
      this.fruit = [];
    }
  }
}


$(document).ready(function(){ 
  current_game = new game()
  current_game.start();
})

