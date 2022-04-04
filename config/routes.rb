Rails.application.routes.draw do
  resources :urls
  get '/all_urls' => 'urls#all_list'
  root 'urls#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
