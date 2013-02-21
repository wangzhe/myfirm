desc "Launch app in default mode"
task :spec => 'spec:spec'

namespace :spec do
  desc "test"
  task :spec do
    #sh 'jasmine-node spec/ --coffee --verbose --color'
    sh %Q[mocha -r 'specs/specHelper.js' -R spec -G -t 5000 specs/*_spec.coffee]
  end
end