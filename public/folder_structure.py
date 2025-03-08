import os
import json

BASE_DIR = "res_images"  # Change this if your images are stored elsewhere
OUTPUT_FILE = "folder_structure.json"  # JSON output file

# Function to build the folder structure
def get_folder_structure(directory, base_path):
    structure = []
    for item in sorted(os.listdir(directory)):  # Sort items alphabetically
        full_path = os.path.join(directory, item)
        relative_path = os.path.relpath(full_path, base_path).replace("\\", "/")  # Normalize paths
        if os.path.isdir(full_path):
            structure.append({
                "name": item,
                "type": "folder",
                "subfolders": get_folder_structure(full_path, base_path),  # Recursive call
            })
        elif os.path.isfile(full_path) and item.lower().endswith(('.jpg', '.jpeg', '.png', '.gif')):
            structure.append({
                "name": item,
                "type": "image",
                "path": f"/res_images/{relative_path}"  # Web-accessible path
            })
        elif os.path.isfile(full_path):
            structure.append({
                "name": item,
                "type": "file",
                "path": f"/files/{relative_path}"  # Web-accessible path for other files
            })
    return structure

# Generate and save the folder structure
folder_structure = get_folder_structure(BASE_DIR, BASE_DIR)
with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
    json.dump(folder_structure, f, indent=2, ensure_ascii=False)

print(f"Folder structure saved to {OUTPUT_FILE}")
