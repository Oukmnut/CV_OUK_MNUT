/**
* Template Name: MyResume - v4.7.0
* Template URL: https://bootstrapmade.com/free-html-bootstrap-template-my-resume/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function (e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function (e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Hero type effect
   */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function (direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function (e) {
        e.preventDefault();
        portfolioFilters.forEach(function (el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function () {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Initiate portfolio details lightbox 
   */
  const portfolioDetailsLightbox = GLightbox({
    selector: '.portfolio-details-lightbox',
    width: '90%',
    height: '90vh'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

})()

// ===========Time now============ 
setInterval(() => {
  var date = new Date()
  document.getElementById('timenow').innerHTML = ('Time:' + date.toLocaleTimeString())
}, 1000)



// ===========Calendar now============ 
 ! function() {

  var today = moment();

  function Calendar(selector, events) {
    this.el = document.querySelector(selector);
    this.events = events;
    this.maxEvents = this.events.reduce(function(p, c){
      if(c.events.length > p) {
        return c.events.length;
      } else {
        return p;
      }
    }, 0);
    this.current = moment().date(1);
    this.draw();
    var current = document.querySelector('.today');
    if (current) {
      var self = this;
      window.setTimeout(function() {
        self.openDay(current);
      }, 500);
    }
  }

  Calendar.prototype.draw = function() {
    //Create Header
    this.drawHeader();
    //Draw Month
    this.drawMonth();
    // Draw Legend
    //this.drawLegend();
  }

  Calendar.prototype.drawHeader = function() {
    var self = this;
    if (!this.header) {
      //Create the header elements
      this.header = createElement('div', 'header');
      this.header.className = 'header';

      //this.title = createElement('h1');
      this.title = {
        month: createElement('div', 'month', this.current.format('MMMM')),
        year: createElement('div', 'year', this.current.format('YYYY'))
      }

      var right = createElement('div', 'right');
      right.addEventListener('click', function() {
        self.nextMonth();
      });

      var left = createElement('div', 'left');
      left.addEventListener('click', function() {
        self.prevMonth();
      });

      var ringLeft = createElement('div', 'ring-left');
      var ringRight = createElement('div', 'ring-right');
      //Append the Elements
      //this.header.appendChild(this.title);
      this.header.appendChild(this.title.month);
      this.header.appendChild(this.title.year);
      this.header.appendChild(ringLeft);
      this.header.appendChild(ringRight);

      this.header.appendChild(right);
      this.header.appendChild(left);
      this.el.appendChild(this.header);
      this.drawWeekDays();
    }

    //this.title.innerHTML = this.current.format('MMMM YYYY');
    this.title.month.innerHTML = this.current.format('MMMM');
    this.title.year.innerHTML = this.current.format('YYYY');
  }

  Calendar.prototype.drawMonth = function() {
    var self = this;

    this.events.forEach(function(event) {
      //ev.date = self.current.clone().date(Math.random() * (29 - 1) + 1);
      event.date = moment(event.date);
    });

    if (this.month) {
      this.oldMonth = this.month;
      this.oldMonth.className = 'month out ' + (self.next ? 'next' : 'prev');
      this.oldMonth.addEventListener('webkitAnimationEnd', function() {
        self.oldMonth.parentNode.removeChild(self.oldMonth);
        self.month = createElement('div', 'month');
        self.backFill();
        self.currentMonth();
        self.fowardFill();
        self.el.appendChild(self.month);
        window.setTimeout(function() {
          self.month.className = 'month in ' + (self.next ? 'next' : 'prev');
        }, 16);
      });
    } else {
      this.month = createElement('div', 'month');
      this.el.appendChild(this.month);
      this.backFill();
      this.currentMonth();
      this.fowardFill();
      this.month.className = 'month new';
    }
  }

  Calendar.prototype.backFill = function() {
    var clone = this.current.clone();
    var dayOfWeek = clone.day();

    if (!dayOfWeek) {
      return;
    }

    clone.subtract('days', dayOfWeek + 1);

    for (var i = dayOfWeek; i > 0; i--) {
      this.drawDay(clone.add('days', 1));
    }
  }

  Calendar.prototype.fowardFill = function() {
    var clone = this.current.clone().add('months', 1).subtract('days', 1);
    var dayOfWeek = clone.day();

    if (dayOfWeek === 6) {
      return;
    }

    for (var i = dayOfWeek; i < 6; i++) {
      this.drawDay(clone.add('days', 1));
    }
  }

  Calendar.prototype.currentMonth = function() {
    var clone = this.current.clone();

    while (clone.month() === this.current.month()) {
      this.drawDay(clone);
      clone.add('days', 1);
    }
  }

  Calendar.prototype.getWeek = function(day) {
    if (!this.week || day.day() === 0) {
      this.week = createElement('div', 'week');
      this.month.appendChild(this.week);
    }
  }

  Calendar.prototype.drawDay = function(day) {
    var self = this;
    this.getWeek(day);

    var todayEvents = this.events.filter(function(event){
      return event.date.isSame(day, 'day');
    })[0];

    //Outer Day
    var outer = createElement('div', this.getDayClass(day));
    var circle = createElement('span', 'circle');
    if(todayEvents) {
      outer.addEventListener('click', function() {
        self.openDay(this);
      });
      // Circle
      var size = (1 / this.maxEvents) * todayEvents.events.length;
      circle.style.webkitTransform = 'scale(' + size + ')';
      circle.style.MozProperty = 'scale(' + size + ')';
      circle.style.transform = 'scale(' + size + ')';      
    } else {
      circle.style.webkitTransform = 'scale(0, 0)';
      circle.style.MozProperty = 'scale(0, 0)';
      circle.style.transform = 'scale(0, 0)';      
      outer.style.cursor = 'default';
    }

    //Day Name
    var name = createElement('div', 'day-name', day.format('ddd'));

    //Day Number
    var number = createElement('div', 'day-number', day.format('DD'));

    //Events
    var events = createElement('div', 'day-events');
    this.drawEvents(day, events);

    //outer.appendChild(name);
    outer.appendChild(circle);
    outer.appendChild(number);
    //outer.appendChild(events);
    this.week.appendChild(outer);
  }

  Calendar.prototype.drawEvents = function(day, element) {
    if (day.month() === this.current.month()) {
      var todaysEvents = this.events.reduce(function(memo, ev) {
        if (ev.date.isSame(day, 'day')) {
          memo.push(ev);
        }
        return memo;
      }, []);

      todaysEvents.forEach(function(ev) {
        var evSpan = createElement('span', ev.color);
        element.appendChild(evSpan);
      });
    }
  }

  Calendar.prototype.getDayClass = function(day) {
    classes = ['day'];
    if (day.month() !== this.current.month()) {
      classes.push('other');
    } else if (today.isSame(day, 'day')) {
      classes.push('today');
    }
    return classes.join(' ');
  }

  Calendar.prototype.openDay = function(el) {
    var details, arrow;
    var dayNumber = +el.querySelectorAll('.day-number')[0].innerText || +el.querySelectorAll('.day-number')[0].textContent;
    var day = this.current.clone().date(dayNumber);

    var currentOpened = document.querySelector('.details');

    //Check to see if there is an open detais box on the current row
    if (currentOpened && currentOpened.parentNode === el.parentNode) {
      details = currentOpened;
      arrow = document.querySelector('.arrow');
    } else {
      //Close the open events on differnt week row
      //currentOpened && currentOpened.parentNode.removeChild(currentOpened);
      if (currentOpened) {
        currentOpened.addEventListener('webkitAnimationEnd', function() {
          currentOpened.parentNode.removeChild(currentOpened);
        });
        currentOpened.addEventListener('oanimationend', function() {
          currentOpened.parentNode.removeChild(currentOpened);
        });
        currentOpened.addEventListener('msAnimationEnd', function() {
          currentOpened.parentNode.removeChild(currentOpened);
        });
        currentOpened.addEventListener('animationend', function() {
          currentOpened.parentNode.removeChild(currentOpened);
        });
        currentOpened.className = 'details out';
      }

      //Create the Details Container
      details = createElement('div', 'details in');

      //Create the arrow
      var arrow = createElement('div', 'arrow');

      //Create the event wrapper
      details.appendChild(arrow);
      el.parentNode.appendChild(details);
    }

    var todaysEvents = this.events.filter(function(event){
      return event.date.isSame(day, 'day');
    });

    console.log('m: ', todaysEvents)
    this.renderEvents(todaysEvents, details);

    arrow.style.left = el.offsetLeft - el.parentNode.offsetLeft + (el.offsetWidth / 2) + 'px';
  }

  Calendar.prototype.renderEvents = function(events, ele) {
    //Remove any events in the current details element
    var currentWrapper = ele.querySelector('.events');
    var wrapper = createElement('div', 'events in' + (currentWrapper ? ' new' : ''));

    if(events.length < 1) {
      return;
    }
    console.log("events: ", events);
    events[0].events.forEach(function(ev) {
      console.log("evv: ", ev);
      var div = createElement('div', 'event');
      var square = createElement('div', 'event-category ' + ev.color);
      var span = createElement('span', '', ev.name);

      div.appendChild(square);
      div.appendChild(span);
      wrapper.appendChild(div);
    });

    if (!events.length) {
      var div = createElement('div', 'event empty');
      var span = createElement('span', '', 'No Events');

      div.appendChild(span);
      wrapper.appendChild(div);
    }

    if (currentWrapper) {
      currentWrapper.className = 'events out';
      currentWrapper.addEventListener('webkitAnimationEnd', function() {
        currentWrapper.parentNode.removeChild(currentWrapper);
        ele.appendChild(wrapper);
      });
      currentWrapper.addEventListener('oanimationend', function() {
        currentWrapper.parentNode.removeChild(currentWrapper);
        ele.appendChild(wrapper);
      });
      currentWrapper.addEventListener('msAnimationEnd', function() {
        currentWrapper.parentNode.removeChild(currentWrapper);
        ele.appendChild(wrapper);
      });
      currentWrapper.addEventListener('animationend', function() {
        currentWrapper.parentNode.removeChild(currentWrapper);
        ele.appendChild(wrapper);
      });
    } else {
      ele.appendChild(wrapper);
    }
  }

  Calendar.prototype.drawWeekDays = function(el) {
    var self = this;
    this.weekDays = createElement('div', 'week-days')
    var weekdays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
    weekdays.forEach(function(weekday){
      var day = createElement('span', 'day', weekday);
      self.weekDays.appendChild(day);
    })
    this.el.appendChild(this.weekDays);
  }

  Calendar.prototype.drawLegend = function() {
    var legend = createElement('div', 'legend');
    var calendars = this.events.map(function(e) {
      return e.calendar + '|' + e.color;
    }).reduce(function(memo, e) {
      if (memo.indexOf(e) === -1) {
        memo.push(e);
      }
      return memo;
    }, []).forEach(function(e) {
      var parts = e.split('|');
      var entry = createElement('span', 'entry ' + parts[1], parts[0]);
      legend.appendChild(entry);
    });
    this.el.appendChild(legend);
  }

  Calendar.prototype.nextMonth = function() {
    this.current.add('months', 1);
    this.next = true;
    this.draw();
  }

  Calendar.prototype.prevMonth = function() {
    this.current.subtract('months', 1);
    this.next = false;
    this.draw();
  }

  window.Calendar = Calendar;

  function createElement(tagName, className, innerText) {
    var element = document.createElement(tagName);
    if (className) {
      element.className = className;
    }
    if (innerText) {
      element.innderText = element.textContent = innerText;
    }
    return element;
  }''
}();

var app = angular.module('myApp', []);
app.controller('AppCtrl', function($scope){
  //alert("pepe")
});
app.directive('calendar', [function(){
  return {
    restrict: 'EA',
    scope: {
      date: '=',
      events: '='
    },
    link: function(scope, element, attributes) {
      var data = [{
        date: new Date(2017, 0, 1),
        events: [{
          name: 'smokeloader',
          type: 'bot',
          color: 'orange'
        }]
      }, {
        date: new Date(2017, 0, 2),
        events: [{
          name: 'zeus',
          type: 'bot',
          color: 'blue'
        }]
      }, {
        date: new Date(2017, 0, 3),
        events: [{
          name: 'ponyloader',
          type: 'bot',
          color: 'yellow'
        }, {
          name: 'aldibot',
          type: 'bot',
          color: 'yellow'
        }, {
          name: 'dirtjumper',
          type: 'malware',
          color: 'yellow'
        }]
      }, {
        date: new Date(2017, 0, 4),
        events: [{
          name: 'andromeda',
          type: 'bot',
          color: 'green'
        }]
      }, {
        date: new Date(2017, 0, 5),
        events: [{
          name: 'conficker',
          type: 'bot',
          color: 'orange'
        }, {
          name: 'umbraloader',
          type: 'bot',
          color: 'orange'
        }]
      }, {
        date: new Date(2017, 0, 17),
        events: [{
          name: 'aldibot',
          type: 'bot',
          color: 'pink'
        }]
      }, {
        date: new Date(2017, 0, 2),
        events: [{
          name: 'zeus',
          type: 'bot',
          color: 'blue'
        }]
      }, {
        date: new Date(2017, 0, 18),
        events: [{
          name: 'ponyloader',
          type: 'bot',
          color: 'yellow'
        }, {
          name: 'aldibot',
          type: 'bot',
          color: 'yellow'
        }, {
          name: 'dirtjumper',
          type: 'malware',
          color: 'yellow'
        }]
      }, , {
        date: new Date(2017, 0, 19),
        events: [{
          name: 'zeus',
          type: 'bot',
          color: 'blue'
        }]
      }, {
        date: new Date(2017, 0, 19),
        events: [{
          name: 'ponyloader',
          type: 'bot',
          color: 'yellow'
        }]
      }]
      var calendar = new Calendar('#calendar', data);
    }
  }
}]);
// ==================> Function Calendar <==================
