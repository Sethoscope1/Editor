class CreateCards < ActiveRecord::Migration
  def change
    create_table :cards do |t|
      t.string :title
      t.string :summary
      t.text :text
      t.integer :user_id
      t.integer :project_id

      t.timestamps
    end
  end
end
