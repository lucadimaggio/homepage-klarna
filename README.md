# Klarna Design System - Conversion Principles for Codex

## 📋 PROJECT OVERVIEW
Converting HTML/CSS sections to Shopify Liquid components that maintain Klarna's distinctive design while ensuring full e-commerce functionality.

## 🎯 CORE PRINCIPLES

### 1. DESIGN FIDELITY
- **PRESERVE ALL CLASSES**: Keep exact CSS class names from HTML
- **MAINTAIN LAYOUT**: Grid, flexbox, and spacing must remain identical
- **COLOR CONSISTENCY**: Use design tokens variables, never hardcode colors
- **TYPOGRAPHY**: Maintain font hierarchy and spacing
- **RESPONSIVE**: All sections must work on mobile, tablet, desktop

### 2. SHOPIFY BEST PRACTICES
- **Schema Settings**: Every configurable element needs schema
- **Performance**: Minimize Liquid operations in loops
- **SEO**: Include proper semantic HTML and structured data
- **Accessibility**: Maintain ARIA labels and semantic structure
- **Loading**: Consider lazy loading for non-critical content

### 3. LIQUID CONVERSION STANDARDS

#### Required File Structure:
```
sections/
├── klarna-[section-name].liquid
└── [section-name] contains:
    ├── Liquid logic
    ├── HTML with Liquid variables
    ├── Schema settings
    └── CSS (if section-specific)
```

#### Naming Conventions:
- **Files**: `klarna-[descriptive-name].liquid`
- **Schema IDs**: `snake_case` format
- **CSS Classes**: Keep original from HTML (e.g., `.klarna-hero`, `.klarna-feature-card`)
- **Variables**: `{{ section.settings.variable_name }}`

## 🔧 TECHNICAL REQUIREMENTS

### Schema Settings Template:
```json
{
  "name": "Section Name",
  "tag": "section",
  "class": "klarna-section-name",
  "settings": [
    {
      "type": "text",
      "id": "heading",
      "label": "Heading",
      "default": "Default Text"
    },
    {
      "type": "richtext", 
      "id": "description",
      "label": "Description"
    },
    {
      "type": "image_picker",
      "id": "image",
      "label": "Image"
    },
    {
      "type": "url",
      "id": "link",
      "label": "Link URL"
    },
    {
      "type": "color",
      "id": "background_color",
      "label": "Background Color"
    }
  ],
  "presets": [
    {
      "name": "Section Name"
    }
  ]
}
```

### Variable Mapping Rules:
- **Headings**: `{{ section.settings.heading | escape }}`
- **Rich Text**: `{{ section.settings.description }}`
- **Images**: `{{ section.settings.image | image_url: width: 800 | image_tag: loading: 'lazy' }}`
- **Links**: `{{ section.settings.link }}`
- **Colors**: Use CSS variables, not inline styles

### Liquid Logic Patterns:
```liquid
{% comment %} Check if content exists {% endcomment %}
{% if section.settings.heading != blank %}
  <h2>{{ section.settings.heading | escape }}</h2>
{% endif %}

{% comment %} Image handling {% endcomment %}
{% if section.settings.image %}
  {{ section.settings.image | image_url: width: 800 | image_tag: loading: 'lazy', alt: section.settings.image.alt }}
{% else %}
  <div class="placeholder-image">📱</div>
{% endif %}

{% comment %} Link handling {% endcomment %}
{% if section.settings.link != blank %}
  <a href="{{ section.settings.link }}" class="klarna-btn">
{% else %}
  <div class="klarna-btn disabled">
{% endif %}
```

## 🛍️ SHOPIFY E-COMMERCE INTEGRATION

### Product Data Access:
```liquid
{% comment %} For product-related sections {% endcomment %}
{% assign featured_products = collections.featured.products | limit: 3 %}
{% for product in featured_products %}
  <div class="klarna-product-card">
    <h3>{{ product.title }}</h3>
    <p>{{ product.price | money }}</p>
    <p class="klarna-installment">o 3 rate da {{ product.price | divided_by: 3 | money }}</p>
  </div>
{% endfor %}
```

### Collection Integration:
```liquid
{% comment %} For brand/collection grids {% endcomment %}
{% assign featured_collections = collections | limit: 8 %}
{% for collection in featured_collections %}
  <div class="klarna-brand-card">
    {% if collection.image %}
      {{ collection.image | image_url: width: 300 | image_tag }}
    {% endif %}
    <h4>{{ collection.title }}</h4>
  </div>
{% endfor %}
```

### Cart/Checkout Integration:
```liquid
{% comment %} For sections with purchase actions {% endcomment %}
<form action="/cart/add" method="post" enctype="multipart/form-data">
  <input type="hidden" name="id" value="{{ product.selected_or_first_available_variant.id }}">
  <button type="submit" class="klarna-btn-primary">
    Aggiungi al carrello
  </button>
</form>
```

## 📱 RESPONSIVE REQUIREMENTS

### Breakpoint Standards:
- **Mobile**: max-width: 768px
- **Tablet**: 769px - 1024px  
- **Desktop**: 1025px+

### CSS Grid/Flexbox:
- Use CSS Grid for main layouts
- Flexbox for component internal alignment
- Always include `grid-template-columns: 1fr` for mobile

## 🎨 DESIGN TOKEN USAGE

### Always Use Variables:
```css
/* ✅ CORRECT */
background-color: var(--klarna-pink);
padding: var(--space-lg);
border-radius: var(--radius-md);

/* ❌ WRONG */
background-color: #FFB3D4;
padding: 24px;
border-radius: 12px;
```

### Color Palette:
- `--klarna-dark`: #1A0B2E
- `--klarna-pink`: #FFB3D4  
- `--klarna-purple`: #8B5FBF
- `--klarna-green`: #00D4AA
- `--klarna-white`: #FFFFFF
- `--klarna-black`: #000000

### Spacing Scale:
- `--space-xs`: 4px
- `--space-sm`: 8px
- `--space-md`: 16px
- `--space-lg`: 24px
- `--space-xl`: 32px
- `--space-2xl`: 48px
- `--space-3xl`: 64px

## ⚡ PERFORMANCE GUIDELINES

### Critical Optimizations:
- **Lazy Loading**: Add `loading="lazy"` to all images
- **Image Sizing**: Always specify `width` parameter for `image_url`
- **Minimal Liquid**: Avoid complex logic in templates
- **CSS Efficiency**: Use existing classes, avoid inline styles

### Image Optimization:
```liquid
{% comment %} Responsive images {% endcomment %}
{{ image | image_url: width: 800 | image_tag: 
   loading: 'lazy',
   sizes: '(max-width: 768px) 100vw, 50vw',
   widths: '300, 600, 800, 1200'
}}
```

## 🧪 TESTING CHECKLIST

### Before Delivery, Verify:
- [ ] **Visual**: Section looks identical to HTML version
- [ ] **Responsive**: Works on all device sizes
- [ ] **Settings**: All schema settings function in customizer
- [ ] **Performance**: No console errors or slow loading
- [ ] **Content**: Graceful handling of missing content
- [ ] **Links**: All links and buttons work correctly
- [ ] **SEO**: Proper heading hierarchy and meta data

## 🚫 COMMON MISTAKES TO AVOID

### DON'T:
- Change CSS class names from original HTML
- Use inline styles instead of CSS variables
- Hardcode text that should be configurable
- Ignore mobile responsive requirements
- Skip schema settings for configurable content
- Use complex Liquid logic that slows rendering
- Forget image alt text and accessibility features

### DO:
- Preserve exact HTML structure and classes
- Use schema settings for all customizable content
- Include proper error handling for missing content
- Add loading="lazy" to all images
- Test in Shopify customizer preview
- Include semantic HTML and ARIA labels
- Use Shopify's built-in filters (escape, money, etc.)

## 📚 SHOPIFY REFERENCE

### Essential Liquid Filters:
- `| escape` - For user-inputted text
- `| money` - For prices
- `| image_url: width: X` - For images
- `| limit: X` - For collections/arrays
- `| default: 'fallback'` - For missing values

### Schema Setting Types:
- `text` - Short text input
- `richtext` - Rich text editor
- `image_picker` - Image selection
- `color` - Color picker
- `url` - URL input
- `checkbox` - Boolean toggle
- `select` - Dropdown options
- `range` - Numeric slider

## 🎯 SUCCESS CRITERIA

A successful conversion will:
1. **Look identical** to the original HTML design
2. **Be fully configurable** via Shopify customizer
3. **Work perfectly** on all devices
4. **Load quickly** with optimized assets
5. **Integrate seamlessly** with Shopify e-commerce features
6. **Follow all** Shopify and accessibility best practices

---

**Remember**: The goal is to create Liquid sections that are indistinguishable from the original HTML design while being fully integrated with Shopify's e-commerce ecosystem.
