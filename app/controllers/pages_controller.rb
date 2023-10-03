class PagesController < ApplicationController
  def home
      redirect_to "http://localhost:3001/login"
  end

  def about
  end
end
