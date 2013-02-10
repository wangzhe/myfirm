desc "Launch app in default mode"
task :spec => 'spec:spec'

namespace :spec do
  desc "test"
  task :spec do
    #sh 'jasmine-node spec/ --coffee --verbose --color'
    sh %Q[mocha -r 'spec/specHelper.js' -R spec -w -G -t 5000 'spec/*_spec.coffee']
  end
end