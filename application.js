const form = document.querySelector('#application-form');
const submitButton = document.querySelector('#application-submit');
const statusMessage = document.querySelector('#application-status');
const applyingAs = document.querySelector('#applying-as');
const teamDetails = document.querySelector('#team-details');
const teamMembers = document.querySelector('#team-members');
let sending = false;

function updateTeamFields() {
  const isTeam = applyingAs.value === 'team';
  teamDetails.hidden = !isTeam;
  teamMembers.disabled = !isTeam;
  teamMembers.required = isTeam;
}

applyingAs.addEventListener('change', updateTeamFields);
updateTeamFields();
submitButton.disabled = false;

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (sending || !form.reportValidity()) return;

  // Native required validation accepts spaces; ask for meaningful text too.
  const requiredFields = [...form.querySelectorAll('[required]')];
  for (const field of requiredFields) {
    if (!field.disabled && !field.value.trim()) {
      statusMessage.textContent = 'Please fill in all required fields.';
      field.focus();
      return;
    }
  }

  sending = true;
  submitButton.disabled = true;
  submitButton.textContent = 'Sending…';
  form.setAttribute('aria-busy', 'true');
  statusMessage.textContent = 'Sending your application…';
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30000);

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' },
      signal: controller.signal,
    });
    const result = await response.json().catch(() => null);
    if (!response.ok || result?.ok === false || result?.errors) {
      const details = Array.isArray(result?.errors)
        ? result.errors.map((error) => error.message).filter(Boolean).join(' ')
        : '';
      const message = response.status === 429
        ? 'Too many requests right now. Please wait a few minutes and try again.'
        : details || 'We couldn’t send your application. Please try again in a little while.';
      statusMessage.textContent = `${message} Your entries are still here.`;
      return;
    }
    // Only a successful JSON response from Formspree confirms receipt.
    if (!result || result.ok !== true) {
      statusMessage.textContent = 'We couldn’t confirm whether your application arrived. Your entries are still here. Please check your connection before trying again.';
      return;
    }
    statusMessage.textContent = 'Thanks! Your application has been received. We’ll use your contact details to get in touch about the project.';
    // Keep the submitted information visible; edits remain available if needed.
  } catch (error) {
    statusMessage.textContent = error.name === 'AbortError'
      ? 'The request timed out, so we couldn’t confirm receipt. Your entries are still here. Please check your connection before trying again.'
      : 'We couldn’t confirm delivery. Please check your internet connection and try again. Your entries are still here.';
  } finally {
    clearTimeout(timeout);
    sending = false;
    form.removeAttribute('aria-busy');
    submitButton.disabled = false;
    submitButton.innerHTML = 'Send application <span aria-hidden="true">↗</span>';
  }
});
