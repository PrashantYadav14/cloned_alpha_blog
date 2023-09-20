class Api::V1::ArticlesController < ApplicationController
  
  before_action :authenticate_user_with_jwt!, only: [:create, :update, :destroy]
  skip_before_action :verify_authenticity_token
  before_action :set_article, only: [:show, :update, :destroy]

  def index
    @articles = Article.all
    render json: @articles
  end

  def show
    @article = @article.as_json(methods: [:image_url])
    render json: @article
  end

  
  def create
    article = @current_user.articles.build(article_params)
    category_ids = params[:article][:category_ids] || [] 

    if params[:article][:image] 
      article.image.attach(params[:article][:image]) 
    end

    if article.save
      article.categories << Category.where(id: category_ids) 
      render json: { message: 'Article created successfully', article: article }, status: :created
    else
      render json: { errors: article.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @article.user == @current_user
      if @article.update(article_params)
        render json: @article, status: :ok
      else
        render json: { errors: @article.errors.full_messages }, status: :unprocessable_entity
      end
    end
  end

  def destroy
    if @article.user == @current_user || @current_user.admin?
      @article.image.purge if @article.image.attached?
      @article.destroy
      head :no_content
    else
      render json: { error: 'Unauthorized' }, status: :unauthorized
    end
  end

  private

  def set_article
    @article = Article.find(params[:id])
  end

  def article_params
    params.require(:article).permit(:title, :description, :category_ids, :image)
  end
  
end

