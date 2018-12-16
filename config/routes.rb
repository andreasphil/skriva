# frozen_string_literal: true

Rails.application.routes.draw do
  # Landing page
  get 'home/index'

  # User
  resource :user, only: %i[edit update]

  resources :users, controller: 'clearance/users', only: [:create] do
    resource :password,
             controller: 'passwords',
             only: %i[create edit update]
  end

  get '/sign_up', to: 'clearance/users#new', as: 'sign_up'

  # Password reset
  resources :passwords, controller: 'passwords', only: %i[create new]

  # Session
  resource :session, controller: 'sessions', only: [:create]
  get '/session', to: redirect('/sign_in')
  get '/sign_in', to: 'sessions#new', as: 'sign_in'
  delete '/sign_out', to: 'sessions#destroy', as: 'sign_out'

  # Show and save note
  resource :note, only: %i[edit update]

  # Default route
  root 'home#index'
end
