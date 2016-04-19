class CreateSubtasks < ActiveRecord::Migration
  def change
    create_table :subtasks do |t|
      t.string :name
      t.references :task, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
