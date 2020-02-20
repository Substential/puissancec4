
class Game {
  constructor(selector, col, lgn) {
    this.COL = col;
    this.LG = lgn;
    this.selector = selector;
    this.player = "red";

    this.drawGame();
    this.ecoute();
    this.checkWin();
  }

  drawGame() {
    const $jeu = $(this.selector);

    for(let ligne = 0; ligne < this.LG; ligne++) {

      const $ligne = $('<div>').addClass('lgn');

      for(let col = 0; col < this.COL; col++) {

        const $col = $('<div>')
        .addClass('col empty')
        .attr("data-col", col)
        .attr("data-lgn", ligne);
        $ligne.append($col);
      }
      $jeu.append($ligne);
    }
  }

  ecoute() {
    const $jeu = $(this.selector);
    const that = this;

    function lastCase(col) {
      const $cells = $(`.col[data-col='${col}']`);
      for (let i = $cells.length-1; i >=0; i--) {
        const $cell = $($cells[i]);
        if ($cell.hasClass('empty')) {
          return $cell;
        }
      }
      return null;
    };

    $jeu.on('mouseenter', '.col.empty', function(){
      const $col = $(this).data('col');
      const $last = lastCase($col);
      if ($last != null) {
        $last.addClass(`p${that.player}`);
      }
    });

    $jeu.on('mouseleave', '.col', function(){
      $('.col').removeClass(`p${that.player}`);
    });

    $jeu.on('click', '.col.empty', function() {
      const col = $(this).data('col');
      const $last = lastCase(col);
      $last.addClass(`${that.player}`).removeClass(`empty p${that.player}`).data('player', `${that.player}`);

      const winner = that.checkWin($last.data('lgn'), $last.data('col'));
      that.player = (that.player === "red") ? "yellow" : "red";

      if (winner) {
        alert("Les " + winner + " ont gagné.");
        $(".restart").css('visibility', 'visible');
        }
    })
  }

  checkWin(lgn, col) {
    const that = this;

    function $getCell(i, j) {
      return $(`.col[data-lgn='${i}'][data-col='${j}']`);
    }

    function checkDirection(direction) {
      let total = 0;
      let i = lgn + direction.i;
      let j = col + direction.j;
      let $next = $getCell(i, j);

      while (i >= 0 && i < that.LG && j >= 0 && j < that.COL && $next.data('player') === that.player) {
        total += 1;
        i += direction.i;
        j += direction.j;
        $next = $getCell(i, j);
      }
      return total;
    }

    function checkWin (dirA, dirB) {
      const total = 1 + checkDirection(dirA) + checkDirection(dirB);

      if (total >=4) {
        return that.player;
      } else {
        return null;
      }
    }

    function checkHori() {
      return checkWin({i: 0, j: -1}, {i: 0, j: 1});
    }

    function checkVerti() {
      return checkWin({i: -1, j: 0}, {i: 1, j: 0});
    }

    function checkDiag1() {
      return checkWin({i: 1, j: 1}, {i: -1, j: -1});
    }

    function checkDiag2() {
      return checkWin({i: 1, j: -1}, {i: 1, j: 1});
    }

    return checkVerti() || checkHori() || checkDiag1() || checkDiag2();
  }
}
