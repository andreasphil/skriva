# frozen_string_literal: true

# Home controller
class HomeController < ApplicationController
  before_action :redirect_if_logged_in
  layout 'application'

  # GET home/index
  def index
    @title = t('.title')
  end

  private

  # Don't show homepage if the user is logged in
  def redirect_if_logged_in
    redirect_to edit_note_path if signed_in?
  end
end
