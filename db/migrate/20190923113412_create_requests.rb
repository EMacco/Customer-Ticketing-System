class CreateRequests < ActiveRecord::Migration[5.1]
  def change
    create_table :requests do |t|
      t.string :title
      t.string :description
      t.string :status, default: 'open'
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
