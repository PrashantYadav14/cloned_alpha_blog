require 'rails_helper'
RSpec.describe ArticlesController, type: :controller do
    before do
        @article = Article.create(title: 'testarticle', description: 'This is the desc') 
        @user = User.create(username: 'Stanley', email:'stanley@abc.com', password: 'stanley', admin: false)
        @admin = User.create(username: 'Tom', email:'tom@abc.com', password: 'tom', admin: true)
        @article.user = @user
        @article.save
    end
    after do
        @article.destroy
    end
    describe "GET #index" do
        it "should get index template" do
            get :index
            expect(response).to have_http_status(:success)
        end
    end

    describe "GET #new" do
        context "when user is logged in" do
            before do
                allow(controller).to receive(:current_user).and_return(@user)
            end
            it "should get new" do
                get :new
                expect(response).to render_template("new")
            end
        end
        context "When user is not logged in" do
            it "show not redirect to new" do
                get :new
                expect(response).to  redirect_to(login_path)
            end
        end
    end
    describe "POST #create" do
        context "when user is logged in" do
            before do
                allow(controller).to receive(:current_user).and_return(@user)
            end
            it "should create a new article" do
            expect {
                post :create, params: { article: { title: "testarticle", description: "This is the description" } }
                }.to change(Article, :count).by(1)
            expect(response).to redirect_to(user_path(@user))
            end
        end
        context "When user is not logged in" do
            it "show not redirect to create article" do
                get :new
                expect(response).to  redirect_to(login_path)
            end
        end
    end

    describe "GET #show" do
        it "should show the particular article" do
            get :show, params: { id: @article.id }
            expect(response).to render_template("show")
        end
    end
    describe "GET #edit" do
        context "when user is the creator of the article" do
            before do
                allow(controller).to receive(:current_user).and_return(@user)
            end

            it "renders the edit template" do
                get :edit, params: { id: @article.id  }
                expect(response).to render_template("edit")
            end
        end
        context "when user is not the creator of the article" do
            before do
                @user2 = User.create(username: "user2", email: "user2@example.com", password: "password2", admin: false)
                allow(controller).to receive(:current_user).and_return(@user2)
            end
            it "redirects to the article's show page" do

                get :edit, params: { id: @article.id  }
                expect(response).to redirect_to(article_path(@article))
            end
        end
    end
    
    describe "ArticlesController" do
        context "when the user is an admin" do
            before do
                allow(controller).to receive(:current_user).and_return(@admin)
            end
            it "should allow the admin to delete the article" do
                delete :destroy, params: { id: @article.id }
                expect(Article.find_by(id: @article.id)).to be nil
            end
        end
      
        context "when the user is the creator of the article" do
            before do
                allow(controller).to receive(:current_user).and_return(@user)
            end
            it "should allow the user to delete the article" do
                delete :destroy, params: { id: @article.id }
                expect(Article.find_by(id: @article.id)).to be nil
            end
        end
      
        context "when the user is not the creator of the article" do
            before do
                @user2 = User.create(username: "user2", email: "user2@example.com", password: "password2", admin: false)
                allow(controller).to receive(:current_user).and_return(@user2)
            end
            it "should not allow the user to delete the article" do
                delete :destroy, params: { id: @article.id }
                expect(Article.find_by(id: @article.id)).to be_present
            end
        end
    end
      
    describe "ArticlesController" do
        context "when the user is an admin" do
            before do
                allow(controller).to receive(:current_user).and_return(@admin)
            end
            it "should allow the admin to update the article" do
                patch :update, params: { id: @article.id, article: { title: "New title" } }
                expect(@article.reload.title).to eq("New title")
            end
        end
      
        context "when the user is the creator of the article" do
            before do
                allow(controller).to receive(:current_user).and_return(@user)
            end
            it "should allow the user to update the article" do
                patch :update, params: { id: @article.id, article: { title: "New title" } }
                expect(@article.reload.title).to eq("New title")
            end
        end
      
        context "when the user is not the creator of the article" do
            before do
                @user2 = User.create(username: "user2", email: "user2@example.com", password: "password2", admin: false)
                allow(controller).to receive(:current_user).and_return(@user2)
            end
            it "should not allow the user to update the article" do
                patch :update, params: { id: @article.id, article: { title: "New title" } }
                expect(@article.reload.title).to eq("testarticle")
            end
        end
      end
end
    


    
    


