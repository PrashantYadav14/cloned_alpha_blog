class Api::V1::ArticlesController < ApplicationController
  JWT_SECRET_KEY = '6B#Q&g8j$PzE5n@2mG*pW9sZrVw1yT7xU4'
  before_action :authenticate_user_with_jwt!, only: [:create, :update, :destroy]
  skip_before_action :verify_authenticity_token
  before_action :set_article, only: [:show, :update, :destroy]

  def index
    @articles = Article.all
    render json: @articles
  end

  def show
    render json: @article
  end

  def create
    article = @current_user.articles.build(article_params)
    category_ids = params[:article][:category_ids] || [] 

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
    params.require(:article).permit(:title, :description, :category_id)
  end
  
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

  def render_unauthorized
    render json: { error: 'Unauthorized' }, status: :unauthorized
  end
end
