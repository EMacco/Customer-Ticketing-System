class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  skip_before_action :verify_authenticity_token

  def raise_not_found!
    render json: {
      status: :not_found,
      errors: {
        global: "No route matches #{params[:unmatched_route]}"
      }
    },
           status: :not_found
  end

  def unauthorized_access
    error_response("You are not logged in", :unauthorized)
  end
end
