class Task < ActiveRecord::Base
  has_many :subtasks

  def better_id
    id + 100
  end
end
