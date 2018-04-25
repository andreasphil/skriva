class UsersController < ApplicationController
  before_action :require_login
  before_action :set_user
  layout 'panel'

  # GET user/edit
  def edit
    @title = t('.title')
  end

  # PATCH, PUT user/update
  def update
    params = user_params

    # Don't touch the password if it hasn't been changed
    params.delete(:password) if params[:password].blank?

    if @user.update(params)
      flash[:success] = t('.success')
      redirect_to edit_user_path
    else
      flash[:error] = t('.error')
      redirect_to edit_user_path
    end
  end

  private

  # Load user model into context
  def set_user
    @user = current_user # TODO: Use only this?
  end

  # Permitted parameters for update
  def user_params
    params.require(:user).permit(:email, :password)
  end

end
