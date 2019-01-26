# frozen_string_literal: true

# Application mailer
class ApplicationMailer < ActionMailer::Base
  default from: 'noreply@example.com'
  layout 'mailer'
end
