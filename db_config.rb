require 'active_record'

options = {
  adapter: 'postgresql',
  database: 'collageo'
}

ActiveRecord::Base.establish_connection( ENV['DATABASE_URL'] || options)
