class Article < ApplicationRecord
    belongs_to :user
    has_many :article_categories
    has_many :categories, through: :article_categories

    has_one_attached :image 

    has_many :likes, dependent: :destroy
    has_many :comments, dependent: :destroy
    validates :title, presence: true, length: {minimum: 6, maximum: 100}
    validates :description, presence: true, length: {minimum: 10, maximum: 300}
    # validates :image, presence: true

    def self.ransackable_attributes(auth_object = nil)
      ["created_at", "description", "id", "title", "updated_at", "user_id"]
    end
    
    def self.ransackable_associations(auth_object = nil)
      ["article_categories", "categories", "comments", "image_attachment", "image_blob", "likes", "user"]
    end
  
    def image_url
        if image.attached?
          Rails.application.routes.url_helpers.rails_blob_url(image, only_path: true)
        end
    end
end