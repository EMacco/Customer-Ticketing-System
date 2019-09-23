require "rails_helper"

RSpec.describe Request, type: :model do
  describe "Association" do
    it { should belong_to(:user) }
    it { should have_many(:comments) }
  end

  describe "Validations" do
    describe "#title" do
      it { should validate_presence_of(:title) }
      it { should validate_length_of(:title).is_at_most(30) }
    end

    describe "#description" do
      it { should validate_presence_of(:description) }
      it { should validate_length_of(:description).is_at_most(500) }
    end

    describe "#status" do
      it { should allow_values("open", "close", nil).for(:status) }
    end
  end
end
