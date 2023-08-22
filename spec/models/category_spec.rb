require 'rails_helper'

RSpec.describe Category, type: :model do
  it "should have a name" do
    category = Category.new
    expect(category.name).to be nil
    category.name = "Universe"
    expect(category.name).to eq("Universe")
  end
  it "should not save a category with an empty name" do
    category = Category.new(name: "")
    expect(category).to_not be_valid
    expect(category.errors[:name]).to include("can't be blank")
  end
  it "should not save a category with a name that is too short" do
    category = Category.new(name: "Un")
    expect(category).to_not be_valid
    expect(category.errors[:name]).to include("is too short (minimum is 3 characters)")
  end

  it "should not save a category with a duplicate name" do
    category1 = Category.create(name: "Universe")
    category2 = Category.new(name: "Universe")
    expect(category2).to_not be_valid
    expect(category2.errors[:name]).to include("has already been taken")
  end

  it "should have many articles" do
       category1 = Category.new(name: "Universe")
        expect(category1.articles).to be_empty
        user = User.create(username: "Prashant", email:"prashant@abc.com", password:"prashant")
        article1 = Article.new(title: "Article1 title", description: "Description of article1")
        article2 = Article.new(title: "Article2 title", description: "Description of article2")
        article1.user = user
        article2.user = user
        article1.categories<< category1
        article2.categories<< category1
        article1.save
        article2.save
        category1.save
        expect(category1.articles).to_not be_empty
  end
end

