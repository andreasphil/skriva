# frozen_string_literal: true

# Application controller
class ApplicationController < ActionController::Base
  include Clearance::Controller
  include HttpAcceptLanguage::AutoLocale
end
