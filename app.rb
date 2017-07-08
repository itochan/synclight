require 'json'

require 'sinatra/base'
require 'sinatra/reloader'
require 'sinatra-websocket'

require 'slim'

class App < Sinatra::Base
  set :sockets, []
  set :color, '#ffffff'

  get '/' do
    slim :index
  end

  get '/websocket' do
    if request.websocket?
      request.websocket do |ws|
        ws.onopen do
          settings.sockets << ws
          ws.send(settings.color)
        end
        ws.onclose do
          settings.sockets.delete(ws)
        end
      end
    end
  end

  get '/console' do
    slim :console
  end

  post '/color/update' do
    params = JSON.parse(request.body.read)

    settings.color = params['color']
    settings.sockets.each do |s|
      s.send(settings.color)
    end

    content_type :json
    { color: settings.color }.to_json
  end

  run! if app_file == $0
end
