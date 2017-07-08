require 'sinatra/base'
require 'sinatra-websocket'

require 'slim'

class App < Sinatra::Base
  set :sockets, []

  get '/' do
    slim :index
  end

  get '/websocket' do
    if request.websocket?
      request.websocket do |ws|
        ws.onopen do
          settings.sockets << ws
        end
        ws.onclose do
          settings.sockets.delete(ws)
        end
      end
    end
  end

  post '/color/update' do
    color = params[:color]
    settings.sockets.each do |s|
      s.send(color)
    end
  end

  run! if app_file == $0
end
