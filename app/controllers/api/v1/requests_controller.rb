module Api
  module V1
    class RequestsController < Api::V1::BaseController
      def create
        return unauthorized_access unless @current_user

        request = @current_user.requests.create!(strip_whitespace(request_params))
        success_response(request, :created)
      end

      def destroy
        return unauthorized_access unless @current_user

        request = Request.find_by!(id: params["id"])

        unless admin? || owner?(request)
          return error_response({ global: "Could not find Request" },
                                :not_found)
        end

        request.destroy!
        success_response(message: "Request deleted", request: request)
      end

      private

      def request_params
        params.permit(
          :title,
          :description
        )
      end
    end
  end
end