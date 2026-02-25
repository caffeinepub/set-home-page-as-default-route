# Specification

## Summary
**Goal:** Remove image links from the Team Members page, fix visitor name storage on login, and ensure the admin visitor log correctly displays all entry details.

**Planned changes:**
- Remove all image URL fields and `<img>` tags from the TeamMembersPage; replace photo avatars with initials-based avatars derived from each member's name
- Fix the backend `logVisitor` mutation to correctly store visitor name and timestamp, and fix `getVisitorLog` to return all stored fields per entry
- Fix the AdminPanel to display each visitor log entry's name and timestamp correctly, with no blank or undefined fields
- Ensure the LoginPage triggers the `logVisitor` call with the entered name (non-empty) before navigating to the project, so every visitor's name is recorded in the log

**User-visible outcome:** Team member cards show initials avatars instead of broken image links; when a user enters their name on the login page it is saved to the visitor log; the admin panel correctly shows each visitor's name and timestamp in the log table.
