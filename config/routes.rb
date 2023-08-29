Rails.application.routes.draw do
  devise_for :users, controllers: { sessions: 'api/v1/sessions' }
      namespace :api do
        namespace :v1 do
          resources :articles
          devise_scope :user do
            get 'login', to: 'sessions#new'
            post 'login', to: 'sessions#create'
          end    
          # post 'login', to: 'sessions#create'
          # get 'login', to: 'sessions#create'
          post 'signup', to: 'users#create'
          get 'signup', to: 'users#create'
        end
      end
      

    
      root 'pages#home'
      get 'about', to: 'pages#about'
      resources :articles, only: [:show, :index, :new, :create, :edit, :update, :destroy]
      get 'signup', to: 'users#new'
      resources :users, except: [:new]
      get 'login', to: 'sessions#new'
      post 'login', to: 'sessions#create'
      delete 'logout', to: 'sessions#destroy'
      resources :categories, except: [:destroy]

      get 'search', to: 'search#search_user'

end
