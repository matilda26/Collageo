
require 'sinatra'
require 'sinatra/reloader'
# require 'pry'
require 'active_record'
require_relative 'db_config'
require_relative 'models/user'
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
    redirect to('/')
  else
    @error = "Incorrect login..."
    erb :login
  end
end

delete '/session' do
  session[:user_id] = nil
  redirect to('/login')
end

get '/home' do
  erb :home
end

get '/create' do
  # @bgcolor = "black"
  erb :create
end

get '/test' do
  erb :test
end
get '/test2' do
  erb :test2
end
