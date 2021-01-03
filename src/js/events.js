import events_data from '../data/data_events';

const TODAY_DATE = new Date();
function splitTimeFromHours(numberOfHours){
  const days = Math.floor(numberOfHours / 24);
  const remainder = numberOfHours % 24;
  const hours = Math.floor(remainder);
  const mins = Math.floor(60 * (remainder - hours));
  return {days, hours, mins};
}

const event_template = (event, isPastEvent) => {
  const description_long = event.description;
  const description_short = event.description.substring(0, 110);
  const isDescriptionOverflow = description_long.length > 113 ;
  const expand_button_html = `<span class="event__description-expand">+</span>`;
  const collapse_button_html = `<span class="event__description-collapse">-</span>`;

  const { days, hours } = splitTimeFromHours(event.duration_hours);
  const duration = event.duration_hours ? `${days ? days + (days === 1 ? ' day' : ' days') : ''}${hours ? ' ' + hours + (hours === 1 ? ' hour' : ' hours') : ''}` : '';

  const div = document.createElement('div');
  div.className = 'event';
  div.innerHTML = `
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
      <div class="event__info__child event__duration">${duration}</div>
      <div class="event__info__child event__description">${isDescriptionOverflow ? description_short + '...' : description_long}${isDescriptionOverflow ? expand_button_html : ''}</div>
      ${((event.additional_buttons && event.additional_buttons.length) || (event.vod && event.vod.length)) || !isPastEvent ?
        `<div class="event__info__child event__buttons">
          <a class="event__button-container register-button-container ${event.register_link ? '' : 'event__button-disabled'}" href="${event.register_link}" target="_blank">
            <button class="event__button register-button">${event.register_link ? '<i class="fas fa-edit"></i>Register' : 'Coming soon'}</button>
          </a>
          ${
            event.vod && `
              <a class="event__button-container vod-button-container" href="${event.vod}" target="_blank">
                <button class="event__button vod-button"><i class="fab fa-youtube"></i>Watch</button>
              </a>
            `
          }
          ${
            event.additional_buttons && event.additional_buttons.length ? event.additional_buttons.map(button =>
              `<a class="event__button-container additional-button-container" href="${button.url}" target="_blank">
                <button class="event__button additional-button">${button.text}</button>
              </a>`
            ).join('') : ''
          }
        </div>` : ''
      }
    </div>
  `;

  // Expand and collapse description listener
  const description_container = div.querySelector('.event__description');
  const expand_description_button = div.querySelector('.event__description-expand');
  if(expand_description_button) {
    console.log('gg', event.name);
    description_container.addEventListener('click', event => {
      const selectedButton = event.target;
      console.dir(selectedButton);
      if(event.target.className.includes('event__description-expand')) {
        div.querySelector('.event__description').innerHTML = `${description_long}${collapse_button_html}`;
        expand_description_button.remove();
      }
      if(event.target.className.includes('event__description-collapse')) {
        div.querySelector('.event__description').innerHTML = `${description_short}...${expand_button_html}`;
        expand_description_button.remove();
      }
    });
    
  }

  return div;
};
const no_event_template = (text) => {
  return `
    <div class="no-events">
      ${text}
    </div>
  `;
};

// Convert ISO 8601 format date string to Date object
const events = events_data.map(event => {
  event.date = new Date(event.date);
  return event;
});

// Upcoming Events
const upcoming_events_data = events.filter(event => {
  const event_end_date = new Date(event.date.getTime());
  event_end_date.setHours(event_end_date.getHours() + event.duration_hours);
  return TODAY_DATE < event_end_date;
});
const upcomingEventsHTMLElement = document.querySelector('#upcoming-events');

if(upcoming_events_data.length > 0) {
  upcoming_events_data.sort((a, b) => (a.date < b.date) ? -1 : (a.date > b.date) ? 1 : 0);
  
  const upcomingEventsFragment = document.createDocumentFragment();
  upcoming_events_data.forEach(event => {
    const div = event_template(event, false);
    upcomingEventsFragment.appendChild(div);
  });
  upcomingEventsHTMLElement.appendChild(upcomingEventsFragment);
} else {
  upcomingEventsHTMLElement.innerHTML = no_event_template('No Upcoming Events');
}

// Past Events
const past_events_data = events.filter(event => {
  const event_end_date = new Date(event.date.getTime());
  event_end_date.setHours(event_end_date.getHours() + event.duration_hours);
  return TODAY_DATE >= event_end_date;
});
const pastEventsHTMLElement = document.querySelector('#past-events');
const loadMoreButton = document.querySelector('#load-more-past-events');
let past_events_data_loaded;
let past_events_data_remaining;
const PAST_EVENTS_TO_PRELOAD = 5;

if(past_events_data.length > 0) {
  past_events_data.sort((a, b) => (a.date > b.date) ? -1 : (a.date < b.date) ? 1 : 0);
  past_events_data_loaded = past_events_data.slice(0, PAST_EVENTS_TO_PRELOAD);
  past_events_data_remaining = past_events_data.slice(PAST_EVENTS_TO_PRELOAD, past_events_data.length);
  
  const pastEventsFragment = document.createDocumentFragment();
  past_events_data_loaded.forEach(event => {
    const div = event_template(event, true);
    pastEventsFragment.appendChild(div);
  });
  pastEventsHTMLElement.appendChild(pastEventsFragment);
} else {
  pastEventsHTMLElement.innerHTML = no_event_template('No Past Events');
}

if(past_events_data_remaining.length === 0) {
  loadMoreButton.remove();
} else {
  loadMoreButton.addEventListener('click', event => {
    if(past_events_data_remaining.length > 0) {
      const PAST_EVENTS_TO_APPEND = 4;
      const past_events_data_to_append = past_events_data_remaining.splice(0, PAST_EVENTS_TO_APPEND);

      const pastEventsFragment = document.createDocumentFragment();
      past_events_data_to_append.forEach(event => {
        const div = event_template(event, true);
        pastEventsFragment.appendChild(div);
      });
      pastEventsHTMLElement.appendChild(pastEventsFragment);
      if(past_events_data_remaining.length === 0) {
        loadMoreButton.remove();
      }
    } else {
      loadMoreButton.remove();
    }
  });
}

// Enable image lightbox to view images fullscreen when clicked
new SimpleLightbox('.event__image', {
  loop: false,
  nav: false,
  showCounter: false,
  uniqueImages: false,
});
