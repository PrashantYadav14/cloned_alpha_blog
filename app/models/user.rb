class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :confirmable
  before_save { self.email = email.downcase }
  has_many :articles, dependent: :destroy
  has_many :likes, dependent: :destroy
  has_many :comments, dependent: :destroy

  has_many :sent_friend_requests, class_name: 'FriendRequest', foreign_key: 'sender_id', dependent: :destroy
  has_many :received_friend_requests, class_name: 'FriendRequest', foreign_key: 'receiver_id', dependent: :destroy
  has_many :friendships, dependent: :destroy
  has_many :friends, through: :friendships, dependent: :destroy

  has_many :sent_messages, class_name: 'Message', foreign_key: 'sender_id', dependent: :destroy
  has_many :received_messages, class_name: 'Message', foreign_key: 'receiver_id', dependent: :destroy

  validates :username, presence: true, uniqueness: true, length: {minimum: 3, maximum: 25}
  validates :email, presence: true, uniqueness: { case_sensitive: false }, length: {maximum: 100}
  #has_secure_password

  def self.ransackable_attributes(auth_object = nil)
    %w[username email] 
  end

  def self.ransackable_associations(auth_object = nil)
    ["articles", "comments", "friends", "friendships", "likes", "received_friend_requests", "received_messages", "sent_friend_requests", "sent_messages"]
  end
end