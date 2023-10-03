class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :article
  
  def self.ransackable_attributes(auth_object = nil)
    ["article_id", "content", "created_at", "id", "updated_at", "user_id"]
  end
end
