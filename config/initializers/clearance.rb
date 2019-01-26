# frozen_string_literal: true

Clearance.configure do |config|
  config.allow_sign_up = false unless ENV['CLEARANCE_ALLOW_SIGN_UP'].present?
  config.mailer_sender = 'noreply@example.com'
  config.redirect_url = '/note/edit'
  config.rotate_csrf_on_sign_in = true
  config.routes = false
end
