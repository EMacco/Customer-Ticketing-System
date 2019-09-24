require "rails_helper"

RSpec.describe "Session API", type: :request do
  describe "GET /auth/logged_in" do
    context "when user is not logged in" do
      before { get "/api/v1/auth/logged_in" }

      it "returns logged_in false" do
        expect(json["logged_in"]).to eq(false)
      end

      it "returns status code 200" do
        expect(response).to have_http_status(200)
      end
    end
  end

  describe "GET /auth/logout" do
    context "logout user" do
      before { delete "/api/v1/auth/logout" }

      it "returns logged_in false" do
        expect(json["logged_in"]).to eq(false)
      end

      it "returns status code 200" do
        expect(response).to have_http_status(200)
      end
    end
  end
end
