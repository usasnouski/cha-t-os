class MessageCreationEventBroadcastJob < ApplicationJob
  queue_as :default

  def perform(message)
    ActionCable.server.broadcast(
      'chat_channel',
      id: message.id,
      sent_at: message.created_at.strftime('%H%M'),
      content: message.content
    )
  end
end
