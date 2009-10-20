class TodosController < ApplicationController
  def index
    @todos = Todo.all
  end

  def create
    @todo = Todo.new(params[:todo])

    respond_to do |format|
      if @todo.save
        format.html do
          flash[:notice] = 'Todo was successfully created.'
          redirect_to todos_path
        end
        format.json
        format.js { render @todo }
      else
        format.html { render 'index' }
        format.json { render 'errors', :status => :unprocessable_entity }
        format.js { render 'errors', :layout => false, :status => :unprocessable_entity }
      end
    end
  end

  def destroy
    @todo = Todo.destroy(params[:id])

    respond_to do |format|
      format.html do
        flash[:notice] = 'Todo was successfully deleted.'
        redirect_to todos_path
      end
      format.json
      format.js  { head :ok }
    end
  end
end
