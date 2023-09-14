class Friendship < ApplicationRecord
    belongs_to :user
    belongs_to :friend, class_name: 'User'
    after_destroy :remove_friend_requests

    private
    def remove_friend_requests
      sender = user
      receiver = friend
      FriendRequest.where(sender: sender, receiver: receiver).destroy_all
      FriendRequest.where(sender: receiver, receiver: sender).destroy_all
    end
end
