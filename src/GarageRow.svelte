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
</script>

<button
  type="button"
  onclick={() => (open = !open)}
  aria-expanded={open}
  aria-controls={detailsId}
  class="group grid w-full grid-cols-[1fr_auto] items-center gap-x-4 px-5 pt-3 pb-3.5 text-left hover:bg-white/5 focus-visible:outline-3 focus-visible:-outline-offset-3 focus-visible:outline-led"
>
  <span class="min-w-0">
    <span class="flex items-center gap-2 text-xl/tight font-bold">
      {name}
      <svg
        aria-hidden="true"
        viewBox="0 0 12 12"
        class="size-3 text-white/50 transition-transform duration-200 {open ? 'rotate-180' : ''}"
        ><path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.75" /></svg
      >
    </span>
    {#if hasData}
      <span class="mt-2 flex items-center gap-3">
        <span class="h-1.5 w-full max-w-48 overflow-hidden rounded-full bg-white/15">
          <span
            class="block h-full rounded-full transition-[width] duration-700 {almostFull || full
              ? 'bg-signal'
              : 'bg-led'}"
            style="width: {Math.max(0, Math.min(1, share)) * 100}%"
          ></span>
        </span>
        <span class="w-14 shrink-0 text-sm text-white/70 tabular-nums">av {total}</span>
      </span>
    {/if}
  </span>

  <span class="w-26 text-right">
    {#if full}
      <span class="text-3xl/none font-extrabold text-signal">Fullt</span>
    {:else}
      <span
        class="block text-[3.25rem]/none font-extrabold tracking-tight tabular-nums {almostFull
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
  <div id={detailsId} transition:slide={{ duration: 200 }} class="bg-skylt-djup px-5 py-3 text-sm/relaxed text-white/85">
    {information || "Ingen avgiftsinformation."}
  </div>
{/if}
