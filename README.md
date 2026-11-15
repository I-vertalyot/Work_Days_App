# Work days

A weekly log of where you worked, styled as an old factory time card.

Each card is one week, Monday to Sunday, with the real dates. For every day you can write:

- **Venue**: where you worked. Venues you've used before are suggested as you type.
- **Days worked**: punch the three holes. One click punches half a hole (half a day), a second click punches the whole hole (a full day), up to 3 days per date. Typing a venue on an empty day sets it to 1 day.
- **Extra hours**: whole hours from 0 to 3, entered in red. Use the − / + buttons or type the number.

The card adds up the week, and the red stamp in the corner shows the total for the month.

Move between weeks with the folder tabs on top of the card, or with the ← → keys.

## Running it

It's a single file with no build step. Open `index.html` in a browser, or turn on GitHub Pages for this repository (Settings › Pages › Deploy from a branch › `main`, folder `/`).

## Where entries are saved

- **Opened from GitHub or as a file:** entries are saved in that browser only (local storage). Another browser or device starts with an empty log, and clearing the browser's site data deletes it.
- **Opened as a Claude artifact:** entries are saved to your Claude account and appear on every device.
