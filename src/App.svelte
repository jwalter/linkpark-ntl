<script lang="ts">
  import { onMount } from "svelte";
  import Parking from "./Parking.svelte";

  // Garages to show, in display order. Ids from https://api.dukaten.parkknowit.com/api/parkings
  const garages = [
    { id: "1e85f8c3-9a8e-467f-b707-8aa6a545153d", name: "Akilles" },
    { id: "749ab95d-a158-4c2f-a492-c8586f3c251e", name: "Baggen" },
    { id: "3ff522e4-30e0-4ac9-9dd5-8ad0626b56e0", name: "Detektiven" },
    { id: "03c7ab59-459d-43e8-b2ce-a1b62a3b3b88", name: "Druvan" },
    { id: "28b28b54-506a-4ec3-a5a1-7ebc2b7cae4d", name: "Tinnis" },
    { id: "bca0fcd0-5f1b-41fc-9501-f03aed7e045c", name: "Källaren" },
  ];

  type ApiParking = {
    id: string;
    vehicleSpaces?: { available?: number };
  };

  let available = $state<Record<string, number | undefined>>({});

  onMount(async () => {
    try {
      const res = await fetch("/api/parkings");
      const parkings: ApiParking[] = await res.json();
      available = Object.fromEntries(
        parkings.map((p) => [p.id, p.vehicleSpaces?.available])
      );
    } catch (e) {
      console.error("Failed to load parking data", e);
    }
  });
</script>

<main>
  <div class="grid grid-cols-2 md:grid-cols-3">
    {#each garages as garage (garage.id)}
      <Parking name={garage.name} freeSpaces={available[garage.id]} />
    {/each}
  </div>
</main>
