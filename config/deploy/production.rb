# Simple Role Syntax
# ==================
# Supports bulk-adding hosts to roles, the primary server in each group
# is considered to be the first unless any hosts have the primary
# property set.  Don't declare `role :all`, it's a meta role.

role :web, %w{web101.mimi web102.mimi}


# Extended Server Syntax
# ======================
# This can be used to drop a more detailed server definition into the
# server list. The second argument is a, or duck-types, Hash and is
# used to set extended properties on the server.

server 'web101.mimi', user: 'rails', roles: %w{web}
server 'web102.mimi', user: 'rails', roles: %w{web}


# Custom SSH Options
# ==================
# You may pass any option but keep in mind that net/ssh understands a
# limited set of options, consult[net/ssh documentation](http://net-ssh.github.io/net-ssh/classes/Net/SSH.html#method-c-start).
#
# Global options
# --------------
#  set :ssh_options, {
#    keys: %w(/home/rlisowski/.ssh/id_rsa),
#    forward_agent: false,
#    auth_methods: %w(password)
#  }
#
# And/or per server (overrides global)
# ------------------------------------
# server 'example.com',
#   user: 'user_name',
#   roles: %w{web app},
#   ssh_options: {
#     user: 'user_name', # overrides user setting above
#     keys: %w(/home/user_name/.ssh/id_rsa),
#     forward_agent: false,
#     auth_methods: %w(publickey password)
#     # password: 'please use keys'
#   }

namespace :deploy do
  desc 'Symlink all the js files to /user/share/javascript/'
  task :symlink_javascript_files do
    on roles(:web) do
      within release_path do
        execute :sudo, 'ln -nfs', release_path.join('public/javascript/html5shiv.min.js'), '/usr/share/javascript/html5shiv.min.js'
        execute :sudo, 'ln -nfs', release_path.join('public/javascript/jquery-1.11.0.min.js'), '/usr/share/javascript/jquery-1.11.0.min.js'
        execute :sudo, 'ln -nfs', release_path.join('public/javascript/mmgd.min.js'), '/usr/share/javascript/mmgd.min.js'
        execute :sudo, 'ln -nfs', release_path.join('public/javascript/modernizr.custom.17715.min.js'), '/usr/share/javascript/modernizr.custom.17715.min.js'
        execute :sudo, 'ln -nfs', release_path.join('public/javascript/skrollr-colors.min.js'), '/usr/share/javascript/skrollr-colors.min.js'
        execute :sudo, 'ln -nfs', release_path.join('public/javascript/skrollr.min.js'), '/usr/share/javascript/skrollr.min.js'
        execute :sudo, 'ln -nfs', release_path.join('public/javascript/skrollr.stylesheets.min.js'), '/usr/share/javascript/skrollr.stylesheets.min.js'
      end
    end
  end
end
after 'deploy:updating', 'deploy:symlink_javascript_files'
