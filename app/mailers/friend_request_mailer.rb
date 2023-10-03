class FriendRequestMailer < ApplicationMailer
  def friend_request_sent(user, receiver)
    @user=user
    @receiver = receiver
    mail(to: @receiver.email, subject: 'You have recieved friend request')
  end

  def friend_request_reminder(receiver)
    @receiver = receiver
    mail(to: @receiver.email, subject: 'You have pending friend request')
  end
end
