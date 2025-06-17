# Sistema Design Klarna - Principi di Conversione per Codex

## 📋 PANORAMICA PROGETTO
Conversione di sezioni HTML/CSS in componenti Liquid Shopify che mantengano il design distintivo di Klarna garantendo piena funzionalità e-commerce.

## 🎯 PRINCIPI FONDAMENTALI

### 1. FEDELTÀ AL DESIGN
- **PRESERVARE TUTTE LE CLASSI**: Mantenere i nomi esatti delle classi CSS dall'HTML
- **MANTENERE IL LAYOUT**: Grid, flexbox e spaziature devono rimanere identici
- **COERENZA COLORI**: Usare variabili design tokens, mai colori hardcoded
- **TIPOGRAFIA**: Mantenere gerarchia font e spaziature
- **RESPONSIVE**: Tutte le sezioni devono funzionare su mobile, tablet, desktop

### 2. BEST PRACTICE SHOPIFY
- **Schema Settings**: Ogni elemento configurabile ha bisogno di schema
- **Performance**: Minimizzare operazioni Liquid nei loop
- **SEO**: Includere HTML semantico e dati strutturati
- **Accessibilità**: Mantenere label ARIA e struttura semantica
- **Caricamento**: Considerare lazy loading per contenuti non critici

### 3. STANDARD CONVERSIONE LIQUID

#### Struttura File Richiesta:
```
sections/
├── klarna-[nome-sezione].liquid
└── [nome-sezione] contiene:
    ├── Logica Liquid
    ├── HTML con variabili Liquid
    ├── Schema settings
    └── CSS (se specifico per sezione)
```

#### Convenzioni Nomenclatura:
- **File**: `klarna-[nome-descrittivo].liquid`
- **ID Schema**: formato `snake_case`
- **Classi CSS**: Mantenere originali dall'HTML (es. `.klarna-hero`, `.klarna-feature-card`)
- **Variabili**: `{{ section.settings.nome_variabile }}`

## 🔧 REQUISITI TECNICI

### Template Schema Settings:
```json
{
  "name": "Nome Sezione",
  "tag": "section",
  "class": "klarna-nome-sezione",
  "settings": [
    {
      "type": "text",
      "id": "titolo",
      "label": "Titolo",
      "default": "Testo Predefinito"
    },
    {
      "type": "richtext", 
      "id": "descrizione",
      "label": "Descrizione"
    },
    {
      "type": "image_picker",
      "id": "immagine",
      "label": "Immagine"
    },
    {
      "type": "url",
      "id": "link",
      "label": "URL Link"
    },
    {
      "type": "color",
      "id": "colore_sfondo",
      "label": "Colore Sfondo"
    }
  ],
  "presets": [
    {
      "name": "Nome Sezione"
    }
  ]
}
```

### Regole Mappatura Variabili:
- **Titoli**: `{{ section.settings.titolo | escape }}`
- **Testo Ricco**: `{{ section.settings.descrizione }}`
- **Immagini**: `{{ section.settings.immagine | image_url: width: 800 | image_tag: loading: 'lazy' }}`
- **Link**: `{{ section.settings.link }}`
- **Colori**: Usare variabili CSS, non stili inline

### Pattern Logica Liquid:
```liquid
{% comment %} Controlla se il contenuto esiste {% endcomment %}
{% if section.settings.titolo != blank %}
  <h2>{{ section.settings.titolo | escape }}</h2>
{% endif %}

{% comment %} Gestione immagini {% endcomment %}
{% if section.settings.immagine %}
  {{ section.settings.immagine | image_url: width: 800 | image_tag: loading: 'lazy', alt: section.settings.immagine.alt }}
{% else %}
  <div class="placeholder-image">📱</div>
{% endif %}

{% comment %} Gestione link {% endcomment %}
{% if section.settings.link != blank %}
  <a href="{{ section.settings.link }}" class="klarna-btn">
{% else %}
  <div class="klarna-btn disabled">
{% endif %}
```

## 🛍️ INTEGRAZIONE E-COMMERCE SHOPIFY

### Accesso Dati Prodotto:
```liquid
{% comment %} Per sezioni relative ai prodotti {% endcomment %}
{% assign prodotti_evidenza = collections.featured.products | limit: 3 %}
{% for product in prodotti_evidenza %}
  <div class="klarna-product-card">
    <h3>{{ product.title }}</h3>
    <p>{{ product.price | money }}</p>
    <p class="klarna-installment">o 3 rate da {{ product.price | divided_by: 3 | money }}</p>
  </div>
{% endfor %}
```

### Integrazione Collezioni:
```liquid
{% comment %} Per griglie brand/collezioni {% endcomment %}
{% assign collezioni_evidenza = collections | limit: 8 %}
{% for collection in collezioni_evidenza %}
  <div class="klarna-brand-card">
    {% if collection.image %}
      {{ collection.image | image_url: width: 300 | image_tag }}
    {% endif %}
    <h4>{{ collection.title }}</h4>
  </div>
{% endfor %}
```

### Integrazione Carrello/Checkout:
```liquid
{% comment %} Per sezioni con azioni di acquisto {% endcomment %}
<form action="/cart/add" method="post" enctype="multipart/form-data">
  <input type="hidden" name="id" value="{{ product.selected_or_first_available_variant.id }}">
  <button type="submit" class="klarna-btn-primary">
    Aggiungi al carrello
  </button>
</form>
```

## 📱 REQUISITI RESPONSIVE

### Standard Breakpoint:
- **Mobile**: max-width: 768px
- **Tablet**: 769px - 1024px  
- **Desktop**: 1025px+

### CSS Grid/Flexbox:
- Usare CSS Grid per layout principali
- Flexbox per allineamento interno componenti
- Includere sempre `grid-template-columns: 1fr` per mobile

## 🎨 USO DESIGN TOKEN

### Usare Sempre Variabili:
```css
/* ✅ CORRETTO */
background-color: var(--klarna-pink);
padding: var(--space-lg);
border-radius: var(--radius-md);

/* ❌ SBAGLIATO */
background-color: #FFB3D4;
padding: 24px;
border-radius: 12px;
```

### Palette Colori:
- `--klarna-dark`: #1A0B2E
- `--klarna-pink`: #FFB3D4  
- `--klarna-purple`: #8B5FBF
- `--klarna-green`: #00D4AA
- `--klarna-white`: #FFFFFF
- `--klarna-black`: #000000

### Scala Spaziature:
- `--space-xs`: 4px
- `--space-sm`: 8px
- `--space-md`: 16px
- `--space-lg`: 24px
- `--space-xl`: 32px
- `--space-2xl`: 48px
- `--space-3xl`: 64px

## ⚡ LINEE GUIDA PERFORMANCE

### Ottimizzazioni Critiche:
- **Lazy Loading**: Aggiungere `loading="lazy"` a tutte le immagini
- **Dimensioni Immagini**: Specificare sempre parametro `width` per `image_url`
- **Liquid Minimale**: Evitare logica complessa nei template
- **Efficienza CSS**: Usare classi esistenti, evitare stili inline

### Ottimizzazione Immagini:
```liquid
{% comment %} Immagini responsive {% endcomment %}
{{ image | image_url: width: 800 | image_tag: 
   loading: 'lazy',
   sizes: '(max-width: 768px) 100vw, 50vw',
   widths: '300, 600, 800, 1200'
}}
```

## 🧪 CHECKLIST TESTING

### Prima della Consegna, Verificare:
- [ ] **Visuale**: La sezione appare identica alla versione HTML
- [ ] **Responsive**: Funziona su tutte le dimensioni dispositivo
- [ ] **Impostazioni**: Tutti gli schema settings funzionano nel customizer
- [ ] **Performance**: Nessun errore console o caricamento lento
- [ ] **Contenuto**: Gestione elegante di contenuto mancante
- [ ] **Link**: Tutti i link e bottoni funzionano correttamente
- [ ] **SEO**: Gerarchia titoli e meta data corretti

## 🚫 ERRORI COMUNI DA EVITARE

### NON FARE:
- Cambiare i nomi delle classi CSS dall'HTML originale
- Usare stili inline invece di variabili CSS
- Hardcodare testo che dovrebbe essere configurabile
- Ignorare requisiti responsive mobile
- Saltare schema settings per contenuto configurabile
- Usare logica Liquid complessa che rallenta il rendering
- Dimenticare alt text immagini e caratteristiche accessibilità

### FARE:
- Preservare struttura HTML esatta e classi
- Usare schema settings per tutto il contenuto personalizzabile
- Includere gestione errori appropriata per contenuto mancante
- Aggiungere loading="lazy" a tutte le immagini
- Testare in anteprima customizer Shopify
- Includere HTML semantico e label ARIA
- Usare filtri integrati Shopify (escape, money, ecc.)

## 📚 RIFERIMENTO SHOPIFY

### Filtri Liquid Essenziali:
- `| escape` - Per testo inserito dall'utente
- `| money` - Per prezzi
- `| image_url: width: X` - Per immagini
- `| limit: X` - Per collezioni/array
- `| default: 'fallback'` - Per valori mancanti

### Tipi Schema Setting:
- `text` - Input testo breve
- `richtext` - Editor testo ricco
- `image_picker` - Selezione immagine
- `color` - Selettore colore
- `url` - Input URL
- `checkbox` - Toggle booleano
- `select` - Opzioni dropdown
- `range` - Slider numerico

## 🎯 CRITERI DI SUCCESSO

Una conversione di successo:
1. **Appare identica** al design HTML originale
2. **È completamente configurabile** tramite customizer Shopify
3. **Funziona perfettamente** su tutti i dispositivi
4. **Carica velocemente** con asset ottimizzati
5. **Si integra perfettamente** con funzionalità e-commerce Shopify
6. **Segue tutte** le best practice Shopify e accessibilità

## 🔧 ESEMPI PRATICI

### Sezione Hero Klarna:
```liquid
<section class="klarna-hero">
  <div class="klarna-hero-container">
    <div class="klarna-hero-content">
      {% if section.settings.titolo != blank %}
        <h1>{{ section.settings.titolo | escape }}</h1>
      {% endif %}
      
      {% if section.settings.valutazione_app != blank %}
        <div class="klarna-app-rating">
          <span class="klarna-stars">★ {{ section.settings.valutazione_app }}</span>
        </div>
      {% endif %}
      
      {% if section.settings.descrizione != blank %}
        <p class="klarna-hero-text">{{ section.settings.descrizione }}</p>
      {% endif %}
      
      {% if section.settings.link_cta != blank %}
        <a href="{{ section.settings.link_cta }}" class="klarna-cta-btn">
          {{ section.settings.testo_cta | default: 'Scopri di più' }}
        </a>
      {% endif %}
    </div>
    
    <div class="klarna-hero-phone">
      <div class="klarna-phone-mockup">
        {% if section.settings.immagine_telefono %}
          {{ section.settings.immagine_telefono | image_url: width: 300 | image_tag: loading: 'lazy' }}
        {% else %}
          <div class="klarna-phone-screen">
            <div>📱</div>
            <div>App Klarna</div>
          </div>
        {% endif %}
      </div>
    </div>
  </div>
</section>

{% schema %}
{
  "name": "Hero Klarna",
  "settings": [
    {
      "type": "text",
      "id": "titolo",
      "label": "Titolo Principale",
      "default": "Paga a modo tuo con Klarna"
    },
    {
      "type": "text",
      "id": "valutazione_app",
      "label": "Valutazione App",
      "default": "4.3/5 sull'App Store"
    },
    {
      "type": "richtext",
      "id": "descrizione",
      "label": "Descrizione",
      "default": "<p>Acquista in sicurezza e scegli come pagare</p>"
    },
    {
      "type": "url",
      "id": "link_cta",
      "label": "Link Bottone"
    },
    {
      "type": "text",
      "id": "testo_cta",
      "label": "Testo Bottone",
      "default": "Scopri di più"
    },
    {
      "type": "image_picker",
      "id": "immagine_telefono",
      "label": "Immagine Telefono"
    }
  ],
  "presets": [
    {
      "name": "Hero Klarna"
    }
  ]
}
{% endschema %}
```

---

**Ricorda**: L'obiettivo è creare sezioni Liquid che siano indistinguibili dal design HTML originale pur essendo completamente integrate con l'ecosistema e-commerce di Shopify.
