class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  before_save { self.email = email.downcase }
  has_many :articles, dependent: :destroy
  has_many :likes, dependent: :destroy
  has_many :comments, dependent: :destroy
  validates :username, presence: true, uniqueness: true, length: {minimum: 3, maximum: 25}
  validates :email, presence: true, uniqueness: { case_sensitive: false }, length: {maximum: 100}
  #has_secure_password
end