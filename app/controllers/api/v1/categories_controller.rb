class Api::V1::CategoriesController < ApplicationController
    before_action :require_admin, except: [:index, :show]
    def new
      @category = Category.new
    end
    
    def create
      @category = Category.new(category_params)
      if @category.save
        render json: @category, status: :created
      else
        render json: @category.errors, status: :unprocessable_entity
      end
    end
  
    def edit
      @category = Category.find(params[:id])
    end
  
    def update
      @category = Category.find(params[:id])
      if @category.update(category_params)
        render json: @category, status: :ok
      else
        render json: @category.errors, status: :unprocessable_entity
      end
    end
  
    def index
        @categories = Category.all
        render json: @categories
    end
  
    def show
      @category = Category.find(params[:id])
      @articles = @category.articles
      render json: {
            category: @category,
            articles: @articles
         }
    end
  
    private
  
    def category_params
      params.require(:category).permit(:name)
    end
  
    def require_admin
      if !(logged_in? && current_user.admin?)
        flash[:alert] = "Only admins can perform this action"
        redirect_to categories_path
      end
    end
  end