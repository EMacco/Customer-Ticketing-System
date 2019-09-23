require "rails_helper"

RSpec.describe User, type: :model do
  describe "Association" do
    it { should have_many(:requests) }
    it { should have_many(:comments) }
  end

  describe "Validations" do
    describe "#email" do
      it { should validate_presence_of(:email) }
      it { should_not allow_value("blah").for(:email) }
      it { should allow_value("a@b.com").for(:email) }
    end

    describe "#name" do
      it { should validate_presence_of(:first_name) }
      it { should validate_presence_of(:last_name) }
      it { should validate_length_of(:first_name).is_at_least(2) }
      it { should validate_length_of(:last_name).is_at_least(2) }
    end

    describe "#password_digest" do
      it { should validate_presence_of(:password_digest) }
      it { should validate_length_of(:password_digest).is_at_least(6) }
    end

    describe "#phone" do
      it { should validate_presence_of(:phone) }
      it { should validate_length_of(:phone).is_at_least(11).is_at_most(14) }
    end

    describe "#role" do
      it { should allow_values("admin", "user", "agent", nil).for(:role) }
    end
  end
end
