# PostHog post-wizard report

The wizard has completed a deep integration of PostHog into your Next.js 16 App Router events application. The following changes were made: `instrumentation-client.ts` was created to initialize PostHog on the client side (using the Next.js 15.3+ recommended approach), `lib/posthog-server.ts` was added for server-side tracking, `next.config.ts` was updated with reverse proxy rewrites to route PostHog traffic through `/ingest`, and three components were instrumented to capture user engagement events. Environment variables are stored in `.env.local`.

| Event Name | Description | File |
|---|---|---|
| `explore_events_clicked` | User clicks the 'Explore Events' CTA button on the homepage to scroll to the events list. | `components/ExploreBtn.tsx` |
| `event_card_clicked` | User clicks on an event card to view more details about that event. Properties: `event_title`, `event_slug`, `event_location`, `event_date`, `event_time`. | `components/EventCard.tsx` |
| `dashboard_user_profile_viewed` | Dashboard admin views a specific user's detail page. Properties: `user_id`. | `app/dashboard/users/[id]/page.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- [Analytics basics (wizard) — Dashboard](https://us.posthog.com/project/493320/dashboard/1784850)
- [Event Card Clicks Over Time](https://us.posthog.com/project/493320/insights/V2bS0zTA)
- [Most Popular Events by Clicks](https://us.posthog.com/project/493320/insights/adxDPgPw)
- [Explore Events Button Clicks](https://us.posthog.com/project/493320/insights/lLCa1eV6)
- [Unique Users Engaging with Events](https://us.posthog.com/project/493320/insights/FL5E9a6F)

## Verify before merging

- [ ] Run a full production build (the wizard only verified the files it touched) and fix any lint or type errors introduced by the generated code.
- [ ] Run the test suite — call sites that were rewritten or instrumented may need updated mocks or fixtures.
- [ ] Add `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` and `NEXT_PUBLIC_POSTHOG_HOST` to `.env.example` and any monorepo/bootstrap scripts so collaborators know what to set.
- [ ] Wire source-map upload (`posthog-cli sourcemap` or your bundler's upload step) into CI so production stack traces de-minify.

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.
