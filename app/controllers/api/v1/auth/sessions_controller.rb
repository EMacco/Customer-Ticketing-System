module Api
  module V1
    module Auth
      class SessionsController < Api::V1::BaseController
        def logged_in
          if @current_user
            json_response(logged_in: true, user: @current_user)
          else
            json_response(logged_in: false)
          end
        end
      end
    end
  end
end
