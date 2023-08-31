class Api::V1::ArticlesController < ApplicationController
    before_action :authenticate_user!, only: [:create, :edit, :update, :destroy]
    skip_before_action :verify_authenticity_token
    before_action :set_article, only: [:show, :edit, :update, :destroy]
    def index
      @articles = Article.all
      render json: @articles
    end
  
    def show
      render json: @article
    end
  
    def create
      #@article = current_user.articles.build(article_params)
      #@article = Article.new(article_params)
      @article = current_user.articles.new(article_params) 
      if @article.save
        render json: @article, status: :created
      else
        render json: @article.errors, status: :unprocessable_entity
      end
    end
  
    def edit
    end
  
    def update
      if @article.update(article_params)
        render json: @article, status: :ok
      else
        render json: @article.errors, status: :unprocessable_entity
      end
    end
  
    def destroy
      @article.destroy
  
      head :no_content
    end
  
    private
  
    def set_article
      @article = Article.find(params[:id])
    end
  
    def article_params
      params.require(:article).permit(:title, :description, category_ids: [])
    end
end

private

def set_article
  @article = Article.find(params[:id])
end

def article_params
  params.require(:article).permit(:title, :description, category_ids: [])
end

def require_same_user
  if (current_user != @article.user && !current_user.admin?)
    flash[:alert] = "You can only edit or delete your own article"
    redirect_to @article
  end
end
  