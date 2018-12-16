# frozen_string_literal: true

# Sessions controller
class SessionsController < Clearance::SessionsController
  before_action :set_render_notifications, only: %i[new create]

  private

  # Render notifications locally
  def set_render_notifications
    @template_renders_notifications = true
  end
end
