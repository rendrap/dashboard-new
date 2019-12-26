$(function() {

  // https://stackoverflow.com/questions/47924780/like-icon-colour-on-click
  /* when a user clicks, toggle the 'is-animating' class */
  $(".heart").on('click touchstart', function() {
      $(this).toggleClass('is_animating');
      $(this).toggleClass('liked');
  });

  /*when the animation is over, remove the class*/
  $(".heart").on('animationend', function() {
      $(this).toggleClass('is_animating');
  });

  // Adjust MyTodos header border visibility on icon-add click
  $('#collapseTodos').on('show.bs.collapse', function () {
    $('#todosHeader').addClass('border-0');
  })

  $('#collapseTodos').on('hide.bs.collapse', function () {
    $('#todosHeader').removeClass('border-0');
  })


// Drag&Drop

  dragula(Array.prototype.slice.call(document.querySelectorAll('.task-list')), {
    moves: function (el, container, handle) {
      return handle.classList.contains('task-list-handle');
    }
  });

});