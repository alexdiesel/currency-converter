#!/bin/bash

ENV_JS_PATH="src/env.ts"

VARIABLES_PATH="${1:-.env}"

echo "Generating env.ts from $VARIABLES_PATH"

if [ ! -f "$VARIABLES_PATH" ]; then
  echo "Error: $VARIABLES_PATH not found. Creating empty env.ts"
  echo "// env.ts is empty because .env file is missing" > "$ENV_JS_PATH"
  exit 0
fi

TEMP_JS_FILE=$(mktemp)

while IFS='=' read -r key value; do
  key=$(echo "$key" | xargs)
  value=$(echo "$value" | xargs)

  escaped_value=$(printf '%s' "$value" | sed 's/"/\\"/g; s/'\''/\\'\''/g')

  if [[ "$value" =~ ^-?[0-9]+(\.[0-9]+)?$ ]]; then
    export_string="export const $key = $value;"
  elif [[ "$value" == true || "$value" == TRUE || "$value" == false || "$value" == FALSE ]]; then
    value=$(echo "$value" | tr '[:upper:]' '[:lower:]')
    export_string="export const $key = $value;"
  else
    export_string="export const $key = \"$escaped_value\";"
  fi

  echo "$export_string" >> "$TEMP_JS_FILE"
done < "$VARIABLES_PATH"

mv "$TEMP_JS_FILE" "$ENV_JS_PATH"

echo "env.ts successfully generated."

cat "$ENV_JS_PATH"
