## What is Defer Loading

Defer Loading in Angular is a mechanism that allows us to load parts of a template only when they are truly needed, using the `@defer` syntax. Instead of fetching and rendering a component immediately, Angular can delay this process until a logical condition or trigger occurs (for example, a user action or a scroll event).

## Why use Defer Loading

Using Defer Loading improves both **performance** and **user experience**:

- **Faster initial load:** by not fetching all components at once, the first content appears quicker.
- **On-demand rendering:** components are only displayed when they are relevant to the user’s current action.
- **Background prefetching:** Angular can fetch code in the background before it’s needed, so when the user triggers the component, it loads instantly.
- **Fine-grained control:** developers can decide not only when to fetch code (prefetching), but also when to render it, making the app feel more responsive.

## Project Components that could use Defer Loading

I initially wanted to use it in the Hotel-List, but after understanding the concept better, I realized it wasn’t a good candidate since the hotels need to be displayed as soon as the user enters the page. Using defer loading there wouldn’t add any value. Instead, I think the Booking page is a better candidate, because when a user makes a reservation, not all the information is immediately important on the first view.

For example:

* The **main hotel details** (name, image, rating) are displayed at the top and are what the user needs to see first.
* In contrast, the **cancellation policy** is placed further down the page and requires scrolling to view.

This means the cancellation policy is **not important content** and can be deferred without impacting the user’s initial experience.

### Why Use Defer Loading for these Components?

* **Better initial performance:** by deferring the loading of secondary sections (like the cancellation policy), the browser can render the visible part of the page faster.
* **Optimized initial bundle:** Angular doesn’t need to process the code for these sections right away, reducing the upfront workload.
* **Progressive user experience:** the most important information (hotel details, dates, and room options) appears instantly, while additional details load in the background and show up once the user scrolls to them.
* **Scalability:** if more lengthy sections are added in the future (e.g., customer reviews, extra services, location map), they can also be deferred to keep the page lightweight and fast.


## Resources

- https://angular.dev/guide/templates/defer
- https://blog.angular-university.io/angular-defer/
- https://medium.com/netanelbasal/a-comprehensive-guide-to-angulars-defer-block-468c74048df4