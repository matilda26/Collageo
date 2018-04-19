class User < ActiveRecord::Base
  has_secure_password
  has_many :assets
  # validates :dishname, presence: true
  # validates :foodimage, presence: true
end
