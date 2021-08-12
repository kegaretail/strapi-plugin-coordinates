# Strapi coordinates input plugin

## Installation

**Add plugin package**
```bash
# using yarn
yarn add strapi-plugin-coordinates

# using npm
npm install strapi-plugin-coordinates --save
```

**Rebuild Admin Panel**
```bash
# using yarn
yarn build --clean

# using npm
npm run build --clean
```

## Usage

Currently it isn't possible to add custom fields through the _Content-Types Builder_ with Strapi, so you'll need to add it manually. To add one of the custom fields to a content type you need to add it to the `attributes` field in the models settings file (`api/*/models/*.settings.json`) like the example below. 

```diff
{
  "coordinates": {
    "country": {
-      "type": "string",
+      "type": "coordinates",
+      "columnType": "object",
+      "index": "2dsphere"
    }
  }
}
 
```
