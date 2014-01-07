function game() {

  this.year = 0;
  this.season = new season();
  this.tree = new tree();

  this.start = function(){
    that = this;
    that.tree.updateTreeDOM();
    that.season.next_season();
    that.next_time_tick();
  };

  this.next_time_tick = function(){
    setInterval(function(){
      that.season.next_season();
      that.tree.update_tree(that.season);
    }, 1000);
  }
}

function season(){
  this.stage = 1;

  this.next_season = function(){
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
      this.alive = false;
    }
    if (this.age > 3 && this.alive && season.stage == 1){
      this.fruit.push('fruit');
    }
    if (season.stage == 1){
      this.fruit = [];
    }
    this.updateTreeDOM();
  };

  this.updateTreeDOM = function(){
    if(this.alive != true){
      $("#tree ul").append('<li style-"color: red">DEAD</li>');
    }
    $('#fruit_amount').html(this.fruit.length);
    $('#age').html(this.age);
  };
}


$(document).ready(function(){ 
  current_game = new game()
  current_game.start();
})

