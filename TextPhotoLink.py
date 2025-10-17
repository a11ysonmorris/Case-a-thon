# import os
# import shutil

# # === CONFIG ===
# images_dir = "images"                       # folder containing all images
# labels_file = os.path.join(images_dir, "labels.txt")  # labels file is inside the images folder
# output_dir = "sorted_images"                # output directory for sorted images

# # Map each creature to a number
# creature_map = {
#     "scallop": 0,
#     "roundfish": 1,
#     "crab": 2,
#     "whelk": 3,
#     "skate": 4,
#     "elatfish": 5,
#     "eel": 6
# }

# # Make sure output directories exist
# for creature in creature_map.keys():
#     os.makedirs(os.path.join(output_dir, creature), exist_ok=True)

# # === MAIN LOOP ===
# missing_count = 0
# total_count = 0

# with open(labels_file, "r") as f:
#     for line in f:
#         line = line.strip()
#         if not line:
#             continue

#         total_count += 1
        
#         # Expected format: filename label
#         # e.g., "image_00123.jpg scallop"
#         try:
#             filename, label = line.split()
#         except ValueError:
#             print(f"⚠️ Skipping malformed line: {line}")
#             continue
        
#         label = label.lower()
#         if label not in creature_map:
#             print(f"⚠️ Unknown label '{label}' for {filename}, skipping.")
#             continue

#         src = os.path.join(images_dir, filename)
#         dst = os.path.join(output_dir, label, filename)

#         if os.path.exists(src):
#             shutil.copy2(src, dst)  # or shutil.move(src, dst)
#         else:
#             missing_count += 1
#             print(f"❌ Image not found: {src}")

# print("\n✅ Done sorting images by species!")
# print(f"📊 Total lines processed: {total_count}")
# print(f"🚫 Images not found: {missing_count}")
# print(f"📁 Sorted images saved in: '{output_dir}'")

import os
import shutil
from collections import defaultdict

# === CONFIG ===
images_dir = "images"  # directory that contains images and labels.txt
labels_path = os.path.join(images_dir, "labels.txt")
output_dir = "sorted_images"
missing_log = "missing_images.txt"
ambiguous_log = "ambiguous_matches.txt"
malformed_log = "malformed_lines.txt"

creature_map = {
    "scallop": 0,
    "roundfish": 1,
    "crab": 2,
    "whelk": 3,
    "skate": 4,
    "flatfish": 5,
    "eel": 6
}

os.makedirs(output_dir, exist_ok=True)
for creature in creature_map.keys():
    os.makedirs(os.path.join(output_dir, creature), exist_ok=True)

# === Build filesystem index (recursive) ===
print("Indexing image files (this may take a moment)...")
name_to_paths = defaultdict(list)      # exact filename (lower) -> paths
basename_to_paths = defaultdict(list)  # filename without extension (lower) -> paths
all_files_count = 0

for root, _, files in os.walk(images_dir):
    # skip labels.txt itself
    relroot = os.path.relpath(root, images_dir)
    for fn in files:
        if relroot == "." and fn == os.path.basename(labels_path):
            continue
        all_files_count += 1
        lower = fn.lower()
        full = os.path.join(root, fn)
        name_to_paths[lower].append(full)
        base = os.path.splitext(lower)[0]
        basename_to_paths[base].append(full)

print(f"Indexed {all_files_count} files under '{images_dir}'")

# === Helper to sanitize label filename ===
def sanitize_token(tok: str) -> str:
    # strip BOM, whitespace, and surrounding quotes
    tok = tok.strip().strip('"\'')

    # remove stray carriage returns or non-printables
    tok = tok.replace('\ufeff', '').replace('\r', '').replace('\t',' ')
    return tok

# === Main loop: robust matching + copy ===
missing = []
ambiguous = []
matched = 0
ambiguous_count = 0
missing_count = 0
malformed_count = 0
total_lines = 0

with open(labels_path, "r", encoding="utf-8", errors="replace") as fin:
    for i, raw in enumerate(fin, 1):
        raw = raw.rstrip("\n")
        if not raw.strip():
            continue
        total_lines += 1

        parts = raw.split()
        if len(parts) < 2:
            # line malformed (no label or no filename)
            malformed_count += 1
            continue

        # If labels file has more than 2 columns, assume last token is label and first token(s) form filename
        # Example: "path/to/image name.jpg scallop" -> join all but last as filename
        filename_token = " ".join(parts[:-1])
        label_token = parts[-1]

        filename_token = sanitize_token(filename_token)
        label = sanitize_token(label_token).lower()

        if label not in creature_map:
            # Unknown label - skip but log
            malformed_count += 1
            continue

        # Try matching strategies (in order)
        matched_path = None
        matched_paths_list = []

        # 1) exact match case-insensitive against full filename
        key_exact = filename_token.lower()
        if key_exact in name_to_paths:
            matched_paths_list = name_to_paths[key_exact]

        # 2) if not found, try basename-only match
        if not matched_paths_list:
            base = os.path.splitext(key_exact)[0]
            if base in basename_to_paths:
                matched_paths_list = basename_to_paths[base]

        # 3) if filename_token contains a path, strip directories and try basename
        if not matched_paths_list and ("/" in filename_token or "\\" in filename_token):
            baseonly = os.path.basename(filename_token).lower()
            if baseonly in name_to_paths:
                matched_paths_list = name_to_paths[baseonly]
            else:
                base_noext = os.path.splitext(baseonly)[0]
                if base_noext in basename_to_paths:
                    matched_paths_list = basename_to_paths[base_noext]

        # 4) try common extension substitutions if still not found (jpg/jpeg/png)
        if not matched_paths_list:
            base_noext = os.path.splitext(key_exact)[0]
            for ext in [".jpg", ".jpeg", ".png", ".tif", ".tiff", ".bmp", ".gif", ".webp"]:
                trial = (base_noext + ext).lower()
                if trial in name_to_paths:
                    matched_paths_list = name_to_paths[trial]
                    break

        # 5) as last resort, attempt substring match of basename among filesystem (costly; only if small sets)
        if not matched_paths_list:
            # only perform if basename relatively unique length > 3
            base_candidate = os.path.splitext(key_exact)[0]
            if len(base_candidate) >= 4:
                for k, paths in basename_to_paths.items():
                    if base_candidate in k:
                        matched_paths_list.extend(paths)
                # deduplicate
                matched_paths_list = list(dict.fromkeys(matched_paths_list))

        # Evaluate match results
        if not matched_paths_list:
            missing.append((filename_token, label))
            missing_count += 1
            continue

        if len(matched_paths_list) > 1:
            ambiguous.append((filename_token, label, matched_paths_list[:5]))  # store up to 5 options
            ambiguous_count += 1
            # choose first match but log ambiguity
            matched_path = matched_paths_list[0]
        else:
            matched_path = matched_paths_list[0]

        # copy to output
        dst = os.path.join(output_dir, label, os.path.basename(matched_path))
        try:
            shutil.copy2(matched_path, dst)
            matched += 1
        except Exception as e:
            print(f"Error copying {matched_path} -> {dst}: {e}")
            missing.append((filename_token, label))
            missing_count += 1

# === Write logs ===
with open(missing_log, "w", encoding="utf-8") as f:
    for fn, lbl in missing:
        f.write(f"{fn}\t{lbl}\n")

with open(ambiguous_log, "w", encoding="utf-8") as f:
    for fn, lbl, paths in ambiguous:
        f.write(f"{fn}\t{lbl}\t{len(paths)} matches\n")
        for p in paths:
            f.write("    " + p + "\n")

# === Summary ===
print("\n--- SUMMARY ---")
print(f"Total label lines read: {total_lines}")
print(f"Files in images_dir indexed: {all_files_count}")
print(f"Successfully matched & copied: {matched}")
print(f"Missing (no reasonable match): {missing_count}  (logged to {missing_log})")
print(f"Ambiguous matches: {ambiguous_count}  (logged to {ambiguous_log})")
print(f"Malformed/unknown-label lines: {malformed_count}  (check {labels_path})")
print(f"Output folder: {output_dir}")
print("\nExamples of missing (first 10):")
for t in missing[:10]:
    print("  ", t)

print("\nIf many are missing, open", missing_log, "to inspect exact tokens from labels.txt.")

from collections import Counter

bad_labels = []
with open("images/labels.txt") as f:
    for line in f:
        parts = line.strip().split()
        if len(parts) < 2:
            bad_labels.append("MISSING_LABEL")
            continue
        label = parts[-1].lower()
        if label not in ["scallop", "roundfish", "crab", "whelk", "skate", "flatfish", "eel"]:
            bad_labels.append(label)

print("Number of malformed or unknown labels:", len(bad_labels))
print("\nMost common malformed labels:")
for lbl, count in Counter(bad_labels).most_common(20):
    print(f"{lbl}: {count}")
