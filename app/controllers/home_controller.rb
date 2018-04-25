class HomeController < ApplicationController
  before_action :redirect_if_logged_in
  layout 'content_left'

  # GET home/index
  def index
    @title = t('.title')
  end

  private

  def redirect_if_logged_in
    redirect_to edit_note_path if signed_in?
  end
end
