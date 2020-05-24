<script>
    import { onMount } from 'svelte';
    export let parkingId;
    let freeSpaces = "";
    let name = "";
    let spaces = "";
    onMount(async () => {
		const res = await fetch(`/api/Parkeringsdata/ParkeringsdataV1.svc/GetParkeringsytaById/a543a460665e4b64889759dbf83515a7/${parkingId}`);
		let photos = await res.json();
		console.log("P " + photos);
		freeSpaces = photos.ParkingSpacesAvailable;
		name = photos.Name;
		spaces = photos.ParkingSpaces;
	});
</script>
<p>{name}: {freeSpaces} ({spaces})</p>