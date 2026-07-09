function initLegalDialogs() {
  document.querySelectorAll('[data-legal-open]').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const id = trigger.getAttribute('data-legal-open');
      const dialog = document.getElementById(id);
      if (!dialog) return;

      document.querySelectorAll('.legal-dialog[open]').forEach((openDialog) => {
        if (openDialog !== dialog) openDialog.close();
      });

      dialog.showModal();
    });
  });

  document.querySelectorAll('.legal-dialog').forEach((dialog) => {
    dialog.querySelector('[data-legal-close]')?.addEventListener('click', () => {
      dialog.close();
    });
  });
}

export { initLegalDialogs };
