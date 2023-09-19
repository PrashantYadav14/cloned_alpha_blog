class Api::V1::MessagesController < ApplicationController
    skip_before_action :verify_authenticity_token
    before_action :authenticate_user_with_jwt!, only: [:create]

  
    def show
      sender_id = params[:user_id]
      receiver_id = params[:id]
      @messages = Message.where(sender_id: [sender_id, receiver_id], receiver_id: [sender_id, receiver_id]).order(created_at: :asc)
      render json: @messages
    end
      
  
    def create
      @message = Message.new(message_params)
      @message.read = false
      if @message.save
        render json: @message, status: :created
      else
        render json: { error: 'Unable to create message' }, status: :unprocessable_entity
      end
    end
  
    def update
        @message = Message.find(params[:id])
        if @message.update(message_params)
          render json: @message, status: :ok
        else
          render json: { error: 'Unable to update message' }, status: :unprocessable_entity
        end
    end
  
    def destroy
      @message = Message.find(params[:id])
      @message.destroy
      head :no_content
    end
  
    private
  
    def message_params
      params.require(:message).permit(:sender_id, :receiver_id, :content)
    end
  end
  