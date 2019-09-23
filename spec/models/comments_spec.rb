require "rails_helper"

RSpec.describe Comment, type: :model do
  describe "Association" do
    it { should belong_to(:user) }
    it { should belong_to(:request) }
  end

  describe "Validations" do
    describe "#text" do
      it { should validate_presence_of(:text) }
      it { should validate_length_of(:text).is_at_least(3).is_at_most(50) }
    end
  end
end
