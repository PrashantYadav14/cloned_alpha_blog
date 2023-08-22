require 'rails_helper'
RSpec.describe SessionsController, type: :controller do
  before do
    @user= User.create(username: "stanley", email: "stanley@abc.com",
                        password: "password", admin: false)
    @user2= User.create(username: "user2", email: "user2@example.com",password: "password2", admin: false)
    @admin_user= User.create(username: "admin", email: "admin@example.com",password: "admin", admin: true)
  end
    describe "SessionsController#create" do
        context "with valid credentials" do
            it "logs the user in" do
                post :create, params: { session: { email: @user.email, password: @user.password } }
                expect(session[:user_id]).to eq(@user.id)
            end
            it "redirects to the user's profile page" do
                post :create, params: { session: { email: @user.email, password: @user.password } }
                expect(response).to redirect_to user_path(@user)
        end
    end

        context "with invalid credentials" do
            it "does not log the user in" do
                post :create, params: { session: { email: @user.email, password: "wrong_password" } }
                expect(session[:user_id]).to be_nil
            end

            it "sets a flash error message" do
                post :create, params: { session: { email: @user.email, password: "wrong_password" } }
                expect(flash[:alert]).to eq("There was something wrong with your login details")
            end

            it "renders the new template" do
                post :create, params: { session: { email: @user.email, password: "wrong_password" } }
                expect(response).to render_template("new")
            end
        end
    end
    describe "SessionsController#destroy" do
        before do
            session[:user_id] = @user.id
        end
        it "logs the user out" do
            delete :destroy
            expect(session[:user_id]).to be_nil
        end

        it "sets a flash success message" do
            delete :destroy
            expect(flash[:notice]).to eq("Logged out")
        end
        it "redirects to the root path" do
            delete :destroy
            expect(response).to redirect_to root_path
        end
    end
end
