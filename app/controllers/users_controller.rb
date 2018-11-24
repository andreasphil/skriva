# frozen_string_literal: true

# User controller
class UsersController < ApplicationController
  before_action :require_login
  before_action :set_user
  before_action :validate_password_confirmation, only: :update
  layout 'panel'

  # GET user/edit
  def edit
    @title = t('.title')
  end

  # PATCH user/update
  def update
    params = user_params

    # Don't touch the password if the field is empty
    params.delete(:password) if params[:password].blank?

    if @user.update(params)
      flash[:success] = t('.success')
    else
      flash[:error] = t('.error')
    end

    redirect_to edit_user_path
  end

  private

  # Load user model into context
  def set_user
    @user = current_user
  end

  # Make sure that password and confirmation match
  def validate_password_confirmation
    password_params = params.require(:user).permit(:password,
                                                   :password_confirmation)

    # We're done if password and confirmation match
    return if password_params[:password] ==
              password_params[:password_confirmation]

    # Otherwise, cancel request and show an error message
    flash[:error] = t('.passwords_dont_match')
    redirect_to edit_user_path
  end

  # Permitted parameters for update
  def user_params
    params.require(:user).permit(:email, :password)
  end
end
