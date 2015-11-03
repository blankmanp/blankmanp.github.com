class CreateUserOptions < ActiveRecord::Migration
  def change
    create_table :user_options do |t|
      t.string :name
      t.string :option

      t.timestamps null: false
    end
  end
end
