class NotesController < ApplicationController
  before_action :require_login
  before_action :set_note
  before_action :set_page_controller
  layout 'content_left'

  # GET notes/index
  def index
    if @note.nil?
      current_user.create_note(text: "Hello, here's your note!")
      @note = current_user.note
    end
  end

  # POST notes/update
  def update
    if @note.update(note_params)
      redirect_to notes_index_path
    else
      render notes_path # TODO: Does this make sense?
    end
  end

  private

  # Permitted parameters for update
  def note_params
    params.require(:note).permit(:text)
  end

  # Load note model to context
  def set_note
    @note = current_user.note
  end

  # Set page-wide JS controller
  def set_page_controller
    @page_controller = 'notes'
  end
end
