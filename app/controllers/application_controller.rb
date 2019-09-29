class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  skip_before_action :verify_authenticity_token

  def unauthorized_access
    error_response("You are not logged in", :unauthorized)
  end
end
