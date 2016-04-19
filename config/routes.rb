Rails.application.routes.draw do
  root "pages#index"
  namespace :api do
    namespace :v1 do
      get "/tasks", to: "tasks#index"
      post "/tasks", to: "tasks#create"
    end
  end
end
