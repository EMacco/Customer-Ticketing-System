require "rails_helper"

describe Api::V1::RequestsController, type: :controller do
  let!(:new_user) { create(:user) }
  let!(:user2) { create :user }
  let!(:new_request) do
    user2.requests.create(title: Faker::Book.title,
                          description: Faker::Lorem.sentence)
  end

  describe "requests#create" do
    context "User is logged in" do
      it "creates the request" do
        login new_user
        post :create, params: {
          title: Faker::Book.title,
          description: Faker::Lorem.sentence
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

  describe "requests#delete" do
    context "Request does not exist" do
      it "should return could not find request" do
        login new_user
        delete :destroy, params: { id: 0 }
        expect(response).to have_http_status(:not_found)
        expect(json["errors"]["global"]).to eq("Couldn't find Request")
      end
    end

    context "User is not owner of request" do
      it "should return no permission" do
        login new_user
        delete :destroy, params: { id: new_request["id"] }
        expect(response).to have_http_status(:forbidden)
        expect(json["errors"]["global"]).to eq("You don't have this permission")
      end
    end

    context "User is owner of request" do
      it "should delete request" do
        login user2
        delete :destroy, params: { id: new_request.id }
        expect(response).to have_http_status(:ok)
        expect(json["payload"]["message"]).to eq("Request closed")
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
