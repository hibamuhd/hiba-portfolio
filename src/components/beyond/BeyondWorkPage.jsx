import { C, serif } from "../../lib/theme";
import BrowserTabs from "../ui/BrowserTabs";
import SectionLabel from "../ui/SectionLabel";
import Bookshelf from "./Bookshelf";
import KitchenJournal from "./KitchenJournal";

const tabs = [
  { id: "bookshelf", label: "Bookshelf", icon: "book", accent: C.tan, url: "hiba.design/beyond-work/bookshelf", panel: <Bookshelf /> },
  { id: "kitchen", label: "Kitchen Journal", icon: "chef", accent: C.rose, url: "hiba.design/beyond-work/kitchen-journal", panel: <KitchenJournal /> },
];

export default function BeyondWorkPage() {
  return (
    <section aria-labelledby="beyond-heading" className="px-4 pb-24 pt-28 sm:px-8 sm:pt-32">
      <div className="mx-auto max-w-6xl">
        <SectionLabel n="Beyond">Outside the classroom</SectionLabel>
        <h1 id="beyond-heading" className="mt-4" style={{ ...serif, fontWeight: 500, fontSize: "clamp(1.9rem, 4vw, 2.9rem)", lineHeight: 1.12 }}>
          Beyond Work
        </h1>
        <p className="mt-3 max-w-md text-sm leading-relaxed" style={{ color: `${C.ink}B3` }}>
          An avid reader, runner and enthusiastic baker.
        </p>
        <div className="mt-10">
          <BrowserTabs tabs={tabs} ariaLabel="Beyond work pages" idPrefix="beyond" />
        </div>
      </div>
    </section>
  );
}
