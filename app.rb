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

  get '/console/status' do
    content_type :json
    {
      connection: settings.sockets.size
    }.to_json
  end

  put '/config/upload' do
    content_type :json

    if !params[:text] && (!params[:file] || !params[:name])
      return { status: "fail!" }.to_json
    end

    filename = "#{params[:name]}.json"
    if params[:text]
      filebody = params[:file]
    else
      filebody = params[:file][:tempfile].read
    end
    save_path = "./public/config/#{filename}"
    File.open(save_path, 'wb') do |f|
      f.write filebody
    end
    return { config: filename, status: "success" }.to_json
  end

  get '/config/list' do
    content_type :json
    return Dir.glob('public/config/*.json').map {|f| File.basename(f) }.to_json
  end

  get '/config/load/:name' do
    content_type :json

    save_path = "./public/config/#{params[:name]}"
    return File.read(save_path)
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
