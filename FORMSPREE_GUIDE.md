# Formspree Integration Guide

This portfolio uses **Formspree** for handling contact form submissions and anonymous messages without requiring a backend server.

## 🚀 Setup Instructions

### 1. Create Formspree Account

1. Go to [https://formspree.io](https://formspree.io)
2. Sign up for a free account
3. Create a new form project

### 2. Configure Environment Variable

Add your Formspree endpoint ID to `.env`:

```env
VITE_FORMSPREE_ENDPOINT=your_endpoint_id_here
```

**To get your endpoint ID:**
- Go to your Formspree dashboard
- Click on your form
- Copy the form ID from the endpoint URL: `https://formspree.io/f/YOUR_ENDPOINT_ID`
- Paste just the ID part (after `/f/`) into `.env`

### 3. Configure Formspree Settings

In your Formspree dashboard:

1. **Email Notifications**: Set the email where submissions should be sent
2. **reCAPTCHA** (optional): Enable for additional spam protection on paid plans
3. **Webhooks** (optional): Configure for advanced integrations

## 📧 Email Delivery

### Default Behavior
- Form submissions are automatically emailed to your configured email address
- You'll receive notifications on your phone/devices instantly
- Email includes all form fields and sender's email (for replies)

### Reply-To Header
The integration automatically sets the `Reply-To` header to the sender's email, so you can reply directly from your email client.

## 🔒 Security & Spam Protection

### Built-in Protection

1. **Honeypot Field**: Hidden `_gotcha` field catches bots
2. **Client Validation**: Email format and message length validation
3. **Formspree Spam Filters**: Built-in spam detection (varies by plan)

### Rate Limiting

Formspree free plan includes:
- 50 submissions per month
- Upgrade to paid plan for higher limits

## 🔗 Advanced Integrations

### Discord/Slack Notifications

**Option 1: Zapier/Make (Recommended)**
1. Create a Zap: Formspree (trigger) → Discord/Slack (action)
2. Format the message with form fields
3. Choose channel and notification settings

**Option 2: Formspree Webhooks**
1. In Formspree settings, add a webhook URL
2. Create a serverless function (Vercel/Netlify) to receive webhook
3. Transform and forward to Discord webhook URL

Example Discord message format:
```
📬 New Contact Form Submission

**From:** {name} ({email})
**Message:**
{message}

**Time:** {timestamp}
```

### Push Notifications

Use Zapier to connect Formspree to:
- **Pushover**: Mobile push notifications
- **Pushbullet**: Cross-device notifications
- **Twilio**: SMS alerts (for urgent messages)

### Google Sheets Integration

1. Create a Zap: Formspree → Google Sheets
2. Append each submission as a new row
3. Add columns: timestamp, name, email, message, status
4. Use for analytics or manual moderation

## 📝 Publishing Messages

The Messages page displays curated messages. Here are options for publishing:

### Option 1: Manual Curation (Current Implementation)
1. Receive messages via Formspree email
2. Choose which messages to publish
3. Add them to `client/src/pages/Messages.tsx` in the `initialMessages` array
4. Commit and deploy

**Pros**: Full control, no backend required, no PII concerns
**Cons**: Manual work for each message

### Option 2: Google Sheets + Build-time Fetch
1. Set up Formspree → Zapier → Google Sheets
2. Publish sheet as CSV or use Google Sheets API
3. Fetch during build time (Vite/Next.js)
4. Add a `published` column for moderation

### Option 3: Formspree API (Paid Plan)
1. Use Formspree API to fetch submissions
2. Create a serverless function to filter published messages
3. Add admin UI for approval workflow

### Option 4: GitHub PR Workflow
1. Formspree webhook → Serverless function
2. Function creates PR with new message
3. Review and merge to publish
4. Automated moderation trail

## 🎨 Features Implemented

### Contact Form (`/contact`)
- Name, email, and message fields
- Honeypot spam protection
- Client-side validation
- Focus glow effects (accent-info)
- Keyboard shortcut: `Cmd/Ctrl + Enter` to submit
- Loading states with spinner
- Success/error toast notifications
- Terminal aesthetic styling

### Messages Page (`/messages`)
- Anonymous message submission
- Display of curated messages
- Moderation status badges (published/queued/rejected)
- Relative timestamps with hover tooltips
- Framer Motion animations
- Terminal CLI aesthetic (`$ ls messages/`)

## 🧪 Testing Checklist

- [ ] Set `VITE_FORMSPREE_ENDPOINT` in `.env`
- [ ] Submit test message from contact form
- [ ] Verify email arrives in inbox
- [ ] Check Reply-To header is set correctly
- [ ] Test honeypot catches spam
- [ ] Verify validation messages display
- [ ] Test keyboard shortcut (Cmd+Enter)
- [ ] Check mobile responsiveness
- [ ] Test error handling (invalid email, short message)
- [ ] Verify toast notifications appear

## 📊 Analytics (Optional)

Add analytics tracking on form submission:

```typescript
// In the success handler
if (result.ok) {
  // Track with your analytics service
  window.gtag?.('event', 'form_submission', {
    form_type: 'contact',
    timestamp: new Date().toISOString(),
  });
}
```

## 🔐 Privacy & GDPR

### Privacy Notice
Add to your privacy policy or contact page:

> "By submitting this form, you consent to us storing your message and email address for the purpose of responding to your inquiry. We will not share your information with third parties. Messages are retained for 6 months."

### Data Retention
- Formspree: Configure in account settings
- Local: Remove old messages from codebase periodically
- Emails: Set up auto-archive rules in your email client

## 🆘 Troubleshooting

### Form not submitting
- Check `VITE_FORMSPREE_ENDPOINT` is set correctly
- Verify endpoint format is just the ID (not full URL)
- Check browser console for errors
- Ensure internet connection is active

### Not receiving emails
- Check Formspree dashboard for submissions
- Verify email address in Formspree settings
- Check spam folder
- Confirm Formspree plan limits not exceeded

### Keyboard shortcut not working
- Check if another extension is intercepting the keys
- Verify focus is on the form
- Test with both Cmd (Mac) and Ctrl (Windows/Linux)

## 🚀 Production Deployment

1. Set `VITE_FORMSPREE_ENDPOINT` in your hosting environment variables
2. Ensure `.env` is in `.gitignore` (never commit credentials)
3. Test form submission after deployment
4. Monitor Formspree dashboard for submission activity
5. Set up email filters/labels for organization

## 📚 Additional Resources

- [Formspree Documentation](https://help.formspree.io/)
- [Formspree Webhooks Guide](https://help.formspree.io/hc/en-us/articles/360053946634-Webhooks)
- [Zapier Formspree Integration](https://zapier.com/apps/formspree/integrations)
- [Make (Integromat) Formspree Module](https://www.make.com/en/integrations/formspree)

## 🎯 Next Steps

1. **Get Formspree Endpoint**: Create form at formspree.io
2. **Add to .env**: `VITE_FORMSPREE_ENDPOINT=your_id`
3. **Test Locally**: Submit a test message
4. **Deploy**: Push to production with environment variable set
5. **Set Up Notifications**: Configure Discord/Slack via Zapier (optional)
6. **Curate Messages**: Manually add approved messages to Messages page

---

**Need help?** Check the [Formspree documentation](https://help.formspree.io/) or create an issue in this repository.
