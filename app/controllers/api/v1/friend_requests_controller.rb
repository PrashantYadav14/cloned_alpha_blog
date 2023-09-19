class Api::V1::FriendRequestsController < ApplicationController
    
    before_action :authenticate_user_with_jwt!, only: [:create, :accept, :destroy]
    skip_before_action :verify_authenticity_token
    
    def index
        friend_requests = FriendRequest.includes(:sender, :receiver)
        friend_requests_data = friend_requests.map do |request|
          {
            id: request.id,
            sender_id: request.sender_id,
            receiver_id: request.receiver_id,
            created_at: request.created_at,
            accepted: request.accepted
          }
        end
        render json: friend_requests_data, status: :ok
    end
      

    def create
        receiver = User.find(params[:user_id])
        @friend_request = current_user.sent_friend_requests.build(receiver: receiver)
        @friend_request.accepted = false
        if @friend_request.save
        render json: { message: "Friend request sent" }, status: :created
        else
        render json: { error: "Failed to send friend request" }, status: :unprocessable_entity
        end
    end
  
    def destroy
        @friend_request = FriendRequest.find(params[:id])
        @friend_request.destroy
        render json: { message: "Friend request declined" }, status: :ok
    end
  
    def accept
        @friend_request = FriendRequest.find(params[:id])
        @friend_request.accepted = true

        if @friend_request.save
        Friendship.create(user: @friend_request.sender, friend: @friend_request.receiver)
        Friendship.create(user: @friend_request.receiver, friend: @friend_request.sender)

        render json: { message: "Friend request accepted" }, status: :ok
        else
        render json: { error: "Failed to accept friend request" }, status: :unprocessable_entity
        end
    end
end
  