class TodosController < ApplicationController
  def index
    @todos = Todo.all
  end

  def create
    @todo = Todo.new(params[:todo])

    if @todo.save
      respond_to :json
    else
      # TODO: Can't do this
      render :action => "new"
    end
  end

  def edit
    @todo = Todo.find(params[:id])
  end

  def update
    @todo = Todo.find(params[:id])

    if @todo.update_attributes(params[:todo])
      flash[:notice] = 'Todo was successfully updated.'
      redirect_to todos_path
    else
      render :action => "edit"
    end
  end

  def destroy
    @todo = Todo.destroy(params[:id])
    redirect_to(todos_url)
  end
end
