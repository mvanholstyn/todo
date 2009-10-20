class TodosController < ApplicationController
  def index
    @todos = Todo.all
  end

  def create
    @todo = Todo.new(params[:todo])

    respond_to do |format|
      if @todo.save
        format.html { redirect_to todos_path }
        format.json
      else
        format.html { render 'index' }
        format.json { render 'errors', :status => :unprocessable_entity  }
      end
    end
  end

  def destroy
    @todo = Todo.destroy(params[:id])

    respond_to do |format|
      format.html { redirect_to todos_path }
      format.json { head :ok }
    end
  end
end
