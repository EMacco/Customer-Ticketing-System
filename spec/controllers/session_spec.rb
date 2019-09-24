require "rails_helper"

RSpec.describe "Session API", type: :request do
  describe "GET /auth/logged_in" do
    context "when user is not logged in" do
      before { get "/api/v1/auth/logged_in" }

      it "returns logged_in false" do
        expect(json["payload"]["logged_in"]).to eq(false)
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

  describe "POST /auth/login" do
    new_user_details = {
      email: "testing@test.com",
      password: "testpassword"
    }
    let!(:new_user) do
      create :user,
             email: new_user_details[:email],
             password: new_user_details[:password]
    end
    let(:valid_credentials) do
      {
        email: new_user_details[:email],
        password: new_user_details[:password]
      }
    end

    context "login credentials are valid" do
      before { post "/api/v1/auth/login", params: valid_credentials }
      it "returns user details" do
        expect(json["payload"]["email"]).to eq(new_user[:email])
      end

      it "returns 200 status" do
        expect(response).to have_http_status(200)
      end

      after { get "/api/v1/auth/logged_in" }
    end

    context "login credentials are invalid" do
      before { post "/api/v1/auth/login", params: {} }
      it "returns invalid request" do
        expect(json["errors"]["global"]).to eq("Incorrect Email or Password")
      end

      it "returns 400 status" do
        expect(response).to have_http_status(400)
      end
    end
  end
end
