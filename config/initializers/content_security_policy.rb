# Be sure to restart your server when you modify this file.

# Define an application-wide content security policy
# For further information see the following documentation:
# developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy

Rails.application.config.content_security_policy do |p|
  p.connect_src :self,
    :https,
    "http://localhost:3035",
    "ws://localhost:3035" if Rails.env.development?
end
