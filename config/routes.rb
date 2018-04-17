Rails.application.routes.draw do
  get 'home/index'

  resources :notes, only: :index

  root 'home#index'
end
