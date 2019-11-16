document.addEventListener('DOMContentLoaded', function () {
  var calendarContainerEl = document.getElementById('calendar-container');
  var calendarEl = createElement('div', 'calendar');
  var shadow = calendarContainerEl.attachShadow({ mode: 'open' });

  shadow.appendChild(createStylesheet('/fullcalendar/core/main.css'));
  shadow.appendChild(createStylesheet('/fullcalendar/daygrid/main.css'));
  shadow.appendChild(createStylesheet('/css/calendar.css'));

  shadow.appendChild(createScript('/fullcalendar/core/main.js'));
  shadow.appendChild(createScript('/fullcalendar/daygrid/main.js'));
  shadow.appendChild(createScript('/fullcalendar/core/locales/pt-br.js'));
  shadow.appendChild(calendarEl);

  var calendar = createCalendar(calendarEl);
  calendar.render();
});

function createScript(source) {
  var script = document.createElement('script');
  script.src = source;

  return script;
}

function createStylesheet(href) {
  var stylesheet = document.createElement('link');
  stylesheet.rel = 'stylesheet';
  stylesheet.href = href;

  return stylesheet;
}

function createElement(elmt, id, clazz = '') {
  var element = document.createElement(elmt);
  element.id = id;
  element.class = clazz;

  return element;
}

function createCalendar(element) {
  return new FullCalendar.Calendar(element, {
    plugins: ['dayGrid'],
    locale: 'pt-br'
  });
}
