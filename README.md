# Paddock Points: getting it live and earning

"Paddock Points" is a placeholder name. Change it in `index.html` (the `<title>`, the `<h1>` and the footer) if you pick another. Avoid "F1" or "Formula 1" in the name or domain, because they are trademarks.

## What's in the folder

| File | What it does | Do you edit it? |
|---|---|---|
| `index.html` | The page itself | Once, for the name and newsletter username |
| `data.js` | All the drivers, points and standings | **Yes, after every race** |
| `style.css` | The look | No |
| `app.js` | The calculations: balances, expiries, licence points | No |

Everything runs in the browser. There is no server and no database, so hosting is free.

---

## Step 1: Pick a name and buy a domain (about 15 minutes, about £10 a year)

1. Search the name on Google, Instagram and X to make sure nobody in motorsport is already using it.
2. Buy the domain from Cloudflare Registrar or Namecheap. A `.com` or `.co.uk` is best.
3. Grab the same handle on X, Instagram and TikTok so nobody else takes it.

## Step 2: Put the files on GitHub (about 10 minutes, free)

This all happens in a web browser, so you don't need to install anything.

1. Create a free account at github.com.
2. Click **New repository**. Name it, for example `paddock-points`, set it to **Public**, and click **Create**.
3. Click **uploading an existing file**, drag in all four files plus this README, then click **Commit changes**.

## Step 3: Turn it into a website (about 2 minutes)

1. In the repository, open **Settings → Pages**.
2. Under **Source**, choose **Deploy from a branch**, then branch `main` and folder `/ (root)`, and click **Save**.
3. Wait about a minute. Your site is now live at `https://YOUR-GITHUB-NAME.github.io/paddock-points/`.

## Step 4: Point your domain at it (about 20 minutes, then up to a day to take effect)

1. In **Settings → Pages → Custom domain**, type your domain and click **Save**.
2. At your domain provider, open the DNS settings and add these records:
   - Four **A** records for `@`, one for each address: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - One **CNAME** record for `www`, pointing to `YOUR-GITHUB-NAME.github.io`
3. Back in Pages, tick **Enforce HTTPS** once the option appears.

## Step 5: Switch on the newsletter (about 15 minutes, free to start)

1. Sign up at buttondown.com. It has a free starter tier.
2. In `index.html`, find `YOUR-USERNAME` and replace it with your Buttondown username. You can do this in GitHub: click the file, click the pencil icon, edit, then click **Commit**.
3. Subscribe yourself to check that it works.
4. Because you are collecting email addresses, UK GDPR applies. Add a one-line privacy note under the form saying what you collect, why, and that people can unsubscribe at any time. Buttondown handles the unsubscribe links.

## Step 6: Add visitor stats (about 10 minutes, free)

Use **Cloudflare Web Analytics** or **GoatCounter**. Both set no cookies, so you don't need a cookie banner. Paste their one-line script just above `</body>` in `index.html`.

---

## After every race: update the data (about 10 minutes)

1. Open the FIA's official documents page (fia.com, under Formula 1 → Documents) and look for **stewards' decisions** that mention "penalty points".
2. In GitHub, open `data.js`, click the pencil icon, and:
   - Change `UPDATED` to today's date and `UPDATED_NOTE` to the race name.
   - For each new penalty, add one line to that driver's list:
     `{p:1, ev:"Brazilian GP 2026", why:"Causing a collision", exp:"2027-11-08"}`
     Here `exp` is the date one year after the point was given.
   - Update the F2 and F3 championship points, keeping each table in championship order.
3. Click **Commit**. The site updates within about a minute.

Expired points drop off the site automatically on their expiry date, so you never need to remove them by hand.

**Check before every commit:** make sure each driver's total matches at least one other tracker, such as PlanetF1. A wrong number about a race ban is the quickest way to lose trust.

---

## Getting people to visit

- **Timing:** post when there is news. The best moment is when a driver picks up points or gets close to a ban. Share a screenshot of the meter with a link.
- **Where to post:** r/formula1, r/F1Technical, fantasy F1 communities, and F1 accounts on X. Read each community's self-promotion rules first. Leading with the useful information, rather than the link, goes down much better.
- **Rookie stories:** use the Road to F1 tab for posts like "who's on course for a 2027 seat". Junior-series fans are underserved.

## Making money, in this order

1. **Now: affiliate links.** Add a small "Watch the next race" or "Get tickets" box linking to F1 TV, ticket sites or merchandise, using their affiliate programmes. This earns little, but it starts on day one.
2. **Around 1,000 subscribers: newsletter sponsors.** Sell one sponsor slot per email to fantasy F1 tools, sim-racing brands or motorsport merchandise.
3. **A premium tier.** For example, £2–3 a month for instant alerts (a driver reaching 8 or more points, a junior driver clearing 40) and ban projections. Stripe Payment Links or Ko-fi Memberships handle payment with no coding.
4. **Licensing.** Offer an embeddable widget or a data feed to F1 blogs, podcasts and fantasy sites for a monthly fee. This plays to your data background and pays best per customer.

## Admin you shouldn't skip

- **Tax:** in the UK, the first £1,000 a year of side income is covered by the trading allowance. Above that, register for Self Assessment with HMRC.
- **Your employment contract:** check it for any clause about outside work or side businesses.
- **Disclaimer:** keep the footer saying the site is not affiliated with F1 or the FIA. Don't use team logos or the F1 logo.
