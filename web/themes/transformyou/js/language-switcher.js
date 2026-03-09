(function (Drupal, once) {
    Drupal.behaviors.principlesLanguageSwitcher = {
      attach: function (context) {
        once('language-switcher','.language-switcher-wrapper', context).forEach(wrapper => {
          const selected = wrapper.querySelector('.selected-language');
          const list = wrapper.querySelector('.language-switcher')
          if (!selected || !list) return;
          selected.addEventListener('click', e => {
            e.stopPropagation();
            list.classList.toggle('open');
            list.style.display = list.style.display === 'block' ? 'none' : 'block';
          });
          list.querySelectorAll('li').forEach(item => {
            item.addEventListener('click', () => {
              list.classList.remove('open');
              window.location = item.dataset.value;
            });
          });
          document.addEventListener('click', () => {
            list.classList.remove('open');
            list.style.display = 'none';
          });
        });
      }
    };
  })(Drupal, once);