class GameController < ApplicationController

  def index
    @test = 'testa'
  end

  def show
    @test = 'testb'
  end
end