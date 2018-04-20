
require 'sinatra'
require 'sinatra/reloader'
require 'pry'
require 'active_record'
require 'carrierwave'
require 'carrierwave/orm/activerecord'
require_relative 'models/carrierwave_config'
require_relative 'db_config'
require_relative 'models/user'
require_relative 'models/asset'
require_relative 'models/image_uploader'


enable :sessions

helpers do
  def current_user
    User.find_by(id: session[:user_id])
  end
  def logged_in?
    !!current_user
  end
end

get '/' do
  if logged_in?
    @username = current_user.username
  end
  erb :index
end


# LOGIN
get '/login' do
  @bgcolor = "#f73500"
  @color = "white"
  erb :login
end

post '/session' do
  user = User.find_by(email: params[:email])
  if user && user.authenticate(params[:password])
    session[:user_id] = user.id
    redirect to('/home')
  else
    @error = "Incorrect login..."
    erb :login
  end
end

# CREATE ACCOUNT
get '/login/new' do
  @bgcolor = "#ffe500"
  @color = "#f73500"
  erb :new
end

post '/new_user' do
  user = User.new
  user.username = params[:username]
  user.email = params[:email]
  user.password = params[:password]
  user.save
  session[:user_id] = user.id
  redirect to('/home')
end

delete '/session' do
  session[:user_id] = nil
  redirect to('/login')
end

get '/home' do
  @username = current_user.username
  # @color = 'black'
  erb :userhome
end

get '/create' do
  @username = current_user.username
  @bgcolor = "#00028e"
  @color = "white"
  erb :create
end
get '/create/select' do
  @username = current_user.username
  @bgcolor = "#ff70a2"
  @assets = Asset.all
  erb :select
end
delete '/create/delete' do
  # binding.pry
  Asset.find(params[:id]).delete

  redirect to '/create/select'
end

get '/create/upload' do
  redirect to ('/create/select')
end


post '/create/upload' do
  asset = Asset.new
  asset.image = params[:image]
  asset.user_id = current_user.id
  asset.save
  redirect to('/create/select')
end
