<script>
    import { onMount } from 'svelte';
    export let parkingId;
    let freeSpaces = "";
    let name = "";
    let spaces = "";
    onMount(async () => {
		const res = await fetch(`/api/Parkeringsdata/ParkeringsdataV1.svc/GetParkeringsytaById/a543a460665e4b64889759dbf83515a7/${parkingId}`);
		let parkingGarage = await res.json();
		freeSpaces = parkingGarage.ParkingSpacesAvailable;
		name = parkingGarage.Name;
		spaces = parkingGarage.ParkingSpaces;
	});
</script>
<style>
.l-box {
	text-align: center;
}
.pname {
	font-size: 20pt;
	margin-top: 20px;
}
.pfree {
	font-size: 56pt;
}

</style>

<div class="pure-u-1-2 pure-u-md-1-3 l-box">
	<div class="l-box pname">{name}</div>
	<div class="l-box pfree">{freeSpaces}</div>
</div>