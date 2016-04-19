class TaskSerializer < ActiveModel::Serializer
  attributes :name, :id, :better_id
  has_many :subtasks
end
