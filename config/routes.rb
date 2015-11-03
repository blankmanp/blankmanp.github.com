Rails.application.routes.draw do
  root :to => 'users#index'

  get '/blog' => 'users#show_blog'
  get '/blog/:type/:page' => 'users#show_blog'
  get '/blankmanp' => 'users#login_page'
  get '/blankmanp/login' => 'users#login_page'
  get '/blankmanp/logout' => 'users#logout'
  get '/blankmanp/manage' => 'users#manage'
  get '/blankmanp/autocomplete' => 'users#auto_complete'

  post '/login' => 'users#login'

end
