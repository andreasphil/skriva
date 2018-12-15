# frozen_string_literal: false

# Application helpers
module ApplicationHelper
  # Create a link that will have the 'active' class set if its url matches the
  # current page
  def navbar_link_to(body, url, html_options)
    html_options = {} if html_options.blank?
    html_options[:class] = {} if html_options[:class].blank?

    active_class_name = 'active'
    active_class_name.prepend(' ') if html_options[:class].is_a?(String)
    html_options[:class] << active_class_name if current_page?(url)

    link_to body, url, html_options
  end
end
