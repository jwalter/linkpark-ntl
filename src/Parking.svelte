<script lang="ts">
  export let name: string;
  export let freeSpaces: number | undefined;
</script>

<div class="leading-tight bg-gradient-to-br from-blue-300 to-blue-100 border-blue-200 border-solid border-2 rounded-md m-2">
  <div class="text-center text-xl space-x-4 mt-4">{name}</div>
  <div class="text-center text-6xl text-gray-900 -mt-2">{freeSpaces ?? '?'}</div>
</div>
