import requests  # Library for making HTTP requests (e.g., checking websites)
import time     # Library for pausing the script (e.g., wait between checks)
import datetime # Library for timestamping alerts
import os       # For getting API keys from environment variables
import json     # For handling API responses

# --- Configuration ---
FALLBACK_DOMAIN = "luxoranova9.vercel.app"
# *** Replace with your actual primary domain ***
PRIMARY_DOMAIN = "YOUR_PRIMARY_DOMAIN.com"

# Construct the full URLs/prefixes to search for and replace
# Be specific. Consider http/https variations if necessary.
OLD_LINK_PREFIX = f"https://{FALLBACK_DOMAIN}"
NEW_LINK_PREFIX = f"https://{PRIMARY_DOMAIN}"

# Notion API Configuration
# *** Load your Notion API Key securely from environment variables ***
NOTION_API_KEY = os.environ.get("NOTION_API_KEY")
NOTION_API_VERSION = "2022-06-28" # Use the appropriate Notion API version

# Optional: Specify Notion Page IDs or Database IDs to search within
# If empty, the script might search broadly (potentially slower).
# Searching within specific pages is generally more efficient if possible.
SEARCH_SCOPE_PAGE_IDS = []
# SEARCH_SCOPE_DATABASE_IDS = [] # Searching blocks within databases is more complex
