class TodosController < ApplicationController
  def index
    @todos = Todo.all
  end

  def create
    @todo = Todo.new(params[:todo])

    if @todo.save
      respond_to :json
    else
      respond_to do |format|
        format.json { render 'errors', :status => :unprocessable_entity  }
      end
    end
  end

  def destroy
    @todo = Todo.destroy(params[:id])
    head :ok
  end
end
