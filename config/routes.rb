Rails.application.routes.draw do
  # Landing page
  get 'home/index'

  # Show and save note
  get 'notes/index'
  post 'notes/update'

  # Default route
  root 'home#index'
end
