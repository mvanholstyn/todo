ActionController::Routing::Routes.draw do |map|
  map.resources :todos
  map.root :todos
end
