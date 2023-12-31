
require 'jwt'
class Api::V1::SessionsController < Devise::SessionsController
  skip_before_action :verify_authenticity_token
  before_action :configure_sign_in_params, only: [:create]
  respond_to :json


  def create
    resource = User.find_for_database_authentication(email: params[:user][:email])
    return invalid_login_attempt unless resource

    if resource.valid_password?(params[:user][:password])
      sign_in :user, resource
      token = generate_jwt_token(resource) 
      render json: { user: resource, token: token, message: 'Logged in successfully' }
    else
      invalid_login_attempt
    end
  end
  
  def forgot_password
    user = User.find_by(email: params[:user][:email])
    if user
      user.send_reset_password_instructions
      render json: { message: 'Password reset instructions sent successfully' }
    else
      render json: { error: 'Email not found' }, status: :not_found
    end
  end
 
  private

  def invalid_login_attempt
    warden.custom_failure!
    render json: { error: 'Invalid email or password' }, status: :unauthorized
  end

  protected

  def configure_sign_in_params
    devise_parameter_sanitizer.permit(:sign_in, keys: [:email])
  end

  def generate_jwt_token(user)
    payload = { user_id: user.id }
    token = JWT.encode(payload, JWT_SECRET_KEY, 'HS256')
    token
  end
end



