class User < ApplicationRecord
  # devise :registerable,:database_authenticatable,
  #        :recoverable, :rememberable, :validatable

  before_save { self.email = email.downcase }
  has_many :articles, dependent: :destroy
  validates :username, presence: true, uniqueness: true, length: {minimum: 3, maximum: 25}
  validates :email, presence: true, uniqueness: { case_sensitive: false }, length: {maximum: 100}
  has_secure_password
end