class SendFriendRequestReminderJob < ApplicationJob
  queue_as :default

  def perform(friend_request_id)
    friend_request = FriendRequest.find(friend_request_id)
    if friend_request && !friend_request.accepted 
      receiver = friend_request.receiver
      FriendRequestMailer.friend_request_reminder(receiver).deliver_now
    end
  end

end
