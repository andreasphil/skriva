# frozen_string_literal: true

Clearance.configure do |config|
  # TODO: Replace address
  config.mailer_sender = 'no-reply@example.com'

  config.redirect_url = '/note/edit'
  config.rotate_csrf_on_sign_in = true
end
