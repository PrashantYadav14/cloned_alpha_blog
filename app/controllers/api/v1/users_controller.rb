
class Api::V1::UsersController < ApplicationController
  skip_before_action :verify_authenticity_token
  def create
    username = params[:username]
    email = params[:email]
    password = params[:password]

    user = User.new(username: username, email: email, password: password)
    if user.save
      session[:user_id] = user.id
      render json: {
        status: :created,
        user: user
      }
    else
      render json: {
        status: :unprocessable_entity,
        errors: user.errors.full_messages
      }
    end
  end
end