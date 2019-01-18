# frozen_string_literal: true

# Notes controller
class NotesController < ApplicationController
  before_action :require_login
  before_action :set_note
  before_action :set_client_locales
  layout 'application'

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

  # Load note model into context
  def set_note
    @note = current_user.note
  end

  # Pass some i18n phrases to the client to be used in JavaScript
  def set_client_locales
    @client_locales = {
      'notes.edit.saved' => t('.saved'),
      'notes.edit.saving_error' => t('.saving_error'),
      'notes.edit.saving' => t('.saving'),
      'notes.edit.unsaved_changes' => t('.unsaved_changes')
    }
  end

  # Permitted parameters for update
  def note_params
    params.require(:note).permit(:text)
  end
end
