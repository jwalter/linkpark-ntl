<script lang="ts">
  let { name, freeSpaces }: { name: string; freeSpaces?: number } = $props();
</script>

<div class="bg-linear-to-br from-blue-300 to-blue-100 border-blue-200 border-solid border-2 rounded-md m-2">
  <div class="text-center text-xl/tight mt-4">{name}</div>
  <div class="text-center text-[4rem]/tight text-gray-900 -mt-2">{freeSpaces ?? '?'}</div>
</div>
