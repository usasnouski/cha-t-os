class Message < ApplicationRecord
  after_create_commit do
    MessageCreationEventBroadcastJob.perform_later self
  end
end
