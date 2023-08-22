require 'rails_helper'
RSpec.describe User, type: :model do
  it "should have a username" do
    user = User.new
    expect(user.username).to be nil
    user.username= "myusername"
    expect(user.username).to eq("myusername")
  end
  it "should have a email" do
    user = User.new
    expect(user.email).to be nil

    user.email = "myusername@abc.com"
    expect(user.email).to eq("myusername@abc.com")
  end

  it "should not save a user if the username is too short" do
    user = User.new(username: "sh", email: "shl@abc.com", password: "quitestrong")
    expect(user).to_not be_valid
    expect(user.errors[:username]).to include("is too short (minimum is 3 characters)")
  end
  it "should have a password" do
    user = User.new
    expect(user.password).to be nil
    user.password = "MyPassword"
    expect(user.password).to eq("MyPassword")
  end
  it "should not save a user with an empty password" do
    user = User.new(password: "")
    expect(user).to_not be_valid
    expect(user.errors[:password]).to include("can't be blank")
  end

  it "should have many articles (checking for association)" do
    user = User.create(username: "Prashant", email:"prashant@abc.com", password:"prashant")
    expect(user.articles).to be_empty
     article1 = Article.create(title: "Article1 title", description: "Description of article1")
     article2 = Article.create(title: "Article2 title", description: "Description of article2")
     article1.user = user
     article2.user = user
     article1.save
     article2.save
     expect(user.articles).to_not be_empty
 end
end