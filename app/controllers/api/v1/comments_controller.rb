class Api::V1::CommentsController < ApplicationController
    before_action :authenticate_user_with_jwt!, only: [:create, :destroy]
    skip_before_action :verify_authenticity_token
  
    def create
      @article = Article.find(params[:article_id])
      if @article.comments.where(user: @current_user).exists?
        render json: { error: "You have already commented on this article" }, status: :unprocessable_entity
        return
      end
      @comment = @article.comments.build(comment_params)
      @comment.user = @current_user
  
      if @comment.save
        render json: { message: "Commented on article successfully" }, status: :created
      else
        render json: { error: "Unable to comment on the article" }, status: :unprocessable_entity
      end
    end
    def index
        @article = Article.find(params[:article_id])
        @comments = @article.comments.includes(:user)
        comments_data = @comments.map do |comment|
        {
            id: comment.id,
            content: comment.content,
            user: {
            id: comment.user.id,
            username: comment.user.username
            }
        }
        end
        render json: comments_data, status: :ok
      end
  
    def destroy
      @comment = Comment.find(params[:id])
      @comment.destroy
      render json: { message: "Comment deleted successfully" }, status: :ok
    end
  
    private
  
    def comment_params
      params.require(:comment).permit(:content)
    end
  end
  