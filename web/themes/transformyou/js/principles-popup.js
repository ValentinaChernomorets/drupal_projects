(function (Drupal, once) {
    Drupal.behaviors.principlesPopup = {
      attach: function (context) {
        once('principles-popup', '.hexagon-inner', context).forEach(function (item) {
          item.style.cursor = 'pointer';
          item.addEventListener('click', function () {
            const fullText = this.getAttribute('data-full-body');
            const getTitle = this.getAttribute('data-principles-title')
            const modal = document.createElement('div');
            modal.className = 'custom-modal';
            modal.innerHTML = `
              <div class="modal-inner">
                <div class="modal-close">×</div>
                <h4 class="modal-title">${getTitle}</h4>
                <div class="modal-content">${fullText}</div>
              </div>
            `;
            document.body.appendChild(modal);
            modal.querySelector('.modal-close').onclick = () => modal.remove();
            modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
          });
        });
      }
    };
  })(Drupal, once);
  