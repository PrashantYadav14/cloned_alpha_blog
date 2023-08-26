json.array! @users do |user|
  json.id user.id
  json.username user.username
  json.email user.email
  
  json.articles do
    json.array! user.articles do |article|
      json.id article.id
      json.title article.title
      json.description article.description
    end
  end
end


