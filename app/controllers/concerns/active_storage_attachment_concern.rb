module ActiveStorageAttachmentConcern
    extend ActiveSupport::Concern
  
    included do
      def self.ransackable_attributes(auth_object = nil)
        ["blob_id", "created_at", "id", "name", "record_id", "record_type"]
      end
    end
  end
  