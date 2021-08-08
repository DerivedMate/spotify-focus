"use strict";

/**
 * @description Repeatedly tries to select `selector` in `timeout` ms intervals.
 * @param {String} selector Element selector.
 * @param {Number} timeout Time between checking intervals.
 * @throws {Error} Throws if `selector` cannot be found after 50 tries.
 * @returns {Promise<NodeList>} Selected elements.
 */
const get_elements = (selector, timeout) =>
  new Promise((res, rej) => {
    let hit_count = 0;

    const interval = setInterval(() => {
      hit_count++;

      // Elements not found. Abort
      if (hit_count > 50) {
        clearInterval(interval);

        return rej(
          new Error(
            `[spotify-focus]: Elements not found. Selector: ${selector}`
          )
        );
      }

      const elements = document.querySelectorAll(selector);
      if (elements.length) {
        clearInterval(interval);
        res(elements);
      }
    }, timeout);
  });

get_elements(`.player-controls button`, 500)
  .then((buttons) =>
    buttons.forEach((btn) => {
      // Attach on `click` to still allow for tab selection.
      btn.addEventListener(
        "click",
        (_) => {
          // Guard to prevent calling `.blur` on undefined.
          btn && btn.blur();
        },
        // Make sure the listener is non-blocking
        { passive: true }
      );

      console.info(`[spotify-focus]: Attached blur events`);
    })
  )
  .catch((e) => console.error(`[spotify-focus]: ${e}`));
