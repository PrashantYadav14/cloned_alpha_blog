class User < ApplicationRecord
  validates :username, presence: true, uniqueness: true, length: {minimum: 3, maximum: 25}
  VALID_EMAIL_REGEX
  validates :email, presence: true, uniqueness: { case_sensitive: false }, length: {maximum: 100}
end