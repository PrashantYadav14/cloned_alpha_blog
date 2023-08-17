require 'rails_helper'

RSpec.describe CategoriesController, type: :controller do

  before do
    @category = Category.create(name: "Sports")
    @admin_user = User.create(username: "Stanley", email: "stanley@abc.com", password: "stanley", admin: true)
  end

  describe 'GET #index' do
    it 'should get the index page' do
      get :index
      expect(response).to have_http_status(:success)
    end
  end
 
  describe 'GET #new' do
    it 'should get the new page' do
      sign_in_as(@admin_user)
      get :new
      expect(response).to have_http_status(:success)
    end
  end
  
end