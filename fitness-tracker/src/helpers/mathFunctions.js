export function minutesBetween(startedAt, finishedAt) {
    if (!startedAt || !finishedAt) return null;
    const start = new Date(startedAt).getTime();
    const end = new Date(finishedAt).getTime();
    const diff = Math.max(0, end - start);
    return Math.round(diff / 60000);
  }

 export function formatDate(iso) {
    if (!iso) return "—";
    return iso.slice(0, 10);
  }

  export function formatTimeHHMM(isoString) {
    if (!isoString) return "—";
    const d = new Date(isoString);
    if (Number.isNaN(d.getTime())) return "—";
  
    const hh = String(d.getHours()).padStart(2, "0");
    const mm = String(d.getMinutes()).padStart(2, "0");
    return `${hh}:${mm}`;
  }