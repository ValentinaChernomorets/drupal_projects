<?php

declare(strict_types=1);

/**
 * @file
 * Theme settings form for transformyou theme.
 */

use Drupal\Core\Form\FormState;

/**
 * Implements hook_form_system_theme_settings_alter().
 */
function transformyou_form_system_theme_settings_alter(array &$form, FormState $form_state): void {

  $form['transformyou'] = [
    '#type' => 'details',
    '#title' => t('transformyou'),
    '#open' => TRUE,
  ];

  $form['transformyou']['example'] = [
    '#type' => 'textfield',
    '#title' => t('Example'),
    '#default_value' => theme_get_setting('example'),
  ];

}
