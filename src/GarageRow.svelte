<script lang="ts">
  import { slide } from "svelte/transition";

  let {
    name,
    available,
    total,
    information,
  }: {
    name: string;
    available?: number;
    total?: number;
    information?: string;
  } = $props();

  let open = $state(false);

  const hasData = $derived(available !== undefined && total !== undefined && total > 0);
  const share = $derived(hasData ? available! / total! : 0);
  const full = $derived(hasData && available! <= 0);
  const almostFull = $derived(hasData && !full && share < 0.1);
  const detailsId = $props.id();

  // In fit mode the fee information covers the tile instead of sliding open,
  // so the page never grows taller than the screen
  const isFit = () => document.documentElement.classList.contains("fit");
</script>

<button
  type="button"
  onclick={() => (open = !open)}
  aria-expanded={open}
  aria-controls={detailsId}
  class="group grid w-full grid-cols-[1fr_auto] items-center gap-x-4 px-5 pt-3 pb-3.5 text-left hover:bg-white/5 focus-visible:outline-3 focus-visible:-outline-offset-3 focus-visible:outline-led fit:flex fit:h-full fit:flex-col fit:items-stretch fit:justify-between fit:gap-0 fit:p-[calc(var(--u)*2.5)] fit:hover:bg-transparent"
>
  <span class="min-w-0 fit:contents">
    <span
      class="flex items-center gap-2 text-xl/tight font-bold fit:gap-[calc(var(--u)*1)] fit:text-[calc(var(--u)*4.2)]/tight"
    >
      {name}
      <svg
        aria-hidden="true"
        viewBox="0 0 12 12"
        class="size-3 text-white/50 transition-transform duration-200 fit:size-[calc(var(--u)*1.8)] {open
          ? 'rotate-180'
          : ''}"><path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.75" /></svg
      >
    </span>
    {#if hasData}
      <span
        class="mt-2 flex items-center gap-3 fit:order-last fit:mt-0 fit:gap-[calc(var(--u)*1.5)]"
      >
        <span
          class="h-1.5 w-full max-w-48 overflow-hidden rounded-full bg-white/15 fit:h-[calc(var(--u)*0.9)] fit:max-w-none"
        >
          <span
            class="block h-full rounded-full transition-[width] duration-700 {almostFull || full
              ? 'bg-signal'
              : 'bg-led'}"
            style="width: {Math.max(0, Math.min(1, share)) * 100}%"
          ></span>
        </span>
        <span
          class="w-14 shrink-0 text-sm text-white/70 tabular-nums fit:w-auto fit:text-[calc(var(--u)*2.4)]"
          >av {total}</span
        >
      </span>
    {/if}
  </span>

  <span class="w-26 text-right fit:w-auto fit:text-left">
    {#if full}
      <span class="text-3xl/none font-extrabold text-signal fit:text-[calc(var(--u)*11)]/none">Fullt</span>
    {:else}
      <span
        class="block text-[3.25rem]/none font-extrabold tracking-tight tabular-nums fit:text-[calc(var(--u)*18)]/none {almostFull
          ? 'text-signal'
          : 'text-led'}"
      >
        {available ?? "–"}
      </span>
    {/if}
    <span class="sr-only">lediga platser</span>
  </span>
</button>

{#if open}
  <div
    id={detailsId}
    transition:slide={{ duration: isFit() ? 0 : 200 }}
    class="bg-skylt-djup px-5 py-3 text-sm/relaxed text-white/85 fit:pointer-events-none fit:absolute fit:inset-0 fit:overflow-hidden fit:p-[calc(var(--u)*2.5)] fit:text-[calc(var(--u)*2.6)]/snug"
  >
    {#if isFit()}
      <span class="mb-[calc(var(--u)*1)] block text-[calc(var(--u)*3.2)]/tight font-bold text-white">{name}</span>
    {/if}
    {information || "Ingen avgiftsinformation."}
  </div>
{/if}
