desc "migrate database"
task :db => 'db:migrate'

namespace :db do

  desc "create database"
  task :create do
    #sh 'jasmine-node spec/ --coffee --verbose --color'
  end

  desc "migrate"
  task :migrate do
    #sh 'jasmine-node spec/ --coffee --verbose --color'
  end

  desc "drop down database"
  task :drop do
    #sh 'jasmine-node spec/ --coffee --verbose --color'
  end

  desc "database reset"
  task :reset do
    sh 'coffee ./db/reset'
  end
end