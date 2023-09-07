
class Api::V1::LikesController < ApplicationController
    before_action :authenticate_user_with_jwt!, only: [:create, :destroy]
    skip_before_action :verify_authenticity_token

    def create
      @article = Article.find(params[:article_id])
      if @article.likes.where(user: @current_user).exists?
        render json: { error: "You have already liked this article" }, status: :unprocessable_entity
        return
      end
      @like = @article.likes.build(user: @current_user)
      if @like.save
        render json: { message: "Liked article successfully" }, status: :created
      else
        render json: { error: "Unable to like the article" }, status: :unprocessable_entity
      end
    end

    def index
        @article = Article.find(params[:article_id])
        @liking_users = @article.likes.includes(:user).map(&:user)
        render json: @liking_users, status: :ok
    end

    def destroy
      @like = Like.find(params[:id])
      @like.destroy
      render json: { message: "Unliked article successfully" }, status: :ok
    end
  end
  