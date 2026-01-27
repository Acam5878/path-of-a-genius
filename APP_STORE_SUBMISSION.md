# App Store Submission Guide - Path of a Genius

## ✅ Completed Items
- [x] Privacy Policy page (`/privacy`)
- [x] Terms of Service page (`/terms`)
- [x] Support page (`/support`)
- [x] RevenueCat integration for subscriptions
- [x] Production build configuration (server block commented out)

---

## 📱 App Store Connect Information

### App Identity
- **App Name:** Path of a Genius
- **Subtitle:** Learn Like History's Greatest Minds
- **Bundle ID:** `com.pathofagenius.app`

### Category
- **Primary:** Education
- **Secondary:** Books (optional)

### Age Rating
Answer "No" to all content questions except:
- **Unrestricted Web Access:** No
- **Gambling:** No
- **Mature/Suggestive Themes:** No

Recommended rating: **4+** (suitable for all ages)

---

## 📝 App Description

### Short Description (Promotional Text - 170 chars)
```
Unlock your genius potential. Study the exact curricula that shaped Einstein, Da Vinci, Newton & history's greatest minds.
```

### Full Description
```
🎓 LEARN LIKE A GENIUS

Ever wondered how Einstein, Leonardo da Vinci, or Marie Curie became who they were? Path of a Genius recreates the educational journeys of history's most brilliant minds.

📚 WHAT YOU'LL DISCOVER

• Ancient Greek & Latin - The foundation of classical education
• Philosophy & Logic - Train your mind to think critically  
• Mathematics & Physics - From Euclid to Einstein's relativity
• Natural Sciences - Chemistry, biology, and the natural world
• Arts & Literature - The creative side of genius

🧠 10 LEGENDARY GENIUSES

Study the actual curricula of:
- John Stuart Mill (Free!) - Reading Greek at age 3
- Albert Einstein - Revolutionized physics forever
- Leonardo da Vinci - The original Renaissance man
- Marie Curie - First woman Nobel laureate
- Isaac Newton - Invented calculus and physics
- Nikola Tesla - Master of electricity
- Aristotle - Father of Western philosophy
- And more...

✨ FEATURES

• Curated lessons with quizzes and exercises
• Track your study streaks and progress
• Beautiful classical artwork and design
• Offline access to your learning materials
• Sync progress across all your devices

🏆 PREMIUM ACCESS

Free users get full access to John Stuart Mill's complete curriculum. Upgrade to Premium for all 10 geniuses:
• Monthly: $19.99/month
• Lifetime: $89.99 (one-time)

Start your journey to genius today!
```

### Keywords (100 characters max)
```
education,learning,genius,history,philosophy,einstein,davinci,greek,latin,classical,study,mind
```

### What's New (for updates)
```
• Initial release
• 10 historical geniuses to study
• Interactive lessons with quizzes
• Progress tracking and study streaks
```

---

## 🖼️ Required Assets

### App Icon (1024x1024)
You need a 1024x1024 PNG without transparency for App Store Connect.
Your current icon should be in: `ios/App/App/Assets.xcassets/AppIcon.appiconset/`

### Screenshots Required
| Device | Size | Required |
|--------|------|----------|
| 6.9" iPhone (16 Pro Max) | 1320 × 2868 | Yes |
| 6.7" iPhone (15 Pro Max) | 1290 × 2796 | Yes |
| 6.5" iPhone (14 Plus) | 1284 × 2778 | Optional |
| 5.5" iPhone (8 Plus) | 1242 × 2208 | Optional |

Recommended screens to capture:
1. Home/Discover page with featured genius
2. Geniuses gallery showing premium content
3. Genius profile (Einstein recommended)
4. Curriculum view with lessons
5. Progress dashboard with streaks

---

## 💳 In-App Purchases

### Products to Create in App Store Connect

| Reference Name | Product ID | Type | Price |
|----------------|------------|------|-------|
| Monthly Subscription | `com.pathofagenius.monthly` | Auto-Renewable | $19.99 |
| Lifetime Access | `com.pathofagenius.lifetime` | Non-Consumable | $89.99 |

### Subscription Group
- **Group Name:** Path of a Genius Premium
- **Display Name:** Premium Access

### IAP Review Notes
```
To test in-app purchases:
1. Open the app and browse the "Geniuses" tab
2. Tap on any genius marked "Premium" (e.g., Einstein)
3. You will be prompted to sign in or create an account
4. After signing in, tap the genius again to see the paywall
5. The paywall shows Monthly ($19.99) and Lifetime ($89.99) options

Free content: John Stuart Mill is fully accessible without purchase.
```

---

## 🔗 URLs for App Store Connect

| Field | URL |
|-------|-----|
| Privacy Policy | `https://YOUR_DOMAIN/privacy` |
| Support URL | `https://YOUR_DOMAIN/support` |
| Marketing URL | `https://YOUR_DOMAIN` (optional) |

---

## 📋 App Review Notes

```
Thank you for reviewing Path of a Genius!

TEST ACCOUNT (optional):
Email: reviewer@test.com
Password: TestReview123!

NAVIGATION GUIDE:
- Home: Featured genius and continue learning section
- Geniuses: Browse all 10 historical figures
- My Path: Personal learning queue
- Progress: Study streaks and time tracking
- Settings: Account and preferences

FREE CONTENT:
John Stuart Mill is completely free and unlocked. Tap his card to explore lessons.

PREMIUM CONTENT:
All other geniuses require Premium access. Tapping them will:
1. Prompt sign-in if not authenticated
2. Show the paywall with subscription options

The app uses RevenueCat for subscription management.
```

---

## ⚙️ Build Checklist

Before submitting:

- [ ] Run `npm run build` successfully
- [ ] Run `npx cap sync` to update native project
- [ ] Open `ios/App/App.xcworkspace` in Xcode
- [ ] Select "Any iOS Device (arm64)" as target
- [ ] Verify Bundle ID: `com.pathofagenius.app`
- [ ] Verify Version and Build numbers
- [ ] Select your Team for signing
- [ ] Archive: Product → Archive
- [ ] Distribute: App Store Connect → Upload

---

## 📧 Contact Information

For App Store Connect, you'll need:
- **First Name:** [Your first name]
- **Last Name:** [Your last name]
- **Email:** support@pathofagenius.com (update to real email)
- **Phone:** [Your phone number]

---

## 🚀 Submission Steps

1. **App Store Connect** → My Apps → + New App
2. Fill in app information using details above
3. Upload build from Xcode
4. Add screenshots
5. Configure in-app purchases
6. Submit for review

Typical review time: 24-48 hours

Good luck! 🎉
