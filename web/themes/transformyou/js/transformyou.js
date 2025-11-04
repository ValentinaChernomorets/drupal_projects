/**
 * @file
 * transformyou behaviors.
 */
(function (Drupal) {
  'use strict';

  Drupal.behaviors.transformyou = {
    attach (context, settings) {
      console.log('It works!!!');
      // Mobile menu functionality
      const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
      const mobileNav = document.querySelector('.main-menu');
      mobileMenuToggle.addEventListener('click', () => {
          mobileMenuToggle.classList.toggle('active');
          mobileNav.classList.toggle('active');
      });

      // Close mobile menu when clicking on links
      document.querySelectorAll('.mobile-nav a').forEach(link => {
          link.addEventListener('click', () => {
              mobileMenuToggle.classList.remove('active');
              mobileNav.classList.remove('active');
          });
      });

      // Close mobile menu when clicking outside
      document.addEventListener('click', (e) => {
          if (!mobileMenuToggle.contains(e.target) && !mobileNav.contains(e.target)) {
              mobileMenuToggle.classList.remove('active');
              mobileNav.classList.remove('active');
          }
      });
       // Enhanced smooth scrolling
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            // Skip if href is just "#"
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
      });
    }
  };

} (Drupal));
