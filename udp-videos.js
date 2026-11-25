// Un Dato Pixelado: ordena las tarjetas por visualizaciones y enlaza los
// vídeos publicados usando udp-videos.json (lo regenera GitHub Actions).
// Si el JSON no carga, la página se queda con la lista estática.
(function () {
  var grid = document.querySelector('.udp-grid');
  if (!grid || !('fetch' in window)) return;

  function viewsLabel(n) {
    return n.toLocaleString('es-ES') + (n === 1 ? ' visualización' : ' visualizaciones');
  }

  function watchLink(url) {
    var a = document.createElement('a');
    a.className = 'udp-watch';
    a.href = url;
    a.target = '_blank';
    a.rel = 'noopener';
    a.innerHTML = 'Ver el Short <span aria-hidden="true">↗</span>';
    return a;
  }

  fetch('udp-videos.json', { cache: 'no-store' })
    .then(function (r) { if (!r.ok) throw new Error('sin json'); return r.json(); })
    .then(function (data) {
      var videos = data.videos || [];
      if (!videos.length) return;
      var byId = {};
      videos.forEach(function (v) { byId[v.id] = v; });

      var cards = Array.prototype.slice.call(grid.children);

      // Actualiza las tarjetas existentes: vistas y enlace al Short.
      cards.forEach(function (card) {
        var v = byId[card.getAttribute('data-vid')];
        if (!v) return;
        var eyebrow = card.querySelector('.eyebrow');
        if (eyebrow && !eyebrow.querySelector('.udp-views')) {
          var s = document.createElement('span');
          s.className = 'udp-views';
          s.textContent = ' · ' + viewsLabel(v.views);
          eyebrow.appendChild(s);
        }
        var soon = card.querySelector('.udp-soon');
        if (soon) soon.replaceWith(watchLink(v.url));
      });

      // Añade tarjetas para vídeos del canal que aún no estén en la página.
      videos.forEach(function (v) {
        if (grid.querySelector('[data-vid="' + v.id + '"]')) return;
        var card = document.createElement('article');
        card.className = 'udp-card';
        card.setAttribute('data-vid', v.id);
        var img = document.createElement('img');
        img.src = v.thumb;
        img.width = 640; img.height = 360;
        img.alt = 'Miniatura del vídeo: ' + v.title;
        img.loading = 'lazy';
        var eyebrow = document.createElement('p');
        eyebrow.className = 'eyebrow';
        eyebrow.innerHTML = 'NUEVO';
        var s = document.createElement('span');
        s.className = 'udp-views';
        s.textContent = ' · ' + viewsLabel(v.views);
        eyebrow.appendChild(s);
        var h = document.createElement('h3');
        h.textContent = v.title;
        card.appendChild(img);
        card.appendChild(eyebrow);
        card.appendChild(h);
        card.appendChild(watchLink(v.url));
        grid.appendChild(card);
      });

      // Reordena por visualizaciones (los no publicados, al final).
      var ordered = Array.prototype.slice.call(grid.children);
      ordered.sort(function (a, b) {
        var va = byId[a.getAttribute('data-vid')];
        var vb = byId[b.getAttribute('data-vid')];
        var na = va ? va.views : -1;
        var nb = vb ? vb.views : -1;
        return nb - na;
      });
      ordered.forEach(function (c) { grid.appendChild(c); });
    })
    .catch(function () { /* respaldo: lista estática */ });
})();
