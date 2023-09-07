
class Api::V1::CommentsController < ApplicationController
    before_action :authenticate_user_with_jwt!
    skip_before_action :verify_authenticity_token

    def create
      @article = Article.find(params[:article_id])
      @comment = @article.comments.build(comment_params)
      @comment.user = @current_user
  
      if @comment.save
        render json: { message: "Commented on article successfully" }, status: :created
      else
        render json: { error: "Unable to comment on the article" }, status: :unprocessable_entity
      end
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
  