ActiveAdmin.register User do

  filter :username_cont, label: 'Username' 
  filter :email_cont, label: 'Email' 
  permit_params :username, :email, :admin, :reset_password_token, :reset_password_sent_at, :remember_created_at, :encrypted_password, :confirmation_token, :confirmed_at, :confirmation_sent_at, :unconfirmed_email
  
end
