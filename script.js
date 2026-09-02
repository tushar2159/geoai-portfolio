
const filters = [...document.querySelectorAll('.filter')];
const projects = [...document.querySelectorAll('.project-card')];

filters.forEach(btn => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;
    filters.forEach(x => x.classList.toggle('active', x === btn));
    projects.forEach(card => {
      card.classList.toggle('hidden', filter !== 'all' && card.dataset.category !== filter);
    });
  });
});

const dialog = document.getElementById('caseDialog');
const modalTitle = document.getElementById('modalTitle');
const modalText = document.getElementById('modalText');

document.querySelectorAll('.case-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    modalTitle.textContent = btn.dataset.title;
    modalText.textContent = btn.dataset.text;
    dialog.showModal();
  });
});
document.getElementById('closeDialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', e => { if (e.target === dialog) dialog.close(); });
