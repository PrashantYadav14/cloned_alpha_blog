class SearchController < ApplicationController
    def search_user
        @get_user = User.where("username LIKE ?","#{params[:username]}%")
    end
end