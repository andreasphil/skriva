class User < ApplicationRecord
  include Clearance::User
  has_one :note, dependent: :destroy
end
