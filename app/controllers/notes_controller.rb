class NotesController < ApplicationController
  before_action :require_login
  before_action :set_note

  def index
    if @note.nil?
      current_user.create_note(text: "New Note")
      @note = current_user.note
    end
  end

  def update
    if @note.update(note_params)
      redirect_to notes_index_path
    else
      render notes_path
    end
  end

  private

  def note_params
    params.require(:note).permit(:text)
  end

  def set_note
    @note = current_user.note
  end
end
