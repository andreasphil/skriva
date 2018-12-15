# frozen_string_literal: true

require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Skriva
  class Application < Rails::Application # rubocop:disable Style/Documentation
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 5.2

    # Set layouts for clearance
    config.to_prepare do
      Clearance::PasswordsController.layout 'fullscreen_panel'
      Clearance::SessionsController.layout 'fullscreen_panel'
      Clearance::UsersController.layout 'fullscreen_panel'
    end

    # Set available localizations
    config.i18n.available_locales = %w[en de]

    # Settings in config/environments/* take precedence over those specified
    # here. Application configuration can go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded after loading
    # the framework and any gems in your application.
  end
end
