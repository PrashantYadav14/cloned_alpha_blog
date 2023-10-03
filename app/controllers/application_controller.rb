
class ApplicationController < ActionController::Base
  include CanCan::ControllerAdditions
  skip_before_action :verify_authenticity_token
  protect_from_forgery with: :exception
 
  JWT_SECRET_KEY = '6B#Q&g8j$PzE5n@2mG*pW9sZrVw1yT7xU4'
  
  def authenticate_user_with_jwt!
    token = request.headers['Authorization']&.split(' ')&.last
    begin
      decoded_token = JWT.decode(token, JWT_SECRET_KEY, true, algorithm: 'HS256')
      user_id = decoded_token[0]['user_id']
      @current_user = User.find(user_id)
    rescue JWT::DecodeError, ActiveRecord::RecordNotFound
      render_unauthorized
    end
  end

  def current_ability
    @current_ability ||= Ability.new(@current_user)
  end

  def render_unauthorized
    render json: { error: 'Unauthorized' }, status: :unauthorized
  end

end
