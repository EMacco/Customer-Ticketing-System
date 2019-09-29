module Api
  module V1
    class UsersController < Api::V1::BaseController
      def update_role
        return unauthorized_access unless @current_user
        return error_response({ global: "You don't have this permission" },
                              :forbidden) unless admin?
        puts user_params
        user = User.find_by!(id: user_params["id"])
        user.role = user_params["role"] || "user"
        user.save!
        success_response user
      end

      private

      def user_params
        params.permit(
            :id,
            :role
        )
      end
    end
  end
end