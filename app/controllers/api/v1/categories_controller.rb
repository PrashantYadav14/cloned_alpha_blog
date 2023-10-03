class Api::V1::CategoriesController < ApplicationController

    skip_before_action :verify_authenticity_token
    before_action :authenticate_user_with_jwt!, only: [:create, :update]
    
    def new
      @category = Category.new
    end

    def create
      authorize! :manage, Category
      @category = Category.new(category_params)
      # if @current_user.admin?
        if @category.save
          render json: { message: 'Category created successfully', category: @category }, status: :created
        else
          render json: @category.errors, status: :unprocessable_entity
        end
      # else
      #   render json: { error: 'You do not have permission to create a category' }, status: :forbidden
      # end
    end

    def update
      @category = Category.find(params[:id])
      if @current_user.admin?
        if @category.update(category_params)
          render json: @category, status: :ok
        else
          render json: @category.errors, status: :unprocessable_entity
        end
      else
        render json: { error: 'You do not have permission to update this category' }, status: :forbidden
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
  
  end