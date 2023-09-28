class Friendship < ApplicationRecord
    belongs_to :user
    belongs_to :friend, class_name: 'User'
    after_destroy :remove_friend_requests
    
    def self.ransackable_attributes(auth_object = nil)
      ["created_at", "friend_id", "id", "updated_at", "user_id"]
    end
    
    private
    def remove_friend_requests
      sender = user
      receiver = friend
      FriendRequest.where(sender: sender, receiver: receiver).destroy_all
      FriendRequest.where(sender: receiver, receiver: sender).destroy_all
    end
end
