# 🤖 Automation Guide: Live Calendar Sync

This guide explains how to connect your **Google Calendar** to your portfolio's **Status Badge** so it automatically toggles to "Deep Work" mode when you're in a meeting.

---

### 📡 1. The Strategy
We use an automation tool (**n8n** or **Make.com**) to watch your Google Calendar for events. When an event starts or ends, it sends a REST API request to **Supabase** (your database), which then triggers a **Realtime** update on your portfolio website.

### 🛠️ 2. Supabase Preparation
Ensure you have run the SQL script in `docs/CALENDAR_SYNC_SQL.sql` in your Supabase SQL Editor.

### 🔄 3. Setup with Make.com (Recommended)

1. **Create a New Scenario**:
   - Trigger: **Google Calendar - Watch Events**.
   - Action: **HTTP - Make a request**.

2. **Configure the Trigger**:
   - Connection: Connect your Google Calendar.
   - Watch Events: Select your primary calendar.

3. **Configure the Action (The Webhook)**:
   - **Method**: `PATCH`
   - **URL**: `https://hdumatptezljxglpoyye.supabase.co/rest/v1/system_status?id=eq.current_status`
   - **Headers**:
     - `apikey`: `YOUR_SUPABASE_ANON_KEY`
     - `Authorization`: `Bearer YOUR_SUPABASE_ANON_KEY`
     - `Content-Type`: `application/json`
   - **Body Type**: `Raw`
   - **Content**:
     ```json
     {
       "is_available": false,
       "status_message": "In Deep Work",
       "updated_at": "{{now}}"
     }
     ```

### 🧠 4. Advanced Logic (n8n.io)
If you use **n8n**, you can use a **Cron** or **Google Calendar Trigger** node with an **IF** statement:
- **IF** "Event is currently active":
  - Set `is_available` to `false`.
  - Set `status_message` to `In a Meeting` or `Deep Work`.
- **ELSE**:
  - Set `is_available` to `true`.
  - Set `status_message` to `Available for Hire`.

### 🛡️ 5. Webhook Security
For production, it is better to use **Supabase Edge Functions** as a middleware, but the direct PATCH request works perfectly for personal portfolios.

---

**System Status**: The frontend is now ready and listening for these signals. Once you set up the automation, your site will react instantly! 🌌🛰️
