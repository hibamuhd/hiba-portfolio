import SiteShell from "../../src/components/site/SiteShell";

// Shared by Home (/) and Projects (/projects). Because this is a layout, the header
// and footer persist while navigating, so there is no full page reload.
export default function SiteLayout({ children }) {
  return <SiteShell>{children}</SiteShell>;
}
