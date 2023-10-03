# frozen_string_literal: true

class Ability
  include CanCan::Ability

  def initialize(user)
    if user.persisted?
      friend_ids = user.friends.pluck(:id)
      can :read, Article, user_id: [friend_ids, user.id].flatten
      
      can :manage, Article, user_id: user.id 

      return unless user.admin?
      can :manage, Article
      can :manage, Category
      
    end
  end
end
