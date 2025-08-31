## What is OnPush

First I tried to understand what OnPush is. I found that it is a change detection strategy in Angular that optimizes the performance of the detection cycle. Unlike the **Default** strategy, OnPush limits when and how changes in a component are checked, reducing unnecessary work for the framework.


## How It Works

With OnPush, Angular only performs change detection on a component when one of these situations occurs:

1. An `@Input` changes **by reference**.
2. An **event occurs within the component** (e.g. a click).
3. Change detection is manually triggered using methods like `markForCheck()` or `detectChanges()`.

This means that OnPush relies on **data immutability**, since Angular needs to know when the reference of an object has changed in order to refresh the view.

**Now**, I wanted to understand a little bit about the differences between OnPush and Default Strategy, and I discovered the following:

- **Default**:
  - Checks the entire application in every detection cycle.
  - Does not require following an immutability pattern.
  - More flexible but can impact performance in large apps.

- **OnPush**:
  - Only validates changes if the reference of an `@Input` changes, an internal event occurs, or detection is manually triggered.
  - Requires working with immutable data to function correctly.
  - Much more efficient in terms of resource usage.

## When to Apply OnPush

- When data is handled in an **immutable** way.
- In components that render **large lists** or complex data.
- To improve **performance** in medium to large applications.
- When you want more explicit control over the change detection cycle.

## Project Components that could use OnPush

These components are designed to be reusable UI elements that receive data through @Input and are typically not influenced by frequent external state changes. For example, the alert component will only change if new data (like a message) is passed to it, but once it is displayed, it doesn't need constant checks for re-rendering. By using OnPush, we ensure that Angular only checks these components for updates when there is a change in the reference of their @Input values.

- [src/app/shared/components](https://gitlab.com/jala-university1/cohort-2/oficial-es-programaci-n-5-cspr-351.ga.t2.25.m1/secci-n-c/oscarstevenmunozfajardo/frontend/-/tree/main/src/app/shared/components?ref_type=heads)
  - alert
  - buttom
  - card
  - input-field

These components displays details about bookings, hotel and rooms. It typically receives the data as an @Input and doesn’t change unless the parent component updates the input. Since this data is generally immutable once the card is rendered, implementing OnPush ensures that Angular only performs change detection when the @Input reference changes, which reduces unnecessary cycles and improves rendering performance.

- [booking-card](https://gitlab.com/jala-university1/cohort-2/oficial-es-programaci-n-5-cspr-351.ga.t2.25.m1/secci-n-c/oscarstevenmunozfajardo/frontend/-/blob/main/src/app/features/my-bookings/components/booking-card/booking-card.ts?ref_type=heads)
- [room-card](https://gitlab.com/jala-university1/cohort-2/oficial-es-programaci-n-5-cspr-351.ga.t2.25.m1/secci-n-c/oscarstevenmunozfajardo/frontend/-/blob/main/src/app/features/new-bookings/components/room-card/room-card.ts?ref_type=heads)
- [hotel-card](https://gitlab.com/jala-university1/cohort-2/oficial-es-programaci-n-5-cspr-351.ga.t2.25.m1/secci-n-c/oscarstevenmunozfajardo/frontend/-/blob/main/src/app/features/search-hotels/components/hotel-card/hotel-card.ts?ref_type=heads)


### Why OnPush for these components?

All of the above components primarily rely on @Input data passed from their parent components. Since they don't need frequent checks for changes, applying the OnPush strategy is ideal for performance optimization. OnPush ensures that Angular only checks these components when the reference of their @Input values changes.

# Reference

- https://blog.angular-university.io/onpush-change-detection-how-it-works/
- https://angular.love/the-latest-in-angular-change-detection-zoneless-signals
- https://medium.com/@akbar123jason/supercharge-your-angular-apps-performance-with-onpush-53fb5d210c0b