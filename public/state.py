import json

# Load the herb data
with open("herb_data.json", "r", encoding="utf-8") as file:
    herb_data = json.load(file)

# Dictionary to store state-wise species with family and genus classification
statewise_species = {}

# Iterate through the species data
for species, details in herb_data.items():
    states = details.get("Statewise availability", [])
    family = details.get("Family", "Unknown Family")
    genus = details.get("Genus", "Unknown Genus")
    
    for state in states:
        if state not in statewise_species:
            statewise_species[state] = {}
        
        if family not in statewise_species[state]:
            statewise_species[state][family] = {}
        
        if genus not in statewise_species[state][family]:
            statewise_species[state][family][genus] = []
        
        statewise_species[state][family][genus].append(species)

# Save the grouped data
with open("statewise_species.json", "w", encoding="utf-8") as outfile:
    json.dump(statewise_species, outfile, indent=2, ensure_ascii=False)

print("Statewise species data has been saved to statewise_species.json")
