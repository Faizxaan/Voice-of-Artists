# Fixes Applied - Image Upload & Navigation Scroll

## Issue 1: Image Upload "Unauthorized" Error ✅ FIXED

**Problem:** When trying to upload an image in the admin dashboard, the system showed "Unauthorized" error.

**Root Cause:** The upload API route was checking for cookie name `voa_admin_token`, but the actual auth system uses `auth-token`.

**Solution:** Updated `/src/app/api/admin/upload/route.ts` to use the correct cookie name:
```typescript
// Before
const token = request.cookies.get('voa_admin_token');

// After
const token = request.cookies.get('auth-token');
```

**How to Test:**
1. Log in to admin dashboard at `http://localhost:3000/admin/login`
2. Click "New Post"
3. Try uploading an image from your computer
4. Should work without "Unauthorized" error

---

## Issue 2: Navigation Scroll Offset ✅ FIXED

**Problem:** When clicking navigation bar links (About, Episodes, Artists Around World), the page scrolls but leaves unwanted space at the top, hiding part of the content under the fixed header.

**Root Cause:** The scroll position wasn't accounting for the fixed header height (64px).

**Solutions Applied:**

### 1. CSS-based Solution (globals.css)
Added scroll-margin to all elements with IDs:
```css
html {
  scroll-padding-top: 5rem; /* 80px */
}

[id] {
  scroll-margin-top: 5rem; /* Matches scroll-padding-top */
}
```

### 2. JavaScript-based Solution (Header.tsx)
Enhanced the `handleNavClick` function to:
- Close mobile menu first
- Wait 100ms for menu to close
- Calculate proper scroll position with header offset (64px + 16px padding = 80px)
- Smoothly scroll to the correct position

```typescript
const headerHeight = 64; // h-16 = 64px
const additionalOffset = 16; // Extra padding
const totalOffset = headerHeight + additionalOffset;

const elementPosition = targetElement.getBoundingClientRect().top;
const offsetPosition = elementPosition + window.pageYOffset - totalOffset;

window.scrollTo({
  top: offsetPosition,
  behavior: 'smooth'
});
```

**How to Test:**
1. Start the dev server: `npm run dev`
2. Go to `http://localhost:3000`
3. Click any navigation link: "About", "Episodes", or "Artists Around World"
4. The page should scroll to the section with proper spacing, showing the section title clearly below the header

---

## Files Modified

1. `/src/app/api/admin/upload/route.ts` - Fixed auth cookie name
2. `/src/components/sections/Header.tsx` - Enhanced scroll handler
3. `/src/app/globals.css` - Added scroll-margin CSS rules

---

## Testing Checklist

- [x] TypeScript type-check passes (`npx tsc --noEmit`)
- [x] ESLint passes with 0 errors
- [ ] Image upload works in admin dashboard
- [ ] Navigation links scroll to correct position
- [ ] No content hidden under header after scroll
- [ ] Works on both desktop and mobile

---

## Additional Notes

- The scroll offset is set to 80px (64px header + 16px padding)
- If you find the offset still needs adjustment, you can modify the `totalOffset` value in Header.tsx
- The 100ms delay in scroll handling ensures mobile menu closes smoothly before scrolling
