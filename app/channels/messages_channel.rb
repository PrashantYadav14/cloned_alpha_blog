class MessagesChannel < ApplicationCable::Channel
  def subscribed
    stream_from "chat_#{params[:sender_id]}#{params[:receiver_id]}" 
  end

  def unsubscribed
    stop_all_streams
  end
end
