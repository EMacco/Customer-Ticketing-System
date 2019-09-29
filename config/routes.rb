Rails.application.routes.draw do
  root "static#index"

  namespace :api do
    namespace :v1 do
      resources :requests, only: [:create, :destroy, :index]
      get "/requests/:id", to: "requests#get_specific"
      patch "/users/:id", to: "users#update_role"

      post "/comments/:request_id", to: "comments#create"

      namespace :auth do
        resources :register, only: [:create]
        delete :logout, to: "sessions#logout"
        get :logged_in, to: "sessions#logged_in"
        post :login, to: "sessions#login"
      end
    end
    match '*unmatched_route', :to => 'base#raise_not_found!', :via => :all
  end

  match '*unmatched_route', :to => 'static#index', :via => :all
end
