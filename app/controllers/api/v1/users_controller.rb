class Api::V1::UsersController  <  Devise::RegistrationsController
  skip_before_action :verify_authenticity_token
  before_action :configure_sign_up_params, only: [:create]
  before_action :authenticate_user_with_jwt!, only: [:update_user, :destroy_user]
  

  def create
    user = User.new(sign_up_params)
    if user.save
      sign_in(user)
      token = generate_jwt_token(user)
      render json: { message: 'Signed up successfully', user: user, token: token }
    else
      render json: { status: :unprocessable_entity, errors: user.errors.full_messages }
    end
  end

  def index
    users = User.all.includes(:articles) 
    render json: users.to_json(include: :articles)
  end

  def show
    user = User.find(params[:id])
    render json: user.to_json(include: :articles)
  rescue ActiveRecord::RecordNotFound
    render json: { message: 'User not found' }, status: :not_found
  end

  def update_user
    user = User.find(params[:id])
    if @current_user == user
      if user.update(user_params)
        render json: { message: 'User updated successfully', user: user }
      else
        render json: { status: :unprocessable_entity, errors: user.errors.full_messages }
      end
    else
      render_unauthorized
    end
  end 


  def destroy_user
    user = User.find(params[:id])

    if user.present?
      if @current_user.admin? || @current_user == user
        user.destroy
        render json: { message: 'User and associated articles deleted successfully' }
      else
        render_unauthorized
      end
    else
      render json: { message: 'User not found' }, status: :not_found
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :email)
  end

  def configure_sign_up_params
    devise_parameter_sanitizer.permit(:sign_up, keys: [:username, :email, :password])
  end

  def generate_jwt_token(user)
    payload = { user_id: user.id }
    token = JWT.encode(payload, JWT_SECRET_KEY, 'HS256')
    token
  end
  
 
end

