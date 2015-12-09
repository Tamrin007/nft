(function(global, doc, $, ns, undefined) {
  var timers = [];
  var isStop = [];
  var isContentVisible = false;

  var blue = 'blue';
  var red = 'red';
  var green = 'green';
  var white = '#fff';
  var black = '#000';
  var yellow = 'yellow';
  var colors = [blue, red, green, white, black];

  var nf = [
    {
      name: 'ベルギー',
      description: 'ベルギー王国、通称ベルギーは、西ヨーロッパに位置する連邦立憲君主制国家。隣国のオランダ、ルクセンブルクと合わせてベネルクスと呼ばれる。 首都ブリュッセルは欧州連合の主要機関の多くが置かれているため、"EUの首都"とも言われており、その通信・金融網はヨーロッパを越えて地球規模である。',
      image: 'belgium.jpg',
      colors: [ black, red, yellow ]
    },
    {
      name: 'キューバ',
      description: 'キューバは、カリブ海の大アンティル諸島に位置するラテンアメリカの共和制国家である。島国であり、ウィンドワード海峡を隔てて東にはイスパニョーラ島のハイチとドミニカ共和国が、ケイマン海峡を隔てて南にはケイマン諸島とジャマイカが、フロリダ海峡を隔てて北に145km先にはアメリカ合衆国のフロリダ州が存在する。首都はハバナ。',
      image: 'cuba.png',
      colors: [ white, red, blue ]
    },
    {
      name: 'デンマーク',
      description: 'デンマークは、北ヨーロッパのバルト海と北海に挟まれたユトランド半島と、その周辺の多くの島々からなる立憲君主制国家である。北欧諸国の1つであり、北では海を挟んでスカンディナヴィア諸国、南では陸上でドイツと国境を接する。首都はシェラン島にあるコペンハーゲンである。',
      image: 'denmark.png',
      colors: [ white, red, red]
    },
    {
      name: 'エジプト',
      description: 'エジプト・アラブ共和国、通称エジプトは、中東・アフリカの共和国。首都はカイロ。 西にリビア、南にスーダン、北東にイスラエルと隣接し、北は地中海、東は紅海に面している。南北に流れるナイル川の河谷とデルタ地帯のほかは、国土の大部分が砂漠である。ナイル河口の東に地中海と紅海を結ぶスエズ運河がある。',
      image: 'egypt.png',
      colors: [ red, white, black]
    },
    {
      name: 'ハンガリー',
      description: 'ハンガリーは、中央ヨーロッパの共和制国家である。西にオーストリア、スロベニア、北にスロバキア、東にウクライナ、ルーマニア、南にセルビア、南西にクロアチアに囲まれた内陸国であり、首都はブダペスト。 国土の大部分はなだらかな丘陵で、ドナウ川などに潤される東部・南部の平野部には肥沃な農地が広がる。',
      image: 'hungary.png',
      colors: [ white, red, green]
    },
    {
      name: 'アイルランド',
      description: 'アイルランド、またはアイルランド共和国は、北大西洋のアイルランド島に存在する立憲共和制国家である。北東に英国の北アイルランドと接する。首都はアイルランド島中東部の都市ダブリン。ナショナルカラーは緑。',
      image: 'ireland.png',
      colors: [ green, white, yellow ]
    },
    {
      name: 'イスラエル',
      description: 'イスラエル国、通称イスラエルは、中東のパレスチナに位置する国家。北にレバノン、北東にシリア、東にヨルダン、南にエジプトと接する。ガザ地区とヨルダン川西岸地区を支配するパレスチナ自治政府とは南西および東で接する。地中海および紅海にも面している。',
      image: 'israel.png',
      colors: [ blue, white, blue ]
    },
    {
      name: 'ジャマイカ',
      description: 'ジャマイカは、中央アメリカ、カリブ海の大アンティル諸島に位置する立憲君主制国家であり、英連邦王国の一国である。島国であり、ケイマン海峡を隔てて北にキューバとケイマン諸島が、ジャマイカ海峡を隔てて東にイスパニョーラ島に位置するハイチとドミニカ共和国が存在する。首都はキングストン。',
      image: 'jamaica.png',
      colors: [ black, yellow, green ]
    },
    {
      name: 'モンゴル',
      description: 'モンゴル国、通称モンゴルは、東アジア北部に位置する国家。東と南を中華人民共和国・内モンゴル自治区と、西を中国・新疆ウイグル自治区と、北をロシア連邦とそれぞれ接する内陸国。首都はウランバートル。',
      image: 'mongolia.png',
      colors: [ red, yellow, blue ]
    },
    {
      name: 'スウェーデン',
      description: 'スウェーデン王国、通称スウェーデンは、北ヨーロッパのスカンディナヴィア半島に位置する立憲君主制国家。西にノルウェー、北東にフィンランド、南西にカテガット海峡を挟んでデンマーク、東から南にはバルト海が存在する。首都はストックホルム。スウェーデン語ではSverigeといい、スヴェーア族の国を意味する。',
      image: 'sweden.png',
      colors: [ blue, yellow, blue ]
    }
  ];

  var i = 0; // nfのindex

  startRoulette();

  $('.slot-button').on('click', function() {
    if (!isContentVisible) {
      var slotID = $(this).attr('data-slot');
      stopTimer(slotID);
      isStop[slotID] = true;
      $(this).css('background-color', nf[i].colors[slotID]);
    }

    if (isStop[0] && isStop[1] && isStop[2] && !isContentVisible) {
      isContentVisible = true;
      $('.reload').css('display', 'block');

      if (i === 9) {
        $('.reload').html('本テストへ');
      }

      // コンテンツの挿入
      $( "<h2/>", {
        class: 'name',
        text: nf[i].name
      }).appendTo('.content .container');
      $( "<p/>", {
        class: 'description',
        text: nf[i].description
      }).appendTo('.content .container');
      $( "<img>", {
        class: 'flag',
        src: './images/' + nf[i].image
      }).appendTo('.content .container');
      $( "<div/>", {
        id: 'map',
      }).appendTo('.content .container');
      showMap(nf[i].name);
    }
  });

  $('.reload').on('click', function() {
    reload();
  });

  function reload() {
    if (isStop[0] && isStop[1] && isStop[2]) {
      isStop = [];
      isContentVisible = false;
      i++;

      if (i >= nf.length) {
        // 学習終了
        global.location.href = 'index.html';
      } else {
        startRoulette();
        $('.reload').css('display', 'none');
        $('.count span').html(i + 1 + ' / ' + nf.length);
        $('.content .container').empty();
      }
    }
  }

  function startRoulette() {
    startTimer(0, 100);
    startTimer(1, 100);
    startTimer(2, 100);
  }

  function startTimer(i, interval) {
    if (i > 3) return;
    timers[i] = setInterval(function() {
      var random = Math.floor(Math.random() * nf.length);
      var r = Math.floor(Math.random() * colors.length);
      switch (i) {
        case 0:
          $('.top').css('background-color', colors[r]);
          break;
        case 1:
          $('.middle').css('background-color', colors[r]);
          break;
        case 2:
          $('.bottom').css('background-color', colors[r]);
          break
      }
    }, interval);
  }

  function stopTimer(i) {
    clearInterval(timers[i]);
  }


  function showMap(address) {
    var latlng;
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({
      'address': address,
      'region': 'jp'
    }, function(results, status) {
      for (var r in results) {
        latlng = results[r].geometry.location;
      }
      var options = {
        zoom: 4,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        scrollwheel: false
      };
      var map = new google.maps.Map(document.getElementById('map'), options);
      var styles =
        [{"featureType":"landscape","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","stylers":[{"saturation":-100},{"lightness":51},{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"road.arterial","stylers":[{"saturation":-100},{"lightness":30},{"visibility":"on"}]},{"featureType":"road.local","stylers":[{"saturation":-100},{"lightness":40},{"visibility":"on"}]},{"featureType":"transit","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"administrative.province","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":-25},{"saturation":-100}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]}];
      map.setOptions({styles: styles});

      var marker = new google.maps.Marker({
        position: map.getCenter(),
        map: map
      });
    });
  }

})(this, document, jQuery, this.nft);

