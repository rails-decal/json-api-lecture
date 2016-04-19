class Api::V1::TasksController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    render json: Task.all, each_serializer: TaskSerializer
  end

  def create
    task = Task.new task_params
    if task.save
      render json: Task.all, each_serializer: TaskSerializer
    end
  end

  private
  def task_params
    params.require(:task).permit!
  end
end
