class Api::V1::FriendshipsController < ApplicationController
    before_action :authenticate_user_with_jwt!, only: [:create, :destroy]
    skip_before_action :verify_authenticity_token


    def create
        friend = User.find(params[:user_id])
        @friendship1 = current_user.friendships.build(friend: friend)
        @friendship2 = friend.friendships.build(friend: current_user)
        if @friendship1.save && @friendship2.save
          friend_request = FriendRequest.find_by(sender_id: friend.id, receiver_id: current_user.id)
          friend_request.update(accepted: true) if friend_request
          render json: { message: "Friendship created successfully" }, status: :created
        else
          render json: { error: "Failed to create friendship" }, status: :unprocessable_entity
        end
    end
      
    def index
      user = User.find(params[:user_id])
      @friendships = user.friendships.includes(:friend)
      render json: @friendships, status: :ok
    end

    def destroy
      friendship = Friendship.find_by(user_id: params[:user_id], friend_id: params[:id])
      reverse_friendship = Friendship.find_by(user_id: params[:id], friend_id: params[:user_id])
      if friendship.destroy
        reverse_friendship&.destroy  
        Message.where(sender_id: [params[:user_id], params[:id]], receiver_id: [params[:user_id], params[:id]]).destroy_all
        render json: { message: "Friend removed successfully" }, status: :ok
      else
        render json: { message: "Error removing friend" }, status: :unprocessable_entity
      end
    end


    def show_all_friends
      user = User.find(params[:user_id])
      @friends = user.friends

      render json: @friends
    end
    
end
  