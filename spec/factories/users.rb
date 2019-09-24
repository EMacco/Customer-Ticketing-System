FactoryBot.define do
  factory :user do
    first_name { Faker::Internet.name }
    last_name { Faker::Internet.parent_name }
    email { Faker::Internet.email }
    password_digest { Faker::Internet.password }
    phone { Faker::Number.number(digits: 12) }
  end
end
