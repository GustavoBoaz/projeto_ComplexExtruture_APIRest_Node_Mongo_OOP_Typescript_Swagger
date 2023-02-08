module.exports = {
  "extends": "@istanbuljs/nyc-config-typescript",
  "include": [
    "src/app/api/models",
    "src/app/api/services",
    "src/app/api/controllers"
  ],
  "reporter": [
    "text",
    "text-summary",
    "json-summary",
    "html",
    "lcov"
  ],
  "all": true
}