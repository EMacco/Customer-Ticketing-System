module Api
  module V1
    class CommentsController < Api::V1::BaseController
      def create
        return unauthorized_access unless @current_user

        comment_details = strip_whitespace comment_params
        request = Request.find_by!(id: comment_details["request_id"])
        unless admin? || agent? || owner?(request)
          return error_response({ global: "You don't have this permission" },
                                :forbidden)
        end

        puts request.comments.count
        unless request.comments.count > 0 || agent? || admin?
          return error_response({ global: "You cannot start a conversation" },
                                :forbidden)
        end

        comment = request.comments.create!(
          text: comment_details["text"],
          user_id: @current_user.id
                                           )
        success_response comment
      end

      private

      def comment_params
        params.permit(:text, :request_id)
      end
    end
  end
end
