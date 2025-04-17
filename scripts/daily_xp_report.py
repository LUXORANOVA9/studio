# ==============================================================================
# IMPORTANT: Running this script requires the 'firebase-admin' library.
# If you are seeing 'ModuleNotFoundError: No module named firebase_admin',
# it means this library is not installed in your Python environment.
#
# TO FIX THIS:
# 1. Open your LOCAL Terminal or Command Prompt (not this chat).
# 2. Run the command: pip install firebase-admin
# 3. Ensure you run this script using the SAME Python environment where
#    you installed the library.
#
# This script likely WILL NOT RUN correctly using a simple "Run" or "Preview"
# button in this tool, as that environment may not have the library installed.
# You need to save this code to a .py file and run it locally after installation.
# ==============================================================================
import firebase_admin
# ==============================================================================

from firebase_admin import credentials
from firebase_admin import firestore # Using Firestore as the example
# from firebase_admin import db # Uncomment this if using Realtime Database
import datetime
import os

# --- Configuration ---

# *** IMPORTANT: Replace with the actual path to your Firebase Service Account Key JSON file ***
# Download this file from your Firebase project settings > Service accounts
SERVICE_ACCOUNT_KEY_PATH = "/mnt/data/serviceAccountKey.json"

# *** IMPORTANT: Define your Firebase data structure specifics ***
# Example using Firestore:
FIRESTORE_COLLECTION = "userEvents" # The collection where events are stored
TIMESTAMP_FIELD = "timestamp"       # The field storing the event timestamp (MUST be a Firestore Timestamp type)
USER_ID_FIELD = "userId"            # The field storing the user identifier
EVENT_TYPE_FIELD = "eventType"      # The field storing the type of event
XP_EVENT_VALUE = "XP_TRIGGERED"     # The specific value indicating an XP event

# Example using Realtime Database (if you uncomment 'from firebase_admin import db'):
# REALTIME_DB_PATH = "userEvents" # The path in RTDB where events are stored
# You'd need to structure your query differently for RTDB (e.g., using orderByChild, startAt, endAt)

# Timezone configuration (using UTC by default for consistency)
# Set to your local timezone string like 'Asia/Kolkata' if needed, requires pytz library (`pip install pytz`)
# import pytz
# REPORT_TIMEZONE = pytz.timezone('UTC')
REPORT_TIMEZONE = datetime.timezone.utc # Use standard library UTC

# --- Firebase Initialization ---

def initialize_firebase():
    """Initializes the Firebase Admin SDK."""
    try:
        if not os.path.exists(SERVICE_ACCOUNT_KEY_PATH):
            print(f"ERROR: Service account key file not found at: {SERVICE_ACCOUNT_KEY_PATH}")
            print("Please download the key file from your Firebase project settings and update SERVICE_ACCOUNT_KEY_PATH.")
            return False

        # Check if Firebase app is already initialized to prevent errors on re-runs
        if not firebase_admin._apps:
             # Initialize the app with a service account, granting admin privileges
             cred = credentials.Certificate(SERVICE_ACCOUNT_KEY_PATH)
             firebase_admin.initialize_app(cred, {
                 # Optionally specify your database URL if using Realtime Database and it's not the default
                 # 'databaseURL': 'https://your-project-id.firebaseio.com/'
             })
             print("Firebase Admin SDK initialized successfully.")
        else:
            print("Firebase Admin SDK already initialized.")
        return True
    except NameError:
        # Catch error if firebase_admin itself wasn't imported successfully
        print("="*60)
        print("FATAL ERROR: The 'firebase_admin' library could not be imported.")
        print("Please ensure you have installed it in your local environment by running:")
        print("pip install firebase-admin")
        print("in your terminal or command prompt.")
        print("="*60)
        return False
    except Exception as e:
        print(f"ERROR: Failed to initialize Firebase Admin SDK: {e}")
        return False

# --- Date Calculation ---

def get_yesterday_utc_range():
    """Calculates the start and end datetime objects for yesterday in UTC."""
    # Get the current time in the specified timezone
    now = datetime.datetime.now(REPORT_TIMEZONE)
    # Calculate yesterday's date
    yesterday_date = now.date() - datetime.timedelta(days=1)

    # Create datetime objects for the start and end of yesterday
    start_of_yesterday = datetime.datetime.combine(yesterday_date, datetime.time.min, tzinfo=REPORT_TIMEZONE)
    end_of_yesterday = datetime.datetime.combine(yesterday_date, datetime.time.max, tzinfo=REPORT_TIMEZONE)

    # It's often better to use exclusive end for queries: start <= time < end
    # So, end time becomes start of today
    start_of_today = datetime.datetime.combine(now.date(), datetime.time.min, tzinfo=REPORT_TIMEZONE)

    print(f"Reporting period (UTC): >= {start_of_yesterday} and < {start_of_today}")
    return start_of_yesterday, start_of_today

# --- Firebase Data Fetching (Placeholder Logic) ---

def get_xp_events_for_yesterday(start_dt, end_dt):
    """
    Queries Firebase (Firestore example) for XP events within the given time range.
    *** YOU MUST CUSTOMIZE THIS FUNCTION BASED ON YOUR FIREBASE STRUCTURE ***

    Args:
        start_dt (datetime): The start timestamp (inclusive).
        end_dt (datetime): The end timestamp (exclusive).

    Returns:
        list: A list of dictionaries, where each dictionary represents an event
              containing at least the USER_ID_FIELD. Returns empty list on error.
    """
    print(f"Querying Firestore collection '{FIRESTORE_COLLECTION}' for '{XP_EVENT_VALUE}' events...")
    try:
        db = firestore.client()
        # Construct the Firestore query
        # Ensure you have a composite index in Firestore if querying multiple fields
        # (e.g., on eventType and timestamp)
        query = db.collection(FIRESTORE_COLLECTION) \
            .where(filter=firestore.FieldFilter(EVENT_TYPE_FIELD, "==", XP_EVENT_VALUE)) \
            .where(filter=firestore.FieldFilter(TIMESTAMP_FIELD, ">=", start_dt)) \
            .where(filter=firestore.FieldFilter(TIMESTAMP_FIELD, "<", end_dt))

        # Execute the query
        docs = query.stream()

        events = []
        for doc in docs:
            event_data = doc.to_dict()
            event_data['id'] = doc.id # Optionally include document ID
            events.append(event_data)

        print(f"Found {len(events)} '{XP_EVENT_VALUE}' events in the specified time range.")
        return events

    except NameError:
        # Catch error if firestore itself wasn't available due to failed import
        print("ERROR: Firestore client could not be accessed. Was firebase_admin imported correctly?")
        # The detailed error about installation is handled in initialize_firebase
        return []
    except Exception as e:
        print(f"ERROR querying Firestore: {e}")
        print("Please check:")
        print(f"  - Firestore collection name ('{FIRESTORE_COLLECTION}')")
        print(f"  - Field names ('{EVENT_TYPE_FIELD}', '{TIMESTAMP_FIELD}')")
        print(f"  - Value for XP event ('{XP_EVENT_VALUE}')")
        print("  - Firestore indexes are correctly configured.")
        print("  - Service account has permissions to read the collection.")
        return []

    # --- Example for Realtime Database (if using 'firebase_admin.db') ---
    # try:
    #     ref = db.reference(REALTIME_DB_PATH)
    #     # Convert datetimes to Unix timestamps (milliseconds) for RTDB query if needed
    #     start_ts = int(start_dt.timestamp() * 1000)
    #     end_ts = int(end_dt.timestamp() * 1000)
    #
    #     # Query RTDB (requires proper indexing rules in Firebase)
    #     query = ref.order_by_child(TIMESTAMP_FIELD).start_at(start_ts).end_at(end_ts)
    #     results = query.get() # This might fetch a lot of data if not filtered further
    #
    #     events = []
    #     if results:
    #         for key, value in results.items():
    #             # Filter for the specific event type *after* fetching
    #             if value.get(EVENT_TYPE_FIELD) == XP_EVENT_VALUE:
    #                 value['id'] = key # Add the key as id
    #                 events.append(value)
    #
    #     print(f"Found {len(events)} '{XP_EVENT_VALUE}' events in RTDB.")
    #     return events
    #
    # except Exception as e:
    #     print(f"ERROR querying Realtime Database: {e}")
    #     return []
    # --- End of RTDB Example ---


# --- Report Generation ---

def generate_report(events):
    """
    Generates a simple text summary report from the fetched events.

    Args:
        events (list): A list of event dictionaries.

    Returns:
        str: The formatted report string.
    """
    print("Generating report...")
    if not events:
        return "Daily XP Event Report:\n\nNo users triggered an XP event yesterday."

    # Extract unique user IDs from the events
    users = set()
    for event in events:
        user_id = event.get(USER_ID_FIELD)
        if user_id:
            users.add(str(user_id)) # Ensure user IDs are strings if needed
        else:
            print(f"Warning: Event missing user ID field ('{USER_ID_FIELD}'): {event.get('id', 'N/A')}")

    if not users:
        # Check if events list was non-empty but no user IDs were found
        if events:
             return f"Daily XP Event Report:\n\n{len(events)} XP events found yesterday, but could not extract any user IDs (check USER_ID_FIELD: '{USER_ID_FIELD}')."
        else:
             # This case should be covered by the initial check, but included for completeness
             return "Daily XP Event Report:\n\nNo users triggered an XP event yesterday."


    # Format the report
    # Get yesterday's date string for the report header
    yesterday_str = (datetime.datetime.now(REPORT_TIMEZONE).date() - datetime.timedelta(days=1)).strftime('%Y-%m-%d')
    report_lines = [
        "Daily XP Event Report",
        "=====================",
        f"Date Range (UTC): {yesterday_str} (inclusive)", # Use calculated date
        f"Total '{XP_EVENT_VALUE}' events found: {len(events)}",
        f"Unique users triggering XP events: {len(users)}",
        "",
        "Users List:",
        "-----------"
    ]
    report_lines.extend(sorted(list(users))) # Add sorted list of users

    return "\n".join(report_lines)

# --- Main Execution ---

if __name__ == "__main__":
    print("Starting Daily XP Event Report script...")

    # 1. Initialize Firebase
    if not initialize_firebase():
        print("\nExiting due to Firebase initialization failure.")
        # The detailed error message is printed within initialize_firebase()
        exit(1) # Exit with a non-zero code to indicate error

    # 2. Get date range for yesterday
    start_time, end_time = get_yesterday_utc_range()

    # 3. Fetch data from Firebase
    xp_events = get_xp_events_for_yesterday(start_time, end_time)

    # 4. Generate the report
    report_text = generate_report(xp_events)

    # 5. Output the report (e.g., print to console)
    print("\n--- Report Start ---")
    print(report_text)
    print("--- Report End ---")

    # Optional: Save report to a file
    # try:
    #     report_filename = f"xp_report_{start_time.strftime('%Y%m%d')}.txt"
    #     with open(report_filename, "w") as f:
    #         f.write(report_text)
    #     print(f"\nReport saved to: {report_filename}")
    # except Exception as e:
    #     print(f"\nERROR saving report to file: {e}")

    print("\nScript finished.")
