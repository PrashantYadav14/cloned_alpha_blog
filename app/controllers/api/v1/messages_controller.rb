class Api::V1::MessagesController < ApplicationController
    before_action :authenticate_user_with_jwt!, only: [:create, :destroy]
    def create
     
    end

    def destroy 

    end

    def update

    end