require 'json'

require 'sinatra'
require 'sinatra/reloader'
require 'sinatra-websocket'

require 'slim'

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
