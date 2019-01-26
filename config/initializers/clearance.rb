# frozen_string_literal: true

Clearance.configure do |config|
  config.routes = false
  # TODO: Replace address
  config.mailer_sender = 'no-reply@example.com'

  config.redirect_url = '/note/edit'
  config.rotate_csrf_on_sign_in = true

  config.allow_sign_up = false unless ENV['CLEARANCE_ALLOW_SIGN_UP'].present?
end
