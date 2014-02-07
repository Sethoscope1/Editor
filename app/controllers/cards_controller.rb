class CardsController < ApplicationController
  respond_to :json
  
  def create
    @card = Card.new(params[:card])
    
    if @task.save
      render json: @card
    else
      render json: @card.errors, status: 422
    end
  end
  
  def index
    @cards = Card.all
    render json: @cards
  end
end
