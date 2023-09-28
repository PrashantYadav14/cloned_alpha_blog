ActiveAdmin.register Article do

   permit_params :title, :description, :user_id
   
   index do
    selectable_column
    column :id
    column :title
    column :description
    column :user
    column :image do |article|
      if article.image.attached?
        image_tag(article.image, height: '100')
      else
        content_tag(:span, "No Image")
      end
    end
    actions
  end

  form do |f|
    f.semantic_errors
    f.inputs do
      f.input :title
      f.input :description
      f.input :user
    end
    f.actions
  end
 
end
