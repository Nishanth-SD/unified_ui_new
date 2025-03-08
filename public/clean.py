import json

def clean_json(file_path, output_path):
    try:
        # Read the file with proper encoding (UTF-8)
        with open(file_path, 'r', encoding='utf-8') as file:
            raw_data = file.read()

        # Remove BOM if present (sometimes hidden in files)
        if raw_data.startswith('\ufeff'):
            raw_data = raw_data[1:]

        # Try to parse the JSON data to validate it
        cleaned_data = json.loads(raw_data)

        # Write the cleaned and validated JSON data back to a new file
        with open(output_path, 'w', encoding='utf-8') as output_file:
            json.dump(cleaned_data, output_file, ensure_ascii=False, indent=4)

        print(f"JSON file cleaned and saved to {output_path}")

    except json.JSONDecodeError as e:
        print(f"Error decoding JSON: {e}")
    except Exception as e:
        print(f"An error occurred: {e}")

# Usage example
file_path = 'classification.json'  # Path to your original JSON file
output_path = 'classification_cleaned.json'  # Path where the cleaned file will be saved

clean_json(file_path, output_path)
