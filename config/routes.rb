Rails.application.routes.draw do
  # Landing page
  get 'home/index'

  # User and authentication (mostly managed by clearance)
  resource :user, only: [:edit, :update]

  # Show and save note
  # TODO: Use single resource
  get 'notes/index'
  post 'notes/update'

  # Default route
  root 'home#index'
end
