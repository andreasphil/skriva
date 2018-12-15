# frozen_string_literal: true

Rails.application.routes.draw do
  # Landing page
  get 'home/index'

  # User and authentication (mostly managed by clearance)
  resource :user, only: %i[edit update]

  # Show and save note
  resource :note, only: %i[edit update]

  # Default route
  root 'home#index'
end
