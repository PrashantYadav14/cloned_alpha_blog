
class Api::V1::UsersController < Devise::RegistrationsController
  skip_before_action :verify_authenticity_token
  before_action :configure_sign_up_params, only: [:create]
  
  def create
    user = User.new(sign_up_params)
    
    if user.save
      sign_in(user)
      render json: { message: 'Signed up successfully', user: user }
    else
      render json: { status: :unprocessable_entity, errors: user.errors.full_messages }
    end
  end

  def index
      # users = User.all
      # render json: users
      users = User.all.includes(:articles) # This will eager load associated articles to avoid N+1 query issues
      render json: users.to_json(include: :articles)
  end

  def show
    user = User.find(params[:id])
    render json: user
  rescue ActiveRecord::RecordNotFound
    render json: { message: 'User not found' }, status: :not_found
  end
  
  private

  def configure_sign_up_params
    devise_parameter_sanitizer.permit(:sign_up, keys: [:username, :email, :password])
  end

  def sign_in(user)
    bypass_sign_in(user)
  end
end



