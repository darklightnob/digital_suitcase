# DIGITAL SUITCASE

### A Smart, Personalized Travel Packing Planner

**Hackathon Project \| LAYOVER 2026**

Digital Suitcase is a browser-based travel packing assistant that helps
people prepare for trips with a personalized item list, estimated
luggage-weight tracking, packing-readiness feedback, international-trip
restriction warnings, and a step-by-step suitcase organizer.

Instead of treating packing as a generic checklist, Digital Suitcase
combines the user's selected destinations, climate, trip duration, and
luggage capacity to help them decide what to pack and where to place it.

------------------------------------------------------------------------

## The Problem

Travelers commonly face several packing problems:

-   Forgetting essentials such as chargers, weather-appropriate
    clothing, or travel documents.
-   Packing too much and exceeding their intended luggage-weight limit.
-   Repeating the same planning work for trips with different
    destinations or weather.
-   Not knowing how to organize items efficiently inside a suitcase.
-   Overlooking items that may be restricted or subject to special rules
    during international travel.

## Our Solution

Digital Suitcase brings trip setup, packing-list preparation, weight
awareness, readiness feedback, and suitcase organization into one simple
web application.

The user creates a trip, reviews a combined packing list, adjusts
quantities, adds personal items, checks the readiness score, optionally
creates a Google Calendar packing reminder, and then organizes each item
into a suggested luggage zone.

## Key Features

### 1. Personalized Trip Setup

-   Select one or multiple destinations, including beach, mountain, hill
    station, city, and foreign/international trip.
-   Select a climate: summer, winter, rainy, or windy.
-   Enter the trip duration in days.
-   Enter a personal luggage-weight limit in kilograms.
-   Trip duration and weight limit are user-entered rather than fixed
    presets.

### 2. Adaptive Packing List

-   Recommendations reflect the selected destinations, climate, and trip
    length.
-   When multiple destinations are selected, their recommendations are
    combined.
-   International trips include reminders for items such as passports,
    entry documents, tickets, and travel adapters.
-   Increase or decrease the quantity of each item using `+` and `−`
    controls.

### 3. Custom Items and Weight Tracking

-   Add an item by entering its name, category, and individual weight.
-   Adjust quantities for both built-in and custom items.
-   View the estimated total weight and compare it with the user's
    entered limit.
-   Use measured item weights where possible; built-in weights are
    estimates.

### 4. Packing Readiness Score

-   Receive a score out of 100 based on the packing list and the app's
    recommendations.
-   Review suggestions for missing or insufficiently packed items.
-   Use the score as a practical checklist aid, not as a guarantee that
    every personal need has been covered.

### 5. Google Calendar Packing Reminder

-   Choose a date for the packing reminder.
-   Generate a prefilled Google Calendar event containing the selected
    item list, quantities, trip details, and estimated weight.
-   Review the event and save it to Google Calendar.

**Note:** The app opens a prefilled calendar event; the user must save
it. Calendar notifications depend on the user's Google Calendar
settings. This feature does not use Google API credentials or
automatically write to a user's calendar.

### 6. Smart Suitcase Organizer

-   Suggest packing zones such as bottom near the wheels, middle layer,
    side gaps, top/easy-access area, and carry-on/personal bag.
-   Move items between zones using drag-and-drop or the placement
    selector.
-   Mark items as physically packed and track packing progress.
-   Keep documents and valuables accessible and review airline rules for
    electronics, liquids, medicines, batteries, and other regulated
    items.

### 7. International-Trip Restriction Warnings

When an international destination is selected, the app flags item names
that match its warning rules---for example, knives/blades, tools such as
screwdrivers, guns or ammunition, gunpowder, weapons, controlled drugs,
gold, and liquids/gels/aerosols.

These are **review warnings, not legal determinations**. Rules differ by
country, airline, and carry-on versus checked baggage. Users must verify
current official requirements.

------------------------------------------------------------------------

## How to Use the Application

1.  Open the home page and start a packing plan.
2.  Select one or more destinations and choose the climate.
3.  Enter the trip duration and luggage-weight limit.
4.  Review the recommended list, adjust quantities, and add any custom
    items with their weights.
5.  Open the packing score to review the estimated weight and
    missing-item suggestions.
6.  Optionally choose a reminder date and save the prefilled event in
    Google Calendar.
7.  Open **Organize My Suitcase**, assign items to packing zones, and
    mark them as placed.

## Technology Stack

-   **HTML5** --- page structure and forms.
-   **CSS3** --- visual design, layout, and responsive styling.
-   **Vanilla JavaScript** --- trip state, recommendations, item
    quantities, weight calculations, restriction warnings, readiness
    score, calendar-event link, and organizer interactions.

The project uses no frontend framework, build system, or required
backend.

## How to Run

1.  Download and extract the project ZIP.
2.  Open the `packaged-panic` folder.
3.  Open `index.html` in a modern browser such as Chrome, Firefox,
    Safari, or Edge.
4.  An internet connection is needed to open Google Calendar. The rest
    of the core packing workflow runs in the browser.

No installation, account, or API key is required to use the core
application.

## Project Structure

``` text
packaged-panic/
├── index.html    # Application shell and page metadata
├── style.css     # Visual design and responsive styling
├── script.js     # Trip setup, items, scoring, calendar link, and organizer
└── README.md     # Project documentation
```

## What Makes Digital Suitcase Useful?

-   **Personalized:** Supports multiple destinations, different
    climates, and user-entered trip duration and luggage limits.
-   **Flexible:** Users can change quantities and add their own items.
-   **Actionable:** The readiness score highlights possible omissions
    instead of only showing a list.
-   **Practical:** Includes a calendar reminder and packing-zone
    organizer for use before and during packing.
-   **Accessible to try:** Runs as a lightweight static website without
    account creation or backend setup.

## Current Limitations and Future Improvements

-   Trip data is held in the current browser session and is not
    permanently saved; refreshing may reset trip choices and packing
    progress.
-   Built-in weights and recommendations are estimates and may not match
    every traveler or destination.
-   Restriction warnings use name-matching rules and do not replace
    official legal or airline guidance.
-   The calendar feature prepares an event for the user to review and
    save; it does not automatically create events through an
    authenticated Google Calendar API connection.
-   Future improvements could include saved trip profiles, official
    travel-rule integrations, airline-specific baggage guidance, more
    detailed activity-based recommendations, and persistent packing
    progress.

## Responsible-Use Note

Digital Suitcase is a planning assistant, not an official source for
immigration, customs, airline baggage, or security requirements. Always
verify entry documents, restricted items, and baggage rules with the
relevant government, airport, and airline before travelling.

------------------------------------------------------------------------

**Digital Suitcase --- Pack with a plan. Travel with confidence.**
