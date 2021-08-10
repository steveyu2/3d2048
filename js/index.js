$(document).ready(function () {
  var mainsz = $('#mian-tz-sz'), //获取地图
    wfjs = $('#wfjs'), //获取玩法介绍按钮
    wf_js = $('#wf_js'), //获取玩法介绍
    tbool = true, //  tbool判断显示还是关闭 玩法介绍
    reset = $('#reset'); //获取reset按钮
  TD_func.initmap(mainsz); // 初始化元素地图 给地图增加方块
  TD_func.my_tblr.init();

  reset.bind('click', function () {
    //设置 重玩按钮 click事件
    TD_func.copymap(TD_func.my_tzfa, TD_func.maps); //清空数组
    $('#score')[0].innerHTML = '0'; //设置初始化分数
    mainsz[0].innerHTML = ''; //初始化数字
    TD_func.initmap(mainsz); //初始化元素地图
  });

  wfjs.bind('click', function () {
    //设置 玩法介绍 click事件
    if (tbool) {
      $('#wf_js li').css('opacity', '1');
      tbool = false;
    } else {
      $('#wf_js li').css('opacity', '0');
      tbool = true;
    }
  });
});
document.onkeydown = function (event) {
  //上下左右 触发的事件
  var e = event || window.event || arguments.callee.caller.arguments[0];
  //上下左右 //↑↓←→
  if (e && e.keyCode == 38) {
    //上
    event_func.runing('t');
    TD_func.my_tblr.active('↑');
  }
  if (e && e.keyCode == 40) {
    //下
    event_func.runing('d');
    TD_func.my_tblr.active('↓');
  }
  if (e && e.keyCode == 37) {
    //左
    event_func.runing('l');
    TD_func.my_tblr.active('←');
  }
  if (e && e.keyCode == 39) {
    //右
    event_func.runing('r');
    TD_func.my_tblr.active('→');
  }
};
//封装函数
var event_func = {
  //按键会发生的事情
  e: [
    //方块事件数组
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  runing: function (w) {
    switch (
      w //上下左右
    ) {
      case 't':
        Cube_fun.move(TD_func.my_tzfa, this.e, w);
        break;
      case 'd':
        Cube_fun.move(TD_func.my_tzfa, this.e, w);
        break;
      case 'l':
        Cube_fun.move(TD_func.my_tzfa, this.e, w);
        break;
      case 'r':
        Cube_fun.move(TD_func.my_tzfa, this.e, w);
        break;
      default:
    }
  },
};

var TD_func = {
  //公共使用
  opacity: 0.8, //方块的透明度
  jd: 8, //往旁边倾斜的角度
  color: {
    //每种数字的颜色
    0: '255,255,255',
    2: '239,226,217',
    4: '238,224,198',
    8: '238,177,122',
    16: '235,141,80',
    32: '247,123,97',
    64: '235,91,64',
    128: '247,214,98',
    256: '240,207,20',
    512: '234,195,2',
    1024: '221,190,47',
    2048: '222,177,16',
    4096: '34,240,141',
    8192: '37,185,99',
    16384: '37,185,99',
    32768: '37,185,99',
    65536: '37,185,99',
    131072: '37,185,99', //最高到 131072  如果有更厉害的 算我输了
  },
  maps: [
    //地图数组 用来reset
    ['0', '0', '0', '0'],
    ['0', '0', '0', '0'],
    ['0', '0', '0', '0'],
    ['0', '0', '0', '0'],
  ],
  my_tzfa: [
    //地图的数字数组
    ['0', '0', '0', '0'],
    ['0', '0', '0', '0'],
    ['0', '0', '0', '0'],
    ['0', '0', '0', '0'],
  ],
  fontsize: {
    //对应 每一位数 的字体大小
    3: '50px',
    4: '36px',
    5: '30px',
    6: '28px',
  },
  mapsize: new Object(), //记录地图大小
  ul: new Object(), //循环用
  li: new Object(),
  copymap: function (a, b) {
    //copy地图
    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 4; j++) {
        a[i][j] = b[i][j];
      }
    }
  },
  initmap: function (e) {
    //初始化 给地图加方块
    var i,
      j,
      s,
      score = $('#scoretxt')[0];
    if (score.innerHTML == 'Game Over') {
      //这里 如果原来的gameover 的话 吧 gameover 改成 score
      $(score).css('font-size', '30px');
      score.innerHTML = 'score:';
    }
    this.mapsize.w = parseInt(e.css('width')); //记录地图高和宽
    this.mapsize.h = parseInt(e.css('height'));
    for (i = 0; i < 4; i++) {
      for (j = 0; j < 4; j++) {
        s = this.my_tzfa[i][j];
        ul = this.create_TD(s); // 标准方块给ul一个标准方块
        ul.appendTo(e); //添加到地图
        this.setindex(ul, i, j); //设置在地图的位置 和 数组的下标
        this.setcolor(ul); //设置颜色
        $(ul).css('z-index', '2'); //设置显示在第二层
        event_func.e[i][j] = ul;
        ul.x = 0 - this.jd;
        ul.y = this.jd; //旋转角度
        if (s == '0') {
          //为"0"则不显示   设置显示在第一层 透明度为0
          $(ul).css('opacity', '0');
          $(ul).css('z-index', '1');
        }
      }
    }
    Cube_fun.addnumber(this.my_tzfa, event_func.e); //随机生成两个数字
    Cube_fun.addnumber(this.my_tzfa, event_func.e);
  },
  setcolor: function (e) {
    //设置颜色和字体大小
    var str, i, color;
    str = this.my_tzfa[e.index_x][e.index_y]; //获取 数字
    if (parseInt(str) >= 16) {
      //大于16改变字体颜色
      color = '#fff';
    } else {
      color = '#000';
    }
    for (var i = 0; i < $(e).children().length; i++) {
      //根据数字改变颜色
      $($(e).children()[i]).css({
        background: 'rgba(' + this.color[str] + ',' + TD_func.opacity + ')',
        color: color,
      }); //颜色透明度
      //设置正面的透明度 为 1
      if ($(e).children().length - 1 == i)
        $($(e).children()[i]).css('background', 'rgba(' + this.color[str] + ',1)'); //颜色透明度
      if ($($(e).children()[i])[0].innerHTML.length > 5) {
        //设置字体大小
        $($(e).children()[i]).css('font-size', this.fontsize['6']);
      } else if ($($(e).children()[i])[0].innerHTML.length > 4) {
        $($(e).children()[i]).css('font-size', this.fontsize['5']);
      } else if ($($(e).children()[i])[0].innerHTML.length > 3) {
        $($(e).children()[i]).css('font-size', this.fontsize['4']);
      } else {
        $($(e).children()[i]).css('font-size', this.fontsize['3']);
      }
    }
  },
  setindex: function (e, a, b) {
    //设置 数组下标 和  在地图的位置
    e.index_x = a; //记住数组下表
    e.index_y = b;
    $(e).css('left', b * (this.mapsize.w / 3) + 'px'); //设置 在 地图 的 位置
    $(e).css('top', a * (this.mapsize.w / 3) + 'px');
  },
  create_TD: function (s) {
    //创建一个标准3d正方体
    var i;
    this.ul = $("<ul class='ul tion1'/>");
    for (i = 0; i < 6; i++) $("<li class='li li" + (i + 1) + "'>" + s + '</li>').appendTo(this.ul);
    return this.ul;
  },
  my_tblr: {
    ul: new Object(),
    init: function () {
      //↑↓←→
      var ar = ['↑', '↓', '←', '→'],
        t,
        ft;
      function fun(tar) {
        if (tar == '↑') {
          ft = function () {
            event_func.runing('t');
          };
        }
        if (tar == '↓') {
          ft = function () {
            event_func.runing('d');
          };
        }
        if (tar == '←') {
          ft = function () {
            event_func.runing('l');
          };
        }
        if (tar == '→') {
          ft = function () {
            event_func.runing('r');
          };
        }
        return ft;
      }
      for (var i = 0; i < ar.length; i++) {
        ul[ar[i]] = t;
        t = $(this.create_TD(ar[i]));
        $('#my_tblr').append(t);
        t.bind('click', fun(ar[i]));
        t[0].className += ' pos' + (i + 1);
        ul[ar[i]] = t;
      }
    },
    create_TD: function (s) {
      //创建一个标准3d黑色正方体
      var i;
      this.ul = $("<ul class='ul3 tion1'/>");
      for (i = 0; i < 6; i++)
        $("<li class='li_3 li3" + (i + 1) + "'>" + s + '</li>').appendTo(this.ul);
      return this.ul;
    },
    active: function (s) {
      $(ul[s][0]).addClass('ul3-active');
      setTimeout(function () {
        $(ul[s][0]).removeClass('ul3-active');
      }, 100);
    },
  },
};

var Cube_fun = {
  //立方体 行动 判断 等等
  //移动用
  xxx: true, //判断用
  map_run: [
    //地图的数字数组 用来判断是否移动
    ['0', '0', '0', '0'],
    ['0', '0', '0', '0'],
    ['0', '0', '0', '0'],
    ['0', '0', '0', '0'],
  ],
  jh: function (e, map, x1, y1, x2, y2) {
    //交换
    var t;
    t = e[x1][y1]; //交换事件对象
    e[x1][y1] = e[x2][y2];
    e[x2][y2] = t;

    t = map[x1][y1]; //交换 数字 数组
    map[x1][y1] = map[x2][y2];
    map[x2][y2] = t;
  },
  jhz: function (e, map, x1, y1, x2, y2) {
    //左边的等于两个之和 右边设置为0 并且右边的重置 方块css
    var score = $('#score')[0],
      fzz = $('#mian-tz-fzz')[0],
      fs = $('#mian-tz-fs')[0];
    map[x1][y1] = parseInt(map[x1][y1]) + parseInt(map[x2][y2]) + ''; //设置第一个分数
    map[x2][y2] = '0'; //重置第二个的分数

    score.innerHTML = parseInt($('#score')[0].innerHTML) + parseInt(map[x1][y1]); //改变分数
    fzz.className = 'ulli2'; //改变class
    fs.className = 'ulli2'; //改变class
    setTimeout(function () {
      fzz.className = 'ulli'; //改变class
      fs.className = 'ulli'; //改变class
    }, 100);

    for (var i = 0; i < $(e[x1][y1]).children().length; i++) {
      //改变 第一个的 innerhtml
      $($(e[x1][y1]).children()[i])[0].innerHTML = map[x1][y1]; //设置innerhtml
    }
    TD_func.setcolor(e[x1][y1]);
    setTimeout(function () {
      for (var i = 0; i < $(e[x2][y2]).children().length; i++) {
        //改变 第二个的 innerhtml
        $($(e[x2][y2]).children()[i])[0].innerHTML = map[x2][y2]; //设置innerhtml
      }
      TD_func.setcolor(e[x2][y2]);
    }, 100);
    $(e[x2][y2]).css('opacity', '0'); //消失
  },
  addnumber: function (map, e) {
    //随机生成 2 和 4
    var x = Math.floor(Math.random() * 4);
    var y = Math.floor(Math.random() * 4);
    var number = Math.floor(Math.random() * 20);
    number = number == 0 ? 4 : 2; //20分之一是4 其他 2
    while (map[x][y] != '0') {
      //随机 生成 在地图位置 如果 地图 位置 数字不是0 则 重新随机位置
      x = Math.floor(Math.random() * 4);
      y = Math.floor(Math.random() * 4);
    }
    map[x][y] = number + ''; //给数字数组地图 赋值
    for (var i = 0; i < $(e[x][y]).children().length; i++) {
      //设置innerhtml
      $($(e[x][y]).children()[i])[0].innerHTML = map[x][y];
    }
    TD_func.setcolor(e[x][y]); //设置颜色
    $(e[x][y]).css('opacity', '1'); //显示
  },
  run_deg: function (e, a, s) {
    //旋转用
    switch (s) {
      case 't':
        e.x += a * 360;
        break;
      case 'd':
        e.x -= a * 360;
        break;
      case 'l':
        e.y -= a * 360;
        break;
      case 'r':
        e.y += a * 360;
        break;
      default:
    }
    $(e).css('transform', ' rotateX(' + e.x + 'deg) rotateY(' + e.y + 'deg)');
  },
  run_px: function (e, s) {
    //移动用
    switch (s) {
      case 't':
        e.index_x--;
        break;
      case 'd':
        e.index_x++;
        break;
      case 'l':
        e.index_y--;
        break;
      case 'r':
        e.index_y++;
        break;
      default:
    }
    parseInt($(e).css('top', (e.index_x * TD_func.mapsize.h) / 3 + 'px'));
    parseInt($(e).css('left', (e.index_y * TD_func.mapsize.w) / 3 + 'px'));
  },
  isGameover: function (e) {
    //上下左右 没有相邻的相等就GAver
    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 3; j++) {
        if (e[i][j] == e[i][j + 1])
          //有一个相同就没 Gameover
          return true;
      }
    }
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 4; j++) {
        if (e[i][j] == e[i + 1][j])
          //有一个相同就没 Gameover
          return true;
      }
    }
    return false;
  },
  isrun: function (a, b) {
    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 4; j++) {
        if (a[i][j] != b[i][j])
          //有一个不同就是移动了
          return true;
      }
    }
    return false;
  },
  isFull: function (map) {
    //判断是否满了
    for (var i = 0; i < map.length; i++)
      for (var j = 0; j < map[0].length; j++) {
        if (map[i][j] == '0') {
          return false;
        }
      }
    return true;
  },
  move: function (map, e, w) {
    //移动 数字地图 对象地图 w 的方向参数
    TD_func.copymap(this.map_run, TD_func.my_tzfa); //记录之前的数组
    switch (w) {
      case 't':
        this.top_removeblank(map, e);
        this.top_remove(map, e);
        this.top_removeblank(map, e);
        break;
      case 'd':
        this.down_removeblank(map, e);
        this.down_remove(map, e);
        this.down_removeblank(map, e);
        break;
      case 'l':
        this.left_removeblank(map, e);
        this.left_remove(map, e);
        this.left_removeblank(map, e);
        break;
      case 'r':
        this.right_removeblank(map, e);
        this.right_remove(map, e);
        this.right_removeblank(map, e);
        break;
      default:
    }
    if (!this.isFull(map) && this.isrun(this.map_run, TD_func.my_tzfa)) {
      //没满 并且 移动了 就加number
      this.addnumber(map, e);
    } else if (!this.isGameover(TD_func.my_tzfa)) {
      //判断GAME OVER
      if (!this.isFull(map)) {
        return;
      }
      var score = $('#scoretxt')[0],
        fs = $('#mian-tz-fs')[0];
      $(score).css('font-size', '23px');
      score.innerHTML = 'Game Over';
      fs.className = 'ulli2'; //改变class 动态效果
      setTimeout(function () {
        fs.className = 'ulli'; //改变class
      }, 100);
    }
  },
  top_removeblank: function (map, e) {
    var i, j, k;
    for (i = 0; i < 4; i++) {
      for (j = 1; j < 4; j++) {
        k = j;
        while (k - 1 >= 0 && map[k - 1][i] == '0') {
          this.run_px(e[k][i], 't');
          this.run_px(e[k - 1][i], 'd');
          this.run_deg(e[k][i], 1, 't');
          this.run_deg(e[k - 1][i], 1, 'd');
          this.jh(e, map, k, i, k - 1, i); //改变map数组 和 e对象数组
          k--;
        }
      }
    }
  },
  down_removeblank: function (map, e) {
    var i, j, k;
    for (j = 0; j < 4; j++) {
      for (i = 2; i >= 0; i--) {
        k = i;
        while (k + 1 <= 3 && map[k + 1][j] == '0') {
          this.run_px(e[k][j], 'd');
          this.run_px(e[k + 1][j], 't');
          this.run_deg(e[k][j], 1, 'd');
          this.run_deg(e[k + 1][j], 1, 't');
          this.jh(e, map, k, j, k + 1, j);
          k++;
        }
      }
    }
  },
  left_removeblank: function (map, e) {
    var i, j, k;
    for (i = 0; i < 4; i++) {
      for (j = 1; j < 4; j++) {
        k = j;
        while (k - 1 >= 0 && map[i][k - 1] == '0') {
          this.run_px(e[i][k], 'l');
          this.run_px(e[i][k - 1], 'r');
          this.run_deg(e[i][k], 1, 'l');
          this.run_deg(e[i][k - 1], 1, 'r');
          this.jh(e, map, i, k, i, k - 1);
          k--;
        }
      }
    }
  },
  right_removeblank: function (map, e) {
    var i, j, k;
    for (i = 0; i < 4; i++) {
      for (j = 2; j >= 0; j--) {
        k = j;
        while (k + 1 <= 3 && map[i][k + 1] == '0') {
          this.run_px(e[i][k], 'r');
          this.run_px(e[i][k + 1], 'l');
          this.run_deg(e[i][k], 1, 'r');
          this.run_deg(e[i][k + 1], 1, 'l');
          this.jh(e, map, i, k, i, k + 1);
          k++;
        }
      }
    }
  },

  top_remove: function (map, e) {
    var i, j;
    for (j = 0; j < 4; j++) {
      for (i = 0; i < 3; i++) {
        if (map[i + 1][j] == map[i][j] && map[i + 1][j] != '0') {
          //相等
          this.run_px(e[i + 1][j], 't'); //右边的向左移动
          this.run_deg(e[i + 1][j], 1, 't'); //右边的向左旋转
          this.jhz(e, map, i, j, i + 1, j);
          this.run_px(e[i + 1][j], 'd');
          this.run_deg(e[i + 1][j], 1, 'd');
        }
      }
    }
  },
  down_remove: function (map, e) {
    var i, j;
    for (j = 0; j < 4; j++) {
      for (i = 3; i > 0; i--) {
        if (map[i - 1][j] == map[i][j] && map[i - 1][j] != '0') {
          //相等
          this.run_px(e[i - 1][j], 't'); //右边的向左移动
          this.run_deg(e[i - 1][j], 1, 't'); //右边的向左旋转
          this.jhz(e, map, i, j, i - 1, j);
          this.run_px(e[i - 1][j], 'd');
          this.run_deg(e[i - 1][j], 1, 'd');
        }
      }
    }
  },
  left_remove: function (map, e) {
    var i, j;
    for (i = 0; i < 4; i++) {
      for (j = 0; j < 3; j++) {
        if (map[i][j] == map[i][j + 1] && map[i][j] != '0') {
          //相等
          this.run_px(e[i][j + 1], 'l'); //右边的向左移动
          this.run_deg(e[i][j + 1], 1, 'l'); //右边的向左旋转
          this.jhz(e, map, i, j, i, j + 1);
          this.run_px(e[i][j + 1], 'r');
          this.run_deg(e[i][j + 1], 1, 'r');
        }
      }
    }
  },
  right_remove: function (map, e) {
    var i, j;
    for (i = 0; i < 4; i++) {
      for (j = 3; j > 0; j--) {
        if (map[i][j] == map[i][j - 1] && map[i][j] != '0') {
          //相等
          this.run_px(e[i][j - 1], 'r'); //右边的向左移动
          this.run_deg(e[i][j - 1], 1, 'r'); //右边的向左旋转
          this.jhz(e, map, i, j, i, j - 1);
          this.run_px(e[i][j - 1], 'l');
          this.run_deg(e[i][j - 1], 1, 'l');
        }
      }
    }
  },
}; //数组等于0 并且不是边界的时候移动
