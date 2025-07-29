# Page snapshot

```yaml
- complementary:
  - text: REMWASTE
  - button
  - navigation:
    - link "Patients":
      - /url: /patients
- banner:
  - heading "Dashboard" [level=1]
  - button "JD"
- main:
  - navigation "Breadcrumb":
    - link "Home":
      - /url: /
    - link "Patients":
      - /url: /patients
    - text: Edit Patient
  - heading "Edit Patient" [level=1]
  - textbox "First Name": Calm
  - textbox "Last Name": Edited
  - textbox "Email": calmlilypurplepine@example.com
  - text: Phone Number
  - textbox "1 (702) 123-4567": +1 (549) 225-4523
  - 'button "United States: + 1"'
  - textbox: 1994-01-01
  - button "Save Changes"
- region "Notification Messages":
  - alert:
    - img
    - text: Error updating patient
    - button "close"
    - progressbar "notification timer"
- alert: Dashboard
```