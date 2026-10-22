# Musical instrument recruitment prototype

Plain HTML, CSS, and JavaScript. No build step or dependencies. Applications are sent to Formspree using fetch and FormData.

## Local preview

For the simplest preview, open `index.html` directly in your browser and refresh manually after edits. Everything is local and works without a server.

For an HTTP preview, from this folder:

```sh
python3 -m http.server 8010 --bind 0.0.0.0
```

On your Mac, open http://127.0.0.1:8010. On an iPhone connected to the same Wi-Fi, open `http://<Mac Wi-Fi IP>:8010` (the current address is provided in the task report and may change). Refresh the browser manually after edits. There is no automatic reload or hot update; edits are served directly without rebuilding or restarting. Stop the server with Ctrl+C.

The form submits to `https://formspree.io/f/xwlvgjjv`. Use the HTTP preview for testing. No real application has been submitted automatically. The illustration is an indicative concept, not an electronics assembly guide.

Photo uploads are omitted because the endpoint’s upload entitlement and storage configuration could not be verified. Applicants can share photo links instead. Before enabling uploads, confirm the account plan, storage, and file validations in Formspree.

For your final end-to-end test, fill the form, check the team fields, send one application, and confirm it appears in the Formspree dashboard. Try again offline to check that the error preserves your entries. Verify the endpoint is active and its domain restrictions and spam settings allow the intended website and AJAX requests. No notifications, analytics, or additional services were configured.

GitHub Pages publishes this static website from `main`, repository root: https://lofturth.github.io/music-instrument/. Relative asset paths support the project URL; `.nojekyll` disables unnecessary Jekyll processing.
