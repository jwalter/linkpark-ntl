<script lang="ts">
  import { onMount } from "svelte";
  export let parkingId;
  let freeSpaces = "";
  let name = "";
  let spaces = "";
  onMount(async () => {
    const res = await fetch(
      `/api/Parkeringsdata/ParkeringsdataV1.svc/GetParkeringsytaById/a543a460665e4b64889759dbf83515a7/${parkingId}`
    );
    let parkingGarage = await res.json();
    freeSpaces = parkingGarage.ParkingSpacesAvailable;
    name = parkingGarage.Name;
    spaces = parkingGarage.ParkingSpaces;
  });
</script>

<div class="leading-tight bg-gradient-to-br from-blue-300 to-blue-100 border-blue-200 border-solid border-2 rounded-md m-2">
  <div class="text-center text-xl space-x-4 mt-4">{name}</div>
  <div class="text-center text-6xl text-gray-900 -mt-2">{freeSpaces ? freeSpaces : '0?'}</div>
</div>
