Rails.application.routes.draw do
  devise_for :users, controllers: { sessions: 'api/v1/sessions' }
      namespace :api do
        namespace :v1 do
          devise_scope :user do
            get '/login', to: 'sessions#new'
            post '/login', to: 'sessions#create'
            delete '/logout', to: 'sessions#destroy'
            get '/signup', to: 'users#new'
            post '/signup', to: 'users#create'
            get '/users', to: 'users#index'
            get '/users/:id', to: 'users#show'
            get 'categories/:id', to: 'categories#show'
          end
          resources :articles
          resources :users
          resources :categories, except: [:destroy]
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
