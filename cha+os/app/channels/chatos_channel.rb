class ChatosChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'chat_channel'
  end

  def unsubscribed; end

  def create(options)
    Message.create(content: options.fetch('content'))
  end
end
