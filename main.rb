
require 'sinatra'
# require 'sinatra/reloader'
# require 'pry'
require 'active_record'
require 'carrierwave'
require 'carrierwave/orm/activerecord'
require 'carrierwave/processing/mini_magick'
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
    @user = current_user
  end
  erb :index
end


# LOGIN
get '/login' do
  @bgcolor = '#0000ff'
  @color = "yellow"
  erb :login
end

post '/session' do
  user = User.find_by(email: params[:email])
  if user && user.authenticate(params[:password])
    session[:user_id] = user.id
    redirect to('/create/select')
  else
    @error = "Incorrect login..."
    @bgcolor = 'red'
    @color = "white"
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
  redirect to('/create/select')
end

delete '/session' do
  session[:user_id] = nil
  redirect to('/login')
end

get '/home' do
  @user = current_user
  @color = '#0631b2'
  @bgcolor = "#6cd6fc"
  @assets = Asset.where(user_id: current_user.id)
  erb :userhome
end

get '/create/select' do
  @user = current_user
  @color = '#0631b2'
  @bgcolor = "#6cd6fc"
  @assets = Asset.where(user_id: current_user.id)
  # @selected =
  erb :select
end

get '/create/upload' do
  redirect to ('/create')
end

post '/create/upload' do
  asset = Asset.new
  asset.image = params[:image]
  asset.user_id = current_user.id
  asset.save
  redirect to('/create/select')
end

delete '/create/delete' do
  Asset.find(params[:id]).delete
  redirect to '/create/select'
end

post '/create' do
  @assets = Asset.find(params[:id])
  @user = current_user
  @bgcolor = "#00028e"
  @color = "white"
  erb :create
end

get '/create' do
  @user = current_user
  @bgcolor = "#E70200"
  @color = "white"
  @assets = Asset.where(user_id: current_user.id)
  erb :create
end
