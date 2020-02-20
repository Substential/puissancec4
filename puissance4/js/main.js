var col =  parseInt(prompt('Entrer le nombre de col'));
var lgn =  parseInt(prompt('Entrer le nombre de lgn'));


if (col != "" && lgn != "" && Number.isInteger(col) && Number.isInteger(lgn) ) {
  $('#game').ready(function(){
    const jeu = new Game('.game', col, lgn);

    $('.restart').on('click', function(){
      $('.game').empty();
      jeu.drawGame();
      $(".restart").css('visibility', 'hidden');
    })
  });
}
