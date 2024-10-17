#!/bin/bash

# Check if the argument is provided and valid
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <minor|patch>"
    exit 1
fi

if [ "$1" != "minor" ] && [ "$1" != "patch" ]; then
    echo "Invalid argument. Use 'minor' or 'patch'."
    exit 1
fi

# Extract current version from package.json
version=$(grep '"version"' package.json | cut -d'"' -f4)

# Split version into major, minor, and patch
IFS='.' read -r major minor patch <<< "$version"

# Determine whether to increment minor or patch version
if [ "$1" == "patch" ]; then
    # Increment patch version
    new_patch=$((patch + 1))
    new_minor=$minor  # Minor stays the same

elif [ "$1" == "minor" ]; then
    # Increment minor version and reset patch
    new_minor=$((minor + 1))
    new_patch=0  # Reset patch to 0
fi

# Form the new version string
new_version="$major.$new_minor.$new_patch"

# Update the version in package.json using jq if available or sed as a fallback
if command -v jq > /dev/null; then
    # If jq is available, use it for precise editing
    jq ".version = \"$new_version\"" package.json > temp.json && mv temp.json package.json
else
    # Fallback to using sed for in-place version update
    os_type=$(uname)
    if [ "$os_type" == "Darwin" ]; then
        sed -i '' "s/\"version\": \"$version\"/\"version\": \"$new_version\"/" package.json
    else
        sed -i "s/\"version\": \"$version\"/\"version\": \"$new_version\"/" package.json
    fi
fi

# Run npm install to update package-lock.json
npm install
npm install
npm run build
npm run lint:fix
npm run docs

# Create a new branch for the release
git checkout -b "release/$new_version"

# Optionally, commit the changes
git add package.json package-lock.json
git commit -m "release/$new_version"

echo "Branch release/$new_version created, version updated, and npm install executed."

# Check if GitHub CLI (gh) is installed
if command -v gh > /dev/null; then
    echo "GitHub CLI (gh) is installed."

    # Push the changes to the remote repository
    git push origin "release/$new_version"

    # Create a pull request for develop
    gh pr create \
        --base develop \
        --head "release/$new_version" \
        --title "release/$new_version" \
        --body "Release $new_version"

    # Create a pull request for master
    gh pr create \
        --base master \
        --head "release/$new_version" \
        --title "release/$new_version" \
        --body "Release $new_version"

else
    echo "GitHub CLI (gh) is not installed. Please install it to proceed."
fi
