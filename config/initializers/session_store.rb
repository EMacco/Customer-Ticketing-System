if Rails.env == "production"
  Rails.application.config.session_store :cookie_store, key: "_customer-ticketing-system_", domain: "customer-ticketing-system-api.herokuapp.com"
else
  Rails.application.config.session_store :cookie_store, key: "_customer-ticketing-system_"
end
