# require 'pry'
require 'active_record'
require 'carrierwave'
require 'carrierwave/orm/activerecord'



ActiveRecord::Base.logger = Logger.new(STDERR)
require_relative 'db_config'
require_relative 'models/user'
require_relative 'models/asset'
binding.pry
