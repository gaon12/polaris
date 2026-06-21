<script lang="ts">
	import AuthShell from '$lib/components/auth/AuthShell.svelte';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<AuthShell mode="login" message={form?.message} />
