$('.start .card-panel').mouseover(function(){
  $(this).addClass('z-depth-5')
  $(this).css('background-color', '#e1f5fe')
})

$('.start .card-panel').mouseout(function(){
  $(this).removeClass('z-depth-5')
})
