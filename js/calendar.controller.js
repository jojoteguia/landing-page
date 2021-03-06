document.addEventListener('DOMContentLoaded', function () {
  var calendarContainerEl = document.getElementById('calendar-container');
  var calendarEl = createElement('div', 'calendar');
  var shadow = calendarContainerEl.attachShadow({ mode: 'open' });

  shadow.appendChild(createStylesheet('fullcalendar/core/main.css'));
  shadow.appendChild(createStylesheet('fullcalendar/daygrid/main.css'));
  shadow.appendChild(createStylesheet('fullcalendar/timegrid/main.css'));
  shadow.appendChild(createStylesheet('css/calendar-modal.css'));
  shadow.appendChild(createStylesheet('fullcalendar/bootstrap/main.css'));
  shadow.appendChild(calendarEl);

  var calendar = createCalendar(calendarEl);
  calendar.render();
  initModal();
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

function isMobile() {
  return (navigator.userAgent.match(/Android/i)
    || navigator.userAgent.match(/webOS/i)
    || navigator.userAgent.match(/iPhone/i)
    || navigator.userAgent.match(/iPad/i)
    || navigator.userAgent.match(/iPod/i)
    || navigator.userAgent.match(/BlackBerry/i)
    || navigator.userAgent.match(/Windows Phone/i)
  );
}

function getViewType() {
  if (isMobile()) {
    return 'dayGridWeek';
  } else {
    return 'dayGridMonth';
  }
}

function formatDate(date, locale) {
  return new Intl.DateTimeFormat(locale).format(date);
}

function onSelect(evt) {
  $('#members').val(1)
  $('#start').val(formatDate(evt.start, 'pt-BR'))
  $('#end').val(formatDate(evt.end.setDate(evt.end.getDate() - 1), 'pt-BR'));
  $('.modal').modal();
}

function initModal() {
  document.querySelector('#close-modal').addEventListener('click', function (evt) {
    evt.preventDefault();
    $.modal.close();
  });
}

function createCalendar(element) {
  const calendar = new FullCalendar.Calendar(element, {
    plugins: ['dayGrid', 'googleCalendar', 'interaction'],
    defaultView: getViewType(),
    locale: 'pt-br',
    googleCalendarApiKey: 'AIzaSyCsZXwPf3-3QLSQwjqVhTut4NurnO6PFQk',
    events: {
      googleCalendarId: 'sbgkq4sq1ks6nqq1dq4bbfsulc@group.calendar.google.com',
    },
    displayEventTime: true,
    displayEventEnd: true,
    selectable: true,
    selectOverlap: false,
    longPressDelay: 200,
    select: onSelect,
    eventDataTransform: function(data) {
      return {
        ...data,
        rendering: 'background'
      }
    }
  });

  return calendar;
}
