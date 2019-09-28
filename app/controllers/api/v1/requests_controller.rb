module Api
  module V1
    class RequestsController < Api::V1::BaseController
      def create
        return error_response("You are not logged in", :unauthorized) unless @current_user
        request = @current_user.requests.create!(strip_whitespace(request_params))
        success_response(request, :created)
      end

      private

      def request_params
        params.permit(
                  :title,
                  :description,
        )
      end
    end
  end
end
