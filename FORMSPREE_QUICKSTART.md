# Formspree Quick Start

## 🚀 Get Started in 3 Steps

### Step 1: Get Your Formspree Endpoint

1. Visit [https://formspree.io](https://formspree.io)
2. Sign up (free plan includes 50 submissions/month)
3. Create a new form
4. Copy your endpoint ID (it looks like: `abc123xyz`)

### Step 2: Update .env File

Replace `YOUR_FORMSPREE_ENDPOINT_ID` in `.env`:

```env
VITE_FORMSPREE_ENDPOINT=abc123xyz
```

**Important:** Just the ID part, not the full URL!

### Step 3: Test It!

```bash
npm run dev
```

1. Go to http://localhost:5000/contact
2. Fill out the form
3. Press `Cmd+Enter` (Mac) or `Ctrl+Enter` (Windows/Linux)
4. Check your email for the submission!

## ✨ Features You Get

### Contact Form (`/contact`)
- ✅ Honeypot spam protection
- ✅ Email validation
- ✅ Keyboard shortcut (Cmd/Ctrl + Enter)
- ✅ Loading states & success/error toasts
- ✅ Focus glow effects
- ✅ Reply-To header automatically set
- ✅ Terminal aesthetic styling

### Messages Page (`/messages`)
- ✅ Anonymous message submission
- ✅ Moderation badges (published/queued/rejected)
- ✅ Relative timestamps
- ✅ Framer Motion animations
- ✅ Terminal CLI aesthetic

## 📧 How Messages Are Delivered

### To Your Devices
- **Email**: Immediate notification to your inbox
- **Phone**: Via email app notifications
- **Desktop**: Email client notifications

### Optional: Discord/Slack Integration
Use Zapier (free tier available):

1. Create Zap: **Formspree** → **Discord** or **Slack**
2. Choose your form as trigger
3. Format message body
4. Set destination channel
5. Done! Real-time notifications

## 🎯 Publishing Messages

Messages submitted via the form go to **your email only**. To display them on the site:

### Option 1: Manual (Current Setup)
1. Review message in your email
2. Copy approved messages to `client/src/pages/Messages.tsx`
3. Add to `initialMessages` array:
   ```typescript
   {
     content: "Your approved message here",
     timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 mins ago
     status: 'published',
   }
   ```
4. Commit and deploy

### Option 2: Google Sheets (Automated)
See `FORMSPREE_GUIDE.md` for full setup with Zapier

## 🔒 Privacy & Security

### What's Protected
- Honeypot field catches spam bots
- Client-side validation prevents invalid data
- Formspree's built-in spam filters
- No database = no data breach risk

### What Gets Stored
- **Formspree**: Submissions for 30 days (free plan)
- **Your Email**: Permanent (your email provider)
- **Website Code**: Only approved messages you manually add

## 🆘 Troubleshooting

### "Form not submitting"
- Check `.env` has correct endpoint ID
- Verify you're using `VITE_FORMSPREE_ENDPOINT` (with `VITE_` prefix)
- Restart dev server after changing `.env`

### "Not receiving emails"
- Check Formspree dashboard (submissions should appear there)
- Verify email in Formspree settings
- Check spam folder
- Ensure you haven't hit the 50/month limit (free plan)

### "Keyboard shortcut not working"
- Make sure form field is focused
- Try both `Cmd+Enter` and `Ctrl+Enter`
- Check if browser extension is capturing the shortcut

## 📊 Monitor Usage

Check your Formspree dashboard for:
- Total submissions
- Spam caught
- Remaining monthly quota
- Recent submissions

## 🚢 Production Deployment

### Vercel/Netlify/GitHub Pages

Add environment variable in your hosting dashboard:

```
VITE_FORMSPREE_ENDPOINT = abc123xyz
```

**Important:** Never commit `.env` file to Git!

### Test After Deployment

1. Submit test message from live site
2. Verify email arrives
3. Check Reply-To works correctly
4. Test on mobile device

## 📚 Need More Help?

- **Full Guide**: See `FORMSPREE_GUIDE.md`
- **Formspree Docs**: https://help.formspree.io/
- **Zapier Integration**: https://zapier.com/apps/formspree

---

**Ready to go!** Just add your endpoint ID to `.env` and start receiving messages! 🎉
