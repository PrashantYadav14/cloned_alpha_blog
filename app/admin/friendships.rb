ActiveAdmin.register Friendship do
  
  permit_params :user_id, :friend_id

  index do
    selectable_column
    id_column
    column :user
    column :friend
    column :created_at
    actions
  end

  filter :user
  filter :friend

  form do |f|
    f.semantic_errors
    f.inputs do
      f.input :user
      f.input :friend
    end
    f.actions
  end
end
