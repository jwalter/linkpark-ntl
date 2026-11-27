<script lang="ts">
  import { onMount } from "svelte";
  import GarageRow from "./GarageRow.svelte";

  // Garages to show, in display order. Ids from https://api.dukaten.parkknowit.com/api/parkings
  const garages = [
    { id: "1e85f8c3-9a8e-467f-b707-8aa6a545153d", name: "Akilles" },
    { id: "749ab95d-a158-4c2f-a492-c8586f3c251e", name: "Baggen" },
    { id: "3ff522e4-30e0-4ac9-9dd5-8ad0626b56e0", name: "Detektiven" },
    { id: "03c7ab59-459d-43e8-b2ce-a1b62a3b3b88", name: "Druvan" },
    { id: "28b28b54-506a-4ec3-a5a1-7ebc2b7cae4d", name: "Tinnis" },
    { id: "bca0fcd0-5f1b-41fc-9501-f03aed7e045c", name: "Källaren" },
  ];

  // The API caches responses for two minutes
  const REFRESH_MS = 120_000;

  type ApiParking = {
    id: string;
    information?: string;
    vehicleSpaces?: { total?: number; available?: number };
  };

  let parkings = $state<Record<string, ApiParking>>({});
  let updatedAt = $state<Date | null>(null);
  let loading = $state(false);
  let failed = $state(false);

  async function load() {
    loading = true;
    try {
      const res = await fetch("/api/parkings");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const list: ApiParking[] = await res.json();
      parkings = Object.fromEntries(list.map((p) => [p.id, p]));
      updatedAt = new Date();
      failed = false;
    } catch (e) {
      console.error("Failed to load parking data", e);
      failed = true;
    } finally {
      loading = false;
    }
  }

  onMount(() => {
    load();
    const timer = setInterval(load, REFRESH_MS);
    const onVisible = () => {
      if (
        document.visibilityState === "visible" &&
        (!updatedAt || Date.now() - updatedAt.getTime() > REFRESH_MS)
      ) {
        load();
      }
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      clearInterval(timer);
      document.removeEventListener("visibilitychange", onVisible);
    };
  });

  const time = (d: Date) =>
    d.toLocaleTimeString("sv-SE", { hour: "2-digit", minute: "2-digit" });
</script>

<main class="mx-auto max-w-xl px-4 pt-8 pb-12 sm:pt-16">
  <header class="mb-5 flex items-end justify-between gap-4 px-1">
    <div>
      <h1 class="text-3xl/tight font-extrabold tracking-tight text-skylt dark:text-white">
        Lediga platser
      </h1>
      <p class="mt-1 text-sm text-slate-600 dark:text-slate-400" aria-live="polite">
        {#if failed && updatedAt}
          Kunde inte hämta nya siffror. Visar läget från {time(updatedAt)}.
        {:else if failed}
          Kunde inte hämta platserna.
        {:else if updatedAt}
          Linköping, uppdaterad {time(updatedAt)}
        {:else}
          Linköping
        {/if}
      </p>
    </div>
    <button
      type="button"
      onclick={load}
      disabled={loading}
      class="shrink-0 rounded-full px-3 py-1.5 text-sm font-semibold text-skylt ring-1 ring-skylt/30 hover:bg-skylt/5 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-led disabled:opacity-50 dark:text-white dark:ring-white/30 dark:hover:bg-white/10"
    >
      {loading ? "Hämtar…" : failed ? "Försök igen" : "Uppdatera"}
    </button>
  </header>

  <section
    aria-label="Lediga platser per parkeringshus"
    class="overflow-hidden rounded-2xl bg-skylt text-white shadow-[0_0_0_4px_var(--color-betong),0_0_0_6px_var(--color-skylt)] dark:shadow-[0_0_0_4px_var(--color-natt),0_0_0_6px_rgb(255_255_255/0.25)]"
  >
    <div class="flex items-center gap-3 border-b border-white/15 px-5 py-3">
      <span
        aria-hidden="true"
        class="grid size-8 place-items-center rounded-md bg-white text-xl leading-none font-black text-skylt"
        ><span class="translate-y-px">P</span></span
      >
      <span class="text-base font-semibold">Parkeringshus</span>
    </div>

    <ul class="divide-y divide-white/10">
      {#each garages as garage (garage.id)}
        <li>
          <GarageRow
            name={garage.name}
            available={parkings[garage.id]?.vehicleSpaces?.available}
            total={parkings[garage.id]?.vehicleSpaces?.total}
            information={parkings[garage.id]?.information}
          />
        </li>
      {/each}
    </ul>
  </section>
</main>
