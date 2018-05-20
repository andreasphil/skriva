# frozen_string_literal: true

# Notes controller
class NotesController < ApplicationController
  before_action :require_login
  before_action :set_note
  before_action :set_page_controller
  layout 'content_left'

  # GET note/edit
  def edit
    @title = t('.title')

    return unless @note.nil?

    # Create a new note if none exists for the user
    current_user.create_note(text: "Hello, here's your note!")
    @note = current_user.note
  end

  # PATCH note
  def update
    raise unless @note.update(note_params)
  end

  private

  # Set page-wide JS controller
  def set_page_controller
    @page_controller = 'notes'
  end

  # Load note model into context
  def set_note
    @note = current_user.note
  end

  # Permitted parameters for update
  def note_params
    params.require(:note).permit(:text)
  end
end
