module Api
  module V1
    module Auth
      class SessionsController < Api::V1::BaseController
        def logged_in
          if @current_user
            success_response(logged_in: true, user: @current_user)
          else
            success_response(logged_in: false)
          end
        end

        def login
          user_details = strip_whitespace(user_params)
          user = User.find_by_email(user_details["email"]).
                 try(:authenticate, user_details["password"])

          if user
            session[:user_id] = user.id
            success_response(user)
          else
            error_response(global: "Incorrect Email or Password")
          end
        end

        private

        def user_params
          params.permit(
            :email,
            :password
          )
        end
      end
    end
  end
end
