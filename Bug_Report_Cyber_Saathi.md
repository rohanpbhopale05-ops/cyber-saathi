# Cyber Saathi - Bug Report & Security Analysis
**Date:** October 29, 2026  
**Project:** Cyber Saathi - Cyber Scam Reporting Platform  
**Analysis Type:** Comprehensive Code Review

---

## 🔴 Critical Bugs

### 1. **Infinite Redirect Loop in Login Component**
**Location:** `src/pages/Login.jsx` (Lines 21-23)  
**Severity:** CRITICAL  
**Description:**  
The redirect logic is placed directly in the component body instead of inside a `useEffect`. This causes an infinite render loop when a user is already logged in.

```javascript
// Current problematic code:
if (user) {
  navigate('/my-reports');  // Executes on every render!
}
```

**Impact:** Users cannot access the login page when already authenticated. Causes browser freezing and excessive re-renders.

**Fix:**
```javascript
useEffect(() => {
  if (user) {
    navigate('/my-reports');
  }
}, [user, navigate]);
```

---

### 2. **Missing Trigger Definition in Database Schema**
**Location:** `supabase_schema.sql` (Lines 78-85, 111-114)  
**Severity:** CRITICAL  
**Description:**  
The `handle_new_user()` function is defined but the trigger references are split incorrectly. The trigger is dropped and created at the end of the file, but the function definition appears before other table definitions, creating a logical ordering issue.

**Issue:**
- Function defined at line 78-85
- Trigger dropped/created at lines 111-114
- Tables like `suspicious_numbers` defined between them

**Impact:** If executed sequentially, the trigger creation might fail or reference tables not yet created. Profile creation on user signup may fail silently.

**Fix:** Reorganize schema file - all table definitions first, then functions, then triggers.

---

### 3. **No Error Handling on Database Insert**
**Location:** `src/pages/ReportScam.jsx` (Lines 52-53)  
**Severity:** HIGH  
**Description:**  
The report submission doesn't check for errors when inserting into Supabase.

```javascript
if (supabase) {
  await supabase.from('reports').insert([reportPayload]);  // No error handling!
}
```

**Impact:** Users may think their report was submitted successfully even if the database insert failed. No feedback on network errors or validation failures.

**Fix:**
```javascript
if (supabase) {
  const { error } = await supabase.from('reports').insert([reportPayload]);
  if (error) {
    alert('Failed to submit report. Please try again.');
    return;
  }
}
```

---

## 🟠 High Priority Bugs

### 4. **Missing RLS Policy for Anonymous Report Viewing**
**Location:** `supabase_schema.sql` (Lines 59-70)  
**Severity:** HIGH  
**Description:**  
Users can insert anonymous reports (`user_id IS NULL`), but there's no policy allowing them to view these reports later.

**Current Policies:**
- ✅ Users can insert reports with `user_id IS NULL`
- ❌ No policy to SELECT reports where `user_id IS NULL`

**Impact:** Anonymous users cannot view their submitted reports even if they save the report ID.

**Fix:** Add policy:
```sql
CREATE POLICY "Anonymous users can view their reports if they have report_id" 
ON reports FOR SELECT 
USING (user_id IS NULL);
```

---

### 5. **Race Condition in AuthContext**
**Location:** `src/context/AuthContext.jsx` (Lines 17-28)  
**Severity:** HIGH  
**Description:**  
The `checkRole` function is async but not awaited in the auth state change handler. This creates a race condition where `isAdmin` might not be set before components render.

```javascript
supabase.auth.onAuthStateChange((_event, session) => {
  setUser(session?.user || null);
  checkRole(session?.user?.id);  // Not awaited!
});
```

**Impact:** Admin users might briefly see non-admin UI, or access might be incorrectly denied.

**Fix:**
```javascript
supabase.auth.onAuthStateChange(async (_event, session) => {
  setUser(session?.user || null);
  await checkRole(session?.user?.id);
});
```

---

### 6. **Weak Password Validation**
**Location:** `src/pages/Login.jsx` (Line 102)  
**Severity:** MEDIUM-HIGH  
**Description:**  
Password requires only 6 characters minimum with no complexity requirements.

```javascript
<input type="password" ... minLength="6" />
```

**Impact:** Users can create weak passwords like "123456", "password", etc., making accounts vulnerable to brute force attacks.

**Recommendation:** Implement stronger validation requiring:
- Minimum 8 characters
- At least one uppercase letter
- At least one number
- At least one special character

---

### 7. **Missing Input Validation on Phone Numbers**
**Location:** `src/pages/ReportScam.jsx` (Line 219)  
**Severity:** MEDIUM  
**Description:**  
Phone number field has `type="tel"` but no format validation or sanitization.

**Impact:** Users can submit invalid phone numbers (letters, special characters, wrong length), causing data quality issues and making contact impossible.

**Fix:** Add pattern validation:
```javascript
<input 
  type="tel" 
  pattern="[0-9]{10}" 
  title="Please enter a valid 10-digit phone number"
  ...
/>
```

---

## 🟡 Medium Priority Bugs

### 8. **Inconsistent Date Handling**
**Location:** Multiple files  
**Severity:** MEDIUM  
**Description:**  
Dates are formatted differently across components:
- `MyReports.jsx` line 89: `new Date(report.created_at).toLocaleDateString()`
- `AdminDashboard.jsx` line 206: `new Date(report.created_at).toLocaleDateString()`
- No timezone consideration

**Impact:** Date display might vary by user's locale and timezone, causing confusion.

**Recommendation:** Implement a centralized date formatting utility with consistent locale and timezone handling.

---

### 9. **Memory Leak Potential in CheckScam Component**
**Location:** `src/pages/CheckScam.jsx` (Line 17)  
**Severity:** MEDIUM  
**Description:**  
`setTimeout` is used but not cleaned up if the component unmounts during the analysis delay.

```javascript
setTimeout(() => {
  // Analysis logic
}, 800);
```

**Impact:** If user navigates away before 800ms, the state updates will attempt to run on an unmounted component, causing React warnings and potential memory leaks.

**Fix:**
```javascript
useEffect(() => {
  return () => {
    // Cleanup timeout on unmount
  };
}, []);
```

---

### 10. **Missing Email Validation in Report Form**
**Location:** `src/pages/ReportScam.jsx` (Line 223)  
**Severity:** MEDIUM  
**Description:**  
Email field marked as optional but has no format validation when provided.

```javascript
<input type="email" ... placeholder="email@example.com" />
```

**Issue:** Browser's built-in email validation is unreliable and can be bypassed.

**Fix:** Add pattern validation or use a validation library like `validator.js`.

---

### 11. **No Loading State in Login Component**
**Location:** `src/pages/Login.jsx` (Lines 38-41, 52-59)  
**Severity:** MEDIUM  
**Description:**  
`isLoading` state is set but not properly managed. The loading state doesn't prevent navigation, allowing double-submissions.

**Impact:** Users can click submit multiple times, potentially creating duplicate accounts or login attempts.

**Fix:** Disable the submit button properly and show loading feedback consistently.

---

### 12. **Hardcoded Year in Report ID Generation**
**Location:** `src/pages/ReportScam.jsx` (Line 37)  
**Severity:** LOW-MEDIUM  
**Description:**  
Report IDs use hardcoded year "2026" instead of dynamic current year.

```javascript
const newReportId = `CS-2026-${Math.floor(1000 + Math.random() * 9000)}`;
```

**Impact:** When the year changes to 2027, report IDs will still show 2026, causing confusion.

**Fix:**
```javascript
const newReportId = `CS-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
```

---

## 🔵 Low Priority Bugs & Code Quality Issues

### 13. **Duplicate Inline Styles**
**Location:** `src/App.jsx` (Line 33)  
**Severity:** LOW  
**Description:**  
Redundant inline styles duplicate CSS logic:

```javascript
style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
```

Already defined via `className="min-h-screen flex flex-col"`.

**Recommendation:** Remove redundant inline styles for cleaner code.

---

### 14. **Accessibility Issues**
**Location:** Multiple components  
**Severity:** MEDIUM  
**Description:**  
Several accessibility issues found:

1. **Missing ARIA labels** on icon-only buttons (Admin Dashboard, Line 255)
2. **No keyboard navigation** for scam type selection cards (ReportScam, Lines 118-133)
3. **Missing focus indicators** on custom styled buttons
4. **No screen reader text** for status indicators

**Impact:** Users with disabilities cannot effectively use the application.

**Recommendation:** Implement comprehensive ARIA attributes and keyboard navigation.

---

### 15. **Potential XSS Vulnerability**
**Location:** `src/pages/AdminDashboard.jsx` (Line 291)  
**Severity:** MEDIUM  
**Description:**  
User-submitted description rendered with `whiteSpace: 'pre-wrap'` without sanitization.

```javascript
<p style={{ whiteSpace: 'pre-wrap' }}>
  {selectedReport.description || 'No description provided.'}
</p>
```

**Impact:** If a user submits HTML/JavaScript in the description, it could be rendered as-is. React does protect against this by default with JSX, but pre-wrap might preserve malicious formatting.

**Status:** React escapes by default, but worth noting for awareness.

---

### 16. **localStorage Not Cleared on Logout**
**Location:** Multiple files using localStorage  
**Severity:** LOW  
**Description:**  
Demo mode stores reports in localStorage but there's no cleanup mechanism when users log out or clear their data.

**Impact:** Sensitive report data persists in browser storage indefinitely.

**Recommendation:** Implement a logout function that clears relevant localStorage keys.

---

### 17. **No Mobile Number Validation**
**Location:** `src/pages/Login.jsx` (Line 91)  
**Severity:** LOW  
**Description:**  
Mobile number field during signup has no validation pattern.

```javascript
<input type="tel" value={mobile} onChange={e => setMobile(e.target.value)} required={!isLogin} placeholder="10-digit number" />
```

**Impact:** Users can enter invalid mobile numbers during registration.

---

### 18. **Missing Environment Variable Validation**
**Location:** `src/lib/supabaseClient.js` (Lines 8-9)  
**Severity:** LOW  
**Description:**  
The check for placeholder values is fragile:

```javascript
supabaseUrl !== 'your_supabase_url_here'
```

**Issue:** If someone accidentally sets the URL to this exact string after deployment, Supabase will fail silently.

**Recommendation:** Add more robust validation and clear error messages in development mode.

---

### 19. **Inconsistent Error Handling**
**Location:** Various components  
**Severity:** LOW  
**Description:**  
Error handling is inconsistent across the application:
- Some functions use `alert()` (AdminDashboard)
- Some silently fail (ReportScam)
- Some use `console.error()` (AdminDashboard, Line 47)

**Recommendation:** Implement a unified error handling system with toast notifications or a global error boundary.

---

### 20. **No Debouncing on Search Input**
**Location:** `src/pages/AdminDashboard.jsx` (Lines 172-174)  
**Severity:** LOW  
**Description:**  
Search input triggers filtering on every keystroke without debouncing.

**Impact:** Performance issues with large datasets. Excessive re-renders.

**Recommendation:** Implement debouncing with 300-500ms delay.

---

## 🟢 Security Recommendations

### 21. **Missing CSRF Protection**
**Severity:** MEDIUM  
**Description:**  
No CSRF token implementation for form submissions. While Supabase handles this internally for authenticated requests, demo mode localStorage operations are vulnerable.

---

### 22. **No Rate Limiting**
**Severity:** MEDIUM  
**Description:**  
No client-side or visible server-side rate limiting on:
- Report submissions
- Login attempts
- Admin operations

**Recommendation:** Implement rate limiting via Supabase Edge Functions or middleware.

---

### 23. **Sensitive Data in Browser Console**
**Severity:** LOW  
**Description:**  
`console.error` used in AdminDashboard (Line 47) could expose error details in production.

**Recommendation:** Remove console logs in production builds or use proper logging service.

---

## 📊 Summary

| Severity | Count | Priority |
|----------|-------|----------|
| 🔴 Critical | 3 | Immediate Fix Required |
| 🟠 High | 4 | Fix Before Production |
| 🟡 Medium | 9 | Address Soon |
| 🔵 Low | 7 | Plan for Future Iterations |
| **Total** | **23** | |

---

## 🎯 Recommended Fix Priority

1. **Immediate (Before Any Deployment):**
   - Bug #1: Login redirect loop
   - Bug #2: Database schema trigger ordering
   - Bug #3: No error handling on report submission

2. **Before Production:**
   - Bug #4: Missing RLS policy for anonymous reports
   - Bug #5: Race condition in auth
   - Bug #6: Weak password validation
   - Bug #7: Phone number validation

3. **Post-MVP Improvements:**
   - All Medium and Low priority bugs
   - Accessibility improvements
   - Code quality enhancements

---

## ✅ Positive Observations

1. Good use of Row Level Security (RLS) policies
2. Proper separation of concerns with context providers
3. Demo mode implementation for testing without backend
4. Responsive design considerations
5. Internationalization support via LanguageContext
6. Clean component structure

---

**End of Report**
