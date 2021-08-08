# Spotify Focus

Removes the space-click conflict in the [Spotify Web Player](https://open.spotify.com/) - music starts, and pauses again. It also fixes similar issues with the other control panel buttons.

# Bug

![Bug showcase](./git-content/bug.gif)

# Fix

A simple `onClick` listener is added to the control panel buttons once they are loaded. `onClick` has been chosen to still allow for tab selection. The listener simply blurs the button when it's clicked:

```js
btn.addEventListener("click", (_) => {
  btn.blur();
});
```
