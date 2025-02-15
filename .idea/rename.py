import os
import re

def rename_files(directory):
    # Change to the specified directory
    os.chdir(directory)

    # Regular expression to match files starting with 'Project' followed by digits
    pattern = re.compile(r'^(Project)(\d+)( - .*)$')

    # List all files in the directory
    files = os.listdir(directory)

    # Filter files that match the pattern
    matching_files = [f for f in files if pattern.match(f)]

    # Determine the maximum number length
    max_number_length = max(len(pattern.match(f).group(2)) for f in matching_files)

    # Rename files
    for file in matching_files:
        match = pattern.match(file)
        if match:
            prefix = match.group(1)
            number = match.group(2)
            suffix = match.group(3)
            # Pad the number with leading zeros
            new_number = number.zfill(max_number_length)
            new_name = f"{prefix}{new_number}{suffix}"
            os.rename(file, new_name)
            print(f"Renamed: {file} -> {new_name}")

if __name__ == "__main__":
    directory = '.'  # Current directory
    rename_files(directory)
