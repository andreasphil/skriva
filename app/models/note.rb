# frozen_string_literal: true

# Note model
class Note < ApplicationRecord
  belongs_to :user
end
