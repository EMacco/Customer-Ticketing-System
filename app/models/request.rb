class Request < ApplicationRecord
  validates :title, presence: true, length: { maximum: 30 }
  validates :description, presence: true, length: { maximum: 500 }
  validates :status, allow_nil: true, inclusion: { in: %w(open close) }

  belongs_to :user
  has_many :comments, dependent: :destroy
end
