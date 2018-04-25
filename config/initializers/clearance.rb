Clearance.configure do |config|
  # TODO: Replace address
  config.mailer_sender = "reply@example.com"

  config.redirect_url = '/note/edit'
  config.rotate_csrf_on_sign_in = true
end
