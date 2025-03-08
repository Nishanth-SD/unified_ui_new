import json

# Open the input JSON file for reading
with open("herb_data.json", "r", encoding="utf-8") as file:
    f = json.load(file)

# Initialize an empty dictionary to store the processed information
info = {}

# Iterate through each item in the loaded data

for i, data in f.items():
    fam = data.get("Family")
    gen = data.get("Genus")
    spe = data.get("Species")
    
    # Skip items with missing family, genus, or species
    if not fam or not gen or not spe:
        continue
    # Initialize the family dictionary if it doesn't exist
    if fam not in info:
        info[fam] = {}

    # Initialize the genus list if it doesn't exist
    if gen not in info[fam]:
        info[fam][gen] = []

    # Append the species to the genus list
    info[fam][gen].append(spe)

# Define the output file path
output_file_path = "processed_herb_data.json"

# Open the output JSON file for writing
with open(output_file_path, "w", encoding="utf-8") as output_file:
    # Write the processed data to the file with indentation for readability
    json.dump(info, output_file, indent=2, ensure_ascii=False)

print(f"Processed data has been saved to {output_file_path}")
