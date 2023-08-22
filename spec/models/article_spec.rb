require 'rails_helper'
RSpec.describe Article, type: :model do
  it "should have a title" do
    article = Article.new
    expect(article.title).to be nil
    article.title = "My first article"
    expect(article.title).to eq("My first article")
  end
  it "should have a description" do
    article = Article.new
    expect(article.description).to be nil

    article.description = "This is my first article body"
    expect(article.description).to eq("This is my first article body")
  end

  it "should not save a article if the article's title is too short" do
    article = Article.new(title: "shor", description: "this is the big description")
    expect(article).to_not be_valid
    expect(article.errors[:title]).to include("is too short (minimum is 6 characters)")
  end

  it "should not save a article if the article's description is too short " do
    article = Article.new(title: "big title", description: "sss")
    expect(article).to_not be_valid
  end

  it "should have many categories" do
    article1 = Article.new(title: "Article1 title", description: "This is the description of the article1")
    expect(article1.categories).to be_empty
    user = User.create(username: "Prashant", email:"prashant@abc.com", password:"prashant")
    article1.user = user
    category1 = Category.new(name: "category1")
    category2 = Category.new(name: "category2")
    category1.articles << article1
    category2.articles << article1
    category1.save
    category2.save
    article1.save
    expect(article1.categories).to_not be_empty
  end

  it "should belong to a user" do
    article1 = Article.new(title: "Article1 title", description: "This is the description of the article1")
    expect(article1.user).to be nil
    user = User.create(username: "Prashant", email:"prashant@abc.com", password:"prashant")
    article1.user = user
    expect(article1.user).to eq(user)
  end
end