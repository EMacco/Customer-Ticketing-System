class Comment < ApplicationRecord
  validates :text, presence: true, length: { in: 3..50 }

  belongs_to :user
  belongs_to :request
end
