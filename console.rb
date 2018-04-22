# require 'pry'
require 'active_record'
require 'carrierwave'
require 'carrierwave'
require 'carrierwave/orm/activerecord'
require_relative 'models/carrierwave_config'


ActiveRecord::Base.logger = Logger.new(STDERR)
require_relative 'db_config'
require_relative 'models/user'
require_relative 'models/asset'
require_relative 'models/image_uploader'
