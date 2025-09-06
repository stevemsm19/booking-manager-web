## What is BEM and its purpose?

BEM stands for **Block Element Modifier**, a CSS methodology widely used in front-end development. Its purpose is to make CSS **organized, maintainable, and scalable**, especially in large projects where many developers work together.

Instead of writing random class names, BEM gives you a clear structure that makes it easy to understand the relationship between components and their parts.

BEM is divided into **three main parts**:

1. **Block:** The main independent component (e.g., `product-card`).
2. **Element:** A part of the block that depends on it (e.g., `product-card__like-buttom`).
3. **Modifier:** A variation or state of a block/element (e.g., `product-card__like-buttom--liked`).

![alt text](<../images/image 11.png>)


## How to structure classes using BEM

BEM uses a simple naming convention:

* **Block**: `.block` → The standalone component.
* **Element**: `.block__element` → A child or part of the block.
* **Modifier**: `.block--modifier` or `.block__element--modifier` → A variation or state.

### Example: Login Form with BEM

**HTML**

```html
<div class="login">
  <h1 class="login__title">Login</h1>
  
  <form class="login__form">
    <app-input-field label="Email" />
    <app-input-field label="Password" />
    <app-button class="login__button">Login</app-button>

    <span class="login__footer">
      Don’t have an account? 
      <a class="login__footer-link" href="/auth/register">I want an account</a>
    </span>
  </form>
</div>
```

**SCSS**

```scss
.login {
  &__title {
    font-size: 2rem;
    text-align: center;
  }

  &__form {
    max-width: 350px;
    margin: 0 auto;
  }

  &__footer {
    text-align: center;

    &-link {
      text-decoration: underline;
    }
  }

  &__form--error {
    border: 2px solid red;
  }
}
```

### Benefits of BEM

- **Clarity:** Anyone can understand what a class does and where it belongs.
- **Reusability:** Blocks and elements can be reused across the project.
- **Scalability:** Easy to extend with modifiers without rewriting styles.

## Resources

- https://medium.com/design-bootcamp/introduction-to-bem-block-element-modifier-a-beginners-guide-35e267b6c39e