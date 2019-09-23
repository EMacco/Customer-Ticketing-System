class User < ApplicationRecord
  has_secure_password
  validates :first_name, :last_name, presence: true, length: { minimum: 2 }
  validates :email, presence: true,
                    uniqueness: { case_sensitive: false },
                    format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :password_digest, presence: true, length: { minimum: 6 }
  validates :phone, presence: true, length: { in: 11..14 }
  validates :role, allow_nil: true, inclusion: { in: %w(user admin agent) }

  has_many :comments, dependent: :destroy
  has_many :requests, dependent: :destroy
end
