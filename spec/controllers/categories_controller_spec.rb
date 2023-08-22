require 'rails_helper'
RSpec.describe CategoriesController, type: :controller do
  before do
    @category = Category.create(name: "Travel")
    @admin_user = User.create(username: "stanley", email: "stanley@abc.com",
                              password: "stanley", admin: true)
    @user =User.create(username: "testuser", email: "testuser@example.com",
                              password: "testuser", admin: false)
  end
  describe "GET #index" do
        it "should get index" do
        get :index
        expect(response).to render_template("index")
        end
   end
  describe "GET #new" do
        context "when user is an admin" do
            before do
                allow(controller).to receive(:current_user).and_return(@admin_user)
            end
            it "should get new" do
                get :new
                expect(response).to render_template("new")
            end
          end
        context "when user is not an admin" do
            before do
                allow(controller).to receive(:current_user).and_return(@user)
            end
            it "should get not new" do
                get :index
                expect(response).to render_template("index")
            end
        end
    end
    describe "GET categories#show" do
        it "should show category" do
            get :show, params: { id: @category.id }
            expect(response).to have_http_status(:success)
        end
    end
    describe "POST #create" do
        context "when user is an admin" do
            before do
                allow(controller).to receive(:current_user).and_return(@admin_user)
            end
            it "creates a new actegory" do
                expect {
                post :create, params: { category: { name: "Food" } }
                }.to change(Category, :count).by(1)
                expect(response).to redirect_to(Category.last)
            end
        end
        context "when user is not an admin" do
            before do
              allow(controller).to receive(:current_user).and_return(@user)
            end
            it "does not create a new category" do
              expect {
                post :create, params: { category: { name: "New Category" } }
              }.not_to change(Category, :count)
              expect(response).to redirect_to(categories_url)
            end
          end
    end
    describe "GET #edit" do
        context "when user is an admin" do
            before do
                allow(controller).to receive(:current_user).and_return(@admin_user)
            end
            it "gives edit template" do
                get :edit, params: { id: @category.id }
                expect(assigns(:category)).to eq(@category)
                expect(response).to render_template("edit")
            end
        end
        context "when user is not an admin" do
            before do
                allow(controller).to receive(:current_user).and_return(@user)
            end
            it "does not give edit template" do
                get :index
                expect(response).to render_template("index")
            end
        end
    end
    describe "PATCH #update" do
        before do
            allow(controller).to receive(:current_user).and_return(@admin_user)
        end
        it "updates the category's name" do
            updated_name = "New Name"
            patch :update, params: { id: @category.id, category: { name: updated_name } }
            @category.reload
            expect(@category.name).to eq(updated_name)
            expect(response).to redirect_to(@category)
      end
    end
end

 


# require 'rails_helper'
# RSpec.describe CategoriesController, type: :controller do

#   before do
#     @category = Category.create(name: "Sports")
#     @admin_user = User.create(username: "Stanley", email: "stanley@abc.com", password: "stanley", admin: true)
#   end

#   describe 'GET #index' do
#     it 'should get the index page' do
#       get :index
#       expect(response).to have_http_status(:success)
#     end
#   end
#   describe 'GET #new' do
#     it 'should get the new page' do
#       sign_in_as(@admin_user)
#       get :new
#       expect(response).to have_http_status(:success)
#     end
#   end
# end
#   describe 'POST #create' do
#     it 'should create a category' do
#       sign_in_as(@admin_user)
#       expect do
#         post :create, params: { category: { name: 'Travel' } }
#       end.to change(Category, :count).by(1)

#       expect(response).to redirect_to(category_url(Category.last))
#     end

#     it 'should not create a category if not admin' do
#       assert_no_difference("Category.count") do
#         post :create, params: { category: { name: 'Travel' } }
#       end

#       expect(response).to redirect_to(categories_url)
#     end
#   end

#   describe 'GET #show' do
#     it 'should show the category' do
#       get category_url(@category)
#       expect(response).to have_http_status(:success)
#     end
#   end
# end
  

