(function(d, io, $){
    'use strict'
    var io = io()
    $('#chat-form').on('submit', (e)=>{
      e.preventDefault()
      io.emit('new message', $('#message-text').val())
      $('#message-text').val(null)
      return false
    })
    io.on('new user', (message)=>{
        alert(message.message)
    })
    io.on('user-say', (userSays)=>{
        $('#chat').append('<li>'+userSays.message+'</li>')
    })
    io.on('disconnect-user',(message)=>{
        alert(message.message)
    })
})(document, io, jQuery)