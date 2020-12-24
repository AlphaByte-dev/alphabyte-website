(() => {
  const event_template = (event) => {
    return `
      <a href="${event.image}" class="event__image">
        <img src="${event.image}" alt="event image">
        <div class="event__location">${event.location}</div>
      </a>
      <div class="event__info">
        <div class="event__info__child event__datetime">
          <span class="event__date">${event.date.toDateString()}</span><!--
          --><span class="event__datetime-separator">•</span><!--
          --><span class="event__time">${event.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</span>
        </div>
        <div class="event__info__child event__name">${event.name}</div>
        <div class="event__info__child event__description">${event.description.length > 113 ? event.description.substring(0, 110) + '...' : event.description}</div>
        <a class="event__info__child event__button-container ${event.register_link ? '' : 'event__button-disabled'}" href="${event.register_link}" target="_blank">
          <button class="event__button register-button">${event.register_link ? 'Register' : 'Coming soon'}</button>
        </a>
      </div>
    `;
  };
  const no_event_template = (text) => {
    return `
      <div class="no-events">
        ${text}
      </div>
    `;
  };

  const EVENT_DURATION_OFFSET = 2;
  const reference_date = new Date();
  reference_date.setHours(reference_date.getHours() + EVENT_DURATION_OFFSET);

  // Convert ISO 8601 format date string to Date object
  const events = events_data.map(event => {
    event.date = new Date(event.date);
    return event;
  });

  // Upcoming Events
  const upcoming_events_data = events.filter(event => event.date > reference_date);
  const upcomingEventsHTMLElement = document.querySelector('#upcoming-events');

  if(upcoming_events_data.length > 0) {
    upcoming_events_data.sort((a, b) => (a.date > b.date) ? -1 : (a.date < b.date) ? 1 : 0);
    
    const upcomingEventsFragment = document.createDocumentFragment();
    upcoming_events_data.forEach(event => {
      const div = document.createElement('div');
      div.className = 'event';
      div.innerHTML = event_template(event);
      upcomingEventsFragment.appendChild(div);
    });
    upcomingEventsHTMLElement.appendChild(upcomingEventsFragment);
  } else {
    upcomingEventsHTMLElement.innerHTML = no_event_template('No Upcoming Events');
  }
  
  // Past Events
  const past_events_data = events.filter(event => event.date <= reference_date);
  const pastEventsHTMLElement = document.querySelector('#past-events');

  if(past_events_data.length > 0) {
    past_events_data.sort((a, b) => (a.date > b.date) ? -1 : (a.date < b.date) ? 1 : 0);
    
    const pastEventsFragment = document.createDocumentFragment();
    past_events_data.forEach(event => {
      const div = document.createElement('div');
      div.className = 'event';
      div.innerHTML = event_template(event);
      pastEventsFragment.appendChild(div);
    });
    pastEventsHTMLElement.appendChild(pastEventsFragment);
  } else {
    pastEventsHTMLElement.innerHTML = no_event_template('No Past Events');
  }

  // Enable image lightbox to view images fullscreen when clicked
  new SimpleLightbox('.event__image', {
    loop: false,
    nav: false,
    showCounter: false,
    uniqueImages: false,
  });
})();
