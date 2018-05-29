# frozen_string_literal: true

# Application helpers
module ApplicationHelper
  # Create a link that will have the 'active' class set if its url matches the
  # current page
  def navbar_link_to(body, url, html_options)
    html_options = {} if html_options.blank?
    html_options[:class] = {} if html_options[:class].blank?

    html_options[:class] << 'active' if current_page?(url)

    link_to body, url, html_options
  end
end
