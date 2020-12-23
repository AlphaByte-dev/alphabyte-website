(() => {
  const eventsHTMLElement = document.querySelector('#past-events');

  const fragment = document.createDocumentFragment();
  // events_data.sort((a, b) => (a.fullname < b.fullname) ? -1 : (a.fullname > b.fullname) ? 1 : 0);
  events_data.forEach(event => {
    const div = document.createElement('div');
    div.className = 'event';
    div.innerHTML = `
    <a href="${event.image}" class="event__image">
      <img src="${event.image}" alt="event image">
    </a>
    <div class="event__info">
      <div class="event__name">${event.name}</div>
      <div class="event__description">${event.description}</div>
    </div>
    `;
    fragment.appendChild(div);
  });

  eventsHTMLElement.appendChild(fragment);

  new SimpleLightbox('.event__image', {
    loop: false,
    nav: false,
    showCounter: false,
    uniqueImages: false,
  });
})();
