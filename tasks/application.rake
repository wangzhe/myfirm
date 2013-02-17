desc "Launch app in default mode"
task :app => 'app:run'

namespace :app do
  desc "Launch the app"
  task :run do
    sh 'coffee startup'
  end

  desc "Start the app with auto-realod"
  task :watch do
    sh './node_modules/.bin/supervisor -i specs,views -e coffee,js startup.coffee'
  end
end