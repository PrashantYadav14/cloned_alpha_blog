class Api::V1::MessagesController < ApplicationController
    skip_before_action :verify_authenticity_token
    before_action :authenticate_user_with_jwt!, only: [:create, :update, :destroy]

  
    def show
      sender_id = params[:user_id]
      receiver_id = params[:id]
      @messages = Message.where(sender_id: [sender_id, receiver_id], receiver_id: [sender_id, receiver_id]).order(created_at: :asc)
      @messages.where(sender_id: receiver_id, receiver_id: sender_id).update_all(read: true)
      render json: @messages
    end
      
  
    def create
      @message = Message.new(message_params)
      @message.read = false
      if @message.save
        ActionCable.server.broadcast("chat_#{params[:receiver_id]}#{params[:sender_id]}", @message)
        render json: @message, status: :created
      else
        render json: { error: 'Unable to create message' }, status: :unprocessable_entity
      end
    end
  
    def update
        @message = Message.find(params[:id])
        if @message.sender_id==@current_user.id
          if @message.update(message_params)
            ActionCable.server.broadcast("chat_#{@message.receiver_id}#{@message.sender_id}", @message)
            render json: @message, status: :ok
          else
            render json: { error: 'Unable to update message' }, status: :unprocessable_entity
          end
        else
           render json: { error: 'Unauthorized' }, status: :unauthorized
        end
    end
  
    def destroy
      @message = Message.find(params[:id])
      sender_id=@message.sender_id
      receiver_id=@message.receiver_id
      if @message.sender_id == @current_user.id
        @message.destroy
        ActionCable.server.broadcast("chat_#{sender_id}#{receiver_id}", { content: "deleted", id: @message.id })
        ActionCable.server.broadcast("chat_#{receiver_id}#{sender_id}", { content: "deleted", id: @message.id })
        head :no_content
      else
        render json: { error: 'Unauthorized'}, status: :unauthorized
      end
    end
  
    private
  
    def message_params
      params.require(:message).permit(:sender_id, :receiver_id, :content)
    end
  end
  