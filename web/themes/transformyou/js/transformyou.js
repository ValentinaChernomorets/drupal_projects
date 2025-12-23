/**
 * @file
 * transformyou behaviors.
 */
(function (Drupal) {
  'use strict';

  Drupal.behaviors.transformyou = {
    attach (context, settings) {
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


(function (Drupal, once) {
  Drupal.behaviors.transformyou = {
    attach(context, settings) {

      // Mobile menu toggle
      once('mobile-menu-toggle', '.mobile-menu-toggle', context).forEach((mobileMenuToggle) => {
        const mobileNav = document.querySelector('.main-menu');

        mobileMenuToggle.addEventListener('click', (e) => {
          e.preventDefault();
          mobileMenuToggle.classList.toggle('active');
          mobileNav.classList.toggle('active');
        });
      });

      // Close mobile menu on link click
      once('mobile-menu-links', '.menu-item a', context).forEach((link) => {
        link.addEventListener('click', () => {
          document.querySelector('.mobile-menu-toggle')?.classList.remove('active');
          document.querySelector('.main-menu')?.classList.remove('active');
        });
      });
      // ScrollBtn
      const scrollRtn = document.getElementById('scrollTopBtn');
      window.addEventListener('scroll', () => {
        const pageHeight = document.documentElement.scrollHeight;
        const viewHeight = window.innerHeight;
        const scrolled = window.scrollY;
        if (scrolled + viewHeight >= pageHeight - 50) {
          scrollRtn.classList.add('show');
        } else {
          scrollRtn.classList.remove('show');
        }
        scrollRtn.addEventListener('click', () => {
          scrollRtn.classList.remove('show');
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          })
        })
      });
      document.addEventListener('DOMContentLoaded', function() {
        const header = document.querySelector('header');
        header.style.top = '0';
      });
    }
  };
})(Drupal, once);
