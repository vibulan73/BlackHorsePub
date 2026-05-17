import { PageBanner } from "../components/PageTitle";
import { api } from "../lib/api";
import { OpenMicContent, OpenMicEvent } from "./OpenMicContent";

async function getOpenMicEvents() {
  try {
    return await api<OpenMicEvent[]>("/open-mic/events");
  } catch {
    return [];
  }
}

export default async function OpenMicPage() {
  const events = await getOpenMicEvents();

  return (
    <>
      <PageBanner 
        title="Open Mic Nights" 
        copy="A welcoming stage for musicians, comedians, poets, and anyone brave enough to share their talent. Your local stage." 
        imageUrl="https://images.unsplash.com/photo-1516280440502-62f036720d18?auto=format&fit=crop&w=1920&q=80"
        badge="Take The Stage"
      />
      
      <OpenMicContent events={events} />
    </>
  );
}
