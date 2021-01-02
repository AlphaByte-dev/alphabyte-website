import tippy from 'tippy.js';
import roles_data from '../data/data_roles';

const membersHTMLElement = document.querySelector('#core-committee-members');

const fragment = document.createDocumentFragment();
members_data.sort((a, b) => (a.fullname < b.fullname) ? -1 : (a.fullname > b.fullname) ? 1 : 0);
members_data.forEach(member => {
  const div = document.createElement('div');
  div.className = 'member';
  div.innerHTML = `
    <div class="member-image">
      <img src="${member.image}" />
    </div>
    <div class="member__info">
      <div class="member__fullname">${member.fullname}</div>
      <div class="member__role">${member.role}</div>
    </div>
    <div class="member-social">
    ${member.social_links.website ?
      `<a href="${member.social_links.website}" target="_blank">
        <i class="fas fa-globe"></i>
      </a>`:""}
      ${member.social_links.github ?
      `<a href="${member.social_links.github}" target="_blank">
        <i class="fab fa-github"></i>
      </a>`:""}
      ${member.social_links.linkedin ? 
      `<a href="${member.social_links.linkedin}" target="_blank">
        <i class="fab fa-linkedin"></i>
      </a>`:""}
      ${member.social_links.twitter ? 
        `<a href="${member.social_links.twitter}" target="_blank">
          <i class="fab fa-twitter"></i>
        </a>`:""}
      ${member.social_links.instagram ? 
        `<a href="${member.social_links.instagram}" target="_blank">
          <i class="fab fa-instagram"></i>
        </a>`:""}
      ${member.social_links.facebook ? 
      `<a href="${member.social_links.facebook}" target="_blank">
        <i class="fab fa-facebook"></i>
      </a>`:""}
    </div>
  `;
  fragment.appendChild(div);

  if(roles_data[member.role]) {
    const role = div.querySelector('.member__role');
    role.style.borderBottom = '2px dotted rgba(var(--color-primary-rgb), .35)';
    role.style.cursor = 'pointer';
    tippy(role, {
      content: roles_data[member.role].description,
      placement: 'right',
      offset: [0, 16],
    });
  }
});

membersHTMLElement.appendChild(fragment);
