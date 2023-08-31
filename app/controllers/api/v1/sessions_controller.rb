
class Api::V1::SessionsController < Devise::SessionsController
    skip_before_action :verify_authenticity_token
    before_action :configure_sign_in_params, only: [:create]
    def create
      user = warden.authenticate(auth_options)
      if user
          sign_in(resource_name, user)
          render json: { message: 'Logged in successfully', user: user }
      else
          render json: { error: 'Invalid email or password' }, status: :unprocessable_entity
      end
    end

    def destroy
      sign_out(resource_name)
      render json: { message: 'Logged out successfully' }
    end

    private
     def configure_sign_in_params
       devise_parameter_sanitizer.permit(:sign_in, keys: [:email, :password])
    end
end



