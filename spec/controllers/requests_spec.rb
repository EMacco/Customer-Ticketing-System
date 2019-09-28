
require 'rails_helper'

describe Api::V1::RequestsController, type: :controller do
  context "when user is logged in" do
    let!(:new_user) { create(:user) }

    context "User is logged in" do
      it "creates the request" do
        login new_user
        post :create, params: {
            title: Faker::Book::title,
            description: Faker::Lorem::sentence
        }

        expect(response).to have_http_status(:created)
      end
    end

    context "User is not logged in" do
      it "should return authentication error" do
        post :create, params: {}

        expect(response).to have_http_status(:unauthorized)
      end
    end
  end
end
