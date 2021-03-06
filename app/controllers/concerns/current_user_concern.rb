module CurrentUserConcern
  extend ActiveSupport::Concern

  included do
    before_action :set_current_user
  end

  def set_current_user
    if session[:user_id]
      @current_user = User.find(session[:user_id])
    end
  end

  def owner?(obj)
    @current_user.id == obj.user_id
  end

  def admin?
    @current_user.role == "admin"
  end

  def agent?
    @current_user.role == "agent"
  end

  def logout
    reset_session
    render json: { status: 200, logged_in: false }
  end
end
